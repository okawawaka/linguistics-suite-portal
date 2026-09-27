import os
import math
from PIL import Image, ImageDraw, ImageFont

# ==============================================================================
# LINGUISTICS TOOLBOX — REFINED OGP POSTER GENERATOR
# Swiss Typographic Style / Golden Ratio Balance / 1200 x 630 px
# ==============================================================================

WIDTH = 1200
HEIGHT = 630

# Color Palette (Strict Swiss International Style)
COLOR_BG = (255, 255, 255)
COLOR_TEXT_MAIN = (17, 17, 17)        # #111111
COLOR_TEXT_MUTED = (100, 110, 125)    # #646E7D
COLOR_SWISS_RED = (227, 6, 19)        # #E30613
COLOR_FRAME = (17, 17, 17)
COLOR_PLATE_BG = (17, 17, 17)         # Dark quadrant plate
COLOR_PLATE_LINE = (38, 38, 38)       # #262626
COLOR_PLATE_MUTED = (156, 163, 175)   # #9CA3AF
COLOR_WHITE = (255, 255, 255)
COLOR_LIGHT_GRAY = (243, 244, 246)

img = Image.new("RGB", (WIDTH, HEIGHT), COLOR_BG)
draw = ImageDraw.Draw(img)

# Outer Architectural Border
MARGIN = 28
draw.rectangle([MARGIN, MARGIN, WIDTH - MARGIN, HEIGHT - MARGIN], outline=COLOR_FRAME, width=2)

# Load System Fonts
FONT_DIR = "C:/Windows/Fonts"
font_jp_title = ImageFont.truetype(os.path.join(FONT_DIR, "meiryob.ttc"), 46)
font_en_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 40)
font_catch = ImageFont.truetype(os.path.join(FONT_DIR, "meiryob.ttc"), 18)
font_desc = ImageFont.truetype(os.path.join(FONT_DIR, "meiryo.ttc"), 14)
font_mono_bold = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 14)
font_mono_sub = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 12)
font_quad_symbol = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 40)
font_quad_ipa = ImageFont.truetype(os.path.join(FONT_DIR, "meiryob.ttc"), 38)
font_quad_tag = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 11)
font_quad_desc = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 10)

# ==============================================================================
# LEFT COLUMN: BOLD SWISS TYPOGRAPHY (Clean Hierarchy & Generous Whitespace)
# ==============================================================================
LEFT_X = MARGIN + 48
CONTENT_Y = MARGIN + 52

# 1. Top Metadata Overline
draw.rectangle([LEFT_X, CONTENT_Y + 3, LEFT_X + 10, CONTENT_Y + 13], fill=COLOR_SWISS_RED)
draw.text((LEFT_X + 20, CONTENT_Y), "OPEN SOURCE WEB SUITE // EST. 2026", font=font_mono_bold, fill=COLOR_SWISS_RED)

# 2. Main Title Group
TITLE_Y = CONTENT_Y + 36
draw.text((LEFT_X, TITLE_Y), "言語学ツールポータル", font=font_jp_title, fill=COLOR_TEXT_MAIN)
draw.text((LEFT_X, TITLE_Y + 64), "LINGUISTICS TOOLBOX", font=font_en_title, fill=COLOR_SWISS_RED)

# Accent Bar
draw.rectangle([LEFT_X, TITLE_Y + 128, LEFT_X + 54, TITLE_Y + 132], fill=COLOR_TEXT_MAIN)

# 3. Core Narrative & Bullet Feature Summary
SUMMARY_Y = TITLE_Y + 154
draw.text((LEFT_X, SUMMARY_Y), "音声分析 ■ IPA入力 ■ 構文木 ■ 音韻規則", font=font_catch, fill=COLOR_TEXT_MAIN)
draw.text((LEFT_X, SUMMARY_Y + 34), "言語学研究・学習のための4領域特化型Webツール群", font=font_desc, fill=COLOR_TEXT_MUTED)
draw.text((LEFT_X, SUMMARY_Y + 58), "外部サーバー通信なし・完全ブラウザ完結処理", font=font_desc, fill=COLOR_TEXT_MUTED)

# 4. Feature Badges (Geometric Tag Strips)
BADGES_Y = SUMMARY_Y + 104
badges = ["100% CLIENT-SIDE", "NO SERVER UPLOAD", "MIT LICENSE"]
cur_bx = LEFT_X
for b in badges:
    bbox = font_mono_sub.getbbox(b)
    bw = bbox[2] - bbox[0] + 16
    bh = 24
    draw.rectangle([cur_bx, BADGES_Y, cur_bx + bw, BADGES_Y + bh], fill=COLOR_LIGHT_GRAY, outline=COLOR_TEXT_MAIN, width=1)
    draw.text((cur_bx + 8, BADGES_Y + 4), b, font=font_mono_sub, fill=COLOR_TEXT_MAIN)
    cur_bx += bw + 10

