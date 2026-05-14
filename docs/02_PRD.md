# Product Requirements Document

## Website Goal

Create a high-trust personal portfolio for Lucian J. Yang that communicates packaging design judgment, shows selected work, and guides qualified visitors toward contact.

## Target Users

- Clients needing OEM / private-label packaging.
- Gift and welfare-channel project owners.
- Brand teams needing typography/visual-system support around packaging.
- Teams exploring AIGC-assisted proposal or motion workflows.
- Collaborators evaluating the designer's taste, process, and execution range.

## Core Conversion Path

Entry -> Hero category impression -> About/Services credibility -> Works/Gallery proof -> Clients trust signal -> Contact inquiry.

Secondary path: Hero card -> matching gallery category -> Contact.

## Page Structure

- Entry
- Hero
- About
- Services
- Works transition
- Works list
- Work gallery overlay
- Clients
- Contact
- Top meta controls
- Bottom primary navigation

## Entry Requirements

- Show a deliberate OPEN interaction before entering the site.
- Preserve entry canvas, dieline, wave, and seal effects.
- Clicking/tapping OPEN must set the entered state and reveal site navigation.
- Pixel avatar must return to entry after the user has entered.
- Entry should still work with reduced motion.

## Hero Requirements

- Show five work categories as cards: packaging, gift packaging, brand/type, AIGC workflow, AIGC video.
- Maintain water surface, ripples, wireframe, scroll cue, and focus panel.
- Wheel/touch input should progress through intro and card sequence.
- Hero focus panel should update copy and metadata based on active card.
- Enter Works should go to the Works section or matching gallery path.

## About Requirements

- Present the designer identity as packaging-focused.
- Use portrait video/image and sticky motion as the main visual.
- Explain judgment-first design approach and AIGC as a tool, not replacement.
- Show toolkit tags without making the section feel like a resume.

## Services Requirements

- Explain why to work with the designer.
- Keep the six service panels and scroll-story interaction.
- Maintain services grid scan and panel shader visuals.
- Copy should emphasize packaging judgment within price, process, delivery, and channel constraints.

## Works / Gallery Requirements

- Keep five main work categories in the Works list.
- Works rows must open the correct gallery category.
- Gallery must support category browsing, project cards, detail view, back/close, progress, and language refresh.
- Gallery should keep keyboard accessibility for opening rows and closing overlays.
- Gallery asset references must remain stable.

## Clients Requirements

- Clients section exists as a hidden-but-not-isolated trust signal.
- It should not appear in bottom navigation.
- It should be reachable through natural scroll and the low-key Works link.
- It should show selected client names and short credibility copy.

## Contact Requirements

- Contact remains a dedicated final section.
- Top-right arrow navigates to Contact.
- Gmail compose flow should use form fields to build subject/body.
- Social links and WeChat QR modal remain available.
- Contact copy should ask for project type, timing, and budget range.

## Language Switching Requirements

- Chinese and English modes must update static text, pill labels, hero focus text, services text, gallery text, and open gallery language.
- `html lang` must switch between `zh-CN` and `en`.
- New visible copy must be added to both languages.

## Mobile Requirements

- Site must remain scrollable and readable on mobile.
- Large hero/about/contact/clients type must not overflow horizontally.
- Bottom navigation must fit within viewport.
- Contact form and social links must stack cleanly.
- Heavy effects should degrade acceptably under reduced motion.

## Performance Requirements

- Keep static loading model.
- Do not add new runtime dependencies.
- Do not modify `three.min.js`.
- Avoid unnecessary asset path changes.
- Heavy WebGL/canvas modules must only initialize after their DOM targets exist.

## Non-Goals

- No framework migration.
- No bundler introduction.
- No server-side contact backend in this phase.
- No CMS.
- No full rewrite of gallery data.
- No asset renaming.

## Acceptance Criteria

- `index.html` opens locally.
- OPEN enters the site.
- Hero water and cards work.
- About, Services, Works, Clients, Contact sections are reachable.
- Works rows open Gallery.
- Gallery detail/back/close paths work.
- Chinese/English switching works.
- Contact form opens a compose target.
- WeChat QR modal opens and closes.
- Console has no site errors.
- `node tools/check-project.js` passes.
