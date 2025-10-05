import { ComboBox, OnChangeData } from "@carbon/react";
import React, { useEffect, useState } from "react";
import { SkillItem } from "../List/List";
import useDebounce from "../../hooks/useDebounce";

interface SkillsSelectorProps {
  setSelectedSkillList: React.Dispatch<React.SetStateAction<any[]>>;
}

const SkillsSelector: React.FC<SkillsSelectorProps> = ({
  setSelectedSkillList,
}) => {
  const [comboValue, setComboValue] = useState("");
  const debouncedSearchTerm = useDebounce(comboValue, 500);

  const [skillList, setSkillList] = useState<string[]>([]);

  const handleSkillChange = (data: OnChangeData<string | null | undefined>) => {
    const { selectedItem } = data;
    if (selectedItem) {
      setSelectedSkillList((prevSkills) => {
        // Avoid adding duplicates
        if (prevSkills.find((skill) => skill.title === selectedItem)) {
          return prevSkills;
        }
        const newSkill: SkillItem = {
          id: prevSkills.length + 1,
          title: selectedItem,
          skillLevel: "Beginner", // Default skill level; adjust as needed
        };
        return [...prevSkills, newSkill];
      });
    }
  };

  const fetchSkills = async (input: string) => {
    if (!input) {
      setSkillList([]);
      return;
    }

    const response = await fetch(`https://api.apilayer.com/skills?q=${input}`, {
      method: "GET",
      headers: {
        apikey: "FrV9cdgbzq8Ff8As0G5mstPG1aYrF7Lg",
      },
    });
    const result = await response.json();
    setSkillList(result || []);
  };

  useEffect(() => {
    fetchSkills(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div>
      <ComboBox
        id={"skills-combo"}
        items={skillList}
        onChange={handleSkillChange}
        aria-activedescendant="skills-combo"
        onInputChange={(val: any) => {
          const value =
            typeof val === "string" ? val : (val?.target?.value ?? "");
          setComboValue(value);
        }}
        titleText="Skills"
        shouldFilterItem={() => true}
        placeholder="e.g. React"
      />
    </div>
  );
};

export default SkillsSelector;
