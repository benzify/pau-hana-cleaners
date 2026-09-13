# Project Rules

## Clean page URLs

- Public and internal page URLs must never expose the `.html` extension.
- Keep root-level HTML files as the static source files, and publish them through the clean URL rules in `.htaccess`.
- Name new root-level pages with lowercase kebab-case filenames. For example, `window-cleaning.html` is published as `/window-cleaning`.
- Use root-relative clean paths in navigation, service cards, footers, canonical metadata, and future sitemap entries. For example, link to `/standard-cleaning`, not `standard-cleaning.html`.
- Link to homepage sections with root-based fragments such as `/#reviews`, not `index.html#reviews`.
- Preserve permanent redirects from legacy `.html` URLs to their extension-free equivalents when adding or changing routes.
