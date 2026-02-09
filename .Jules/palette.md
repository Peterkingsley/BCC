## 2026-02-09 - [Accessibility Pattern: Interactive Divs]
**Learning:** Several interactive elements (logo, payment methods, packaging options) were implemented as `div`s with `onClick`, making them inaccessible to keyboard users and screen readers.
**Action:** Always check for `onClick` on non-interactive elements and convert them to semantic `button` or `a` tags. Ensure icon-only buttons have descriptive `aria-label`s.
