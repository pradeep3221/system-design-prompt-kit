---
overlay: "react"
extends: "frontend-spa-design"
version: "1.0.0"
---

# React Overlay: SPA Design

> React and Next.js-specific patterns for single-page application architecture.

## Extends
- **Base prompt:** `frontend-spa-design` — [SPA Design](../../prompts/12-frontend-architecture/01-spa-design.md)

## Technology-Specific Guidance

### Recommended Libraries & Tools
| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| Framework | React | 18+ | Concurrent features, Server Components |
| Meta-framework | Next.js | 14+ | App Router, RSC, SSR/SSG |
| State (client) | Zustand or Jotai | — | Lightweight, hooks-based |
| State (server) | TanStack Query | 5+ | Cache, retry, optimistic updates |
| Routing | Next.js App Router / React Router | — | File-based or declarative |
| Forms | React Hook Form + Zod | — | Type-safe validation |
| Styling | Tailwind CSS / CSS Modules | — | Utility-first or scoped |
| Testing | Vitest + Testing Library | — | Component + integration |

### Architecture Decisions

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| Rendering | Next.js App Router (RSC) | SEO, performance, streaming |
| State management | TanStack Query + Zustand | Server cache separate from UI state |
| Component pattern | Compound Components | Flexible, testable composition |
| Error boundaries | Per-route boundaries | Graceful degradation |
| Bundle splitting | Route-based + lazy() | Minimize initial load |

### Implementation Patterns

#### App Structure (Next.js App Router)
```
app/
├── layout.tsx                # Root layout with providers
├── error.tsx                 # Global error boundary
├── loading.tsx               # Global suspense fallback
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── layout.tsx            # Dashboard layout with sidebar
│   ├── page.tsx              # Dashboard home
│   └── products/
│       ├── page.tsx          # Product list (Server Component)
│       ├── [id]/page.tsx     # Product detail
│       └── _components/      # Route-scoped client components
│           ├── ProductCard.tsx
│           └── ProductFilters.tsx
src/
├── components/               # Shared UI components
│   ├── ui/                   # Design system primitives
│   └── forms/
├── hooks/                    # Shared custom hooks
├── lib/                      # Utilities, API client
├── stores/                   # Zustand stores
└── types/                    # Shared TypeScript types
```

#### Server Component + Client Component Split
```tsx
// app/products/page.tsx — Server Component (default)
import { ProductFilters } from './_components/ProductFilters';
import { ProductList } from './_components/ProductList';

export default async function ProductsPage() {
  const categories = await getCategories(); // Direct DB/API call
  return (
    <div>
      <ProductFilters categories={categories} />
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}

// _components/ProductFilters.tsx — Client Component
'use client';
import { useQueryState } from 'nuqs';

export function ProductFilters({ categories }: Props) {
  const [category, setCategory] = useQueryState('category');
  // Interactive filter UI...
}
```

#### TanStack Query + Zustand Pattern
```tsx
// hooks/useProducts.ts — Server state via TanStack Query
export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => api.products.list(filters),
    staleTime: 5 * 60 * 1000,
  });
}

// stores/uiStore.ts — Client-only UI state via Zustand
export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
```

### Testing
```tsx
// __tests__/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Widget Pro')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });
});
```

### Common Pitfalls
- **'use client' everywhere:** Only add `'use client'` to components that need interactivity; keep data-fetching in Server Components.
- **Prop drilling:** Use composition (children prop) before reaching for context or state libraries.
- **useEffect for data fetching:** Prefer TanStack Query or Server Components over raw `useEffect` + `useState`.
- **Large client bundles:** Move heavy logic to Server Components or API routes; use `next/dynamic` for lazy loading.
