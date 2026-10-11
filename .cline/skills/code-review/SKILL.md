---
name: code-review
description: Perform a code review between two git branches. Use when asked to review a pull request, merge request, review of a merge request, feature branch, or diff between branches. Triggers on phrases like "review my branch", "code review before merge", "review changes from feature to master", "review PR", "review MR", "review merge request.
---

# Git Code Review

Perform a thorough code review using a **three-layer context strategy**:
1. **Diff** — what exactly changed
2. **Full file content** — full context around the changes
3. **Related context** — types, tests, and barrel files linked to changed files

This gives AI a complete picture instead of just raw ±lines.

---

## 0. Warn user that this skill is in active development

Warn user that this skill is not yet stable and can produce suboptimal results.
Ask him if he acknowledge that and ok to proceed on his own risk.
If he refuses - stop execution.

---

## 1. Gather Branch Info

Ask the user (if not already provided):
- **Base branch** (target): e.g. `master`, `main`, `develop`
- **Feature branch** (source): e.g. `feature/my-feature`

If the user just says "review my branch", ask him in which release his branch should be merged. 
- For release d0 - use `origin/release/d0` as base branch
- For d1 - use `origin/release/d1` as base branch
- For d2 - use `origin/release/d2` as base branch
And use current branch (`git branch --show-current`) as a feature branch

---

## 2. Fetch & Validate

```bash
# Sync remote state
git fetch origin

# Verify both branches exist
git branch -a | grep -E "(origin/<base-branch>|origin/<feature-branch>)"

# Quick sanity check — make sure there's something to review
git diff origin/<base-branch>...origin/<feature-branch> --stat
```

If the diff is empty:
- Confirm branch names with the user
- Try without `origin/` prefix (local branches)
- Check if feature branch was already merged

If branches are local only (no `origin/`), omit `origin/` in all subsequent commands.

---

## 3. Collect Layer 1 — Diff

```bash
# Full patch diff — what changed and where
git diff origin/<base-branch>...origin/<feature-branch> > ./tmp/review_diff.patch

# Commit history for this branch
git log origin/<base-branch>..origin/<feature-branch> --oneline --no-merges > ./tmp/review_commits.txt

# Changed files with line counts
git diff origin/<base-branch>...origin/<feature-branch> --stat > ./tmp/review_stat.txt

# Just the file paths — used in next steps
git diff origin/<base-branch>...origin/<feature-branch> --name-only > ./tmp/review_files.txt
```

---

## 4. Collect Layer 2 — Full File Content

For each changed file, read its **full content from the feature branch** directly.
Do NOT read from the filesystem — always use `git show` to get the feature branch version:

```bash
# For each file in ./tmp/review_files.txt:
git show origin/<feature-branch>:<file-path>
```

Read all changed files this way. This gives full function bodies, imports, and surrounding logic — not just the ±lines from the diff.

**If there are more than 15 changed files**, prioritize:
1. Files with the most changed lines (from `--stat` output)
2. Core logic files (skip generated files, lock files, migrations, `*.snap`, `dist/`)

```bash
# Files to skip — not worth reviewing
grep -vE '\.(snap|lock|json|svg|png|jpg|ico|woff|woff2)$|^(dist|build|node_modules|\.next)/' ./tmp/review_files.txt
```

---

## 5. Collect Layer 3 — Related Context

For each changed file, automatically gather related files that provide type and usage context.
Read these from the **base branch** (to understand existing contracts before the change):

```bash
# 1. Type definitions in the same directory
git show origin/<base-branch>:<dir>/types.ts 2>/dev/null
git show origin/<base-branch>:<dir>/index.ts 2>/dev/null

# 2. Test file for the changed file
git show origin/<base-branch>:<dir>/<filename>.test.ts 2>/dev/null
git show origin/<base-branch>:<dir>/__tests__/<filename>.test.ts 2>/dev/null

# 3. For React components — find files that import this component
git grep -l "from.*<component-name>" origin/<feature-branch> -- "*.tsx" "*.ts" 2>/dev/null | head -3
```

