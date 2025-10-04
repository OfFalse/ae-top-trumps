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

  test("shows validation error when Full Name is entered and then cleared", async () => {
    render(<FormWrapper />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    await userEvent.type(fullNameInput, "John Doe");
    expect(
      screen.queryByText("Full Name is a required field."),
    ).not.toBeInTheDocument();
    await userEvent.clear(fullNameInput);
    expect(
      screen.getByText("Full Name is a required field."),
    ).toBeInTheDocument();
  });

  test("hides validation error for Full Name when user starts typing again", async () => {
    render(<FormWrapper />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    await userEvent.type(fullNameInput, "J");
    await userEvent.clear(fullNameInput);
    expect(
      screen.getByText("Full Name is a required field."),
    ).toBeInTheDocument();
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

  test("shows validation error when Current Client is entered and then cleared", async () => {
    render(<FormWrapper />);
    const clientInput = screen.getByLabelText(/Current Client/i);
    await userEvent.type(clientInput, "Test Client");
    expect(
      screen.queryByText("Current Client is a required field."),
    ).not.toBeInTheDocument();
    await userEvent.clear(clientInput);
    expect(
      screen.getByText("Current Client is a required field."),
    ).toBeInTheDocument();
  });

  test("hides validation error for Current Client when user starts typing again", async () => {
    render(<FormWrapper />);
    const clientInput = screen.getByLabelText(/Current Client/i);
    await userEvent.type(clientInput, "T");
    await userEvent.clear(clientInput);
    expect(
      screen.getByText("Current Client is a required field."),
    ).toBeInTheDocument();
    await userEvent.type(clientInput, "Test Client");
    expect(
      screen.queryByText("Current Client is a required field."),
    ).not.toBeInTheDocument();
  });
});
