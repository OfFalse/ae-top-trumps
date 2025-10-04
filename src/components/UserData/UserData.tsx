import React, { useState } from "react";
import UserForm from "../Form/Form";
import { Button, Stack } from "@carbon/react";

const UserData: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [isFullNameInvalid, setIsFullNameInvalid] = useState(false);

  const [currentClient, setCurrentClient] = useState("");
  const [isCurrentClientInvalid, setIsCurrentClientInvalid] = useState(false);

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
    <div>
      <Stack gap={7} style={{ marginBottom: "20px" }}>
        <h2>Enter Your Details</h2>
        <p>
          Please provide your full name and current client to create your
          TopTrump profile.
        </p>
        <UserForm
          fullName={fullName}
          setFullName={setFullName}
          isFullNameInvalid={isFullNameInvalid}
          setIsFullNameInvalid={setIsFullNameInvalid}
          currentClient={currentClient}
          setCurrentClient={setCurrentClient}
          isCurrentClientInvalid={isCurrentClientInvalid}
          setIsCurrentClientInvalid={setIsCurrentClientInvalid}
        />
        <Button onClick={handleSubmit}>Create TopTrump</Button>
      </Stack>
    </div>
  );
};

export default UserData;
