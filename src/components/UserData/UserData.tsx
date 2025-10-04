import React, { useState } from "react";
import UserForm from "../Form/Form";

const UserData: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [isFullNameInvalid, setIsFullNameInvalid] = useState(false);

  const [currentClient, setCurrentClient] = useState("");
  const [isCurrentClientInvalid, setIsCurrentClientInvalid] = useState(false);

  return (
    <div>
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
    </div>
  );
};

export default UserData;
