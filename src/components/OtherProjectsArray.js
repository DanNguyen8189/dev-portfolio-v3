import { useState, useEffect } from "react";

export const parseOtherProjects = (mdContent) => {
  const content = mdContent.replace(/<!--[\s\S]*?-->/g, "");
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

        if (collectingBadges && currentLine.startsWith("  - ")) {
          const badgeLine = currentLine.substr(4).split("[");
          const badgeName = badgeLine[0].trim();
          const badgeColor = badgeLine[1]?.split("]")[0].trim() || "gray";
          badges.push({ text: badgeName, colorScheme: badgeColor });
          continue;
        }

        if (collectingButtons && currentLine.startsWith("  - ")) {
          const buttonLine = currentLine.substr(4).split("[");
          const buttonText = buttonLine[0].trim();
          const buttonHref = buttonLine[1]?.split("]")[0].trim() || "";
          buttons.push({ text: buttonText, href: buttonHref });
          continue;
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

const OtherProjectsArray = () => {
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

export default OtherProjectsArray;
