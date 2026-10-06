Act as a senior React engineer and motorsport art director. Implement the Hamilton hero shown in reference/hero-design-reference.png in this repository. Inspect the existing project first; preserve unrelated work and existing page sections. If empty, create React + Vite + TypeScript with npm. Implement now, do not return only a plan.

INPUTS
This kit's public/images/ contains:
- hamilton.png: 735x835 transparent portrait, Hamilton facing right.
- hamilton-goat.png: 1176x1337 transparent portrait, GOAT facing left.
- ferrari-44.png: 1672x941 transparent front-view car.
- burgundy-backdrop.png: portrait burgundy texture.
Copy these into the application's public/images if the kit is outside the app. Inspect their alpha bounds and visible subject proportions before placing them. Preserve original assets. The reference image is a visual target, never a flattened website background.

GOAL
Premium cinematic red-and-black editorial hero. Real Hamilton on lower left, GOAT counterpart on lower right, inward-facing, oversized ivory HAMILTON behind them, yellow LEWIS above, small elegant Sir, red car centered in midground, readable central tagline and yellow CTA. Match the reference's hierarchy and mood within the limits of the supplied source photos. Do not promise source photos will gain detail through CSS. Preserve faces, image aspect ratios, and original orientation; do not mirror sponsor text.

PALETTE
Near-black #090506, oxblood #31040B, scarlet #D91525, ivory #FFF5E5, racing yellow #FFE000. Scope hero styles so existing sections are not accidentally altered.

LAYERS
Use a relative isolated hero scene and explicit z-index constants or documented CSS layers:
0. Near-black base.
1. Burgundy texture with cover/position controls, radial red glows and edge vignette. The texture is portrait, so let gradients carry wide-screen color; inspect the crop instead of stretching it.
2. Atmospheric CSS haze, thin red light beams, restrained procedural grain. No heavy videos, WebGL, particle libraries, or third-party runtime assets.
3. Oversized name typography.
4. Car centered and subdued by brightness/opacity; slight blur if necessary. Keep the car recognizable without competing with the title.
5. Two portraits anchored at scene bottom, extending toward outer edges. Preserve full faces and GOAT horns. Crop lower torsos deliberately. Apply restrained drop-shadow for red edge glow; this cannot relight the source photos, so keep it subtle.
6. Dark localized readability gradient behind central copy.
7. Live semantic text, links, CTA, scroll cue and navigation. Decorative layers use pointer-events:none. No invisible overlay may intercept controls.

DESKTOP COMPOSITION
Use the reference as the target around 1440x900 and 1920x1080. Navigation about 72px tall, with LH / 44 left, thin rule, ABOUT LEGACY JOURNEY GALLERY right. Title fills roughly 75-85% of scene width in its upper half. Use a true condensed display font, locally hosted if a licensed font is available, with strong fallbacks. Avoid stretched body text and hard-coded letter spacing that causes overflow. Render HAMILTON as real text, one accessible h1; LEWIS and Sir are supporting typography. Place portraits roughly in outer 30% regions, leaving a central readable corridor. Size each portrait independently based on visible alpha bounds so heads feel balanced. Place car near center behind text/figures. Central copy sits below the main name, with generous separation from faces. Use clamp(), sensible min/max dimensions and aspect-aware breakpoints. Hero may grow vertically; never force all content into a viewport too short to contain it.

COPY AND INTERACTION
- Headline: BEYOND THE LIMIT.
- Supporting: Driven by purpose. Defined by legacy.
- Primary link: EXPLORE THE LEGACY, arrow, href #legacy.
- Secondary link: BEYOND RACING, href #beyond-racing.
- Small footer: UNOFFICIAL FAN PORTFOLIO.
Navigation anchors: #about, #legacy, #journey, #gallery. Preserve existing targets; if missing, create concise intentional matching sections with editable neutral copy. Do not fabricate current statistics, quotations or affiliations. Build a functioning accessible mobile menu with aria-expanded, Escape close and sensible focus behavior. Use actual anchors for navigation, not fake buttons. Account for sticky-header anchor offsets.

MOBILE AND SHORT SCREENS
Do not simply shrink the desktop canvas. At narrow widths use title first, paired inward-facing portraits in a dedicated illustration area, subdued car behind them, and central copy/CTA in normal flow below. Both subjects remain recognizable; no text overlaps faces or horns. Keep readable font sizes and a CTA at least 44px high. Navigation collapses into a menu. If needed, increase hero height and allow scrolling. Test 375x812, 390x844, 768x1024, 1440x900, 1920x1080 and a short 1366x768 viewport. No horizontal scrolling or distorted assets.

MOTION
Use lightweight opacity/transform entrance motion under one second, with subtle stagger. No perpetual distracting motion. Optional desktop-only pointer parallax must be small, use requestAnimationFrame with cleanup, and stop for reduced motion and touch devices. Content must be visible by default if JS/motion fails. Prefer CSS over extra animation dependencies.

IMPLEMENTATION
Use small components such as HeroSection, HeroBackdrop, HeroArtwork and SiteNavigation, with scoped CSS or the project's existing styling system. Centralize adjustable image scale/offset and color values with CSS custom properties; document them. Avoid scattering arbitrary offsets. Preserve native image proportions, provide dimensions and appropriate alt text. Mark redundant illustrative art decorative when nearby text conveys its meaning. Prioritize above-fold image loading selectively; lazy-load only below-fold media. Keep every asset local, no API or backend, no env vars or secrets. Build must output dist/ for S3/CloudFront; single-page anchor navigation, no server routing dependency. Do not create cloud infrastructure or deployment workflows.

VERIFY
Provide npm run dev, lint, typecheck, build and preview scripts. Run applicable checks and fix failures. Inspect production preview in a browser if available at the listed viewport sizes; verify mobile menu, keyboard navigation, anchors, contrast and reduced motion. Inspect console/network for missing assets. Do not claim visual verification if no browser was used. Record honest limitations.

DELIVER
Implement the finished hero and update README with commands, asset mapping, responsive strategy and layer/offset controls. Report changes, actual checks, remaining limitations and how to launch. Continue until implementation and available checks are complete.
