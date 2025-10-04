import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserData from "./UserData";

describe("UserData", () => {
  test("renders heading, helper text, and submit button", () => {
    render(<UserData />);
    expect(
      screen.getByRole("heading", { name: /enter your details/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please provide your full name and current client/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create toptrump/i }),
    ).toBeInTheDocument();
  });

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
    const button = screen.getByRole("button", { name: /create toptrump/i });

    // Trigger invalid by clearing after typing
    userEvent.type(fullNameInput, "X");
    userEvent.clear(fullNameInput);

    // Client field
    userEvent.type(clientInput, "Y");
    userEvent.clear(clientInput);
    userEvent.click(button);
    expect(
      screen.getByText("Full Name is a required field."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Current Client is a required field."),
    ).toBeInTheDocument();
  });

  test("shows validation errors when submitting with empty fields", async () => {
    render(<UserData />);
    const submit = screen.getByRole("button", { name: /create toptrump/i });
    await userEvent.click(submit);
    expect(
      screen.getByText("Full Name is a required field."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Current Client is a required field."),
    ).toBeInTheDocument();
  });

  test("submitting with valid fields shows success alert and no errors", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<UserData />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const clientInput = screen.getByLabelText(/Current Client/i);
    const submit = screen.getByRole("button", { name: /create toptrump/i });

    await userEvent.type(fullNameInput, "Jane Doe");
    await userEvent.type(clientInput, "Acme Corp");
    await userEvent.click(submit);

    expect(alertSpy).toHaveBeenCalledWith(
      "TopTrump created for Jane Doe at Acme Corp",
    );

    expect(
      screen.queryByText("Full Name is a required field."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Current Client is a required field."),
    ).not.toBeInTheDocument();

    alertSpy.mockRestore();
  });
});
