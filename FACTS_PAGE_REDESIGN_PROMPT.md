# Facts Repository Redesign

## Assignment

Redesign and implement the application's Facts Repository page from the ground up.

This is an implementation task, not a request for a plan or a visual description. Work in the existing React application and return completed code.

## Working repository

The current repository is already the prepared design workspace and already contains the redesigned home screen. Work directly in the current repository.

Do not clone another repository, create a separate demo, replace the existing application, or reconstruct it from scratch. Extend the current application with the Facts Repository while preserving the existing home screen and visual language.

Do not push changes, open a pull request, or modify repository settings unless the user explicitly asks you to do so.

## Product context

The product is a personal CV-tailoring and job-application dashboard for one user.

The Facts Repository is the `/facts` route. It contains the candidate facts used by the CV workflow. A fact may progress through lifecycle states, be attached to relevant tracks or profiles, and have an event history.

The interface is primarily Hebrew and must support RTL correctly. Fact content, source names, tags, provenance, job titles, and other user-provided values may be in Hebrew or English and must render with appropriate text direction.

Facts are sensitive source information. The redesign may change presentation and interaction design, but it must not change the meaning, lifecycle, identity, provenance, or API representation of a fact.

## Start here

Before editing, inspect:

- `src/app/router.tsx`
- `src/styles.css`
- `src/features/facts/pages/FactsPage.tsx`
- The complete `src/features/facts/` directory
- The shared components used by the screen under `src/ui/`
- `src/hooks/useAppForm.ts`
- `src/api/facts.ts`
- `src/api/maintenance.ts`
- The relevant fact and reconciliation types in `src/api/contracts.ts`
- The preparation labels consumed by fact attachments
- The repository's design-system documentation, if it exists

Trace the entire component tree and understand every state, mutation, lifecycle restriction, URL behavior, and accessibility behavior before changing the composition.

The Facts Repository files may be newly supplied additions to this reduced design repository. Integrate them into the existing application structure. If a referenced dependency is genuinely missing, report the exact missing path instead of inventing a different contract or replacement application.

## Design objective

Create a polished, modern, highly usable facts-management workspace with a clear hierarchy and strong information density.

The page should make these questions easy to answer:

1. What facts exist and how can the user find one quickly?
2. What is the status, source, scope, and content of the selected fact?
3. What action is currently allowed for that fact?
4. Is the facts store healthy and synchronized?
5. What changed during the fact's lifecycle?

You may substantially change:

- Page composition and visual hierarchy.
- The relationship between the fact pool and selected-fact detail.
- Layout and responsive behavior.
- Filters, result counts, and list presentation.
- The presentation of fact status, source, tags, scope, and provenance.
- The organization of lifecycle actions and event history.
- Empty, loading, error, and integrity-state presentation.
- Dialog composition and form presentation.

The result should feel like a complete redesign, not a cosmetic reskin. It should remain calm and scannable with a large fact collection while giving the selected fact enough space for careful review.

Design mobile, tablet, and desktop layouts intentionally. A two-column desktop workspace may become a deliberate drill-in or stacked experience on smaller screens, but selection and URL behavior must remain intact.

## Required behavior

Preserve every existing capability of the Facts Repository:

- Loading states for the fact pool and selected-fact detail.
- Pool and detail error states.
- The empty-repository state.
- Creating a new pending fact.
- Automatically selecting a newly created fact.
- Selecting a fact from the pool.
- Keeping the selected fact in the `fact` URL query parameter.
- Defaulting to the first available fact when no fact is specified.
- Text and metadata filtering.
- Filtering by status, source, and tags where currently supported.
- Visible and total result counts.
- Clearing filters when no results match.
- Fact status presentation.
- Fact content, source, style, tags, provenance, and other existing metadata.
- Fact lifecycle event history.
- Confirming and promoting facts through the existing permitted lifecycle.
- Creating a replacement fact instead of editing a canonical fact in place.
- Attaching facts to the existing allowed targets.
- Deleting facts only when the existing rules allow it.
- Running the existing facts-integrity check.
- Displaying integrity results and reconciliation failures.
- Blocking fact mutations when the facts store is out of sync.
- Hiding or disabling mutation entry points while mutations are blocked.
- Existing mutation confirmations, pending states, success behavior, and error feedback.
- Existing browser back and forward behavior.

