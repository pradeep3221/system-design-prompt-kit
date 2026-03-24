# Vue / Nuxt Overlay

Technology overlay for Vue 3 and Nuxt 3 applications.

## Overlay Files

| Overlay | Extends Base Prompt | Description |
|---------|-------------------|-------------|
| SPA Design | `frontend-spa-design` | Vue Router, Nuxt pages |
| State Management | `frontend-state-management` | Pinia, VueQuery |
| Component Design | `frontend-component-design` | Composition API, SFC patterns |

## Stack Summary

| Concern | Recommended | Alternative |
|---------|-------------|-------------|
| Framework | Nuxt 3 | Vue 3 + Vite |
| Language | TypeScript + Vue SFCs | — |
| Styling | Tailwind CSS + Headless UI | Vuetify, PrimeVue |
| Server State | VueQuery (TanStack) | useFetch (Nuxt) |
| Client State | Pinia | — |
| Forms | VeeValidate + Zod | FormKit |
| Testing | Vitest + Vue Test Utils | — |
| E2E | Playwright | Cypress |
| SSR | Nuxt 3 (built-in) | Vue + custom SSR |

## Usage

> "Apply the Vue / Nuxt overlay to the above design. Use Nuxt 3 with Pinia, VueQuery, and Tailwind CSS."
