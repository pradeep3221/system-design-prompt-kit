---
overlay: "angular"
extends: "frontend-spa-design"
version: "1.0.0"
---

# Angular Overlay: SPA Design

> Angular-specific patterns for single-page application architecture.

## Extends
- **Base prompt:** `frontend-spa-design` — [SPA Design](../../prompts/12-frontend-architecture/01-spa-design.md)

## Technology-Specific Guidance

### Recommended Libraries & Tools
| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| Framework | Angular | 17+ | Signals, standalone components |
| State | NgRx SignalStore | 17+ | Signal-based, lightweight |
| Alternative State | NgRx Store | 17+ | Redux-style for complex state |
| HTTP | HttpClient + interceptors | Built-in | Typed API calls |
| Forms | Reactive Forms + typed | Built-in | `FormControl<string>` |
| Routing | Angular Router | Built-in | Lazy-loaded routes |
| UI | Angular Material / PrimeNG | — | Component library |
| Testing | Jest + Angular Testing Library | — | Faster than Karma |

### Architecture Decisions

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| Components | Standalone (no NgModules) | Simpler, tree-shakable |
| Change detection | OnPush + Signals | Performance |
| State management | NgRx SignalStore | Signal-native, less boilerplate |
| Lazy loading | Route-level lazy imports | Minimal initial bundle |
| API layer | Typed HttpClient services | Centralized, interceptor-friendly |

### Implementation Patterns

#### Project Structure
```
src/app/
├── core/                          # Singleton services, guards, interceptors
│   ├── auth/
│   │   ├── auth.guard.ts
│   │   ├── auth.interceptor.ts
│   │   └── auth.service.ts
│   ├── api/
│   │   └── api.service.ts
│   └── core.providers.ts
├── shared/                        # Reusable dumb components, pipes, directives
│   ├── components/
│   ├── pipes/
│   └── directives/
├── features/                      # Feature modules (lazy-loaded)
│   ├── products/
│   │   ├── product-list/
│   │   │   └── product-list.component.ts
│   │   ├── product-detail/
│   │   │   └── product-detail.component.ts
│   │   ├── products.store.ts      # NgRx SignalStore
│   │   ├── products.service.ts
│   │   └── products.routes.ts
│   └── orders/
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

#### Standalone Component
```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, ProductCardComponent, PaginatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (product of store.products(); track product.id) {
      <app-product-card [product]="product" />
    }
    @empty {
      <p>No products found.</p>
    }
    <app-paginator
      [total]="store.total()"
      [page]="store.page()"
      (pageChange)="store.setPage($event)" />
  `,
})
export class ProductListComponent {
  protected readonly store = inject(ProductsStore);

  constructor() {
    this.store.loadProducts();
  }
}
```

#### NgRx SignalStore
```typescript
export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState<ProductsState>({
    products: [],
    total: 0,
    page: 1,
    loading: false,
    error: null,
  }),
  withComputed((store) => ({
    hasProducts: computed(() => store.products().length > 0),
  })),
  withMethods((store, service = inject(ProductsService)) => ({
    async loadProducts() {
      patchState(store, { loading: true, error: null });
      try {
        const result = await firstValueFrom(service.getAll(store.page()));
        patchState(store, { products: result.items, total: result.total, loading: false });
      } catch (error) {
        patchState(store, { loading: false, error: 'Failed to load products' });
      }
    },
    setPage(page: number) {
      patchState(store, { page });
      this.loadProducts();
    },
  })),
);
```

#### Route Configuration (Lazy)
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes')
      .then(m => m.PRODUCT_ROUTES),
  },
];

// features/products/products.routes.ts
export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetailComponent },
];
```

### Testing
```typescript
describe('ProductListComponent', () => {
  it('should display products', async () => {
    await render(ProductListComponent, {
      providers: [
        { provide: ProductsStore, useValue: mockStore },
      ],
    });
    expect(screen.getByText('Widget Pro')).toBeInTheDocument();
  });
});
```

### Common Pitfalls
- **NgModules in Angular 17+:** Prefer standalone components; NgModules add unnecessary complexity.
- **Manual subscriptions:** Use `toSignal()` or `async` pipe instead of manual `.subscribe()` to avoid memory leaks.
- **Default change detection:** Always use `OnPush` for performance; combine with Signals.
- **Barrel file chains:** Deep re-export chains slow build times; import directly from feature paths.
