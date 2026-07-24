import { parseProjects } from "./ProjectsArray";

describe("parseProjects", () => {
  it("ignores commented-out project images", () => {
    const markdown = `
## Wave Foam Shader
Description
<!-- - ![600x200](https://www.ikelite.com/cdn/shop/articles/nudibranch-camera-settings-striped_30130ac6-516a-48f1-bcd4-80abaf76c92a.jpg?v=1571700803&width=1400) -->
- Tags: Category 1
- Badges:
  - Unity [blue]
  - Shader [blue]
- Buttons:
  - ⮺ [https://example.com]
`;

    const projects = parseProjects(markdown);

    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe("Wave Foam Shader");
    expect(projects[0].slug).toBe("wave-foam-shader");
    expect(projects[0].image).toBe("");
  });

  it("parses image and video metadata from markdown projects", () => {
    const markdown = `
## Demo Project
A sample project
- ![Hero](https://example.com/image.png)
- Video: [Watch demo](https://www.youtube.com/watch?v=123)
- Tags: Web
- Badges:
  - Badge [blue]
- Buttons:
  - Link [https://example.com]
`;

    const projects = parseProjects(markdown);

    expect(projects).toHaveLength(1);
    expect(projects[0].image).toBe("https://example.com/image.png");
    expect(projects[0].video).toEqual({
      text: "Watch demo",
      href: "https://www.youtube.com/watch?v=123",
      embedUrl: "https://www.youtube.com/embed/123",
    });
  });
});
