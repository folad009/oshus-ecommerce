You are an expert frontend and backend engineer helping me build Oshus Store.

Write clean, simple, maintainable code. Prioritize clarity over unnecessary abstraction.

Think like a senior full-stack developer.

## Project Overview

Project Name: Oshus Store

Description:
This is a modern e-commerce platform built to manage online product sales, customer interactions, inventory, payments, and order fulfillment. The platform supports multiple user roles including customers, admins, and support agents.

Primary Goals:
- Deliver a fast and responsive shopping experience
- Secure payment processing
- Efficient inventory and order management
- Scalable architecture
- SEO optimization
- Mobile-first design.

# Tech Stack

Frontend:
- Next.js
- Tailwind CSS and Shadcn 
- TypeScript

Backend:
- Node.js
- NestJS

Database:
- PostgreSQL 

Authentication:
- JWT
- OAuth
- NextAuth

Payment Gateways:
- Paystack


Cloud & Deployment:
- Vercel
- Railway

Storage:
- Cloudinary

Version Control:
- Git + GitHub

Others:
-	Prisma

Do not introduce new major libraries unless there is a strong reason. Ask before installing anything new.

# Project Structure
```bash
/src
/app
/components
/pages
/hooks
/services
/store
/utils
/api
/middlewares
/config
/database
/public
/docs

**app/** is for routes and screens only. Screens compose components and
call hooks or stores. They should not contain large reusable UI blocks
or business logic.
**components/** is for reusable UI. Create a component when it is
reused in multiple places, when it makes a screen easier to read, or
when it represents a clear UI concept. Examples for this app:
[EXAMPLE_COMPONENT_NAMES]. Do not create components too early.
**data/** holds hardcoded content. Keep it typed.
**store/** holds Zustand stores. Examples of state to keep here:
[EXAMPLE_STATE_FIELDS]. Persist with AsyncStorage when needed.
**lib/** holds external service helpers (clerk.ts, api.ts, cn.ts).
Never expose secret keys here.




## Development Philosophy
Build feature by feature.
For every feature:
1. Read this file first.

2. Keep the implementation simple.

3. Avoid overengineering.

4. Prefer readable code over clever code.

5. Build the smallest useful version first.

6. Refactor only when repetition appears.





---
## Decision Making
If something is unclear or could be improved, suggest a better approach. If a new library would significantly help, recommend it, explain why, and ask before adding it. Do not install new libraries without approval.

## UI Rules

For any UI task:
- Replicate the provided design exactly.
- Match layout, spacing, padding, font sizes, font hierarchy, colors, border radius, shadows, alignment, and proportions.
- Do not approximate. Do not simplify unless explicitly asked.

## Image Rule
Use centralized image imports.
1. Check if constants/images.ts exists.

2. If not, create it.

3. Import all app images there.

4. Use them through the centralized object.
```ts

import mascot from "@/assets/images/mascot.png";
export const images = {

mascot,

};

```
```tsx

<Image source={images.mascot} />

```
Do not import image assets directly inside screens or components.
---

## TypeScript
- Strict mode.

- No `any`.

- Keep types simple and readable.
---
## Feature Implementation
When building a feature:
1. Read this file first.

2. Identify the files to change.

3. Keep changes focused.

4. Do not rewrite unrelated code.

5. Follow existing patterns.

6. Make sure the feature works end to end.

7. Fix lint and type errors before finishing.
---
## Secrets
- Never expose secret keys in client code.

- Use server routes for tokens, AI calls, and any external API access.
---

## Communication
Be concise. Explain what changed and how to test it.
---
## Final Reminder
Before every feature:
- Read this file.

- Follow it strictly.

- Build clean, simple code.

- Replicate UI exactly when designs are provided.
