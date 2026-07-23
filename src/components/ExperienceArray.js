import { useState, useEffect } from "react";

export const parseExperience = (mdContent) => {
  const content = mdContent.replace(/<!--[\s\S]*?-->/g, "");
  const experience = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      let company = line.substr(3).trim();
      let position = "";
      let duration = "";
      let image = "";
      let tags = "";
      const badges = [];
      const listItems = [];
      let collectingBadges = false;
      let collectingListItems = false;

      const positionLine = lines[i + 1]
        ?.trim()
        .replace(/^-\s*/, "")
        .split("|")
        .map((s) => s.trim());
      if (positionLine && positionLine.length >= 2) {
        position = positionLine[0].replace(/^\*|\*$/g, "").trim();
        duration = positionLine[1].trim();
      }

      for (let j = i + 2; j < lines.length; j++) {
        const currentLine = lines[j];
        if (currentLine.startsWith("## ")) {
          break;
        }
        const trimmedLine = currentLine.trim();
        if (!trimmedLine) {
          continue;
        }
        const imageMatch = trimmedLine.match(/!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
          image = imageMatch[2].trim();
          collectingBadges = false;
          collectingListItems = false;
          continue;
        }
        if (trimmedLine.startsWith("- Tags:")) {
          tags = trimmedLine.split(":")[1].trim();
          collectingBadges = false;
          collectingListItems = false;
          continue;
        }
        if (trimmedLine === "- Badges:") {
          collectingBadges = true;
          collectingListItems = false;
          continue;
        }
        if (trimmedLine === "- List Items:") {
          collectingBadges = false;
          collectingListItems = true;
          continue;
        }
        if (collectingBadges && currentLine.startsWith("  - ")) {
          const badgeLine = currentLine.substr(4).split("[");
          const badgeName = badgeLine[0].trim();
          const badgeColor = badgeLine[1]?.split("]")[0].trim() || "gray";
          badges.push({ name: badgeName, colorScheme: badgeColor });
          continue;
        }

        if (collectingListItems && currentLine.startsWith("  - ")) {
          listItems.push(currentLine.substr(4).trim());
          continue;
        }
      }

      experience.push({
        image,
        company,
        position,
        duration,
        badges,
        listItems,
        tags,
      });
    }
  }

  return experience;
};

const ExperienceArray = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch("/content/Experience.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setExperience(parseExperience(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return experience;
};

export default ExperienceArray;

