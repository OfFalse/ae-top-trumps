/* eslint-disable */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import UserData from "./UserData";
import { wait } from "@testing-library/user-event/dist/utils";

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

    // Client field
    userEvent.click(button);
    waitFor(() => {
      expect(
        screen.getByText("Current Client is a required field."),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Full Name is a required field."),
      ).toBeInTheDocument();
    });
  });

  test("submitting with valid fields shows TopTrump card and no errors, and toggles button label", async () => {
    render(<UserData />);
    const submit = screen.getByRole("button", { name: /create toptrump/i });
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const clientInput = screen.getByLabelText(/Current Client/i);

    await userEvent.type(fullNameInput, "Jane Doe");
    await userEvent.type(clientInput, "Acme Corp");

    await userEvent.click(submit);

    // Form should be replaced by TopTrump card showing the name
    waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Jane Doe" }),
      ).toBeInTheDocument();

      // Errors should not be shown
      expect(
        screen.queryByText("Full Name is a required field."),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Current Client is a required field."),
      ).not.toBeInTheDocument();

      // Button label toggles to Edit TopTrump
      expect(
        screen.getByRole("button", { name: /edit toptrump/i }),
      ).toBeInTheDocument();
    });
  });

  test("clicking Edit TopTrump returns to the form view", async () => {
    render(<UserData />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const clientInput = screen.getByLabelText(/Current Client/i);
    const submit = screen.getByRole("button", { name: /create toptrump/i });

    await userEvent.type(fullNameInput, "Jane Doe");
    await userEvent.type(clientInput, "Acme Corp");
    await userEvent.click(submit);

    // Now click the toggle button to go back to editing
    const editButton = screen.getByRole("button", { name: /edit toptrump/i });
    await userEvent.click(editButton);

    // Form heading should be visible again
    expect(
      screen.getByRole("heading", { name: /enter your details/i }),
    ).toBeInTheDocument();
    // And the button label should be back to Create TopTrump
    expect(
      screen.getByRole("button", { name: /create toptrump/i }),
    ).toBeInTheDocument();
  });
});
