import os
from PIL import Image, ImageDraw

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def render_favicon(size):
    # Render at 4x resolution for anti-aliasing
    scale = 4
    canvas_w = size * scale
    canvas_h = size * scale
    
    img = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # viewBox 0 0 120 100 -> center in canvas with margin
    # scale factor:
    content_scale = (canvas_w * 0.88) / 120.0
    offset_x = (canvas_w - (120 * content_scale)) / 2.0
    offset_y = (canvas_h - (100 * content_scale)) / 2.0

    def transform(x, y):
        return (offset_x + x * content_scale, offset_y + y * content_scale)

    # 1. Left Wing: (15, 90), (38, 18), (55, 58), (38, 90)
    # Color #3B82F6 -> #1E3668
    p1 = [transform(15, 90), transform(38, 18), transform(55, 58), transform(38, 90)]
    draw.polygon(p1, fill=(59, 130, 246, 255))

    # 2. Middle Fold: (38, 18), (60, 62), (82, 18), (60, 38)
    # Color #1E3668 -> #0B1528
    p2 = [transform(38, 18), transform(60, 62), transform(82, 18), transform(60, 38)]
    draw.polygon(p2, fill=(20, 45, 90, 255))

    # 3. Right Wing: (82, 18), (105, 90), (82, 90), (65, 58)
    # Color #2563EB -> #0F1D38
    p3 = [transform(82, 18), transform(105, 90), transform(82, 90), transform(65, 58)]
    draw.polygon(p3, fill=(37, 99, 235, 255))

    # Downsample with Lanczos filter for crisp anti-aliasing
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public"))

sizes = {
    "favicon-48x48.png": 48,
    "favicon-96x96.png": 96,
    "apple-touch-icon.png": 180,
    "favicon-512x512.png": 512,
}

for filename, sz in sizes.items():
    out_path = os.path.join(public_dir, filename)
    fav = render_favicon(sz)
    fav.save(out_path, "PNG")
    print(f"Generated {filename} ({sz}x{sz})")

# Also generate favicon.ico containing 16, 32, 48
ico_path = os.path.join(public_dir, "favicon.ico")
ico_img = render_favicon(48)
ico_img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Generated favicon.ico (16, 32, 48)")
