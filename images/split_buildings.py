import numpy as np
import imageio.v3 as iio
import os

# === Configuration ===
input_path = "pixel_buildings_4.png"      # Path to your 256x256 image
output_folder = "."               # Folder to save the 16 blocks
grid_row_size = 3                 # 4x4 grid
grid_column_size = 3              # 4x4 grid
tile_size = 64                    # Each tile will be 64x64 pixels


goalNames = [
    'solver',
    'translation',
    'multiscale',
    'publications',
    'vision',
    'teaching',
    'cv',
    'contact',
    'teaching'
  ]

# === Create output directory if it doesn't exist ===
os.makedirs(output_folder, exist_ok=True)

# === Read the image ===
img = iio.imread(input_path)
h, w = img.shape[:2]

# === Define directions ===
# Only 3 unique rows: down, left, up (we'll flip left to get right)
directions = ['down', 'left', 'up']


k = 0
# === Split and save ===
for row in range(3):
    for col in range(3):
        y0, y1 = row * tile_size, (row + 1) * tile_size
        x0, x1 = col * tile_size, (col + 1) * tile_size
        tile = img[y0:y1, x0:x1]

        # Save walking frames
        iio.imwrite(os.path.join(output_folder, f"goal_{goalNames[k]}.png"), tile)

        k+=1


print("Done! Tiles saved for buildings.")
