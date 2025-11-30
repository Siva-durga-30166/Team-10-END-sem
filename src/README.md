# Student Feedback & Evaluation System

A comprehensive web application for managing student feedback and evaluations across educational institutions.

## Features

### Three User Roles

**Students**
- Secure login and registration
- Personal dashboard with notifications
- Submit feedback forms (course evaluations, instructor feedback, facility feedback)
- View aggregated results
- Track actions taken based on feedback

**Teachers**
- Dashboard with key performance indicators
- Form builder for creating custom evaluation forms
- Advanced analytics with counterfactual analysis
- "We Heard You" action tracking system
- Comprehensive action logging

**Institution Administrators**
- Participation analytics across departments
- Department heatmaps
- System settings management

## Design System

- **Primary Color:** #2563EB (Blue)
- **Secondary Color:** #F59E0B (Amber)
- **Typography:** Poppins (Bold headlines), Inter (Body text)
- **Spacing System:** 8/16/24/32px
- **UI Components:** Modern, minimal, and professional with shadcn/ui

## Tech Stack

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase (optional - app works with mock data):
   - Create a Supabase project
   - Add your credentials to environment variables
   - Run database migrations if needed

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Default Login Credentials

### Students
- Email: `student@university.edu`
- Password: `password123`

### Teachers
- Email: `teacher@university.edu`
- Password: `password123`

## Project Structure

```
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Image/          # Figma-specific utilities
│   └── ...             # Feature components
├── styles/             # Global styles and Tailwind config
├── utils/              # Utility functions
│   ├── supabase/       # Supabase client and helpers
│   └── actionLogger.tsx # Action logging utility
└── supabase/           # Supabase functions and edge functions

```

## Features in Detail

### Student Features
- **Dashboard:** View pending forms, notifications, and recent activity
- **Feedback Forms:** Multiple form types with rich question formats
- **Results:** See aggregated, anonymized feedback results
- **Action Log:** Track what actions teachers have taken based on feedback

### Teacher Features
- **Dashboard:** KPIs including response rates, sentiment analysis, action items
- **Form Builder:** Create custom evaluation forms with various question types
- **Analytics:** Deep dive into feedback with counterfactual analysis
- **We Heard You:** Document and track actions taken in response to feedback
- **Action Log:** Comprehensive logging of all teacher actions

### Admin Features
- **Participation Analytics:** Track engagement across departments
- **Department Heatmaps:** Visualize participation and sentiment
- **Settings:** Manage system-wide configurations

## Responsive Design

The application is fully responsive and adapts to different screen sizes while maintaining its professional appearance.

