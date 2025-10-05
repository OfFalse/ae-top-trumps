import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Carbon header", () => {
  render(<App />);
  const headerElement = screen.getByLabelText(/AE Top Trumps/i);
  expect(headerElement).toBeInTheDocument();
  const headerName = screen.getByText(/Top Trumps/i);
  expect(headerName).toBeInTheDocument();
  const skipLink = screen.getByText(/Skip to main content/i);
  expect(skipLink).toBeInTheDocument();
});
