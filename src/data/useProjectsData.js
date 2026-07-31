import { useState, useEffect } from "react";
import {
  parseBadgeListLine,
  parseButtonListLine,
  stripMarkdownComments,
} from "../utils/markdownSectionData";
import { toEmbedUrl } from "../utils/mediaLinks";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const parseProjects = (mdContent) => {
  const content = stripMarkdownComments(mdContent);
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

          video = {
            text: videoMatch[1].trim(),
            href,
            embedUrl: toEmbedUrl(href),
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

      projects.push({
        name,
        slug: slugify(name),
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

const useProjectsData = () => {
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

export default useProjectsData;
