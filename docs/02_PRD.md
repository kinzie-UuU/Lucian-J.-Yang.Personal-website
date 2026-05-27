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

Entry -> Hero impression -> About/Services credibility -> Works/Gallery proof -> Contact inquiry -> Clients trust signal by scroll.

Secondary path: Works side rail or Works rows -> matching gallery category/project -> Contact.

## Page Structure

- Entry
- Hero
- About / Portrait
- Services
- Services-owned sequence landing on Works transition copy
- Works transition
- Works list
- Works-to-Contact curtain
- Work gallery overlay
- Contact
- Clients
- Top meta controls
- Works side rail
- Bottom primary navigation for About, Services, and Contact

## Entry Requirements

- Show a deliberate 3D key entry ritual before entering the site.
- Progress text and progress bar should advance with key loading/entry timing.
- Auto-enter should trigger when the key progress reaches 100%.
- Scroll/touch should also be able to enter.
- Entry-to-Hero should use the horizontal stage curtain transition.
- Pixel avatar must return to entry after the user has entered and replay the key sequence.
- Entry should still work with reduced motion.

## Hero Requirements

- Maintain Hero water surface, ripples, wireframe, liquid glass field, lion-head GLB model, and large wordmark.
- Lion model should load from `/models/lion_head/lion_head_2k.gltf`.
- Pointer interaction should nudge/orbit the lion without breaking layout.
- Hero-to-About should use the black vertical curtain handoff.
- Hero must not depend on the old five-card sequence.

## About Requirements

- Present the designer identity as packaging-focused.
- Use portrait video/image and scroll reveal as the main visual.
- Explain judgment-first design approach and AIGC as a tool, not replacement.
- Show toolkit tags without making the section feel like a resume.
- About-to-Services curtain should hand off cleanly near the end of the section.

## Services Requirements

- Explain why to work with the designer.
- Start with a full-screen `为何选择我` title stage before any service station appears.
- Use local WebGL canvas stages for the Services title and time-tunnel sequence; scroll-story interaction must remain natural and readable.
- Copy should emphasize packaging judgment within price, process, delivery, and channel constraints.
- Service copy should refresh after language switch.

## Works / Gallery Requirements

- Keep five main work categories in the Works list and Works side rail.
- Works rows and rail items must open the correct gallery category.
- Gallery must support category browsing, project cards, detail view, back/close, progress, and language refresh.
- Gallery should keep keyboard accessibility for opening rows and closing overlays.
- Gallery asset references must remain stable.

## Clients Requirements

- Clients section remains a trust signal.
- It should not appear in bottom navigation.
- It should show selected client names and short credibility copy.
- It should remain reachable through natural scroll.

## Contact Requirements

- Contact remains a dedicated inquiry section.
- Top-right arrow and bottom nav Contact navigate to Contact.
- Works is intentionally not a bottom-nav item; visitors reach it through the Services sequence, natural scroll, Works rows, or the upper-left Works rail.
- Gmail compose flow should use form fields to build subject/body.
- Social links and WeChat QR modal remain available.
- Contact copy should ask for project type, timing, and budget range.

## Language Switching Requirements

- Chinese and English modes must update static text, pill labels, services text, gallery text, Works rows, Contact copy, Clients copy, and open gallery language.
- `html lang` must switch between `zh-CN` and `en`.
- New visible copy must be added to both languages unless it is purely decorative.

## Mobile Requirements

- Site must remain scrollable and readable on mobile.
- Large hero/about/contact/clients type must not overflow horizontally.
- Bottom navigation must fit its three current items within the viewport.
- Contact form and social links must stack cleanly.
- Heavy effects should degrade acceptably under reduced motion.

## Performance Requirements

- Keep static loading model.
- Do not introduce a package manager, bundler, or framework.
- Do not modify `three.min.js` or vendor minified files casually.
- Avoid unnecessary asset path changes.
- Heavy WebGL/canvas/model modules must only initialize after their DOM targets exist.

## Non-Goals

- No framework migration.
- No bundler introduction.
- No server-side contact backend in this phase.
- No CMS.
- No full rewrite of gallery data.
- No asset renaming.

## Acceptance Criteria

- `index.html` opens locally through a static server.
- Entry key appears and enters the site.
- Hero water, liquid field, and lion model render.
- About, Services, Works, Contact, and Clients sections are reachable through their current paths; Works does not require a bottom-nav anchor.
- Works rows and side rail open Gallery.
- Gallery detail/back/close paths work.
- Chinese/English switching works.
- Contact form opens a compose target.
- WeChat QR modal opens and closes.
- Console has no site errors.
- `node tools/check-project.js` passes.
