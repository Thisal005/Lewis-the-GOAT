# Hamilton Hero Implementation Kit

1. Extract this kit into your coding workspace (for example design-kit/).
2. Give your agent 01-build-prompt.md and reference/hero-design-reference.png. Adjust the kit-relative paths in the prompt if needed.
3. The agent should copy public/images/ into the React application's public/images/ without replacing unrelated files.
4. Run 02-review-prompt.md after implementation.

## Assets
- hamilton.png: original transparent Hamilton cutout; 735x835.
- hamilton-goat.png: original transparent GOAT cutout; 1176x1337.
- ferrari-44.png: original transparent car cutout; 1672x941.
- burgundy-backdrop.png: original background texture.
- reference/hero-design-reference.png: generated visual reference only, not a deployed page background.

The supplied PNGs are copied unchanged with clear names. No additional bitmap asset is required for the hero; gradients, light beams, grain and typography can be implemented in CSS/HTML. The source portrait resolution limits how sharp very large desktop renderings can look. The reference includes lighting and atmosphere that CSS can approximate but cannot reproduce exactly on existing portraits.

Keep navigation, heading and buttons as real HTML. Adapt mobile composition instead of shrinking a desktop poster. Preserve transparency, aspect ratios, face visibility and clickable controls.

Images are user supplied; this bundle does not establish reuse licenses or official affiliation. Retain the unofficial fan portfolio note. Font files are not bundled; use available licensed local fonts or fallbacks.
