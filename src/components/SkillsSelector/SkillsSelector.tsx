import {
  ComboBox,
  Dropdown,
  Button,
  OnChangeData,
  Column,
  Grid,
} from "@carbon/react";
import React, { useEffect, useMemo, useState } from "react";
import { SkillItem } from "../List/List";
import useDebounce from "../../hooks/useDebounce";
import "./SkillsSelector.scss";
import {
  API_ERROR_TEXT,
  SKILL_LEVELS,
  SKILL_LIMIT,
  SKILL_LIMIT_ERROR_TEXT,
} from "../../config/config";

interface SkillsSelectorProps {
  setSelectedSkillList: React.Dispatch<React.SetStateAction<any[]>>;
}

const SkillsSelector: React.FC<SkillsSelectorProps> = ({
  setSelectedSkillList,
}) => {
  // Use environment variables for API configuration
  // Stored in GitHub Secrets for security
  const API_BASE =
    process.env.REACT_APP_SKILLS_API_BASE || "https://api.apilayer.com";
  const API_KEY = process.env.REACT_APP_SKILLS_API_KEY;

  // Search term state with debounce for API calls - wait 500ms after user stops typing to prevent excessive calls
  const [comboValue, setComboValue] = useState("");
  const debouncedSearchTerm = useDebounce(comboValue, 500);

  const [skillList, setSkillList] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("Beginner");
  const [skillLimitError, setSkillLimitError] = useState(false);
  const [apiError, setApiError] = useState(false);

  // Ensure typed value persists by including it as an item when not present
  const displayItems = useMemo(() => {
    if (!comboValue) return skillList;
    return skillList.includes(comboValue)
      ? skillList
      : [comboValue, ...skillList];
  }, [comboValue, skillList]);

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

  const fetchSkills = async (input: string) => {
    setSkillLimitError(false);
    const query = input?.trim();
    if (!query) {
      setSkillList([]);
      return;
    }
    if (!apiError) {
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
        setApiError(true);
        setSkillList([]);
      }
    } else {
      setSkillList([]);
    }
  };

  useEffect(() => {
    fetchSkills(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <Grid>
      {/* Use Columns for reactivity */}
      <Column sm={4} md={6} lg={4}>
        <ComboBox
          id={"skills-combo"}
          items={displayItems}
          // Control the input so typed text persists on blur
          selectedItem={comboValue}
          onChange={({ selectedItem }) =>
            setComboValue((selectedItem as string) ?? "")
          }
          aria-activedescendant="skills-combo"
          onInputChange={(val: any) => {
            const value =
              typeof val === "string" ? val : (val?.target?.value ?? "");
            setComboValue(value);
          }}
          titleText="Skills"
          itemToString={(item: string | null | undefined) => item ?? ""}
          shouldFilterItem={() => true}
          placeholder="e.g. React"
          invalid={skillLimitError}
        />
      </Column>
      <Column sm={4} md={6} lg={2}>
        <Dropdown
          label="Working level"
          id="skill-level"
          titleText="Skill Level"
          items={SKILL_LEVELS as unknown as string[]}
          selectedItem={selectedLevel}
          onChange={({ selectedItem }) => handleLevelChange({ selectedItem })}
          invalid={skillLimitError}
        />
      </Column>
      <Column
        sm={2}
        md={2}
        lg={2}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Button
          kind="tertiary"
          onClick={() => addSkill(comboValue)}
          // disable the button if comboValue is empty or only whitespace
          disabled={!comboValue.trim()}
          style={{ marginTop: "auto", width: "100%" }}
        >
          Add
        </Button>
      </Column>

      {apiError && (
        <Column lg={8} md={6}>
          <div className="error_message">{API_ERROR_TEXT}</div>
        </Column>
      )}
      {skillLimitError && (
        <Column lg={8} md={6}>
          <div className="error_message">{SKILL_LIMIT_ERROR_TEXT}</div>
        </Column>
      )}
    </Grid>
  );
};

export default SkillsSelector;
