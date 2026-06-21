# Hero

## Purpose

Hero is the main visual stage after entry. It combines a dark CRT AIGC video broadcast, a layered English word-chip lockup using SkyHeart Clear Serif and Major Mono Display, and the Hero-to-About handoff.

## Owned Files

- `index.html`
- `styles/home.css`
- `styles/entry-hero-experience.css`
- `scripts/entry-hero-experience.js`
- `scripts/hero-tv-controls.js`
- `images/works/aigc-video/莉栗说新年篇.mp4`

## DOM Contracts

- `#hero-stage`
- `#hero-broadcast-scene`
- `#hero-tv-video`
- `#hero-tv-sound-toggle`
- `#hero-tv-replay-toggle`

## Runtime Contracts

- produces `lucian:hero-about-handoff`
- `entry-hero-experience.js` owns the black-curtain cover, primes About while covered, keeps a short `hero-about-handoff-releasing` hold, then releases after the About scroll target has settled.

## Change Checklist

- Keep the Hero video local, initially muted for autoplay, looping, and playable without external services. The TV sound knob may unmute it only after a user click.
- Check reduced-motion behavior for animated surfaces.
- If Hero scroll math changes, check About landing and curtain timing.
- If pointer behavior changes, verify CRT video controls still receive interaction.

## QA

- CRT video loads and plays inside the screen.
- TV sound knob toggles the video track after user interaction; replay knob restarts the broadcast.
- Hero-to-About transition covers, lands, and releases scroll.
- During Hero-to-About release, About stays aligned instead of flashing a partial intermediate position.
