# QuotApp

A beautiful, free quote discovery and sharing platform. Discover daily inspiration, create beautiful quote images, and build your personal collection.

![QuotApp Screenshot](https://quotapp.nl/screenshot.png)

## Features

- **Daily Quote** - Fresh inspiring quote every day
- **Quote Explorer** - Browse quotes by category (motivation, wisdom, humor, love, success, etc.)
- **Quote Creator** - Create beautiful quote images with custom backgrounds and fonts
- **Favorites** - Save quotes to your personal collection
- **Share** - Generate shareable images for social media
- **Search** - Find quotes by keyword, author, or topic
- **Dark/Light Mode** - Automatic theme switching

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL + Prisma ORM
- **Animations:** Framer Motion
- **Image Generation:** html2canvas

## Self-Hosting with Coolify

### Prerequisites

- A server with Docker support
- Coolify installed (https://coolify.io)
- Domain name pointed to your server

### Deployment Steps

1. **Create PostgreSQL Database in Coolify:**
   - Go to your Coolify dashboard
   - Click "New Resource" → "Database"
   - Select "PostgreSQL"
   - Set database name: `quotapp`
   - Remember the connection details

2. **Create New Application:**
   - Click "New Resource" → "Application"
   - Choose "Public Repository"
   - Enter your GitHub repository URL
   - Select the branch (main)

3. **Configure Build:**
   - Build Pack: `Dockerfile`
   - Port: `3000`

4. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://user:password@postgres:5432/quotapp?schema=public
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-super-secret-random-string
   ```

5. **Deploy:**
   - Click "Deploy"
   - Coolify will automatically build and deploy your app

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/quotapp.git
cd quotapp

# Install dependencies
npm install

# Start PostgreSQL with Docker Compose
docker-compose up -d postgres

# Setup environment
cp .env.example .env
# Edit .env with your database URL

# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Your app URL | Yes |
| `NEXTAUTH_SECRET` | Random secret for auth | Yes |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with quotes

## Docker

Build and run locally with Docker:

```bash
# Build the image
docker build -t quotapp .

# Run with docker-compose (includes PostgreSQL)
docker-compose up -d
```

## License

MIT License - Free for personal and commercial use.

## Credits

Built with ❤️ for the quote lovers community.