# 5. Bottom URL readout
BOTTOM_Y = HEIGHT - MARGIN - 42
draw.line([(MARGIN, BOTTOM_Y - 14), (WIDTH - MARGIN, BOTTOM_Y - 14)], fill=COLOR_LIGHT_GRAY, width=1)
draw.text((LEFT_X, BOTTOM_Y), "https://okawawaka.github.io/linguistics-suite-portal/", font=font_mono_bold, fill=COLOR_TEXT_MAIN)

# ==============================================================================
# RIGHT COLUMN: 4-QUADRANT MONUMENTAL EMBLEM PLATE (420 x 420 px)
# ==============================================================================
PLATE_W = 428
PLATE_H = 428
PLATE_X = WIDTH - MARGIN - PLATE_W - 38
PLATE_Y = MARGIN + 40

# Solid Dark Geometric Plate
draw.rectangle([PLATE_X, PLATE_Y, PLATE_X + PLATE_W, PLATE_Y + PLATE_H], fill=COLOR_PLATE_BG, outline=COLOR_FRAME, width=2)

# Quadrant Divider Crosshair
MID_X = PLATE_X + PLATE_W // 2
MID_Y = PLATE_Y + PLATE_H // 2
draw.line([(MID_X, PLATE_Y + 16), (MID_X, PLATE_Y + PLATE_H - 16)], fill=COLOR_PLATE_LINE, width=2)
draw.line([(PLATE_X + 16, MID_Y), (PLATE_X + PLATE_W - 16, MID_Y)], fill=COLOR_PLATE_LINE, width=2)

# Central Registration Red Square
draw.rectangle([MID_X - 5, MID_Y - 5, MID_X + 5, MID_Y + 5], fill=COLOR_SWISS_RED)

# --- QUADRANT 1 (Top-Left): Acoustic Waveform & LPC Spectrum ---
Q1_X = PLATE_X + 18
Q1_Y = PLATE_Y + 18
draw.text((Q1_X, Q1_Y), "01 / ACOUSTICS", font=font_quad_tag, fill=COLOR_SWISS_RED)
draw.text((Q1_X, Q1_Y + 14), "DSP / LPC / F0", font=font_quad_desc, fill=COLOR_PLATE_MUTED)

# Sound wave bars in Swiss Red
wave_x = Q1_X + 12
wave_baseline = Q1_Y + 145
wave_heights = [18, 38, 64, 92, 110, 78, 52, 96, 68, 42, 24]
for j, wh in enumerate(wave_heights):
    bx = wave_x + j * 15
    by1 = wave_baseline - wh
    by2 = wave_baseline
    bar_color = COLOR_SWISS_RED if j in [3, 4, 7] else (200, 200, 200)
    draw.rectangle([bx, by1, bx + 7, by2], fill=bar_color)

# --- QUADRANT 2 (Top-Right): IPA Typography & Chao Tone Ligature ---
Q2_X = MID_X + 18
Q2_Y = PLATE_Y + 18
draw.text((Q2_X, Q2_Y), "02 / PHONETICS", font=font_quad_tag, fill=COLOR_SWISS_RED)
draw.text((Q2_X, Q2_Y + 14), "339 IPA & Chao Tone", font=font_quad_desc, fill=COLOR_PLATE_MUTED)

# IPA Phonetic Symbol Art [ ʃ ] + Tone Letter
draw.text((Q2_X + 24, Q2_Y + 45), "[ ʃ ]", font=font_quad_ipa, fill=COLOR_WHITE)
draw.text((Q2_X + 115, Q2_Y + 45), "˥˩", font=font_quad_ipa, fill=COLOR_SWISS_RED)
# Sub-spec line
draw.line([(Q2_X + 10, Q2_Y + 118), (Q2_X + 175, Q2_Y + 118)], fill=COLOR_PLATE_LINE, width=1)
draw.text((Q2_X + 10, Q2_Y + 128), "U+0283 / CONSONANT", font=font_quad_desc, fill=COLOR_PLATE_MUTED)

# --- QUADRANT 3 (Bottom-Left): Syntax Tree Diagram ---
Q3_X = PLATE_X + 18
Q3_Y = MID_Y + 18
draw.text((Q3_X, Q3_Y), "03 / FORMAL SYNTAX", font=font_quad_tag, fill=COLOR_SWISS_RED)
draw.text((Q3_X, Q3_Y + 14), "X-Bar & Movement", font=font_quad_desc, fill=COLOR_PLATE_MUTED)

