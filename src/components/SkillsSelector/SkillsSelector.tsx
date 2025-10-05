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
    const query = input?.trim();
    if (!query) {
      setSkillList([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.apilayer.com/skills?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            apikey: "FrV9cdgbzq8Ff8As0G5mstPG1aYrF7Lg",
          },
        },
      );
      if (!response || !("ok" in response) || !response.ok) {
        setSkillList([]);
        return;
      }
      let result: unknown = [];
      try {
        result = await response.json();
      } catch {
        result = [];
      }
      setSkillList(Array.isArray(result) ? (result as string[]) : []);
    } catch (e) {
      setSkillList([]);
    }
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
