---
id: "xcut-i18n-l10n-strategy"
version: "1.0.0"
category: "cross-cutting-concerns"
complexity: "intermediate"
tags: ["i18n", "l10n", "internationalization", "localization", "translation"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Internationalization & Localization (i18n/L10n)

> Design an internationalization and localization strategy for multi-language, multi-region applications.

## Metadata
- **Category:** `cross-cutting-concerns`
- **Complexity:** `intermediate`

## Context

- **Use case:** Supporting multiple languages and regional formats in an application.
- **Prerequisites:** Target markets and languages identified, content strategy defined.
- **Scope:** Translation workflow, date/number formatting, RTL support, content management.

## Prompt

```text
<Role>
You are a software architect specializing in internationalization and localization engineering.

<Context>
- Application: {{APP_NAME}}
- Target languages: {{LANGUAGES}} (e.g., en, es, fr, de, ja, ar, zh)
- RTL support needed: {{RTL}} (yes / no)
- Content types: {{CONTENT}} (UI strings, emails, documents, legal)
- Framework: {{FRAMEWORK}}

<Task>
Design an i18n/L10n architecture covering:

### 1. String Externalization
- Translation file format (JSON / YAML / PO / XLIFF / ICU)
- Key naming convention: `{page}.{section}.{element}` or flat keys
- Pluralization and gender rules (ICU MessageFormat)
- Interpolation patterns for dynamic values
- Context/description for translators

### 2. Translation Workflow
- Source string extraction from code
- Translation Management System (TMS) integration
- Translator review and approval workflow
- Pull request automation for new translations
- Missing translation handling (fallback chain)

### 3. Locale-Specific Formatting
| Concern | Library/API | Example |
|---------|-----------|---------|
| Dates | Intl.DateTimeFormat / date-fns | 12/31/2024 vs 31.12.2024 |
| Numbers | Intl.NumberFormat | 1,000.50 vs 1.000,50 |
| Currency | Intl.NumberFormat | $100 vs 100 € |
| Sorting | Intl.Collator | Locale-aware string sort |
| Time zones | Temporal / date-fns-tz | UTC conversion + display |
| Relative time | Intl.RelativeTimeFormat | "2 hours ago" |

### 4. RTL Support (if applicable)
- CSS logical properties (margin-inline-start vs margin-left)
- Bidirectional text handling
- Icon and layout mirroring
- Testing strategy for RTL languages

### 5. Content Strategy
- User-generated content: store in original language, optional translation
- Legal/compliance content: certified translation workflow
- Error messages and notifications: prioritize translation
- SEO: hreflang tags, localized URLs, sitemap per locale

### 6. Technical Architecture
- Locale detection (browser, user preference, URL, header)
- Language switching without page reload
- Bundle splitting per locale (avoid loading all translations)
- Server-side vs. client-side translation rendering
- Caching translated content

### 7. Testing
- Pseudo-localization for layout validation
- String length expansion testing (German is ~30% longer)
- Screenshot testing per locale
- Automated missing translation detection

<Constraints>
- No hardcoded strings in source code
- Fallback language chain: user locale → language → default (en)
- Translation files must be version-controlled
- All dates/numbers must use locale-aware formatting

<Output Format>
Structured markdown with translation workflow diagram, file format examples, formatting pattern table, and testing checklist.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{APP_NAME}}` | Yes | Application name | `GlobalShop` |
| `{{LANGUAGES}}` | Yes | Target languages | `en, es, fr, de, ja, ar` |
| `{{RTL}}` | No | RTL language support | `yes (Arabic)` |
| `{{CONTENT}}` | No | Content types | `UI strings, emails, legal` |
| `{{FRAMEWORK}}` | No | Frontend framework | `React + react-intl` |

## Composition

- **Precedes:** `testing-e2e`, `frontend-component-design`
- **Follows:** `frontend-spa-design`
- **Combines with:** `xcut-configuration-management`, `docs-api-documentation`

## Tips & Variations

- **For React:** Use `react-intl` (FormatJS) or `next-intl` for Next.js projects.
- **For small projects:** Start with JSON translation files + i18next before investing in a TMS.
- **For content-heavy apps:** Consider a headless CMS with built-in localization (Contentful, Strapi).
