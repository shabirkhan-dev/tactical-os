# @school-os/ui

Shared web UI primitives for the school-os monorepo.

This package is intentionally small. It contains stable shadcn-style primitives that are safe to
reuse across web apps. Keep complex, product-specific composed components inside each app until they
prove reusable.

## Usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@school-os/ui";
```

The consuming app must include the shared Tailwind token file and scan this package for classes:

```css
@import "../../../../packages/tailwind-config/theme.css";
@source "../../../../packages/ui/src";
```

## Migration Rule

Move components into this package only when:

- the component is a primitive or clearly reusable pattern,
- it does not depend on app routing, auth, data fetching, or app-local state,
- it uses shared tokens instead of one-off colors,
- it has loading/disabled/focus/error states where relevant.
