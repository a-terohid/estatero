Estatero

Live Demo: https://estatero.vercel.app/

A full-featured real estate platform built with Next.js (App Router), TypeScript, TailwindCSS, and the Tiptap rich text editor, powered by MongoDB (Mongoose).
Estatero provides role-based dashboards, listing and blog management, agent–owner collaboration, messaging, and advanced search — designed for scalability and easy customization.

🚀 Features

Role-based Access Control:
	•	Primary roles: user, agent, admin, owner
	•	Mixed roles: agent-owner, agent-admin
	•	Owners and admins can dynamically change permissions

Listings Management:
	•	Create, edit, delete property listings
	•	Listings require admin/owner approval before being public
	•	Multiple agents can be assigned to a single listing
	•	Like functionality for listings
 
 Blog Management:
	•	Create, edit, delete blog posts
	•	Approval workflow before publication
	•	Comments and replies by admins and owners
 
 Messaging System:
	•	Users can message agents directly
	•	Agents have an inbox in their dashboard
	•	Contact form sends messages to owners/admins
 
 Advanced Search:
	•	Dashboard search for listings, blogs, and logs
	•	Public-facing property search

Audit Logging:
	•	All key actions are logged (who, when, what type)
	•	Owners can filter logs by type, date, and actor
 
 Rich Text Editing:
	•	Integrated Tiptap editor for blogs & descriptions

🛠 Tech Stack
	•	Frontend: Next.js (App Router), TypeScript, TailwindCSS
	•	Backend: Next.js API Routes, Mongoose/MongoDB
	•	Editor: Tiptap rich text editor
	•	Authentication: JWT or Session (NextAuth or custom)
	•	Deployment: Vercel / Node.js environment

📂 Project Structure
```JavaScript
src/
  app/              # App router pages, layouts, and API routes
  components/       # Reusable UI components
  models/           # Mongoose models
  types/            # TypeScript types & enums
  utils/            # Helper functions & constants
 public/             # Static assets

```


