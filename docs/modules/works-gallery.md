# Works And Gallery

## Purpose

Works is the portfolio index. It renders category rows, hover preview, side rail shortcuts, and the entry points into the Gallery overlay. Gallery owns category browsing, project browsing, detail pages, language refresh, back, and close behavior.

## Owned Files

- `index.html`
- `styles/works.css`
- `styles/work-gallery.css`
- `scripts/works-hover-preview.js`
- `scripts/works-transition-motion.js`
- `scripts/works-side-rail.js`
- `scripts/work-gallery.js`
- `scripts/section-flow.js`
- `site-data.js`
- `images/works/`

## DOM Contracts

- `#works`
- Works category rows and their data attributes
- Works hover preview root
- Works side rail root/toggle/items
- Gallery overlay root
- Gallery category/project/detail containers
- Gallery back and close controls

## Runtime Contracts

- Defines `window.LucianWorkGallery`.
- Consumes `lucian:return-to-entry`.
- Consumes `lucian:programmatic-section-jump`.
- Consumes `lucian:site-entered`.
- Language runtime calls Gallery refresh after language changes.
- `#works-transition` uses a paired two-line statement reveal; keep both headline lines synchronized and out of per-glyph scroll splitting for smoother handoff.

## Data Contracts

- `worksData`: category labels and descriptions.
- `workGalleryImages`: image entries and category membership.
- `workGalleryProjects`: project groupings.
- `galleryText`: overlay chrome and copy.

Category ids must stay aligned across Works rows, side rail targets, image data, project data, and gallery text.

## Change Checklist

- Update both language branches for visible copy.
- Check every category row after data changes.
- Check side rail category and project deep links.
- If detail schema changes, update Gallery renderer and data contract docs.
- If images move, run project asset checks.

## QA

- Rows open expected categories.
- Side rail opens expected categories/projects.
- Hover preview follows rows and does not cover controls.
- Gallery close/back/detail flows work.
- Language switch refreshes an open Gallery.
- No desktop/mobile horizontal overflow.
