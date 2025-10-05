import React, { useState } from "react";
import UserForm from "../Form/Form";
import { Button, Form, Stack } from "@carbon/react";
import List, { SkillItem } from "../List/List";

const sampleHeaders = [
  { key: "title", header: "Title" },
  { key: "skillLevel", header: "Skill Level" },
  { key: "actions", header: "Actions" },
];

const UserData: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [isFullNameInvalid, setIsFullNameInvalid] = useState(false);

  const [currentClient, setCurrentClient] = useState("");
  const [isCurrentClientInvalid, setIsCurrentClientInvalid] = useState(false);

  const [selectedSkillsList, setSelectedSkillsList] = useState<SkillItem[]>([]);

  const handleSubmit = () => {
    // Placeholder for form submission logic
    if (!fullName) {
      setIsFullNameInvalid(true);
    }
    if (!currentClient) {
      setIsCurrentClientInvalid(true);
    }
    if (fullName && currentClient) {
      alert(`TopTrump created for ${fullName} at ${currentClient}`);
    }
  };

  return (
    <Form aria-label="Top Trump Form">
      <Stack gap={7} style={{ marginBottom: "20px" }}>
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
        <Button onClick={handleSubmit}>Create TopTrump</Button>
      </Stack>
    </Form>
  );
};

export default UserData;
