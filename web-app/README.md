# Credentia Web App

Next.js 14 web application for Credentia decentralized identity platform.

## 📋 Overview

Modern, responsive web interface for managing decentralized identities, credentials, and attestations on Monad. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## ✨ Features

- **Wallet Integration**: Connect with MetaMask, WalletConnect, and other Web3 wallets
- **Identity Management**: Create and manage DIDs
- **Credential Display**: View and verify credentials
- **Attestation System**: Request and issue attestations
- **AI Agent Support**: Specialized UI for AI agent identities
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: Theme switching support

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: wagmi, viem, RainbowKit
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Validation**: Zod

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
web-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── identity/        # Identity pages
│   │   ├── credentials/     # Credentials pages
│   │   └── api/             # API routes
│   ├── components/          # React components
│   │   ├── ui/              # Base UI components
│   │   ├── layout/          # Layout components
│   │   ├── identity/        # Identity components
│   │   └── wallet/          # Wallet components
│   ├── lib/                 # Utility functions
│   │   ├── wagmi.ts         # Wagmi configuration
│   │   ├── api.ts           # API client
│   │   └── utils.ts         # Helper functions
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
├── public/                  # Static assets
└── tailwind.config.ts       # Tailwind configuration
```

## 🎨 Styling

### Tailwind CSS

This project uses Tailwind CSS for styling. Configuration is in `tailwind.config.ts`.

### Component Library

UI components follow a consistent design system with:
- Typography scale
- Color palette
- Spacing system
- Responsive breakpoints

### Dark Mode

Dark mode is supported using Tailwind's dark mode feature.

## 🔌 Web3 Integration

### Wallet Connection

Uses RainbowKit for wallet connection with support for:
- MetaMask
- WalletConnect
- Coinbase Wallet
- And more...

### Smart Contract Interaction

```typescript
import { useIdentityRegistry } from '@/hooks/useIdentityRegistry';

function MyComponent() {
  const { registerIdentity } = useIdentityRegistry();
  // ...
}
```

### Network Configuration

Configured for Monad testnet (Chain ID: 10143). See `src/lib/wagmi.ts`.

## 📡 API Integration

API calls to the backend use the configured API client:

```typescript
import { api } from '@/lib/api';

const identity = await api.identities.getByDID(did);
```

## 🧪 Development

### Type Checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

### Formatting

```bash
pnpm format
```

### Building

```bash
pnpm build
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy

### Self-Hosted

```bash
# Build
pnpm build

# Start production server
pnpm start
```

### Docker

```bash
# Build image
docker build -t credentia-web .

# Run container
docker run -p 3000:3000 credentia-web
```

## 🔧 Environment Variables

See `.env.example` for all available environment variables.

Required variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_MONAD_CHAIN_ID`: Monad chain ID
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect project ID

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Semantic HTML

## 🔐 Security

- Environment variables for sensitive data
- Content Security Policy headers
- XSS protection
- CSRF protection
- Secure API communication

## 🤝 Contributing

1. Follow Next.js best practices
2. Use TypeScript strictly
3. Follow the component structure
4. Write accessible code
5. Test on multiple devices

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details
