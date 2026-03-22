# Portfolio Website Production Cheatsheet

A single-copyable Markdown checklist to plan, build, launch, and maintain a production-ready portfolio website.

---

## Priority overview
- Must before launch: domain, SSL, hosting, responsive design, accessibility, SEO basics (meta + social), contact form, analytics, backups, security basics.
- Should do: performance optimization (images, caching, fonts), structured data, sitemap/robots, uptime/monitoring, CI/CD, basic legal (privacy).
- Nice to have: localization, newsletter, advanced SEO, A/B tests, portfolio CMS, dark mode, animations (perf-safe).

---

## 1) Planning & content
- Define primary goal(s): hiring, freelance, showcase, blog, lead-gen.
- Define audience & primary CTAs: hire/contact, download CV, schedule interview.
- Create content map/pages: Home, About, Projects, Blog, Contact, Resume.
- Prepare copy: short bio, case studies (problem → approach → results), project tech stack.
- Gather assets: hi-res logos, project screenshots, mockups, icons, CV PDF.

---

## 2) Design & UX
- Mobile-first responsive layout; common breakpoints: 320, 480, 768, 1024, 1440.
- Primary CTA visible above the fold.
- Typography: body font-size ≥ 16px; line-height ~1.5.
- Color contrast ≥ 4.5:1 for body text (WCAG AA).
- Accessible forms & controls: labels, visible focus states, keyboard navigation.
- Provide descriptive alt text for every meaningful image.
- Avoid autoplaying media and intrusive popups.

---

## 3) Accessibility (must)
- Use semantic HTML: header, main, nav, footer, section, article.
- Use ARIA only when necessary and with correct roles.
- Keyboard focus order and visible focus styles.
- Add a "skip to content" link.
- Test with Lighthouse, axe, or WAVE.
- Do basic screen-reader checks for key pages.

---

## 4) Performance (must)
- Performance budget goals: LCP < 2.5s, TTFB < 600ms, CLS < 0.1, FCP < 1.8s.
- Images: responsive srcset, modern formats (WebP/AVIF), compress.
- Lazy-load offscreen images and iframes.
- Minify & bundle CSS/JS; inline critical CSS.
- Use HTTP caching + filename hashing for assets.
- Enable Gzip/Brotli compression.
- Use font-display: swap or self-host critical fonts; subset fonts.
- Prefer lightweight stacks / static sites if possible.

---

## 5) SEO & social
- Unique <title> and meta description per page.
- Use canonical link on each page.
- Add Open Graph + Twitter Card tags.
- Add structured data (JSON-LD) for Person, WebSite, Article as appropriate.
- Generate sitemap.xml and robots.txt.
- Use semantic headings (one H1 per page).
- Friendly URLs: lowercase, hyphens.
- Submit sitemap to Google Search Console.

Example page head (insert inside <head>):
```html
<title>Jane Doe — Frontend Engineer & Designer</title>
<meta name="description" content="Jane Doe — frontend engineer building accessible, performant web apps. Portfolio of case studies and contact.">
<link rel="canonical" href="https://janedoe.com/">
<meta property="og:title" content="Jane Doe — Frontend Engineer & Designer">
<meta property="og:description" content="Portfolio of accessible, performant web apps.">
<meta property="og:image" content="https://janedoe.com/assets/og-image.png">
<meta property="og:url" content="https://janedoe.com/">
<meta name="twitter:card" content="summary_large_image">
```

