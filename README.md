# Portfolio using React.js and Chakra UI

This portfolio is built using React.js and Chakra UI. It allows customization using markdown files.

## Getting Started

To get started with development:

```
# Install dependencies
npm install

# Start the development server
npm start

# Build the static files
npm build
```

After running `npm start`, site should be available at `http://localhost:3000`.

## Editing Content

To edit the content on your website, refer to the markdown files located in the `public/content` folder.

### ExperienceTags.md and ProjectsTags.md

```
Category 1
Category 2
Category 3
```

### Experience.md

To edit work experience, update the `Experience.md` file with the following format:

```
## Company Name
- *Role* | Period
- ![image_name](../assets/image_name.png)
- Tags: Work
- Badges:
  - BadgeContent [badge_colour]
- List Items:
  - Point 1
  - Point 2
```

### Projects.md

To edit your projects, update the `Projects.md` file with the following format:

```
## Project Name
Description
- ![image_name](../assets/image_name.png)
- Tags: WebDev
- Badges:
  - BadgeContent [badge_colour]
- Buttons:
  - ButtonContent [button_link]
```

### OtherProjects.md

To edit other projects or items, update the `OtherProjects.md` file with the following format:

```
## Project Name
Description
- Tags: WebDev
- Badges:
  - BadgeContent [badge_colour]
- Buttons:
  - ButtonContent [button_link]
```

### Project Details
Each project with an expanded page can be found in public/content/projects
These a slightly different than the project and experience sections above; formatting is less rigid and you get to decide where pictures, videos, and bullet points show up based on the order you put them in the markdown file.
```
Quick description

## Heading 2

paragraph
![image_name](/assets/image_name.png)

### heading 3

paragraph
 - bullet
 - bullet
   - bullet

```
## Customizing Design

Change colors, fonts, and site design located in src/theme.js. Refer to Chakra UI documentation for more information.

Repo is based off of original from
https://github.com/eldoraboo/portable-portfolio


