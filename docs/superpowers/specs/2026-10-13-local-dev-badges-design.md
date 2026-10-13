# Local Dev Badges — Design

Date: 2026-10-13  
Author: Nandak070 (`nanda070`)  
Discord ID (reference): `1219803151180370021`

## Goal

Vencord **userplugin** that lets the local user toggle three official-looking profile badges on **their own** profile, visible only in their client:

1. Discord Staff  
2. Early Verified Bot Developer  
3. Active Developer  

No server sync. If friend enables the same plugin on their machine, they see badges on their profile; you do not see theirs, and they do not see yours.

## Non-goals

- Granting real Discord badges or changing account flags on Discord’s servers  
- Showing spoofed badges on other users’ profiles  
- Full badge catalog / custom image badges  
- Distribution via the official Vencord plugin list (source build / userplugins only)

## Approach

Narrow self-badges plugin (option A): three settings toggles + patch of the client badge list for `UserStore.getCurrentUser()` only.

## Architecture

```
localDevBadges/
  index.tsx          # definePlugin, settings, badge patch
```

### Settings

| Setting | Type | Default | Effect |
|---------|------|---------|--------|
| `discordStaff` | boolean | false | Add Staff badge locally |
| `earlyVerifiedBotDeveloper` | boolean | false | Add Early Verified Bot Developer badge locally |
| `activeDeveloper` | boolean | false | Add Active Developer badge locally |

Persisted via Vencord `definePlugin` settings (standard plugin settings store).

### Badge rendering

- Inject into Discord’s profile badge pipeline (same hook used by other Vencord badge plugins: typically `getBadges` / profile badges accessor).
- Only when `user.id === UserStore.getCurrentUser()?.id`.
- Use Discord CDN badge icon URLs and tooltip strings that match official badges so they look original.
- Do not duplicate a badge the user already has from Discord.

### Badge assets (original look)

Use Discord’s official badge icon assets / descriptions:

| Badge | Visual | Notes |
|-------|--------|-------|
| Discord Staff | Hammer & chisel (blurple) | Official Staff badge art |
| Early Verified Bot Developer | `</>` style mark | Official Early Verified Bot Developer art |
| Active Developer | Hexagon with `</>` | Official Active Developer art (badge retired server-side; still showable client-side) |

Exact CDN paths / flag bits resolved against current Discord/Vencord badge constants during implementation.

## Repository & delivery

- Private GitHub repo under `Nanda070` (account already authenticated via `gh`).
- Contents: plugin source, README (RU/EN as needed), installation guide for Vencord userplugins.
- `git init`, commit, push to private remote.
- Verify build: clone/build Vencord with plugin under `src/userplugins/`, run `pnpm build` (or project-standard build) and confirm success.

## Error handling

- If current user is unavailable (logged out / store not ready): skip patch, no crash.
- If badge API shape changes: plugin fails soft (no badges / console warn), Discord remains usable.

## Testing / verification

1. Plugin appears in Vencord → Plugins and enables without errors.  
2. Toggle each badge on → appears on own profile with correct icon + tooltip.  
3. Toggle off → badge removed.  
4. Other users’ profiles unchanged.  
5. Vencord production/dev build completes with the userplugin present.

## Success criteria

- Builds cleanly as a Vencord userplugin.  
- Three toggles work locally on the current user’s profile only.  
- Badges visually match Discord originals.  
- Private repo pushed with README + install guide.
