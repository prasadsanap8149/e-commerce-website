# E-commerce Frontend

Modern Next.js-based e-commerce frontend with feature toggles and responsive design.

## Features

- 🎨 Responsive UI with Tailwind CSS
- 🔄 Feature toggle-based architecture
- 📱 Mobile-first design
- ⚡ Next.js 14 with App Router
- 🔐 JWT authentication support
- 🛒 Shopping cart functionality
- 💬 Enquiry management

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable React components
├── config/        # Configuration & feature toggles
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── services/      # API service clients
└── styles/        # Global styles
```

## Feature Toggles

Control features via environment variables:

- `NEXT_PUBLIC_AUTH` - Enable/disable authentication
- `NEXT_PUBLIC_PAYMENT` - Enable/disable payment features
- `NEXT_PUBLIC_EMAIL` - Enable/disable email notifications
- `NEXT_PUBLIC_SMS` - Enable/disable SMS notifications

## Building

```bash
npm run build
npm run start
```

## License

MIT
