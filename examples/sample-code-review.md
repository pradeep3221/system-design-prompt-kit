# Sample Code Review: User Authentication Module

> This is a worked example using prompts from `prompts/10-code-review/`.

---

## Context

A team member submitted a pull request for a user authentication module in a Node.js/Express application. We applied the code review prompts to produce structured feedback.

---

## 1. Code Review Checklist (from 01-code-review-checklist.md)

### Code Under Review

```javascript
// auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

const SECRET = "my-super-secret-key-2026";

async function login(req, res) {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = '${email}'`;
  const result = await db.query(query);

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "User not found" });
  }

  const user = result.rows[0];
  const valid = password === user.password;

  if (!valid) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: '30d' }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name, password: user.password } });
}

async function register(req, res) {
  const { name, email, password } = req.body;
  const query = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
  await db.query(query);
  res.status(201).json({ message: "User created" });
}

module.exports = { login, register };
```

### Checklist Results

| Category | Status | Finding |
|----------|--------|---------|
| **Security** | FAIL | SQL injection via string interpolation |
| **Security** | FAIL | Plaintext password comparison (no hashing) |
| **Security** | FAIL | Hardcoded JWT secret |
| **Security** | FAIL | Password leaked in login response body |
| **Security** | FAIL | No input validation or sanitization |
| **Security** | FAIL | Passwords stored in plaintext (register) |
| **Error Handling** | FAIL | No try/catch; unhandled DB errors crash server |
| **Performance** | WARN | `SELECT *` fetches unnecessary columns |
| **Auth Design** | WARN | 30-day token expiry with no refresh mechanism |
| **Auth Design** | WARN | Different error messages leak user existence info |
| **Maintainability** | WARN | No separation between controller and service layer |

**Overall Verdict**: **REJECT — Critical security vulnerabilities must be fixed before merge.**

---

## 2. PR Feedback (from 02-pr-feedback-generator.md)

### Critical (Must Fix)

#### 1. SQL Injection Vulnerability
**Lines 9, 32** — User input is interpolated directly into SQL queries.

```javascript
// VULNERABLE
const query = `SELECT * FROM users WHERE email = '${email}'`;

// FIXED - Use parameterized queries
const query = 'SELECT id, email, password_hash, name, role FROM users WHERE email = $1';
const result = await db.query(query, [email]);
```

An attacker can bypass authentication with: `' OR '1'='1' --`

#### 2. Plaintext Password Storage and Comparison
**Lines 16, 33** — Passwords are stored and compared as plaintext.

```javascript
// VULNERABLE
const valid = password === user.password;

// INSERT ... VALUES ('${name}', '${email}', '${password}')

// FIXED - Hash on registration, compare with bcrypt
// Registration:
const passwordHash = await bcrypt.hash(password, 12);
const query = 'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)';
await db.query(query, [name, email, passwordHash]);

// Login:
const valid = await bcrypt.compare(password, user.password_hash);
```

#### 3. Hardcoded Secret Key
**Line 5** — JWT secret is hardcoded in source code.

```javascript
// VULNERABLE
const SECRET = "my-super-secret-key-2026";

// FIXED - Load from environment
const SECRET = process.env.JWT_SECRET;
if (!SECRET) throw new Error('JWT_SECRET environment variable is required');
```

#### 4. Password Leaked in Response
**Line 25** — The login response includes the user's password.

```javascript
// VULNERABLE
res.json({ token, user: { id: user.id, email: user.email, name: user.name, password: user.password } });

// FIXED - Never return sensitive fields
res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
```

### Important (Should Fix)

#### 5. No Input Validation
Add validation before processing requests:

```javascript
const { body, validationResult } = require('express-validator');

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8, max: 128 }),
];
```

#### 6. No Error Handling
Wrap handlers in try/catch to prevent unhandled crashes:

```javascript
async function login(req, res) {
  try {
    // ... logic
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
```

#### 7. User Enumeration via Error Messages
Returning "User not found" vs "Wrong password" lets attackers confirm which emails exist.

```javascript
// VULNERABLE - different messages
return res.status(401).json({ message: "User not found" });
return res.status(401).json({ message: "Wrong password" });

// FIXED - uniform message
return res.status(401).json({ message: "Invalid email or password" });
```

### Suggestions (Nice to Have)

#### 8. Reduce Token Lifetime
30 days is excessive. Consider 15-minute access tokens with a refresh token mechanism.

#### 9. Add Rate Limiting
Authentication endpoints are prime targets for brute-force attacks. Apply rate limiting middleware.

---

## 3. Architecture Review (from 03-architecture-review.md)

### Layer Analysis

| Layer | Current State | Recommendation |
|-------|--------------|----------------|
| **Controller** | Contains DB queries + business logic | Extract to service layer |
| **Service** | Does not exist | Create `auth.service.js` for business logic |
| **Repository** | Does not exist | Create `user.repository.js` for DB access |
| **Validation** | None | Add middleware using `express-validator` or `joi` |

### Recommended Structure

```
src/
├── controllers/
│   └── auth.controller.js    # HTTP concerns only
├── services/
│   └── auth.service.js       # Business logic (hash, compare, sign)
├── repositories/
│   └── user.repository.js    # DB queries (parameterized)
├── middleware/
│   ├── validate.js           # Input validation
│   └── rate-limit.js         # Rate limiting
└── config/
    └── index.js              # Environment variables
```

### Refactored Controller (after applying all feedback)

```javascript
// auth.controller.js — clean version
const authService = require('../services/auth.service');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.authenticate(email, password);
    res.json(result);
  } catch (error) {
    if (error.name === 'AuthenticationError') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register(name, email, password);
    res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email } });
  } catch (error) {
    if (error.name === 'DuplicateEmailError') {
      return res.status(409).json({ message: 'Email already registered' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { login, register };
```

---

## Summary

This example demonstrated how the three code review prompts produce layered feedback — from a quick pass/fail checklist, through detailed PR comments with fix suggestions, to architectural guidance for long-term maintainability.

**Total issues found**: 6 critical, 3 important, 2 suggestions.
