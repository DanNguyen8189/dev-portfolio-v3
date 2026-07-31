// data logic for extracting information from markdown 
// such as badge lists, comment stripping
export const stripMarkdownComments = (mdContent) =>
  mdContent.replace(/<!--[\s\S]*?-->/g, "");

export const parseIndentedListLine = (line) => {
  if (!line.startsWith("  - ")) {
    return null;
  }

  const listItemText = line.slice(4).trim();
  return listItemText || null;
};

export const parseBadgeListLine = (line) => {
  const badgeText = parseIndentedListLine(line);
  if (!badgeText) {
    return null;
  }

  const badgeMatch = badgeText.match(/^(.+?)\s*\[([^\]]+)\]\s*$/);
  if (badgeMatch) {
    return {
      text: badgeMatch[1].trim(),
      colorScheme: badgeMatch[2].trim() || "gray",
    };
  }

  return {
    text: badgeText,
    colorScheme: "gray",
  };
};

export const parseButtonListLine = (line) => {
  const buttonText = parseIndentedListLine(line);
  if (!buttonText) {
    return null;
  }

  const buttonMatch = buttonText.match(/^(.+?)\s*\[([^\]]+)\]\s*$/);
  if (buttonMatch) {
    return {
      text: buttonMatch[1].trim(),
      href: buttonMatch[2].trim(),
    };
  }

  return {
    text: buttonText,
    href: "",
  };
};

export const extractBadgesSection = (mdContent) => {
  const lines = mdContent.split("\n");
  const badges = [];
  const filteredLines = [];
  let collectingBadges = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!collectingBadges && trimmedLine === "- Badges:") {
      collectingBadges = true;
      continue;
    }

    if (collectingBadges) {
      if (!trimmedLine) {
        continue;
      }

      const parsedBadge = parseBadgeListLine(line);
      if (parsedBadge) {
        badges.push(parsedBadge);
        continue;
      }

      collectingBadges = false;
    }

    filteredLines.push(line);
  }

  return {
    badges,
    contentWithoutBadges: filteredLines.join("\n"),
  };
};
