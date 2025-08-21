# SRMS Student Cards

A fun interactive web application showcasing SRMS CET CS students with a dark humor twist. Built with Next.js and deployed on GitHub Pages.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **GitHub Pages** - Static site hosting

## 📦 Features

- Interactive student card reveal system
- Dark humor themed content
- Responsive design
- Sound effects (optional)
- Admin panel for card editing
- Animated background text flows
- Mobile-friendly interface

## 🏗️ Development

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/burgercat69/srms.git
cd srms

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### Building for Production

```bash
# Build and export static files
npm run export
# or
pnpm export
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Fork or clone this repository**
2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
3. **Push to main branch** - deployment will happen automatically

### Manual Deployment

```bash
# Build the project
npm run export

# The static files will be in the 'out' directory
# Upload the contents to your web server
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── public/                # Static assets
│   ├── *.png             # Student images
│   ├── cards.json        # Student data
│   └── .nojekyll         # GitHub Pages config
├── .github/workflows/     # GitHub Actions
└── next.config.mjs       # Next.js configuration
```

## 🎮 Usage

1. **Click the main card** to reveal a random student
2. **View student details** in the popup modal
3. **Admin access** - Use the admin button (credentials required)
4. **Sound toggle** - Enable/disable sound effects
5. **Reset** - Reset all cards to unrevealed state

## 🔧 Configuration

### Environment Variables

The app automatically detects the environment:
- **Development**: Assets served from root (`/`)
- **Production**: Assets served from `/srms` subdirectory

### Customization

- **Student data**: Edit `public/cards.json`
- **Images**: Add to `public/` directory
- **Styling**: Modify Tailwind classes in components
- **Content**: Update text arrays in `app/page.tsx`

## 📝 License

This project is for educational purposes. All student data is fictional and used for demonstration only.

## 👨‍💻 Author

Created by **TENKEFUMA** (Yash)

---

*"Academic suffering never ends, but at least we can laugh about it!"* 💀
