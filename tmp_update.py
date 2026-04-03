import re

with open('gallery.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Generate gallery items
items = ''
for i in range(1, 18):
    idx = i - 1
    items += f'''            <!-- Photo {i} -->
            <div class="gallery-item" data-index="{idx}">
                <div class="gallery-img-wrapper">
                    <img src="assets/gallery/{i}.jpeg" alt="HackWell\\'26 — Photo {i}" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="overlay-content">
                            <div class="overlay-icon">⤢</div>
                            <span class="overlay-label">View Full</span>
                        </div>
                    </div>
                </div>
                <div class="corner-br"></div>
                <div class="gallery-caption">HackWell\\'26 Moments - Photo {i}</div>
            </div>\n'''

new_grid = '<div class="gallery-grid" id="galleryGrid">\n' + items + '            <!-- END OF GALLERY ITEMS -->\n        </div>'
content = re.sub(r'<div class="gallery-grid" id="galleryGrid">.*?</div>\s*</section>', new_grid + '\n    </section>', content, flags=re.DOTALL)

# Generate JS arrays
images_arr = ',\n                '.join([f"'assets/gallery/{i}.jpeg'" for i in range(1, 18)])
alts_arr = ',\n                '.join([f"'HackWell\\'26 — Photo {i}'" for i in range(1, 18)])

new_js = f'''            // ── Lightbox ─────────────────────────────────────────────
            const images = [
                {images_arr}
            ];
            const alts = [
                {alts_arr}
            ];'''

content = re.sub(r'// ── Lightbox ─────────────────────────────────────────────\s*const images = \[.*?\];\s*const alts = \[.*?\];', new_js, content, flags=re.DOTALL)

with open('gallery.html', 'w', encoding='utf-8') as f:
    f.write(content)
