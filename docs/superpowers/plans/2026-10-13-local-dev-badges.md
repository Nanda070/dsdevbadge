# Local Dev Badges Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a Vencord userplugin that locally toggles Discord Staff, Early Verified Bot Developer, and Active Developer badges on the current user’s profile only, in a private GitHub repo that builds cleanly.

**Architecture:** Single `localDevBadges/index.tsx` plugin using Vencord `BadgeAPI.addProfileBadge` + settings toggles; badges only `shouldShow` when `userId === UserStore.getCurrentUser()?.id` and the matching setting is on. Official Discord CDN badge icons.

**Tech Stack:** TypeScript, Vencord userplugin APIs (`definePlugin`, `definePluginSettings`, `addProfileBadge`), GitHub (`gh`), pnpm Vencord build.

## Global Constraints

- Author: Nandak070 / Discord ID `1219803151180370021n` / GitHub `Nanda070`
- Badges visible only locally on the current user’s profile
- Three badges only: Discord Staff, Early Verified Bot Developer, Active Developer
- Private GitHub repository; README + install guide required
- Must verify `pnpm build` succeeds with plugin in `src/userplugins`

---

### Task 1: Plugin source

**Files:**
- Create: `localDevBadges/index.tsx`

**Interfaces:**
- Produces: default export `definePlugin({ name: "LocalDevBadges", ... })`

- [ ] **Step 1: Create plugin**

Write `localDevBadges/index.tsx` with settings + `addProfileBadge` / `removeProfileBadge` on start/stop, CDN icons:

- Staff: `https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png`
- Early Verified Bot Developer: `https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png`
- Active Developer: `https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png`

- [ ] **Step 2: Commit**

```bash
git add localDevBadges/index.tsx
git commit -m "Add LocalDevBadges Vencord userplugin"
```

### Task 2: README + install guide

**Files:**
- Create: `README.md`
- Create: `INSTALL.md`

- [ ] **Step 1: Write docs** (RU install steps for clone Vencord → `src/userplugins/localDevBadges` → `pnpm build` → inject → enable plugin)
- [ ] **Step 2: Commit**

### Task 3: Private GitHub repo + push

- [ ] **Step 1:** `gh repo create Nanda070/dsdevbadge --private --source=. --remote=origin --push`
- [ ] **Step 2:** Verify remote URL is private

### Task 4: Verify Vencord build

- [ ] **Step 1:** Clone Vencord, install deps, copy plugin into `src/userplugins/localDevBadges`
- [ ] **Step 2:** `pnpm build` — expect success
- [ ] **Step 3:** Note build result in final report
