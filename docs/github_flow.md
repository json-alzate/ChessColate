# 📌 GitHub Flow Conventions

This document defines the conventions for **branch names** and **commit messages** in this repository, following the **GitHub Flow** workflow.

---

## 🏷️ Branch Naming Conventions

Each branch should follow a clear structure to facilitate identification. We use **prefixes** according to the branch's purpose:

| **Prefix**  | **Description** | **Example** |
|-------------|---------------|-------------|
| `feature/`  | New feature | `feature/login-page` |
| `bugfix/`   | Bug fix | `bugfix/fix-login-button` |
| `hotfix/`   | Urgent fix in production | `hotfix/critical-bug` |
| `refactor/` | Code improvement without changing functionality | `refactor/improve-auth` |
| `docs/`     | Documentation updates | `docs/update-readme` |
| `test/`     | Tests and test improvements | `test/add-auth-tests` |

📢 **Example:** If adding a new authentication system, the branch would be named:
```bash
feature/authentication-system
```

---

## ✍️ Commit Message Conventions

Each commit should follow a structured format, using an **emoji** to indicate its purpose:

```
<Emoji> <Type>: <Brief description>

<Optional explanation>
```

### 📢 Commit Types and Emojis

| **Emoji**  | **Type**  | **Purpose**  | **Example**  |
|-----------|---------|-------------|-------------|
| ✨ | `feat` | New feature | `✨ feat: add registration screen` |
| 🚧 | `wip` | Work in progress | `🚧 wip: on data` |
| 🐛 | `fix` | Bug fix | `🐛 fix: resolve email validation error` |
| 🚀 | `perf` | Performance improvement | `🚀 perf: optimize image loading` |
| ♻️ | `refactor` | Code improvement without changing functionality | `♻️ refactor: simplify authentication logic` |
| 📝 | `docs` | Documentation updates | `📘 docs: update installation instructions` |
| ✅ | `test` | Add or modify tests | `✅ test: add unit tests for login` |
| 🔧 | `chore` | Maintenance and configuration | `🔧 chore: update dependencies` |
| ➕ | `add` | Add new dependencies | `➕ add: add lodash` |
| 🏗️ | `architecture` | Architectural changes | `architecture: refactor architecture` |
| 🍱 | `assets` | Add or update assets | `🍱 assets: update logo` |

📢 **Example commits:**
```bash
git commit -m "✨ feat: add password recovery functionality"
git commit -m "🐛 fix: fix contact form error"
git commit -m "♻️ refactor: improve code structure in auth module"
```

---

## 🔧 Suggested Tools

https://gitmoji.dev/

---

## 🚀 Benefits of These Conventions
✅ Facilitates team collaboration.
✅ Provides a clearer change history.
✅ Improves integration with CI/CD tools and `CHANGELOG.md` generation.
✅ Allows for quick identification of the purpose of each change.

---

📌 **Note:** These conventions can be adapted based on the team's needs. Let's follow them to maintain clean and organized code! 🚀