**Prioritize related context for:**
- Shared utility functions (used in many places)
- Exported React components (check how they're consumed)
- API handlers (check corresponding types/schemas)
- Files that changed their exported interface (types, function signatures)

Skip related context for: internal helpers, test files themselves, config files.

---

## 6. Detect Stack

Scan the collected context to determine which review sections to activate:

```bash
# Detect TypeScript
grep -E '\.tsx?$' ./tmp/review_files.txt

# Detect React
git show origin/<feature-branch>:package.json 2>/dev/null | grep '"react"'

# Detect Next.js
git show origin/<feature-branch>:package.json 2>/dev/null | grep '"next"'
grep -E '(app/|pages/|next\.config)' ./tmp/review_files.txt
```

Always include **General** sections.
Include **TypeScript**, **React**, **Next.js** sections only if detected.

---

## 7. Perform Code Review

You now have three layers of context. Use all of them:
- **Diff** (`./tmp/review_diff.patch`) — to see exactly what changed
- **Full files** (from `git show`) — to understand full logic around changes
- **Related files** (types, tests, consumers) — to catch contract violations and integration issues

Produce a structured review:

---

### Summary
- What does this MR/PR do? (infer from commits + diff)
- Files changed, lines added/removed
- Detected stack: JS / TS / React / Next.js

### What looks good
- Clean and readable code
- Good naming and abstractions
- Well-scoped commits

---

### Bugs & Logic Errors
- Off-by-one errors, wrong conditions, missing null/undefined checks
- Race conditions, missing `await`, unhandled Promise rejections
- Direct mutations of state or props
- Incorrect assumptions about data shape (especially visible via full file context)

### Code Quality & Readability
- Overly complex logic that could be simplified
- DRY violations — duplicated logic across files (visible via related context)
- Misleading names, magic numbers/strings
- Dead code or commented-out blocks

### Security Concerns
- Exposed secrets or credentials
- Unvalidated or unsanitized user input
- Unsafe operations: `eval()`, `dangerouslySetInnerHTML`, `innerHTML`
- Missing authorization checks
- Sensitive data in logs or error messages

### Performance
- N+1 query patterns
- Heavy synchronous operations blocking the event loop
- Redundant network requests or missing caching
- Unbounded loops or recursion

### Testing & Edge Cases
- Missing test coverage for new logic (compare against existing test file from Layer 3)
- Tests only cover the happy path
- Unhandled edge cases: empty arrays, null/undefined, network errors
- Missing error boundaries or fallbacks

### Suggestions & Minor Nits
- Style inconsistencies
- Optional improvements
- Missing or outdated comments/docs

---

### TypeScript *(skip if no `.ts`/`.tsx` files)*

- `any` types where a proper type could be defined
- Missing return types on exported functions
- Overly broad types: `object`, `{}`, `Record<string, any>`
- Type assertions (`as T`) instead of proper type guards
- Non-null assertions (`!`) without clear justification
- `enum` used where `as const` would be safer
- Unused or redundant type imports
- Missing generics on functions that handle varying types
- `interface` vs `type` used inconsistently

**With full file context, also check:**
- Whether changed functions still satisfy the types defined in `types.ts`
- Whether new props/params break existing call sites (visible via consumer files from Layer 3)

---

### React *(skip if no React files)*

**Hooks**
- `useEffect` with missing or incorrect dependencies
- `useEffect` for derived state → use `useMemo`
- Missing `useCallback`/`useMemo` for stable references passed as props
- `useCallback`/`useMemo` overused on trivially cheap operations
- Stale closures capturing outdated outer scope values
- `useState` for values that don't trigger renders → use `useRef`
- Custom hooks not prefixed with `use`

**Components**
- Missing `key` on list items, or index used as key in dynamic lists
- Props drilling 3+ levels deep
- Components with too many responsibilities
- Inline object/array/function literals in JSX causing unnecessary re-renders
- Missing `React.memo` on stable pure components that re-render often

**State & Side Effects**
- Direct state mutations
- Redundant state that should be derived
- Async in `useEffect` without cleanup/cancellation
- Missing loading/error states for async operations
- Event listeners without cleanup in `useEffect` return

**Accessibility**
- Interactive elements missing `aria-*` or keyboard handlers
- Images missing `alt`
- Form inputs missing `<label>`

**With full file context, also check:**
- Whether new props are consistent with how the component is used in parent files (Layer 3)
- Whether hook dependencies reflect all values actually used inside the effect body

---

### Next.js *(skip if no Next.js files)*

**App Router** *(if `app/` directory present)*
- `"use client"` on components that don't need it (bloats client bundle)
- Missing `"use client"` on components using hooks or browser APIs
- Server Components not handling errors via `error.tsx` or try/catch
- `useSearchParams`, `useRouter`, `usePathname` without `Suspense` boundary
- `fetch()` in Server Components missing `cache` or `revalidate`
- Sensitive logic or env secrets leaking into Client Components

**Pages Router** *(if `pages/` directory present)*
- `getServerSideProps` where `getStaticProps` + ISR would suffice
- Missing `revalidate` in `getStaticProps`
- Data fetching inside components instead of data-fetching functions

**Routing & Navigation**
- `<a>` tags for internal links instead of `<Link>`
- `router.push()` for navigations that should be `<Link>` (loses prefetching)
- Dynamic routes missing `generateStaticParams` / `getStaticPaths`

**Performance**
- Images not using `next/image`
- Fonts not using `next/font`
- Heavy scripts not using `next/script` with `strategy`
- Missing `loading.tsx` for slow routes
- Heavy libraries imported in Client Components that should stay server-side

**API Routes**
- Missing input validation
- Incorrect or missing HTTP status codes
- Internal data accidentally exposed in responses
- No auth checks on sensitive endpoints

---

## 8. Output Format

Present the review as clean markdown in a new file - ./tmp/review_result.md.

For each issue:
- **File and line** (e.g. `src/components/Button.tsx:42`)
- **Severity**: 🔴 Critical / 🟡 Warning / 🔵 Suggestion
- **What the problem is**
- **Recommended fix** with a short code snippet if helpful

If an issue was only visible because of full file or related file context (not in the diff itself), mark it:
> 💡 *Spotted via full file context — not visible in the diff alone*

---

## 9. Cleanup

```bash
rm ./tmp/review_diff.patch ./tmp/review_commits.txt ./tmp/review_stat.txt ./tmp/review_files.txt
```

---

## Tips

- **Large diffs (1000+ lines):** prioritize files with most changes from `--stat`; skip generated/lock files
- **Diverged branches:** if the branch is far behind base, suggest rebasing first — stale base causes false positives in related context
- **No origin:** for fully local branches, drop all `origin/` prefixes throughout
