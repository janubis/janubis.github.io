# Javkhlan Rentsendorj — Portfolio

The source for [janubis.github.io](https://janubis.github.io/), the personal
portfolio of Javkhlan Rentsendorj: researcher, university lecturer, technology
leader, and serial entrepreneur based in Ulaanbaatar, Mongolia.

Javkhlan has worked in the IT industry since 2009. The portfolio connects three
parts of that career:

- research in gigapixel 360° imaging and quality-aware delivery;
- teaching at the National University of Mongolia; and
- building digital ventures, technology teams, and more than 100 web, mobile,
  data, and virtual-tour projects.

## Live website

**[janubis.github.io](https://janubis.github.io/)**

The site is hosted free through GitHub Pages and is published automatically from
the repository's `main` branch.

## What is included

- A cinematic, responsive portfolio with an interactive canvas background.
- Profile and career metrics, including the 2009 start of Javkhlan's IT career.
- Current PhD research in browser-based gigapixel delivery, decoded-tile cache
  behavior, and webcam-controlled 360° navigation with verifiable tile delivery.
- Two latest-research cards linked to the public Ocurus research platforms,
  including the November 2026 browser cohort update.
- Venture history covering Powered, e-Geree, Yesh, and Octagon.
- Recognition earned by the teams behind those ventures.
- Featured public, university, enterprise, and immersive-media work.
- A filterable Project Atlas presenting 44 representative engagements from a
  wider body of 100+ projects.
- A separate downloadable contact card and vCard.
- A custom Open Graph image for link previews.

## Representative project history

The website includes work across travel, education, public information,
enterprise platforms, media, e-commerce, and international engagements.
Representative names include:

Selena Travel, Olonlog Academy, MongoliaTravel.com, Mongolia Travel Market
Data, Khan Attribute, HRBanks, iCareer, Gurun Academy, FIMO, Chemistry and Fire
Defense Science portals, Chinggis Conquest, Air Ticket, BProperty Malaysia,
China–Mongolia Joint School, Uplanet Unitel, Soyombo Cinema, Sustainable Fibre
Alliance, Beefer, Inktop.mn, Bilegt Gobi, Devshil Trade, Consul Tower, Duran
Khar, Airwork.it, WilleyDesign.com, IFSWF, UB Info, Medimpex, iParliament,
BizTour, Gooview.it, Ikh Ust Tuul, Suntrans Mongolia, num.edu.mn,
site.num.edu.mn, Noyon Pizza, Premium Travel Mongolia, Mongolian Observer,
isu.edu.mn, Togloom.trade, G-Power, GUYUK Metaverse, SF Advisory, and Bavaria
Motors.

Project roles varied. Depending on the engagement, Javkhlan contributed through
hands-on development, architecture, virtual-tour production, product strategy,
technical leadership, or team collaboration. The archive is representative,
not exhaustive.

## Technology

The site deliberately uses a small, dependency-free static stack:

- semantic HTML5;
- modern CSS with responsive layouts, custom properties, and motion;
- vanilla JavaScript for the canvas, scroll effects, filters, counters, and
  interactions; and
- GitHub Pages for hosting.

There is no build tool or package installation step.

## Project structure

```text
.
├── index.html             Main portfolio
├── contact.html           Contact card
├── favicon.ico            Multi-size browser favicon
├── site.webmanifest       Installable-site metadata and icons
├── robots.txt             Search-crawler policy and sitemap location
├── sitemap.xml            Canonical public URLs and profile image
├── css/
│   └── style.css          Layout, visual system, and animation
├── js/
│   └── script.js          Canvas and interactive behavior
└── assets/
    ├── profile-600.webp   Small responsive portrait
    ├── profile-1200.webp  Large responsive portrait
    ├── profile-min.jpg    JPEG fallback portrait
    ├── profile.jpg        High-resolution portrait
    ├── favicon-32.png     PNG browser favicon
    ├── apple-touch-icon.png  iOS home-screen icon
    ├── icon-192.png       Small installable-site icon
    ├── icon-512.png       Large installable-site icon
    ├── og-card.png        Social-sharing preview
    └── rjavkhlan.vcf      Downloadable contact
```

## Run locally

Any static file server will work. For example:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Updating the site

- Edit biography, research, ventures, and projects in `index.html`.
- Edit visual styles in `css/style.css`.
- Edit motion and filtering behavior in `js/script.js`.
- Keep external project links current and use `rel="noopener noreferrer"` for
  links that open in new tabs.
- Update both Open Graph and X/Twitter metadata when replacing
  `assets/og-card.png`.
- Preserve reduced-motion support when adding animation.

## Deployment

GitHub Pages serves the repository root from `main`. A push to `main` triggers a
new Pages build automatically:

```bash
git push origin main
```

The public deployment usually updates within a minute or two.

## Accessibility and performance

The site includes:

- semantic page landmarks and descriptive labels;
- keyboard-visible focus states;
- a skip-to-content link;
- responsive navigation;
- a no-JavaScript fallback;
- `prefers-reduced-motion` support;
- touch-safe behavior; and
- a device-pixel-ratio cap and off-screen pause for the animated canvas;
- responsive WebP portraits with a JPEG fallback;
- explicit image dimensions and priority hints for layout stability;
- structured `ProfilePage` and `Person` data;
- a sitemap and crawler policy; and
- restrictive resource-loading and referrer policies suitable for static
  GitHub Pages hosting.

## Contact

- Email: [r.javkhlan@gmail.com](mailto:r.javkhlan@gmail.com)
- Phone: [+976 9907 1008](tel:+97699071008)
- LinkedIn: [Javkhlan Rentsendorj](https://www.linkedin.com/in/javkhlan-rentsendorj-a6070a57/)
- GitHub: [@janubis](https://github.com/janubis)
- Telegram: [@rjavkhlan](https://t.me/rjavkhlan)

## Rights

Portfolio content and personal assets are © Javkhlan Rentsendorj. Project names
and trademarks belong to their respective owners. Unless a separate license is
added, this repository should not be treated as an open-source template.
