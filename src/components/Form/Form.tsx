import React from "react";
import { TextInput, Stack } from "@carbon/react";

interface UserFormProps {
  fullName: string;
  setFullName: (name: string) => void;
  isFullNameInvalid: boolean;
  setIsFullNameInvalid: (isInvalid: boolean) => void;
  currentClient: string;
  setCurrentClient: (client: string) => void;
  isCurrentClientInvalid: boolean;
  setIsCurrentClientInvalid: (isInvalid: boolean) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  fullName,
  setFullName,
  isFullNameInvalid,
  setIsFullNameInvalid,
  currentClient,
  setCurrentClient,
  isCurrentClientInvalid,
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
      <TextInput
        id="full-name"
        labelText="Full Name"
        value={fullName}
        onChange={handleFullNameChange}
        invalid={isFullNameInvalid}
        invalidText="Full Name is a required field."
        placeholder="e.g. Jane Doe"
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
        required
      />
    </Stack>
  );
};

export default UserForm;
