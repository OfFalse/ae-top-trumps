import React from "react";
import { TextInput, Stack } from "@carbon/react";
import { SkillItem } from "../List/List";
import SkillsSelector from "../SkillsSelector/SkillsSelector";

interface UserFormProps {
  fullName: string;
  isFullNameInvalid: boolean;
  isCurrentClientInvalid: boolean;
  currentClient: string;
  setIsFullNameInvalid: (isInvalid: boolean) => void;
  setCurrentClient: (client: string) => void;
  setFullName: (name: string) => void;
  setSelectedSkillList: React.Dispatch<React.SetStateAction<SkillItem[]>>;
  setIsCurrentClientInvalid: (isInvalid: boolean) => void;
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
      <h2>Skills</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>
        {`Select your relevant skills and experience. This will help match you to suitable projects.\n\nAdd up to 5 skills.`}
      </p>
      <SkillsSelector setSelectedSkillList={setSelectedSkillList} />
    </Stack>
  );
};

export default UserForm;
