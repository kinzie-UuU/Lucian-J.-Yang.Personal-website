# Module Playbooks

These files are the detailed, update-as-you-build notes for each feature system. `../MODULES.md` remains the compact ownership map; these playbooks explain how to change each system without breaking its neighbors.

## Playbooks

- `core-runtime.md`: app bootstrap, runtime bridge, script order, core state.
- `entry.md`: entry screen, 3D key, progress, enter/replay.
- `hero.md`: Hero water, liquid field, lion model, ripples, Hero-to-About handoff.
- `about-portrait.md`: portrait video scrub, About reveal, About-to-Services bridge.
- `services.md`: Services title gate, PrismaticBurst, time tunnel, service sequence.
- `works-gallery.md`: Works rows, hover preview, side rail, gallery overlay/detail.
- `scroll-curtains.md`: Works-to-Contact GSAP/MorphSVG curtain.
- `navigation-header.md`: top controls, bottom nav, clock, cursor.
- `language-text-effects.md`: i18n, static text, flip/scramble/reveal/scroll type.
- `clients.md`: client marquee and title interaction.
- `contact.md`: Gmail compose, social links, WeChat QR modal, toast.

## Update Rule

When a feature changes, update three places if relevant:

- `../ARCHITECTURE.md` for system-level structure.
- `../MODULES.md` for ownership/contracts/QA summary.
- the matching playbook in this folder for implementation details.
