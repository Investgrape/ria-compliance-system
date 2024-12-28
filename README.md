# RIA Compliance System

A comprehensive compliance management system for Registered Investment Advisors (RIAs).

## Features

- Client Agreement Management
- Document Management
- Compliance Calendar
- Audit Tracking
- Fee Analysis
- Risk Assessment
- SEC Filing Management

## Tech Stack

- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Prisma (Database ORM)
- PostgreSQL

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Investgrape/ria-compliance-system.git
cd ria-compliance-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

## Project Structure

```
ria-compliance-system/
├── app/                  # Next.js app directory
│   ├── agreements/      # Agreement management
│   ├── audit/          # Audit tracking
│   ├── calendar/       # Compliance calendar
│   └── dashboard/      # Main dashboard
├── components/          # Reusable components
├── lib/                 # Utility functions
├── prisma/             # Database schema
└── public/             # Static files
```

## Features in Development

- [ ] User Authentication
- [ ] Agreement Generation
- [ ] Document Storage
- [ ] Compliance Tracking
- [ ] Audit Logging
- [ ] Reporting
- [ ] API Integration