import { useState, useEffect } from "react";

export const parseProjects = (mdContent) => {
  const content = mdContent.replace(/<!--[\s\S]*?-->/g, "");
  const projects = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const name = line.substr(3).trim();
      let description = "";
      let image = "";
      let video = null;
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

        const imageMatch = trimmedLine.match(/!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
          image = imageMatch[2].trim();
          collectingBadges = false;
          collectingButtons = false;
          continue;
        }

        const videoMatch = trimmedLine.match(/Video:? \[([^\]]+)\]\(([^)]+)\)/i);
        if (videoMatch) {
          const href = videoMatch[2].trim();
          const youtubeWatchMatch = href.match(/https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i);
          const youtuBeMatch = href.match(/https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/i);
          const embedUrl = youtubeWatchMatch
            ? `https://www.youtube.com/embed/${youtubeWatchMatch[1]}`
            : youtuBeMatch
            ? `https://www.youtube.com/embed/${youtuBeMatch[1]}`
            : href;

          video = {
            text: videoMatch[1].trim(),
            href,
            embedUrl,
          };
          collectingBadges = false;
          collectingButtons = false;
          continue;
        }

        if (trimmedLine.startsWith("- Tags:")) {
          tags = trimmedLine.split(":")[1].trim();
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

      projects.push({
        name,
        description,
        image,
        video,
        tags: [tags],
        badges,
        buttons,
      });
    }
  }

  return projects;
};

const ProjectsArray = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/content/Projects.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setProjects(parseProjects(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return projects;
};

export default ProjectsArray;
