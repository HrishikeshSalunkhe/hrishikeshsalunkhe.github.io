# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and TailwindCSS.

## 🚀 Features

- **Modern Design**: Glassmorphism effects with smooth animations
- **Fully Responsive**: Works seamlessly on all devices
- **React Router**: Multi-page navigation
- **Dark Theme**: Beautiful dark gradient background
- **SEO Optimized**: Meta tags and semantic HTML

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProjectCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   ├── skills.js
│   │   ├── projects.js
│   │   └── experience.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

## 🏃 Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 📦 Build for Production

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚢 Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and configure the build settings
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### GitHub Pages

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The GitHub Actions workflow will automatically build and deploy your site on every push to the `main` branch
5. Your site will be available at `https://[username].github.io/portfolio-website/`

**Note:** If your repository name is different from `portfolio-website`, update the `base` path in `vite.config.js` to match your repository name.

## 🎨 Customization

### Update Personal Information

1. **Name and Title**: Edit `src/pages/Home.jsx`
2. **About Section**: Edit `src/pages/About.jsx`
3. **Skills**: Update `src/data/skills.js`
4. **Projects**: Update `src/data/projects.js`
5. **Experience**: Update `src/data/experience.js`
6. **Social Links**: Update links in `src/components/Footer.jsx` and `src/pages/Contact.jsx`

### Change Colors

Edit the color scheme in `tailwind.config.js` under the `theme.extend.colors.primary` section.

### Add Resume

1. Place your resume PDF in the `public` folder
2. Update the download link in `src/pages/Home.jsx`

## 📝 Notes

- Replace placeholder GitHub, LinkedIn, and Twitter URLs with your actual profiles
- Update email addresses in Contact page and Footer
- Add your actual resume file for download
- Blog posts are currently static - integrate with a CMS or markdown files for dynamic content

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **React Icons** - Icons

## 📄 License

MIT
