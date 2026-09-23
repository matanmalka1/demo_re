# Facts Repository redesign handoff

Copy this folder into the existing `demo_re` working repository or give the archive to the implementing agent.

Start with `FACTS_PAGE_REDESIGN_PROMPT.md`.

## Important

`demo_re` already contains the redesigned home screen. Preserve it.

The files under `source-reference/` are the original Facts Repository implementation and its directly relevant supporting code. They are reference material, not a directory tree that should blindly overwrite `demo_re/src`.

The reduced repository uses a different standalone architecture for its home screen. In particular, its contracts and data adapter differ from the production frontend. The implementing agent should:

1. Study the reference Facts Repository behavior and states.
2. Implement `/facts` using the existing `demo_re` conventions and visual language.
3. Add only the fact contracts and data behavior required by the page.
4. Register `/facts` in the existing router and navigation.
5. Preserve the redesigned home screen.

Do not replace `demo_re/src/api/contracts.ts`, `demo_re/src/styles.css`, or shared UI components wholesale with the reference versions. Merge only what the Facts Repository requires.

## Included

- The implementation prompt.
- The complete original `features/facts` source tree.
- Fact and maintenance API reference code.
- Contract and request-client reference code.
- Shared UI primitives used by the original page.
- Form-hook reference code.
- Design-system and global-style references.

## Excluded

- Backend code.
- OpenAPI files.
- Specifications and architecture documentation.
- Tests and E2E files.
- Other product screens and features.
- Dependencies and build output.
