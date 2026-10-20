# Shanilka T. Yapa — Portfolio

A React + Vite migration of the existing portfolio. It retains the dark navy, cyan/violet/pink visual identity and uses the existing project catalog, profile image, and CV.

## Stack

- React and JSX
- Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- Lucide React
- Native browser APIs for project loading, visibility, navigation, and canvas effects

## Requirements and local development

Use Node.js 20.19+ or 22.12+ and npm. Install dependencies and start Vite:

```sh
npm install
npm run dev
```

Vite prints the local URL (normally `http://localhost:5173`).

Create a production bundle with:

```sh
npm run build
```

Preview the production bundle locally with:

```sh
npm run preview
```

## Project structure

```text
public/
  images/profile.jpeg
  projects.json
  CV - Yapa Y. H. S. T..pdf
src/
  components/
    contact/       Contact.jsx
    effects/       SparkleBackground.jsx, MouseTrail.jsx
    hero/          Hero.jsx, ProfileCard.jsx, StatsGrid.jsx, AnimatedCounter.jsx
    layout/        Navbar.jsx, Footer.jsx
    projects/      Projects.jsx, ProjectCard.jsx, ProjectFilters.jsx,
                   ProjectSearch.jsx, ProjectModal.jsx
    skills/        Skills.jsx, SkillCard.jsx
  data/            profile.js, skills.js, navigation.js
  hooks/           useActiveSection.js, useScrollReveal.js, useTypingEffect.js
  styles/          global.css
  App.jsx
  main.jsx
index.html
vite.config.js
```

`legacy-portfolio.html` preserves the original page, and the original root-level project JSON and assets are also kept untouched as migration backups.

## Updating portfolio information

### Projects

Edit `public/projects.json`. Add or update project objects using the existing schema. Keep the file valid JSON: use double-quoted property names and strings, commas between properties/items, and no trailing comma after the final item. Every project must have a unique non-empty `id`; include `title`, `category`, `status`, `icon`, `summary`, `details`, `tags` (an array), and `links` (an array of `{ "label", "href" }` objects). An empty `links` array is allowed, but do not add URLs that are not real.

Project cards, category filters, search, detail dialogs, and the hero project count are generated from this file. Known icon names are mapped safely; unrecognized icon names use a generic code icon. If the JSON cannot be fetched or fails validation, the Projects section shows the error and a retry action rather than silently hiding the failure.

### Skills

Edit the records in `src/data/skills.js`. Skill cards and the skill-group statistic update from that array.

### Profile

Edit the values in `src/data/profile.js` for profile details, contact information, role messages, focus areas, asset paths, and social links. Preserve real links and asset files when updating these values.

## Vercel deployment

Import the GitHub repository into Vercel and use the Vite defaults:

- Framework preset: **Vite**
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Deploy to a Vercel Preview first and review that preview (including mobile navigation, project details, profile image, and CV download) before merging or deploying a production change. This migration does not alter Vercel settings, domains, or the live deployment. Production deployment should happen only after you choose to merge/deploy the reviewed migration yourself.
