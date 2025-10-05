/* eslint-disable */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
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
    render(
      <List
        title="Skills"
        headers={sampleHeaders}
        items={sampleItems}
        setSelectedSkillsList={jest.fn() as any}
      />,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
  test("renders with sample headers", () => {
    render(
      <List
        title="Skills"
        headers={sampleHeaders}
        items={sampleItems}
        setSelectedSkillsList={jest.fn() as any}
      />,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Skill Level")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("renders with sample items", () => {
    render(
      <List
        title="Skills"
        headers={sampleHeaders}
        items={sampleItems}
        setSelectedSkillsList={jest.fn() as any}
      />,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  test("renders remove link for each item", () => {
    render(
      <List
        title="Skills"
        headers={sampleHeaders}
        items={sampleItems}
        setSelectedSkillsList={jest.fn() as any}
      />,
    );
    const removeLinks = screen.getAllByText("Remove");
    expect(removeLinks.length).toBe(3);
  });

  test("click remove link", async () => {
    const Wrapper: React.FC = () => {
      const [items, setItems] = React.useState(sampleItems);
      return (
        <List
          title="Skills"
          headers={sampleHeaders}
          items={items}
          setSelectedSkillsList={setItems}
        />
      );
    };

    render(<Wrapper />);
    const removeLink = screen.getByTestId("remove-link-0");
    fireEvent.click(removeLink);

    await waitFor(() => {
      const removeLinks = screen.getAllByText("Remove");
      expect(removeLinks.length).toBe(2);
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });
  });

  test("table is not rendered when no items", () => {
    render(
      <List
        title="Skills"
        headers={sampleHeaders}
        setSelectedSkillsList={jest.fn() as any}
      />,
    );
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
  test("table is not rendered when items is empty array", () => {
    render(
      <List
        title="Skills"
        headers={sampleHeaders}
        items={[]}
        setSelectedSkillsList={jest.fn() as any}
      />,
    );
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
