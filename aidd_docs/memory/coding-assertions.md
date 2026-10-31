# Coding Assertions

The checks that must pass for code to count as done. Minimal, run after every change.

## Before commit

| Order | Command | Checks |
| ----- | ------- | ------ |
| 1 | `npx astro check` | type checking |

## Before push

| Order | Command | Checks |
| ----- | ------- | ------ |
| 1 | `npm run build` | production build passes |
| 2 | `npm run preview` | built site serves correctly |

## Behavior

I fix is needed, spawn 1 agent per assertion to fix (e.g typechecking / tests / rules violated on category UI = 3 agents).
