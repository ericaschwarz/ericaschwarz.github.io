import numpy as np
import imageio.v3 as iio
import os

# === Config ===
prefix = "floor"
input_path = f"{prefix}_full_tiles.png"
output_folder = "tiles"
os.makedirs(output_folder, exist_ok=True)

# === Load and split into 16 micro-tiles ===
img = iio.imread(input_path)
h, w = img.shape[:2]
rows, cols = 4, 4
mh, mw = h // rows, w // cols

micro_tiles = []
for r in range(rows):
    for c in range(cols):
        y0, y1 = r * mh, (r + 1) * mh
        x0, x1 = c * mw, (c + 1) * mw
        micro_tiles.append(img[y0:y1, x0:x1])

# === Define 4×4 index patterns ===
# (example placeholders; adjust to match your layout)
patterns = {
    "isolated": [
        [13, 0, 1, 15],
        [2, 11, 10, 2],
        [3, 9, 8, 3],
        [13, 0, 1, 14]
    ],
    "cross": [
        [13, 13, 14, 14],
        [15, 6, 7, 13],
        [14, 4, 5, 13],
        [14, 13, 15, 13]
    ],
    "vertical": [
        [14, 13, 13, 14],
        [2, 2, 2, 2],
        [3, 3, 3, 3],
        [13, 14, 15, 13]
    ],
    "open": [
        [13, 13, 14, 14],
        [15, 6, 2, 2],
        [14, 4, 3, 3],
        [14, 13, 14, 13]
    ],
    "end": [
        [15, 0, 1, 14],
        [13, 0, 10, 2],
        [14, 0, 8, 3],
        [13, 0, 1, 13]
    ],
    "corner": [
        [15, 0, 1, 14],
        [13, 0, 10, 2],
        [14, 4, 3, 3],
        [13, 13, 14, 13]
    ]
}

# === Assemble macro-tile from pattern ===
def build_tile(pattern):
    rows = []
    for row in pattern:
        row_imgs = [micro_tiles[i] for i in row]
        rows.append(np.concatenate(row_imgs, axis=1))
    return np.concatenate(rows, axis=0)

# === Generate all tiles ===
rotatable = ["corner", "end", "open", "vertical"]
directions = ["left", "up", "right", "down"]

for name, pattern in patterns.items():

    # Non-rotatable tiles (e.g., isolated, cross, vertical)
    if name not in rotatable:
        tile = build_tile(pattern)
        iio.imwrite(os.path.join(output_folder, f"{prefix}_{name}.png"), tile)
        continue

    # Generate four rotations
    for i, dir in enumerate(directions):
        # Rotate clockwise: np.rot90 rotates counterclockwise, so use -i
        rotated = build_tile(np.rot90(pattern, -i))
        filename = f"{prefix}_{name}_{dir}.png"
        iio.imwrite(os.path.join(output_folder, filename), rotated)

print(f"Saved tiles to '{output_folder}'")