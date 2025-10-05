import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopTrumpCard from "./TopTrump";

describe("TopTrumpCard", () => {
  const baseProps = {
    fullName: "Ada Lovelace",
    currentClient: "Analytical Engines Ltd",
    selectedSkillsList: [
      { id: 1, title: "Algorithms", skillLevel: "Expert" },
      { id: 2, title: "Mathematics", skillLevel: "Advanced" },
      { id: 3, title: "Poetry", skillLevel: "Beginner" },
    ],
  };

  test("renders name and current client", () => {
    render(<TopTrumpCard {...baseProps} />);

    expect(
      screen.getByRole("heading", { level: 1, name: baseProps.fullName }),
    ).toBeInTheDocument();
    expect(screen.getByText("Current Client")).toBeInTheDocument();
    expect(screen.getByText(baseProps.currentClient)).toBeInTheDocument();
  });

  test("renders avatar image when avatar url provided", () => {
    const avatar = "https://example.com/avatar.png";
    render(<TopTrumpCard {...baseProps} avatar={avatar} />);

    const img = screen.getByRole("img", {
      name: `${baseProps.fullName}'s avatar`,
    });
    expect(img).toBeInTheDocument();
    expect((img as HTMLImageElement).src).toContain(avatar);
  });

  test("renders icon fallback when avatar not provided", () => {
    render(<TopTrumpCard {...baseProps} avatar="" />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    const avatarEl = screen.getByTestId("card-avatar");
    expect(avatarEl).toBeInTheDocument();
    expect(avatarEl).not.toBeEmptyDOMElement();
  });

  test("renders skills as tags with correct labels", () => {
    render(<TopTrumpCard {...baseProps} />);
    expect(screen.getByText("Algorithms")).toBeInTheDocument();
    expect(screen.getByText("Mathematics")).toBeInTheDocument();
    expect(screen.getByText("Poetry")).toBeInTheDocument();
  });
});
