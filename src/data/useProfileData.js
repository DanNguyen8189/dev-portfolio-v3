import { useState, useEffect } from "react";

const parseProfile = (mdContent) => {
  const profile = {
    siteName: "",
    headerName: "",
    headerRole: "",
    headerDesc: "",
    about: "",
    contact: "",
    linkedin: "",
    github: "",
    email: "",
    instagram: "",
    logo: "",
  };
  const content = mdContent.replace(/<!--[\s\S]*?-->/g, "");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const section = line.substr(3).trim();

      switch (section) {
        case "Header":
          profile.headerName = lines[++i].substr(2).trim();
          profile.headerRole = lines[++i].substr(2).trim();
          profile.headerDesc = lines[++i].substr(2).trim();
          break;
        case "About":
          profile.about = lines[++i].trim();
          break;
        case "Contact":
          profile.contact = lines[++i].trim();
          while (i + 1 < lines.length && !lines[i + 1].startsWith("## ")) {
            const linkLine = lines[++i].trim();

            if (!linkLine.startsWith("-")) {
              continue;
            }

            const [label, ...valueParts] = linkLine.replace(/^-\s*/, "").split(":");
            const value = valueParts.join(":").trim();
            const normalizedLabel = label.trim().toLowerCase();

            if (normalizedLabel in profile) {
              profile[normalizedLabel] = value;
            }
          }
          break;
        case "Logo":
          profile.logo = lines[++i].substr(2).trim();
          break;
        default:
          // do nothing
          break;
      }
    }
  }

  return profile;
};

const useProfileData = () => {
  const [profile, setProfile] = useState({
    siteName: "",
    headerName: "",
    headerRole: "",
    headerDesc: "",
    about: "",
    contact: "",
    linkedin: "",
    github: "",
    email: "",
    instagram: "",
    logo: "",
  });

  useEffect(() => {
    fetch("/content/Profile.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setProfile(parseProfile(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return profile;
};

export default useProfileData;
