import React from "react";
import { Tile, Tag } from "@carbon/react";
import { SkillItem } from "../List/List";
import { UserAvatar } from "@carbon/react/icons";
import { downloadAsImage } from "../../utils/downloadAsImage";
import { Download } from "@carbon/react/icons";
import "./TopTrump.scss";

interface TopTrumpProps {
  fullName: string;
  currentClient: string;
  selectedSkillsList: SkillItem[];
  avatar?: string;
}

const proficiencyColorMap: {
  // Map skill levels to tag colors using strings
  [key: string]: "purple" | "blue" | "green" | "gray";
} = {
  Expert: "purple",
  Advanced: "blue",
  Intermediate: "green",
  Beginner: "gray",
};

const TopTrumpCard: React.FC<TopTrumpProps> = ({
  fullName,
  currentClient,
  selectedSkillsList = [],
  // Future enhancement: allow user-uploaded
  avatar = "",
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (contentRef.current) {
      downloadAsImage(contentRef, fullName || "toptrump");
    }
  };

  return (
    <div className="cards-container">
      <Download
        onClick={handleDownload}
        size={32}
        style={{ cursor: "pointer" }}
      />
      <Tile className="top-trump-card" ref={contentRef}>
        <div className="card-header">
          <div className="card-avatar" data-testid="card-avatar">
            {/* Extended scope allows user to upload profile picture */}
            {avatar ? (
              <img src={avatar} alt={`${fullName}'s avatar`} />
            ) : (
              <UserAvatar size={125} />
            )}
          </div>
          <div className="card-info">
            <h1 className="cds--heading-02">{fullName}</h1>
            <p className="cds--label-01">Current Client</p>
            <p className="cds--body-short-01">{currentClient}</p>
          </div>
        </div>

        <hr className="cds--hr" />

        <div className="skills-section">
          <h4 className="cds--heading-compact-01">Top Skills</h4>
          <div className="skills-list">
            {selectedSkillsList.map((skill, i) => (
              <Tag
                key={i}
                type={proficiencyColorMap[skill.skillLevel] || "gray"}
              >
                {skill.title}
              </Tag>
            ))}
          </div>
        </div>
      </Tile>
    </div>
  );
};

export default TopTrumpCard;