Example JSON-LD (Person schema):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jane Doe",
  "url": "https://janedoe.com",
  "sameAs": [
    "https://github.com/janedoe",
    "https://linkedin.com/in/janedoe",
    "https://twitter.com/janedoe"
  ],
  "jobTitle": "Frontend Engineer",
  "description": "Frontend engineer specializing in accessible and performant web apps."
}
```

---

## 6) Forms & contact
- Use a backend, serverless function, or third-party (Formspree, Netlify Forms, Getform).
- Validate on client + server; sanitize inputs.
- Mitigate spam: reCAPTCHA, honeypot field, rate limiting.
- Provide submission confirmation UI and admin notifications (email/webhook).

---

## 7) Hosting & deployment
- Hosting options: Static hosts (Netlify, Vercel, GitHub Pages), Render, or VPS (DigitalOcean).
- Prefer HTTPS-only; use Let’s Encrypt if needed.
- Setup CI/CD (GitHub Actions, GitLab CI) to build & deploy on push to main.
- Store secrets in environment variables (do not commit keys).
- Add .gitignore for build artifacts (dist/ or build/).

Sample GitHub Actions workflow to build + deploy to Netlify:
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: nwtgck/actions-netlify@v1
        with:
          publish-dir: ./dist
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 8) DNS, domain & SSL
- Register domain (Namecheap, Google Domains).
- Add A/AAAA records or CNAME per host instructions.
- Configure TTL and enable redirects for www ↔ non-www canonicalization.
- Consider HSTS after HTTPS is confirmed.

---

## 9) Security basics
- HTTPS everywhere.
- Use Content Security Policy (CSP) where practical.
- Set security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
- Keep dependencies updated; run security audits (npm audit, GitHub Dependabot).
- Disable directory listing and protect admin endpoints.
- Use least-privilege API keys and rotate them.

---

## 10) Analytics, privacy & legal
- Add analytics: Google Analytics (GA4), Plausible, or Fathom.
- If using tracking cookies, implement cookie consent and privacy policy (GDPR/CCPA compliance).
- Provide a privacy page describing collected data and retention.
- If collecting resumes/emails, explain how data is used and retained.

---

## 11) Monitoring, logging & backups
- Uptime monitoring: UptimeRobot, Pingdom.
- Error tracking: Sentry or equivalent.
- Monitor Web Vitals via analytics.
- Backup content & CMS regularly.
- Use a password manager for credentials.

---

## 12) Testing & QA
- Cross-browser testing: Chrome, Edge, Safari, Firefox (desktop & mobile).
- Run Lighthouse audits for performance, accessibility, SEO.
- Automated tests for critical flows (contact form, navigation).
- Visual regression testing for UI (Percy, Chromatic).

---

## 13) Release checklist (just before publish)
- Proofread and spellcheck all content.
- Validate internal and external links.
- Confirm meta tags and social images.
- Ensure analytics and error tracking are configured.
- Test contact form end-to-end.
- Run Lighthouse and fix high-priority issues.
- Backup site assets and content.
- Merge to main and deploy.

---

## 14) Post-launch tasks (first 30–90 days)
- Submit sitemap to Search Console and Bing Webmaster Tools.
- Monitor Search Console for coverage issues.
- Promote on LinkedIn, GitHub, Twitter; add to email signature.
- Gather feedback and iterate on case studies.
- Keep projects and resume up to date.

---

## Practical repo files to include
- index.html (or src/pages/index for SSG)
- /assets/images/ (optimized)
- manifest.json (if PWA)
- robots.txt:
```txt
User-agent: *
Disallow: /admin/
Sitemap: https://yourdomain.com/sitemap.xml
```
- sitemap.xml (auto-generate in build pipeline or via CMS)
- README.md with build & deploy instructions

---

## Useful tools & libraries
- Static site generators/frameworks: Next.js, Astro, Gatsby, Eleventy, SvelteKit
- Deploy: Vercel, Netlify, GitHub Pages, Render
- Image tools: Squoosh, ImageOptim, sharp, imagemin
- Accessibility: axe, Lighthouse, WAVE
- Performance: Lighthouse, WebPageTest
- Forms: Formspree, Netlify Forms, serverless functions
- Analytics: GA4, Plausible, Fathom
- Error tracking: Sentry
- CI/CD: GitHub Actions, GitLab CI

---

## Quick commands & tips
- Build & preview:
```bash
npm install
npm run dev
npm run build
npm run start   # or npm run preview
```
- Image sizing: hero 1600–2400px, thumbnails 400–800px; use srcset for densities.
- Font loading: preload critical fonts and use font-display: swap.
- Cache: static assets long-term (Cache-Control: public, max-age=31536000, immutable) with filename hashing.

---

## Performance targets (goals)
- Lighthouse: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.
- Web Vitals: LCP < 2.5s, FID < 100ms (or TBT < 200ms), CLS < 0.1.

---

## Maintenance checklist (ongoing)
- Weekly: check forms, analytics, and fix broken links.
- Monthly: update dependencies, run performance & a11y audits.
- Quarterly: refresh projects, update resume, review privacy/legal.
- Yearly: renew domain, audit backups and rotate credentials.

---

## Extra examples & snippets

robots.txt:
```txt
User-agent: *
Disallow: /admin/
Sitemap: https://yourdomain.com/sitemap.xml
```

Minimal CSP example (adjust sources to your needs; test before enforcing):
```txt
Content-Security-Policy: default-src 'self'; script-src 'self' https://www.google-analytics.com; img-src 'self' data: https://*.gravatar.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com
```

Example meta + OG head snippet (again, put inside <head>):
```html
<title>Your Name — Role</title>
<meta name="description" content="Short description of what you do and portfolio highlights.">
<link rel="canonical" href="https://yourdomain.com/">
<meta property="og:title" content="Your Name — Role">
<meta property="og:description" content="Short description for social previews.">
<meta property="og:image" content="https://yourdomain.com/assets/og-image.png">
<meta property="og:url" content="https://yourdomain.com/">
<meta name="twitter:card" content="summary_large_image">
```

---

If you want, I can:
- Generate a starter file structure for a chosen stack (plain HTML/CSS/JS, Next.js, Astro).
- Create tailored meta tags + JSON-LD using your name/links.
- Produce a specific GitHub Actions, Netlify, or Vercel deploy workflow.

Which stack or deployment target would you like me to prepare a starter for?
