---
name: Multi-action form submit intent
description: Keep intent reliable when several submit buttons share a React form handler.
---

When multiple submit buttons share one form submit handler, do not rely on an asynchronously updated React state value set by each button's `onClick` to distinguish the action. Use a synchronous ref or the form submitter identity.

**Why:** React state updates may not be visible to the submit handler in the same event, causing one button to accidentally reuse a previous action.

**How to apply:** For profile forms that offer both save-only and analyze/continue actions, set the intent synchronously before submit and verify each button keeps its distinct navigation behavior.
