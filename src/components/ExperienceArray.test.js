import { parseExperience } from "./ExperienceArray";

describe("parseExperience", () => {
  it("ignores commented-out experience entries", () => {
    const markdown = `
<!--
## Commented Out
- *role* | Jan'23 - Feb'23
- ![logo512](../assets/logo512.png)
- Tags: Art
- Badges:
  - Badge [blue]
- List Items:
  - Point 1
-->

## RollingStars Studios
- *background artist* | Jan'23 - Feb'23
- ![logo512](../assets/logo512.png)
- Tags: Art
- Badges:
  - Badge [blue]
- List Items:
  - Point 1
  - Point 2
`;

    const experience = parseExperience(markdown);

    expect(experience).toHaveLength(1);
    expect(experience[0].company).toBe("RollingStars Studios");
  });

  it("parses experience entries with bullet-prefixed image and list items", () => {
    const markdown = `
## RollingStars Studios
- *background artist* | Jan'23 - Feb'23
- ![logo512](../assets/logo512.png)
- Tags: Art
- Badges:
  - Badge [blue]
- List Items:
  - Point 1
  - Point 2
`;

    const experience = parseExperience(markdown);

    expect(experience).toHaveLength(1);
    expect(experience[0]).toMatchObject({
      company: "RollingStars Studios",
      position: "background artist",
      duration: "Jan'23 - Feb'23",
      image: "../assets/logo512.png",
      tags: "Art",
      badges: [{ name: "Badge", colorScheme: "blue" }],
      listItems: ["Point 1", "Point 2"],
    });
  });
});