Do not remove a behavior because it does not fit the new layout. Find an appropriate place for it in the redesigned interface.

## Fact-safety boundaries

- Do not invent, strengthen, merge, rewrite, or reinterpret candidate facts.
- Do not alter fact identifiers, statuses, sources, provenance, tags, attachments, or event history semantics.
- Preserve the existing lifecycle and permitted transitions.
- A canonical fact must continue to be corrected through a replacement fact, never edited in place.
- Preserve the distinction between pending, confirmed, canonical, deleted, and any other statuses represented by the existing contracts.
- Preserve integrity blocking: when the store is out of sync, actions currently blocked must remain blocked.
- Do not turn a missing value into an inferred value.
- Presentation labels may be improved, but they must not imply a stronger or different fact state.

## Functional boundaries

- This is a frontend redesign only.
- Do not change API contracts or endpoint paths.
- Do not change backend behavior, fact lifecycle rules, attachment rules, integrity rules, or stored-data meanings.
- Treat the existing files under `src/api/` as authoritative.
- Preserve the existing query and mutation flow. Do not create a second state model for server data.
- Do not add mock facts to production code.
- Do not edit generated files.
- Preserve the existing redesigned home screen and do not redesign unrelated screens.
- Change shared components only when necessary for this page, and keep them compatible with their other consumers.
- Avoid adding dependencies. Add one only if essential and the same result cannot reasonably be achieved with the existing stack.

## Accessibility and interaction requirements

- Preserve semantic HTML.
- Use real buttons, links, form controls, headings, lists, and dialogs where appropriate.
- Preserve keyboard operation and visible focus states.
- Preserve dialog focus management and dismissal behavior.
- Preserve loading announcements and live-region feedback.
- Clearly communicate the selected fact to assistive technology.
- Maintain useful accessible names for icon-only controls.
- Do not communicate lifecycle or integrity state through color alone.
- Maintain readable contrast.
- Prevent long fact content, tags, IDs, URLs, and provenance values from breaking the layout.
- Preserve correct directionality for mixed Hebrew and English content.
- Respect reduced-motion preferences if motion is introduced.

## Visual-system guidance

- Reuse the existing design tokens and UI primitives where they support the new design.
- Keep styling consistent with the rest of the application without being constrained by the current page composition.
- Make fact identity, lifecycle status, content, provenance, and available actions visually distinct.
- Separate routine browsing controls from high-consequence lifecycle actions.
- Give integrity failures appropriate prominence without overwhelming the normal healthy state.
- Keep dense metadata scannable and avoid hiding frequently needed information behind unnecessary clicks.
- Make destructive and irreversible-looking actions visually clear, even when the underlying operation is permitted by the existing rules.

## Working expectations

- Inspect the existing implementation before editing.
- Keep the diff focused on the Facts Repository and the smallest necessary shared surface.
- Preserve existing contracts and mutations unless restructuring frontend composition is necessary for the redesign.
- Check the design conceptually with an empty repository, one fact, many facts, no filter matches, a missing selected fact, loading and error states, and an out-of-sync repository.
- Do not stop after producing a plan, wireframe, or mockup. Implement the redesign in code.
- Do not run tests. Instead, provide the user with focused verification commands to run.

## Completion report

When implementation is complete, return:

1. A concise description of the new visual and interaction model.
2. A complete list of changed files and why each changed.
3. Any assumptions, compromises, or remaining limitations.
4. Focused verification commands for the user to run.

Do not claim that checks passed unless they were actually run by the user and their results were provided to you.
