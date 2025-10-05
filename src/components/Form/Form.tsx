import React, { useEffect, useState } from "react";
import { TextInput, Stack, ComboBox } from "@carbon/react";
import { OnChangeData } from "@carbon/react/lib/components/ComboBox/ComboBox";
import { SkillItem } from "../List/List";

interface UserFormProps {
  fullName: string;
  isFullNameInvalid: boolean;
  isCurrentClientInvalid: boolean;
  currentClient: string;
  selectedSkillList: SkillItem[];
  setIsFullNameInvalid: (isInvalid: boolean) => void;
  setCurrentClient: (client: string) => void;
  setFullName: (name: string) => void;
  setSelectedSkillList: React.Dispatch<React.SetStateAction<SkillItem[]>>;
  setIsCurrentClientInvalid: (isInvalid: boolean) => void;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const UserForm: React.FC<UserFormProps> = ({
  fullName,
  isFullNameInvalid,
  isCurrentClientInvalid,
  currentClient,
  setIsFullNameInvalid,
  setCurrentClient,
  setFullName,
  setSelectedSkillList,
  setIsCurrentClientInvalid,
}) => {
  const [comboValue, setComboValue] = useState("");
  const debouncedSearchTerm = useDebounce(comboValue, 500);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFullName(value);
    setIsFullNameInvalid(false);
  };

  const handleCurrentClientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setCurrentClient(value);
    setIsCurrentClientInvalid(false);
  };

  const handleSkillChange = ({ selectedItem }: OnChangeData<string>) => {
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

  const [skillList, setSkillList] = useState<string[]>([]);

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
    <Stack gap={7}>
      <h1>Enter Your Details</h1>
      <p>
        Please provide your full name and current client to create your TopTrump
        profile.
      </p>
      <TextInput
        id="full-name"
        labelText="Full Name"
        value={fullName}
        onChange={handleFullNameChange}
        invalid={isFullNameInvalid}
        invalidText="Full Name is a required field."
        placeholder="e.g. Jane Doe"
        autoComplete="given-name"
        required
      />
      <TextInput
        id="current-client"
        labelText="Current Client"
        value={currentClient}
        onChange={handleCurrentClientChange}
        invalid={isCurrentClientInvalid}
        invalidText="Current Client is a required field."
        placeholder="e.g. Facebook"
        autoComplete="organization"
        required
      />
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
    </Stack>
  );
};

export default UserForm;
