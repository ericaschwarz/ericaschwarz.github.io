import numpy as np
import imageio.v3 as iio
import os

# === Configuration ===
input_path = "sprite_me.png"      # Path to your 256x256 image
output_folder = "."               # Folder to save the 16 blocks
grid_row_size = 4                 # 4x4 grid
grid_column_size = 4              # 4x4 grid
tile_size = 64                    # Each tile will be 64x64 pixels

# === Create output directory if it doesn't exist ===
os.makedirs(output_folder, exist_ok=True)

# === Read the image ===
img = iio.imread(input_path)
h, w = img.shape[:2]

# === Define directions ===
# Only 3 unique rows: down, left, up (we'll flip left to get right)
directions = ['down', 'left', 'up']

# === Split and save ===
for row, direction in enumerate(directions):
    for col in range(grid_column_size):
        y0, y1 = row * tile_size, (row + 1) * tile_size
        x0, x1 = col * tile_size, (col + 1) * tile_size
        tile = img[y0:y1, x0:x1]

        # Save walking frames
        iio.imwrite(os.path.join(output_folder, f"player_walk_{direction}_{col}.png"), tile)

        # Generate idle frames from the first column
        if col == 0:
            for i in range(4):
                iio.imwrite(os.path.join(output_folder, f"player_idle_{direction}_{i}.png"), tile)

        # If it's the left-facing row, create flipped (right-facing) versions
        if direction == 'left':
            flipped = np.fliplr(tile)
            iio.imwrite(os.path.join(output_folder, f"player_walk_right_{col}.png"), flipped)
            if col == 0:
                for i in range(4):
                    iio.imwrite(os.path.join(output_folder, f"player_idle_right_{i}.png"), flipped)

print("Done! Tiles saved (right frames auto-flipped).")
