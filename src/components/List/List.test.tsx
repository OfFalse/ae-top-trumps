import React from "react";
import { render, screen } from "@testing-library/react";
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
    render(<List />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
  test("renders with sample headers", () => {
    render(<List headers={sampleHeaders} />);
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
});

// Im going to do TDD on a List component using the Carbon Design Sytem
// The List component will display a list of items passed to it as props
// Each item will have a title and a description
// The List component will use the Carbon List component to display the items
// The list will have two headers: Title and Skill Level
// Each item in the list must be removable by clicking a remove button next to it
// The List component will also have a button to clear all items from the list
// The List component will be tested using Jest and React Testing Library
