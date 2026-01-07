# logical pixel grid (2 vertical pixels per char)
W, H = 8, 6
pixels = [[0]*W for _ in range(H)]

# horizontal
for x in range(1, 7):
    pixels[3][x] = 1

# vertical
for y in range(1, 5):
    pixels[y][4] = 1

RESET = "\033[0m"
FG = "\033[38;2;255;255;255m"
BG = "\033[48;2;255;255;255m"

for y in range(0, H, 2):
    row = ""
    for x in range(W):
        top = pixels[y][x]
        bottom = pixels[y+1][x] if y+1 < H else 0

        if top and bottom:
            row += FG + BG + "█"
        elif top:
            row += FG + "▀"
        elif bottom:
            row += BG + "▄"
        else:
            row += RESET + " "
    print(row + RESET)

