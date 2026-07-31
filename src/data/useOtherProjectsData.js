import { useState, useEffect } from "react";
import {
  parseBadgeListLine,
  parseButtonListLine,
  stripMarkdownComments,
} from "../utils/markdownSectionData";

export const parseOtherProjects = (mdContent) => {
  const content = stripMarkdownComments(mdContent);
  const others = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const name = line.substr(3).trim();
      let description = "";
      let tags = "";
      const badges = [];
      const buttons = [];
      let collectingBadges = false;
      let collectingButtons = false;

      for (let j = i + 1; j < lines.length; j++) {
        const currentLine = lines[j];
        if (currentLine.startsWith("## ")) {
          break;
        }

        const trimmedLine = currentLine.trim();
        if (!trimmedLine) {
          continue;
        }

        if (trimmedLine.startsWith("- Tags:")) {
          tags = trimmedLine.split(":")[1]?.trim() || "";
          collectingBadges = false;
          collectingButtons = false;
          continue;
        }

        if (trimmedLine === "- Badges:") {
          collectingBadges = true;
          collectingButtons = false;
          continue;
        }

        if (trimmedLine === "- Buttons:") {
          collectingBadges = false;
          collectingButtons = true;
          continue;
        }

        if (collectingBadges) {
          const parsedBadge = parseBadgeListLine(currentLine);
          if (parsedBadge) {
            badges.push(parsedBadge);
            continue;
          }
        }

        if (collectingButtons) {
          const parsedButton = parseButtonListLine(currentLine);
          if (parsedButton) {
            buttons.push(parsedButton);
            continue;
          }
        }

        if (!description) {
          description = trimmedLine;
        } else {
          description = `${description}\n${trimmedLine}`;
        }
      }

      others.push({
        name,
        description,
        tags: [tags],
        badges,
        buttons,
      });
    }
  }

  return others;
};

const useOtherProjectsData = () => {
  const [otherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    fetch("/content/OtherProjects.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setOtherProjects(parseOtherProjects(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return otherProjects;
};

export default useOtherProjectsData;
