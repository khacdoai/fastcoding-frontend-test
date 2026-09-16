# Reanty — Real Estate Landing Page

A pixel-accurate recreation of the **Reanty** Real Estate website design, built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks.

---

## Technologies

| Technology | Usage |
|---|---|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Styling, animations, Grid & Flexbox |
| **Vanilla JavaScript** | Data loading, UI interactions |
| **Google Fonts** | Poppins typography |
| **SVG** | Icons and placeholder images |

---

## Project Structure

```
real-estate-test/
│
├── index.html                    # Main HTML file
│
├── assets/
│   ├── css/
│   │   ├── reset.css             # CSS reset & normalize
│   │   ├── variables.css         # CSS custom properties (design tokens)
│   │   ├── style.css             # Main desktop styles
│   │   └── responsive.css        # Media queries (1440px → 360px)
│   │
│   ├── js/
│   │   ├── config.js             # API URL configuration
│   │   └── main.js               # All JavaScript functionality
│   │
│   ├── images/
│   │   ├── logo.svg              # Reanty brand logo
│   │   ├── hero.svg              # Hero section image (placeholder)
│   │   ├── property-01.svg       # Property card images (×4)
│   │   ├── property-02.svg
│   │   ├── property-03.svg
│   │   ├── property-04.svg
│   │   ├── dream-living.svg      # Dream living section image
│   │   ├── dream-living-sm.svg   # Dream living secondary image
│   │   ├── testimonial.svg       # Testimonial avatar (×3)
│   │   ├── testimonial-02.svg
│   │   ├── testimonial-03.svg
│   │   ├── blog-01.svg           # Blog post images (×3)
│   │   ├── blog-02.svg
│   │   └── blog-03.svg
│   │
│   └── icons/                    # (Icons are inlined as SVG in main.js)
│
├── data/
│   ├── properties.json           # Property listings data
│   ├── services.json             # Services data
│   ├── testimonials.json         # Customer testimonials
│   └── blogs.json                # Blog posts data
│
└── README.md
```

---

## How to Run

### Option 1: VS Code Live Server (Recommended)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Open the `real-estate-test/` folder in VS Code
3. Right-click `index.html` → **"Open with Live Server"**
4. The site opens at `http://127.0.0.1:5500`

> **Important**: You must use Live Server or a local HTTP server because the JavaScript uses `fetch()` to load JSON data files. Opening `index.html` directly with `file://` protocol may block fetching in some browsers.

### Option 2: Python HTTP Server

```bash
cd real-estate-test
python -m http.server 8000
# Open: http://localhost:8000
```

### Option 3: Node.js (npx serve)

```bash
cd real-estate-test
npx serve .
# Open: http://localhost:3000
```

---

## Data API

Data is loaded dynamically by `main.js` using `fetch()`.

### Change API URL

Edit `assets/js/config.js`:

```javascript
const CONFIG = {
  // Set your API base URL here:
  API_BASE_URL: 'https://your-api.example.com',

  ENDPOINTS: {
    properties: '/api/properties',
    services:   '/api/services',
    testimonials: '/api/testimonials',
    blogs:      '/api/blogs',
  },
  // ...
};
```

When `API_BASE_URL` is empty `''`, the app automatically falls back to local JSON files in `./data/`.

### Expected API Response Format

```json
// GET /api/properties
[
  {
    "id": 1,
    "title": "The Status Apartment",
    "type": "Apartment",
    "price": "$1,200",
    "priceUnit": "/mo",
    "image": "https://...",
    "location": "New York, USA",
    "category": "popular",
    "label": "Sell"
  }
]
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout changes |
|---|---|---|
| Desktop XL | 1440px | Full layout |
| Desktop | 1280px | Adjusted typography |
| Desktop SM | 1024px | Hamburger menu shows |
| Tablet | 768px | Single-column hero, 2-col grids |
| Mobile LG | 480px | Single column everywhere |
| Mobile | 390px / 375px | Adjusted spacing |
| Mobile SM | 360px | Minimum size adjustments |

---

## JavaScript Functions

| Function | Description |
|---|---|
| `initMobileMenu()` | Hamburger toggle, close on link/overlay/ESC |
| `initHeaderScroll()` | Adds shadow to header on scroll |
| `loadProperties()` | Fetches & renders property cards |
| `renderProperties()` | Renders filtered property grid |
| `initPropertyTabs()` | Popular / City / Land tab filter |
| `loadServices()` | Fetches & renders service cards |
| `renderServices()` | Renders service grid |
| `loadTestimonials()` | Fetches & renders testimonials slider |
| `initTestimonialSlider()` | Auto-play, prev/next, dot controls |
| `loadBlogs()` | Fetches & renders blog cards |
| `renderBlogs()` | Renders blog grid |
| `initContactForm()` | Form validation (required, email, tel) |
| `initCounterAnimation()` | Animated number counters on scroll |
| `observeElements()` | Scroll-triggered fade-in animations |
| `initScrollTop()` | Scroll-to-top button |
| `initSubscribeForm()` | Newsletter form handler |
| `init()` | Main entry point |

---

## Replacing Placeholder Images

The `./assets/images/` directory contains SVG placeholders. Replace them with real images:

1. Add real `.jpg` or `.webp` images to `./assets/images/`
2. Update `./data/*.json` to point to the new image paths
3. Update `src` attributes in `index.html` for static images (hero, dream-living)

All `<img>` tags use `loading="lazy"` (except hero) and have descriptive `alt` text.

---

## Accessibility Features

- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`)
- All images have descriptive `alt` attributes
- Form inputs have associated `<label>` elements
- Error messages use `role="alert"` and `aria-live="polite"`
- Hamburger has `aria-expanded` state
- Navigation has `aria-label`
- Focus states visible via `:focus-visible`
- Keyboard-navigable (ESC closes mobile menu)

---

## Known Limitations vs Screenshot

| Limitation | Reason |
|---|---|
| Placeholder images (gray boxes) | No real property photos provided. Replaceable via `data/*.json` |
| Logo font rendering | SVG text font depends on system fonts if Google Fonts not loaded |
| Exact pixel spacing | Minor spacing differences due to screenshot compression |
| Logo white version | Footer logo uses CSS `filter: brightness(0) invert(1)` instead of a separate white SVG |

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses: CSS Grid, CSS Custom Properties, Intersection Observer API, `fetch()`, `async/await`
