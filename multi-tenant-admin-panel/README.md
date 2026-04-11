# Multi-Tenant Admin Panel (Demo)

Small, interview-friendly frontend demo focused on scalable patterns:
multi-tenant context, RBAC, feature flags, config-driven routing, API abstraction, caching, and error boundaries.

## Run

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## What this demonstrates

- **Multi-tenant context**: Tenant selector affects all tenant-scoped data.
- **RBAC**: Route + UI actions gated via permissions.
- **Feature flags**: Tenant-scoped flags; used for route gating and UI visibility.
- **Config-driven routing & nav**: Feature routes are declared in feature folders and assembled centrally.
- **React Query (TanStack Query)**: Tenant-scoped query keys + invalidation after mutations.
- **API abstraction**: UI calls domain APIs (`flagsApi`, `usersApi`), not fetch.
- **Error boundaries**: Route-level boundary protects feature pages.

## Key flows

### Flags

- Read flags anywhere (Home is **read-only**).
- Write flags only from **Flags Admin** (permission `flags:write` + feature flag `flagsAdmin`).

### Users

- Users list/detail is tenant-scoped.
- Create/Delete is gated by `users:write`.

## Architecture map (where to look)

- Providers: `src/app/providers/AppProviders.tsx`
- Route assembly & access policy:
  - `src/app/router/routeRegistry.ts`
  - `src/app/router/routeAssembler.tsx`
  - `src/app/router/routeAccess.ts`
  - `src/app/router/guards/RouteGate.tsx`
- Contexts:
  - Tenant: `src/core/tenant/tenantContext.ts` + `src/core/tenant/TenantProvider.tsx`
  - Role/RBAC: `src/core/auth/roleContext.ts` + `src/core/auth/RoleProvider.tsx`
  - Flags: `src/core/flags/flagsContext.ts` + `src/core/flags/FlagsProvider.tsx`
- Caching:
  - Query client + keys: `src/core/cache/queryClient.ts`, `src/core/cache/queryKeys.ts`

## Mock backend (important)

There is no real backend in this repo.

- Domain API calls go through `httpClient`.
- `httpClient` is configured with an in-memory **mock transport** that responds to a small set of endpoints.
- The transport delegates to simple in-memory stores under feature/core mock modules.

Why this approach:
- Keeps the architecture close to production (UI → domain API → http client → transport).
- When a real backend exists, swap the transport to `fetch` without rewriting UI/components.

## Trade-offs / intentional simplifications

- **Auth**: demo-only role switcher (no JWT/SSO). Backend enforcement is out of scope.
- **Tenant selection**: dropdown selector (prod might prefer URL/subdomain + deep links).
- **Flags**: no local overrides (single source of truth is remote flags).
- **API surface**: only the endpoints needed by the demo are implemented in the mock transport.
