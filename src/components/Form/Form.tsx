import React, { useState } from "react";
import { Form, TextInput, Stack } from "@carbon/react";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [isFullNameInvalid, setIsFullNameInvalid] = useState(false);

  const [currentClient, setCurrentClient] = useState("");
  const [isCurrentClientInvalid, setIsCurrentClientInvalid] = useState(false);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFullName(value);
    setIsFullNameInvalid(!value);
  };

  const handleCurrentClientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setCurrentClient(value);
    setIsCurrentClientInvalid(!value);
  };

  return (
    <Form>
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
    </Form>
  );
};

export default UserForm;
