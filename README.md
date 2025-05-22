
# Balanceè - Smart Car Service Booking Platform

## Overview

Balanceè is a modern web application that allows users in Nigeria to book car service appointments at stations near them. This platform provides a seamless mock interface for selecting service types, finding nearby stations, and booking time slots.

## Features

- **Service Selection**: Choose from different service types based on your vehicle
- **Station Finder**: Find repair stations near you with distance shown in kilometers
- **Interactive Map View**: Visual representation of available stations (coming soon)
- **Time Slot Booking**: View and select available time slots with expandable sections
- **Dark Mode Support**: Full dark mode implementation with inverted logo for better visibility
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop devices

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API with Reducer Pattern
- **Data Fetching**: TanStack Query
- **Icons**: Lucide React

## Development Approach

This project follows a component-based architecture, with special attention to:

- **Code Organization**: Feature-based file structure with modular components
- **State Management**: Centralized booking state with context providers and reducers
- **UI/UX Design**: Glass-morphism styling with responsive layouts
- **Accessibility**: Semantic HTML and ARIA attributes where appropriate
- **Performance**: Optimized rendering and code splitting

## Getting Started

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone https://github.com/psybah/balancee-booking.git

# Navigate to project directory
cd balancee-booking

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/         # UI components
│   ├── booking/        # Booking-specific components
│   └── ui/             # Core UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── reducers/           # State reducers
├── services/           # API and service functions
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## Design Decisions

- **Glass Cards**: Implemented glass-morphism design for a modern, elegant UI
- **Station Map**: Added a map view toggle with placeholder for future integration
- **Time Slot Grouping**: Time slots grouped by morning, afternoon
- **12-hour Time Format**: Using 12-hour format (AM/PM) for better readability
- **Dark Mode**: Full theme support with inverted logo in dark mode
- **Modular Architecture**: Code organized into small, focused files for better maintainability

## Future Enhancements

- Integration with real maps API for interactive station locations
- User authentication and profile management
- Past bookings history and management
- Payment integration
- Mobile app development

## License

© Cybersmith. All rights reserved.
