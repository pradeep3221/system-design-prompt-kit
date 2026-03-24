---
overlay: "vue"
extends: "frontend-spa-design"
version: "1.0.0"
---

# Vue Overlay: SPA Design

> Vue 3 and Nuxt-specific patterns for single-page application architecture.

## Extends
- **Base prompt:** `frontend-spa-design` — [SPA Design](../../prompts/12-frontend-architecture/01-spa-design.md)

## Technology-Specific Guidance

### Recommended Libraries & Tools
| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| Framework | Vue | 3.4+ | Composition API, `<script setup>` |
| Meta-framework | Nuxt | 3.x | File-based routing, SSR/SSG, auto-imports |
| State | Pinia | 2+ | Official store, devtools support |
| HTTP | ofetch (Nuxt) / Axios | — | `useFetch` composable in Nuxt |
| Forms | VeeValidate + Zod | — | Schema-based validation |
| Routing | Vue Router / Nuxt file routing | — | Type-safe routes with unplugin-vue-router |
| UI | Radix Vue / PrimeVue | — | Headless or full component library |
| Testing | Vitest + Vue Testing Library | — | Component + unit testing |

### Architecture Decisions

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| Component style | `<script setup>` + Composition API | Concise, better TypeScript, tree-shakable |
| State management | Pinia | Simple API, SSR-safe, devtools |
| Rendering | Nuxt with hybrid rendering | Per-route SSR/SSG/SPA mode |
| API layer | Composables wrapping `useFetch` | Reactive, cached, SSR-safe |
| Type safety | TypeScript strict mode | End-to-end type safety |

### Implementation Patterns

#### Project Structure (Nuxt 3)
```
app/
├── components/                    # Auto-imported components
│   ├── ui/                        # Design system primitives
│   │   ├── Button.vue
│   │   └── Card.vue
│   └── products/
│       ├── ProductCard.vue
│       └── ProductFilters.vue
├── composables/                   # Auto-imported composables
│   ├── useProducts.ts
│   └── useAuth.ts
├── layouts/
│   ├── default.vue
│   └── dashboard.vue
├── pages/
│   ├── index.vue
│   ├── products/
│   │   ├── index.vue              # /products — list
│   │   └── [id].vue               # /products/:id — detail
│   └── login.vue
├── stores/                        # Pinia stores
│   ├── auth.ts
│   └── ui.ts
├── server/                        # Server API routes (Nitro)
│   └── api/
│       └── products/
│           └── index.get.ts
├── types/
│   └── product.ts
└── nuxt.config.ts
```

#### Composable (Data Fetching)
```typescript
// composables/useProducts.ts
export function useProducts(filters: MaybeRef<ProductFilters>) {
  return useFetch('/api/products', {
    query: filters,
    transform: (data) => ({
      items: data.items as Product[],
      total: data.total as number,
    }),
  });
}

// Usage in component — auto-imported
const filters = reactive<ProductFilters>({ page: 1, category: null });
const { data, pending, error, refresh } = useProducts(filters);
```

#### Pinia Store
```typescript
// stores/ui.ts
export const useUIStore = defineStore('ui', () => {
  const sidebarOpen = ref(true);
  const toggleSidebar = () => { sidebarOpen.value = !sidebarOpen.value; };

  return { sidebarOpen, toggleSidebar };
});
```

#### Component (`<script setup>`)
```vue
<!-- components/products/ProductCard.vue -->
<script setup lang="ts">
interface Props {
  product: Product;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [id: string];
}>();
</script>

<template>
  <div class="product-card" @click="emit('select', product.id)">
    <h3>{{ product.name }}</h3>
    <p>{{ formatCurrency(product.price) }}</p>
  </div>
</template>
```

#### Page with SSR Data
```vue
<!-- pages/products/[id].vue -->
<script setup lang="ts">
const route = useRoute();
const { data: product, error } = await useFetch(`/api/products/${route.params.id}`);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' });
}

useHead({ title: product.value?.name });
</script>

<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
  </div>
</template>
```

### Testing
```typescript
import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import ProductCard from '~/components/products/ProductCard.vue';

describe('ProductCard', () => {
  it('renders product details', async () => {
    await renderSuspended(ProductCard, {
      props: { product: mockProduct },
    });
    expect(screen.getByText('Widget Pro')).toBeInTheDocument();
  });
});
```

### Common Pitfalls
- **Options API in Vue 3:** Prefer Composition API with `<script setup>` for better TypeScript and tree-shaking.
- **Reactivity loss:** Don't destructure reactive objects; use `toRefs()` or access via `.value`.
- **SSR hydration mismatches:** Ensure client-only code is wrapped in `<ClientOnly>` or `onMounted`.
- **Auto-imports confusion:** Components and composables are auto-imported in Nuxt — don't add manual imports.
