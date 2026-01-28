# Mateus Diális | Interactive Developer Portfolio

A high-performance, interactive portfolio website engineered to showcase frontend expertise, creative animation implementation, and headless CMS integration.

Built with the cutting-edge **Next.js 16 (App Router)** and styled with **Tailwind CSS v4**.

🔗 **Live Demo:** [My Portfolio](https://mdialis.vercel.app)

---

## 🚀 Key Features

* **Dynamic Content Management:** Fully integrated with **Contentful Headless CMS** to manage Projects and Experiences without code changes.
* **Immersive Animations:**
* Mouse-tracking interactive elements (The "Reaper" and "Lamp" hero components) using custom hooks and vector arithmetic.
* Declarative complex transitions powered by **Framer Motion**.
* Custom Lottie animations for micro-interactions (e.g., Form success state).


* **Modern Theming System:** Robust Light/Dark mode implementation using CSS variables (OKLCH color space) and system preference detection.
* **Performance First:** Extensive use of `next/dynamic` for lazy loading heavy components (Reaper, FlipSection) and Next.js Image optimization.
* **Interactive UI:** Draggable carousels, 3D flip cards, and distance-based scaling effects.

---

## 🛠 Tech Stack

### Core & Logic

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
* **State Management:** React Hooks (`useState`, `useRef`, `useCallback`) & Context API

### Styling & Animation

* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using the new `@theme` directive)
* **Motion:** [Framer Motion](https://www.framer.com/motion/)
* **Vector Graphics:** [SVGR](https://react-svgr.com/) (Webpack loader for SVG components)
* **Lottie:** `lottie-react`

### Backend & Services

* **CMS:** [Contentful](https://www.contentful.com/) (via `contentful` SDK)
* **Forms:** [EmailJS](https://www.emailjs.com/) (Serverless email dispatch)
* **Icons:** Lucide React

---

## 📂 Project Structure

A brief overview of the architectural decisions:

```bash
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── works/            # Dynamic routes for projects/experiences
│   └── page.tsx          # Landing page (Home)
├── assets/               # Local SVGs and Lottie JSONs
├── components/           # Reusable UI components
│   ├── Reaper.tsx        # Complex multi-layer SVG animation logic
│   ├── DraggableCarousel # Framer Motion gesture handling
│   └── ...
├── hooks/                # Custom hooks for logic separation
│   ├── followMove.ts     # Mouse tracking physics logic
│   └── useContactForm.ts # Form state and rate-limiting logic
├── lib/                  # Utilities and Service configurations
│   ├── contentfulService # CMS data fetching
│   └── types.ts          # TypeScript interfaces
└── styles/               # CSS configurations
    ├── theme.css         # OKLCH color variables & Tailwind v4 config
    └── animations.css    # Custom keyframes

```

---

## ⚡ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/MDialis/portfolio.git
cd portfolio

```


2. **Install dependencies:**
```bash
npm install
# or
yarn install

```


3. **Configure Environment Variables:**
Create a `.env.local` file in the root directory. You will need credentials from Contentful and EmailJS to run the app fully.
```env
# Contentful CMS Configuration
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

```


4. **Run the development server:**
```bash
npm run dev

```


5. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the application.

---

## 🧠 Technical Highlights

### 1. Interactive Mouse Tracking (`src/hooks/followMove.ts`)

Instead of using heavy 3D libraries for the Hero section, I implemented a lightweight custom hook that tracks cursor movement relative to the container. It uses lerp (linear interpolation) smoothing to create a parallax "following" effect for the Reaper and Lamp components, optimizing performance while maintaining visual fidelity.

### 2. Tailwind v4 & CSS Variables

I utilized the alpha version of Tailwind v4, leveraging the CSS-first configuration approach. The theme is defined in `src/styles/theme.css` using native CSS variables and the `@theme` directive, allowing for seamless dynamic theme switching (Light/Dark) without Javascript runtime overhead for styles.

### 3. Rate-Limited Contact Form (`src/hooks/useContactForm.ts`)

To prevent spam on the client side without a heavy backend, I implemented a custom hook that utilizes `localStorage` to enforce a rate limit and a cooldown period on the EmailJS form submission. It also includes a honeypot field to trap most basic bots.

---

## 🤝 Contact

**Mateus Diális** - Frontend Developer

* [LinkedIn](https://linkedin.com/in/mateus-dialis)
* [GitHub](https://github.com/MDialis)
* [Email](mailto:dialis.dev@gmail.com)

---

*This project is deployed on [Vercel](https://vercel.com).*