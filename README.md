View the static page deployed [here](https://bnstimer.pages.dev/).

# Basic timer for Field Boss respawns in Blade & Soul NEO.

### Features: 
- Add Channel
- Channel Number selection drop-down
- Start Timer buttons
  - Normal (5 minutes): On normal boss death
  - Lightning (2 minutes): On lightning storm appearance - leadup to mutant spawn
  - Mutant (8 minutes): On mutant boss death
- Order channel list from least to greatest channel number
- Order channel list by the lowest remaining time
- Delete channels not in use (X)
- Mute timers pinging on reaching 0:00
- Disable pulsing glow animations (used for channels with timers that hit 0:00 or lightning channels)

When tracking many channels that might respawn close together, it's easy to lose track of which ones actually just spawned. For this reason, timers go negative to make it clearer which timers finished more recently.

### Tools:
- HTML
- CSS
- JS
- Cloudflare Pages
