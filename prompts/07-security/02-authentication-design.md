# Authentication Design

> Design secure authentication and authorization flows for modern applications.

## Category
`security`

## Complexity
`advanced`

## Prompt

```text
You are a security architect. Design the authentication and authorization system for {{APP_NAME}}.

**Requirements:**
- Application type: {{APP_TYPE}}
- User types: {{USER_TYPES}}
- Sensitivity level: {{SENSITIVITY}}
- Third-party login: {{THIRD_PARTY_LOGIN}}

**Design the following:**

### 1. Authentication Flow
- Registration flow with email verification
- Login flow (credentials → token)
- Password reset flow
- Session management (stateless JWT vs. stateful sessions)
- Token lifecycle (access token, refresh token, rotation)
- Logout (single device, all devices)

### 2. OAuth 2.0 / OIDC (if applicable)
- Grant type selection with justification
- Authorization Code + PKCE for SPAs/mobile
- Client Credentials for service-to-service
- Token exchange patterns
- Scope design

### 3. Multi-Factor Authentication (MFA)
- TOTP (authenticator app)
- SMS/Email OTP (with caveats)
- WebAuthn/FIDO2 (hardware keys)
- Recovery codes
- MFA enrollment flow

### 4. Authorization Model
- RBAC (Role-Based Access Control) design
- Permission definitions
- Role hierarchy
- Resource-level permissions (ownership checks)
- API-level authorization middleware

### 5. Password Policy
- Minimum requirements (length > complexity)
- Breached password checking (HaveIBeenPwned API)
- Hashing: Argon2id or bcrypt with appropriate cost factor
- Rate limiting on login attempts (progressive delays)
- Account lockout policy

### 6. Token Security
- JWT claims design (`sub`, `iss`, `aud`, `exp`, `iat`, `jti`, roles/permissions)
- Signing algorithm (RS256 for distributed, HS256 for single service)
- Token storage (httpOnly secure cookies vs. memory)
- Token refresh rotation with replay detection
- Access token TTL: 15 min, Refresh token TTL: 7-30 days

### 7. Security Headers
```
Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict; Path=/
```

Provide implementation code in {{LANGUAGE}}/{{FRAMEWORK}}.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{APP_NAME}}` | Application name | `SaaS Platform` |
| `{{APP_TYPE}}` | Application type | `SPA + API`, `Mobile + API`, `Server-rendered` |
| `{{USER_TYPES}}` | User roles | `Admin, Manager, Member, Guest` |
| `{{SENSITIVITY}}` | Data sensitivity | `Financial`, `Healthcare`, `General` |
| `{{THIRD_PARTY_LOGIN}}` | SSO providers | `Google, GitHub, SAML for Enterprise` |
| `{{LANGUAGE}}` | Backend language | `Node.js`, `C#`, `Python` |
| `{{FRAMEWORK}}` | Auth framework | `Passport.js`, `ASP.NET Identity`, `Django` |

## Tips & Variations

- For enterprise: "Include SAML 2.0 SSO integration design."
- Add: "Design an API key authentication system for developer portal."
