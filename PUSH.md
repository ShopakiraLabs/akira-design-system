# Pushing this repo to GitHub for the first time

This repo has been initialized locally and `Initial commit` (`68aca2c`) has
landed. It just needs a remote and a `git push`. The Cowork sandbox can't
authenticate with GitHub — these steps must run from your own terminal.

## 1. Clear the stale lock file

The sandbox left a 0-byte `.git/index.lock` behind that it wasn't able to
delete. Get rid of it before any local git command:

```bash
cd /AKIRA/Repos/akira-design-system
rm -f .git/index.lock
```

Verify your local git is happy and pick up the untracked / modified
files as a second commit (the sandbox couldn't include them in the
initial commit because of the same lock issue):

```bash
git status              # should show PUSH.md, docs/bolt-agent-instructions.md, and modified docs/prompting-bolt.md
git log --oneline -1    # should show the Initial commit (68aca2c)
git add -A
git commit -m "Add PUSH.md, bolt agent instructions, and rewrite retrofit prompt"
```

## 2. Create the empty repo on GitHub

Go to https://github.com/organizations/ShopakiraLabs/repositories/new and
create a repo named **`akira-design-system`**. Settings:

- Visibility: **Public** (so bolt.new can read it without auth)
- Description: `AKIRA Design System — shared React components, tokens, and layout for AKIRA internal apps.`
- **Do NOT** initialize with a README, .gitignore, or license — this repo
  already has all three.

## 3. Add the remote and push

From your terminal:

```bash
cd /AKIRA/Repos/akira-design-system
git remote add origin https://github.com/ShopakiraLabs/akira-design-system.git
git branch -M main      # ensure branch is named "main"
git push -u origin main
```

If your shell still has the saved git credentials for ShopakiraLabs, that's
it. Otherwise GitHub will prompt for auth — use a Personal Access Token
with `repo` scope, **not** your password.

## 4. Sanity-check it landed

```bash
open https://github.com/ShopakiraLabs/akira-design-system
```

You should see README, llms.txt, src/, docs/, examples/.

## 5. Use it from bolt.new

In any new bolt.new project, paste this prompt as the first message:

> Install `akira-design-system` from GitHub and apply it.
>
> Run: `npm install github:ShopakiraLabs/akira-design-system`
>
> Then read these files inside the installed package and follow them strictly:
> - `node_modules/@akira/design-system/README.md`
> - `node_modules/@akira/design-system/llms.txt`
> - `node_modules/@akira/design-system/docs/layout.md`
> - `node_modules/@akira/design-system/docs/prompting-bolt.md`
>
> Use the components and tokens from the design system instead of inventing
> new ones. Do not introduce a new color palette, font, or layout pattern.

To redesign an **existing** bolt.new app to use the system, see
`docs/prompting-bolt.md` — the "Redesign with AKIRA" section has a longer
prompt with explicit rules.
