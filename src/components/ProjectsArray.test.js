import { parseProjects } from "./ProjectsArray";

describe("parseProjects", () => {
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
