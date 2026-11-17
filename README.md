# CUT BAT AI — Professional Video Editing & AI Studio

A React Native/Expo iOS application for professional video editing with integrated AI features.

**Tagline:** Your Vision. Our Intelligence.

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- iOS simulator or iPhone device
- Expo CLI (optional): `npm install -g expo-cli`

### Installation

1. Clone the repository
```bash
cd /home/user/cut-bat-
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. Start the development server
```bash
npm start
```

### Running on iOS Simulator

```bash
# Option 1: Using Expo
npm start
# Then press 'i' in the terminal

# Option 2: Using Expo CLI
expo start --ios
```

## Project Structure

```
src/
├── app/                    # Expo Router screens
├── components/             # Reusable UI components
├── features/              # Feature-specific logic
├── services/              # API and service integration
├── store/                 # Zustand state management
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions and constants
├── hooks/                 # Custom React hooks
└── locales/              # i18n translation files
```

## Development Phases

**Phase 1-2**: Project Foundation & UI/Navigation ✅
- Expo project initialization
- Design system & components
- Navigation structure
- Authentication UI (placeholders)

**Phase 3**: Authentication with Supabase
**Phase 4**: Video Import & Playback
**Phase 5**: Professional Timeline Editor
...and 8 more phases leading to production release

## Features

- **Professional Video Editor** — Timeline with multi-track support
- **AI Director** — Storyboard generation from video ideas
- **Text-to-Video** — Generate videos from text
- **Image-to-Video** — Animate static images
- **Voice Studio** — Text-to-speech, dubbing, captions
- **Magic Edit** — AI-powered visual effects
- **Smart Captions** — Automatic subtitle generation

## Design System

**Colors:**
- Background: `#090D16`
- Cards: `#151D2C`
- Primary Purple: `#9270FF`
- Accent Green: `#39D6A0`
- White: `#FFFFFF`

**Languages:**
- English (LTR)
- Arabic (RTL) — coming soon

## Contributing

This is an Anthropic-developed project. For issues or contributions, please refer to the project guidelines.

## License

Proprietary — All rights reserved.
