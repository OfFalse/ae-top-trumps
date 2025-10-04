import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./Form";

// Test wrapper to manage controlled state required by UserForm
const FormWrapper: React.FC = () => {
  const [fullName, setFullName] = React.useState("");
  const [isFullNameInvalid, setIsFullNameInvalid] = React.useState(false);
  const [currentClient, setCurrentClient] = React.useState("");
  const [isCurrentClientInvalid, setIsCurrentClientInvalid] =
    React.useState(false);

  return (
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
  );
};

// Wrapper that starts with invalid flags true to verify that typing clears errors
const InvalidWrapper: React.FC = () => {
  const [fullName, setFullName] = React.useState("");
  const [isFullNameInvalid, setIsFullNameInvalid] = React.useState(true);
  const [currentClient, setCurrentClient] = React.useState("");
  const [isCurrentClientInvalid, setIsCurrentClientInvalid] =
    React.useState(true);

  return (
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
  );
};

describe("UserForm", () => {
  test("renders form fields correctly", () => {
    render(<FormWrapper />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Client/i)).toBeInTheDocument();
  });

  test("does not show validation errors on initial render", () => {
    render(<FormWrapper />);
    expect(
      screen.queryByText("Full Name is a required field."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Current Client is a required field."),
    ).not.toBeInTheDocument();
  });

  test("allows user to type in the Full Name field", async () => {
    render(<FormWrapper />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    await userEvent.type(fullNameInput, "John Doe");
    expect(fullNameInput).toHaveValue("John Doe");
  });

  test("shows errors when invalid props are true", () => {
    render(<InvalidWrapper />);
    expect(
      screen.getByText("Full Name is a required field."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Current Client is a required field."),
    ).toBeInTheDocument();
  });

  test("typing clears Full Name error (onChange sets invalid=false)", async () => {
    render(<InvalidWrapper />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    await userEvent.type(fullNameInput, "John Doe");
    expect(
      screen.queryByText("Full Name is a required field."),
    ).not.toBeInTheDocument();
  });

  test("allows user to type in the Current Client field", async () => {
    render(<FormWrapper />);
    const clientInput = screen.getByLabelText(/Current Client/i);
    await userEvent.type(clientInput, "Test Client");
    expect(clientInput).toHaveValue("Test Client");
  });

  test("typing clears Current Client error (onChange sets invalid=false)", async () => {
    render(<InvalidWrapper />);
    const clientInput = screen.getByLabelText(/Current Client/i);
    await userEvent.type(clientInput, "Test Client");
    expect(
      screen.queryByText("Current Client is a required field."),
    ).not.toBeInTheDocument();
  });

  // Note: showing errors on clear is handled by container (e.g., on submit), not by this presentational form.
});
