import React, { useEffect, useState } from "react";
import UserForm from "../Form/Form";
import { Button, Form, Stack } from "@carbon/react";
import List, { SkillItem } from "../List/List";
import TopTrump from "../TopTrump/TopTrump";

const sampleHeaders = [
  { key: "title", header: "Title" },
  { key: "skillLevel", header: "Skill Level" },
  { key: "actions", header: "Actions" },
];

// Consider converting userdata to context if it grows more complex
// For now, keep state local to this component
// Will prevent prop drilling as app scales

const UserData: React.FC = () => {
  // State management for form inputs and display control
  // Enables toggling between form view and TopTrump display
  const [fullName, setFullName] = useState("");
  const [isFullNameInvalid, setIsFullNameInvalid] = useState(false);

  const [currentClient, setCurrentClient] = useState("");
  const [isCurrentClientInvalid, setIsCurrentClientInvalid] = useState(false);

  const [buttonText, setButtonText] = useState("Create TopTrump");

  const [selectedSkillsList, setSelectedSkillsList] = useState<SkillItem[]>([]);

  const [displayTopTrump, setDisplayTopTrump] = useState(false);

  const handleSubmit = () => {
    // Placeholder for form submission logic
    if (!fullName) {
      setIsFullNameInvalid(true);
      return;
    }
    if (!currentClient) {
      setIsCurrentClientInvalid(true);
      return;
    }
    setDisplayTopTrump(!displayTopTrump);
  };

  useEffect(() => {
    // Change button text based on whether TopTrump is displayed
    setButtonText(displayTopTrump ? "Edit TopTrump" : "Create TopTrump");
  }, [displayTopTrump]);

  return (
    <Form aria-label="Top Trump Form">
      <Stack gap={7} style={{ marginBottom: "20px" }}>
        {!displayTopTrump ? (
          <>
            <UserForm
              fullName={fullName}
              setFullName={setFullName}
              setSelectedSkillList={setSelectedSkillsList}
              isFullNameInvalid={isFullNameInvalid}
              setIsFullNameInvalid={setIsFullNameInvalid}
              currentClient={currentClient}
              setCurrentClient={setCurrentClient}
              isCurrentClientInvalid={isCurrentClientInvalid}
              setIsCurrentClientInvalid={setIsCurrentClientInvalid}
            />
            <List
              title="Selected Skills"
              headers={sampleHeaders}
              items={selectedSkillsList}
              setSelectedSkillsList={setSelectedSkillsList}
            />
          </>
        ) : (
          <TopTrump
            fullName={fullName}
            currentClient={currentClient}
            selectedSkillsList={selectedSkillsList}
          />
        )}
        <Button onClick={handleSubmit}>{buttonText}</Button>
      </Stack>
    </Form>
  );
};

export default UserData;
