import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import List from "./List";

const sampleHeaders = [
  { key: "title", header: "Title" },
  { key: "skillLevel", header: "Skill Level" },
  { key: "actions", header: "Actions" },
];
const sampleItems = [
  { id: 1, title: "Item 1", skillLevel: "Beginner" },
  { id: 2, title: "Item 2", skillLevel: "Intermediate" },
  { id: 3, title: "Item 3", skillLevel: "Advanced" },
];
describe("List Component", () => {
  test("component renders", () => {
    render(<List headers={sampleHeaders} items={sampleItems} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
  test("renders with sample headers", () => {
    render(<List headers={sampleHeaders} items={sampleItems} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Skill Level")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("renders with sample items", () => {
    render(<List headers={sampleHeaders} items={sampleItems} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  test("renders remove link for each item", () => {
    render(<List headers={sampleHeaders} items={sampleItems} />);
    const removeLinks = screen.getAllByText("Remove");
    expect(removeLinks.length).toBe(3);
  });

  test("click remove link", () => {
    render(<List headers={sampleHeaders} items={sampleItems} />);
    const removeLink = screen.getByTestId("remove-link-0");
    fireEvent.click(removeLink);
    const removeLinks = screen.getAllByText("Remove");
    expect(removeLinks.length).toBe(2);
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  test("table is not rendered when no items", () => {
    render(<List headers={sampleHeaders} />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
