# Next.js Bootstrap Landing Page

A simple landing page built with Next.js and styled with Bootstrap, featuring a contact form that submits data to an external API.

## Features

- **Next.js 15+** with App Router and TypeScript.
- **Bootstrap 5** for responsive styling and form components.
- **Client-side Form Handling** with React state.
- **External API Integration** via environment variables.

## Getting Started

### Prerequisites

- Node.js 18.17 or later.
- npm, yarn, pnpm, or bun.

### Installation

1. Clone the repository (if applicable) or navigate to the project directory.
2. Install dependencies:

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory and add your API URL:

```env
NEXT_PUBLIC_N8N_PLACEHOLDER_URL=https://your-n8n-webhook-url.com
```

*Note: The environment variable must be prefixed with `NEXT_PUBLIC_` to be accessible on the client side.*

### Running the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Form Submission

The form on the landing page collects the following data:
- First Name
- Last Name
- Email Address
- Consent (Checkbox)

On submission, a JSON payload is sent via a POST request to the URL defined in your `.env.local`.

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "consent": true
}
```
