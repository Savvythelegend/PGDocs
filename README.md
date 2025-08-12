# PGDocs

![Docusaurus](https://img.shields.io/badge/Built_with-Docusaurus-blue?logo=docusaurus&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
![Deploy](https://img.shields.io/github/actions/workflow/status/Savvythelegend/pgdocs/deploy.yml?label=Deploy%20Status)

**Live Preview:** [savvythelegend.github.io/pgdocs](https://savvythelegend.github.io/pgdocs/)

---

## Overview

PGDocs is a modern, scalable documentation site demonstrating:

- **Versioned documentation** for released and unreleased versions.
- **CI/CD automation** using GitHub Actions and GitHub Pages.
- **Custom theming** with an accessible, responsive interface.
- **Structured content organization** for long-term maintainability.

---

## Features

| Category          | Highlights                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| Documentation     | Multi-version, clean navigation, mobile-friendly UI                        |
| Automation        | GitHub Actions for build and deployment                                    |
| Customization     | Theming, sidebar configs, modular content                                  |
| Scalability       | Growth-ready structure for multi-section projects                          |

---

## Getting Started

```bash
git clone https://github.com/Savvythelegend/pgdocs.git
cd pgdocs
npm install
npm start
````

Local site: [http://localhost:3000/](http://localhost:3000/)

---

## Deployment

* Push changes to `main`
* GitHub Actions builds and deploys to `gh-pages`
* Live at: [savvythelegend.github.io/pgdocs](https://savvythelegend.github.io/pgdocs/)

---

## Project Structure

```
pgdocs/
├── .github/workflows/   # CI/CD workflows
├── docs/                # Documentation content
├── scripts/             # Build & deploy scripts
├── src/                 # React components & styles
├── static/              # Static assets
├── docusaurus.config.js # Site configuration
├── sidebars.js          # Sidebar definitions
├── package.json         # Dependencies & metadata
└── README.md
```

---

## Contributing

Fork, create a feature branch, make changes, submit a PR. Follow existing structure and conventions.

---

## License

MIT License — see [LICENSE](LICENSE)

```
```
