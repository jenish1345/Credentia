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

## Credential flow: issue, share, verify

Routes: `/` (landing), `/issue`, `/verify/[id]`, `/receipt/[id]`, `/dashboard` (credentials issued from this browser).
The earlier payment-evidence story and trust lookup moved to `/payment-story` and `/trust-dashboard`; `/payment-check` and `/credential/*` are unchanged.

How it works:

- A credential's **fingerprint** (`keccak256` of title, recipient name, description and a random salt) is written to `CredentialRegistry.issueCredential(holder, keccak256(title), fingerprint, expiry)` by the **issuer's own wallet**. The app never holds a key and never signs.
- The **share link** (`/verify/<id>?d=<payload>`) carries the readable details. The verifier's browser recomputes the fingerprint and the credential ID and compares them with the registry, so edited details show as `DETAILS DO NOT MATCH`. Because the details are in the link, do not put sensitive personal data in them.
- Statuses: `VERIFIED`, `PENDING`, `REVOKED`, `EXPIRED`, `NOT FOUND`, `DETAILS DO NOT MATCH`, `CANNOT CHECK` (registry unreachable), `DEMO · NOT ANCHORED`.
- Issued credentials are listed from this browser's `localStorage`; the registry and the link remain the source of truth.

**Demo mode:** if `NEXT_PUBLIC_CREDENTIAL_REGISTRY_ADDRESS` is empty, `/issue` creates clearly labelled demo credentials that never touch a chain and can never show as verified. To anchor on Monad testnet, deploy the registry, set that variable, and issue with a wallet that the registry owner has authorised as an issuer.

Libraries added for this flow: `motion`, `lenis` (landing page only, skipped under `prefers-reduced-motion`), `qrcode.react`, `sonner`.
