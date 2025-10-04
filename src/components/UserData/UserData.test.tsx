import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserData from "./UserData";

describe("UserData", () => {
  test("renders the underlying UserForm fields", () => {
    render(<UserData />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Client/i)).toBeInTheDocument();
  });

  test("allows typing into form fields and updates values", async () => {
    render(<UserData />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const clientInput = screen.getByLabelText(/Current Client/i);

    await userEvent.type(fullNameInput, "Jane Doe");
    await userEvent.type(clientInput, "Acme Corp");

    expect(fullNameInput).toHaveValue("Jane Doe");
    expect(clientInput).toHaveValue("Acme Corp");
  });

  test("shows and hides validation messages based on input", async () => {
    render(<UserData />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const clientInput = screen.getByLabelText(/Current Client/i);

    // Trigger invalid by clearing after typing
    await userEvent.type(fullNameInput, "X");
    await userEvent.clear(fullNameInput);
    expect(
      screen.getByText("Full Name is a required field."),
    ).toBeInTheDocument();

    await userEvent.type(fullNameInput, "Jane Doe");
    expect(
      screen.queryByText("Full Name is a required field."),
    ).not.toBeInTheDocument();

    // Client field
    await userEvent.type(clientInput, "Y");
    await userEvent.clear(clientInput);
    expect(
      screen.getByText("Current Client is a required field."),
    ).toBeInTheDocument();

    await userEvent.type(clientInput, "Acme Corp");
    expect(
      screen.queryByText("Current Client is a required field."),
    ).not.toBeInTheDocument();
  });
});
