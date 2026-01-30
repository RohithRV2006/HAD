import os
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

def resize_image(image_path, output_path, max_width=400):
    try:
        with Image.open(image_path) as img:
            ratio = max_width / float(img.size[0])
            height = int((float(img.size[1]) * float(ratio)))
            new_img = img.resize((max_width, height), Image.Resampling.LANCZOS)
            new_img.save(output_path, quality=85, optimize=True)
            print(f"Resized {image_path} to {output_path}")
    except Exception as e:
        print(f"Error resizing {image_path}: {e}")

base_path = r"d:\Hackwell'26\HW'26\assets"
tech_shiksha = os.path.join(base_path, "tech-shiksha.jpg")

# Resize in place or to temp to check
resize_image(tech_shiksha, tech_shiksha)
