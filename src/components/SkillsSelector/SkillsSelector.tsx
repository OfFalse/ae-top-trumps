import { ComboBox, Dropdown, Button, OnChangeData } from "@carbon/react";
import React, { useEffect, useState } from "react";
import { SkillItem } from "../List/List";
import useDebounce from "../../hooks/useDebounce";
import "./SkillsSelector.scss";
import {
  SKILL_LEVELS,
  SKILL_LIMIT,
  SKILL_LIMIT_ERROR_TEXT,
} from "../../config/config";

interface SkillsSelectorProps {
  setSelectedSkillList: React.Dispatch<React.SetStateAction<any[]>>;
}

// Use environment variables for API configuration
// Stored in GitHub Secrets for security
const API_BASE =
  process.env.REACT_APP_SKILLS_API_BASE || "https://api.apilayer.com";
const API_KEY = process.env.REACT_APP_SKILLS_API_KEY;

const SkillsSelector: React.FC<SkillsSelectorProps> = ({
  setSelectedSkillList,
}) => {
  const [comboValue, setComboValue] = useState("");
  const debouncedSearchTerm = useDebounce(comboValue, 500);

  const [skillList, setSkillList] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("Beginner");
  const [skillLimitError, setSkillLimitError] = useState(false);

  const addSkill = (name: string | null | undefined) => {
    const selectedItem = (name ?? "").trim();
    if (!selectedItem) return;
    setSelectedSkillList((prevSkills) => {
      // Enforce max limit using latest state
      if (prevSkills.length >= SKILL_LIMIT) {
        setSkillLimitError(true);
        return prevSkills;
      }
      // Avoid adding duplicates
      if (prevSkills.find((skill) => skill.title === selectedItem)) {
        return prevSkills;
      }
      const newSkill: SkillItem = {
        id: prevSkills.length + 1,
        title: selectedItem,
        skillLevel: selectedLevel,
      };
      if (skillLimitError) setSkillLimitError(false);
      return [...prevSkills, newSkill];
    });
  };

  const handleLevelChange = ({ selectedItem }: OnChangeData<string>) => {
    setSkillLimitError(false);
    setSelectedLevel((selectedItem as string) || "Beginner");
  };
  const handleSkillChange = (data: OnChangeData<string | null | undefined>) => {
    return;
  };

  const fetchSkills = async (input: string) => {
    setSkillLimitError(false);
    const query = input?.trim();
    if (!query) {
      setSkillList([]);
      return;
    }
    try {
      const headers: Record<string, string> = {};
      if (API_KEY) headers.apikey = API_KEY;
      const response = await fetch(
        `${API_BASE}/skills?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers,
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
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "10px",
          alignItems: "flex-end",
        }}
      >
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
          invalid={skillLimitError}
        />
        <div className="single_unit">
          <Dropdown
            label="Working level"
            id="skill-level"
            titleText="Skill Level"
            items={SKILL_LEVELS as unknown as string[]}
            selectedItem={selectedLevel}
            onChange={({ selectedItem }) => handleLevelChange({ selectedItem })}
            invalid={skillLimitError}
          />
        </div>
        <div className="single_unit">
          <Button
            kind="primary"
            onClick={() => addSkill(comboValue)}
            // disable the button if comboValue is empty or only whitespace
            disabled={!comboValue.trim()}
          >
            Add
          </Button>
        </div>
      </div>
      {skillLimitError && (
        <div className="error_message">{SKILL_LIMIT_ERROR_TEXT}</div>
      )}
    </>
  );
};

export default SkillsSelector;