# Mini Tree Diagram Art
NODE_ROOT_X = Q3_X + 90
NODE_ROOT_Y = Q3_Y + 44
# Root TP box
draw.rectangle([NODE_ROOT_X - 16, NODE_ROOT_Y, NODE_ROOT_X + 16, NODE_ROOT_Y + 18], fill=COLOR_SWISS_RED)
draw.text((NODE_ROOT_X - 8, NODE_ROOT_Y + 2), "TP", font=font_quad_desc, fill=COLOR_WHITE)

# Left DP branch
DP_X = NODE_ROOT_X - 52
DP_Y = NODE_ROOT_Y + 44
draw.line([(NODE_ROOT_X - 6, NODE_ROOT_Y + 18), (DP_X + 12, DP_Y)], fill=COLOR_WHITE, width=2)
draw.rectangle([DP_X, DP_Y, DP_X + 24, DP_Y + 16], outline=COLOR_WHITE, width=1)
draw.text((DP_X + 5, DP_Y + 1), "DP", font=font_quad_desc, fill=COLOR_WHITE)

# Right T' branch
T_X = NODE_ROOT_X + 40
T_Y = NODE_ROOT_Y + 44
draw.line([(NODE_ROOT_X + 6, NODE_ROOT_Y + 18), (T_X + 12, T_Y)], fill=COLOR_WHITE, width=2)
draw.rectangle([T_X, T_Y, T_X + 24, T_Y + 16], outline=COLOR_WHITE, width=1)
draw.text((T_X + 6, T_Y + 1), "T'", font=font_quad_desc, fill=COLOR_WHITE)

# Movement dash arrow below
draw.line([(DP_X + 12, DP_Y + 22), (T_X + 12, T_Y + 22)], fill=COLOR_SWISS_RED, width=2)

# --- QUADRANT 4 (Bottom-Right): Phonological Rule & Distinctive Features ---
Q4_X = MID_X + 18
Q4_Y = MID_Y + 18
draw.text((Q4_X, Q4_Y), "04 / PHONOLOGY", font=font_quad_tag, fill=COLOR_SWISS_RED)
draw.text((Q4_X, Q4_Y + 14), "SPE Distinctive Matrix", font=font_quad_desc, fill=COLOR_PLATE_MUTED)

# Phonological Rule formula: /t/ → [tʃ]
draw.text((Q4_X + 10, Q4_Y + 45), "/t/ → [tʃ]", font=font_mono_bold, fill=COLOR_WHITE)
draw.text((Q4_X + 10, Q4_Y + 68), "/ __ [i]", font=font_mono_sub, fill=COLOR_SWISS_RED)

# Feature matrix brackets
MAT_X = Q4_X + 10
MAT_Y = Q4_Y + 95
draw.rectangle([MAT_X, MAT_Y, MAT_X + 160, MAT_Y + 62], outline=(60, 60, 60), fill=(26, 26, 28), width=1)
draw.text((MAT_X + 10, MAT_Y + 8), "+consonantal", font=font_quad_desc, fill=COLOR_PLATE_MUTED)
draw.text((MAT_X + 10, MAT_Y + 24), "+coronal", font=font_quad_desc, fill=COLOR_PLATE_MUTED)
draw.text((MAT_X + 10, MAT_Y + 40), "+delayed release", font=font_quad_desc, fill=COLOR_SWISS_RED)

# 5. Bottom URL readout & Credits
BOTTOM_Y = HEIGHT - MARGIN - 42
draw.line([(MARGIN, BOTTOM_Y - 14), (WIDTH - MARGIN, BOTTOM_Y - 14)], fill=COLOR_LIGHT_GRAY, width=1)
draw.text((LEFT_X, BOTTOM_Y), "https://okawawaka.github.io/linguistics-suite-portal/", font=font_mono_bold, fill=COLOR_TEXT_MAIN)

credit_text = "OKAWAWAKA // MIT LICENSE"
bbox_cr = font_mono_sub.getbbox(credit_text)
w_cr = bbox_cr[2] - bbox_cr[0]
draw.text((WIDTH - MARGIN - 48 - w_cr, BOTTOM_Y + 2), credit_text, font=font_mono_sub, fill=COLOR_TEXT_MUTED)

# Save high-quality output
output_path = "assets/ogp.png"
img.save(output_path, "PNG", quality=95)
print(f"Refined Swiss OGP image successfully saved at: {output_path} ({os.path.getsize(output_path)} bytes)")
