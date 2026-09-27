import os
from PIL import Image, ImageDraw, ImageFont

# Canvas dimensions
WIDTH = 1200
HEIGHT = 630

# Colors (Swiss Style Palette)
BG_COLOR = (255, 255, 255)
TEXT_PRIMARY = (17, 17, 17)        # #111111
TEXT_MUTED = (107, 114, 128)       # #6B7280
SWISS_RED = (227, 6, 19)          # #E30613
BORDER_DARK = (17, 17, 17)
BORDER_LIGHT = (229, 231, 235)     # #E5E7EB
CARD_BG = (250, 250, 252)

# Create image
img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
draw = ImageDraw.Draw(img)

# Outer Border (Swiss Poster Frame)
BORDER_MARGIN = 24
draw.rectangle(
    [BORDER_MARGIN, BORDER_MARGIN, WIDTH - BORDER_MARGIN, HEIGHT - BORDER_MARGIN],
    outline=BORDER_DARK,
    width=3
)

# Load Fonts
FONT_DIR = "C:/Windows/Fonts"
font_title_en = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 48)
font_title_jp = ImageFont.truetype(os.path.join(FONT_DIR, "meiryob.ttc"), 44)
font_subtitle = ImageFont.truetype(os.path.join(FONT_DIR, "meiryo.ttc"), 20)
font_mono_bold = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 16)
font_mono_small = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 14)
font_card_num = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 22)
font_card_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 17)
font_card_desc = ImageFont.truetype(os.path.join(FONT_DIR, "meiryo.ttc"), 13)

# 1. Header Band
HEADER_Y = BORDER_MARGIN + 32
# Red square accent
draw.rectangle([BORDER_MARGIN + 36, HEADER_Y + 2, BORDER_MARGIN + 36 + 14, HEADER_Y + 16], fill=SWISS_RED)
draw.text((BORDER_MARGIN + 60, HEADER_Y), "LINGUISTICS TOOLBOX // PORTAL", font=font_mono_bold, fill=TEXT_PRIMARY)

header_right_text = "100% CLIENT-SIDE ■ NO SERVER UPLOAD ■ OPEN SOURCE"
bbox_r = font_mono_small.getbbox(header_right_text)
w_r = bbox_r[2] - bbox_r[0]
draw.text((WIDTH - BORDER_MARGIN - 36 - w_r, HEADER_Y + 2), header_right_text, font=font_mono_small, fill=TEXT_MUTED)

# Header separator line
draw.line([(BORDER_MARGIN, HEADER_Y + 36), (WIDTH - BORDER_MARGIN, HEADER_Y + 36)], fill=BORDER_DARK, width=2)

# 2. Main Title Section
MAIN_Y = HEADER_Y + 54

# Japanese Main Title
draw.text((BORDER_MARGIN + 36, MAIN_Y), "言語学ツールポータル", font=font_title_jp, fill=TEXT_PRIMARY)

# English Brand Subtitle
draw.text((BORDER_MARGIN + 36, MAIN_Y + 62), "LINGUISTICS TOOLBOX", font=font_title_en, fill=SWISS_RED)

# Tagline
draw.text((BORDER_MARGIN + 36, MAIN_Y + 130), "音声分析・IPA記号入力・構文木・音韻規則の4領域を網羅するWebアプリケーション群", font=font_subtitle, fill=TEXT_PRIMARY)

# Decorative Swiss coordinate / specs box on right
SPEC_BOX_X = WIDTH - BORDER_MARGIN - 320
SPEC_BOX_Y = MAIN_Y + 6
SPEC_BOX_W = 284
SPEC_BOX_H = 150
draw.rectangle([SPEC_BOX_X, SPEC_BOX_Y, SPEC_BOX_X + SPEC_BOX_W, SPEC_BOX_Y + SPEC_BOX_H], fill=CARD_BG, outline=BORDER_DARK, width=1)
draw.rectangle([SPEC_BOX_X, SPEC_BOX_Y, SPEC_BOX_X + SPEC_BOX_W, SPEC_BOX_Y + 28], fill=BORDER_DARK)
draw.text((SPEC_BOX_X + 12, SPEC_BOX_Y + 6), "CORE ARCHITECTURE", font=font_mono_small, fill=(255, 255, 255))

specs = [
    ("AUDIO DSP", "16-bit PCM / Burg LPC / F0"),
    ("PHONETICS", "339 IPA / Chao Tone"),
    ("SYNTAX", "Penn Treebank / X-Bar"),
    ("PHONOLOGY", "SPE Distinctive Matrix")
]
for i, (k, v) in enumerate(specs):
    sy = SPEC_BOX_Y + 36 + i * 27
    draw.text((SPEC_BOX_X + 12, sy), k, font=font_mono_small, fill=SWISS_RED)
    draw.text((SPEC_BOX_X + 105, sy), v, font=font_mono_small, fill=TEXT_PRIMARY)

# Separator before cards
CARDS_TOP_Y = MAIN_Y + 185
draw.line([(BORDER_MARGIN, CARDS_TOP_Y), (WIDTH - BORDER_MARGIN, CARDS_TOP_Y)], fill=BORDER_DARK, width=2)

# 3. 4 Tool Cards Grid
CARD_GAP = 12
CARDS_PAD_X = BORDER_MARGIN + 24
AVAILABLE_WIDTH = (WIDTH - BORDER_MARGIN * 2) - 48
CARD_W = (AVAILABLE_WIDTH - CARD_GAP * 3) // 4
CARD_H = 175
CARD_Y = CARDS_TOP_Y + 20

cards_data = [
    {
        "num": "01",
        "title": "Acoustic Annotator",
        "desc1": "ブラウザ音響分析",
        "desc2": "Praat TextGrid エディタ",
        "meta": "LPC / F0 / VAD"
    },
    {
        "num": "02",
        "title": "IPA Editor",
        "desc1": "国際音声字母エディタ",
        "desc2": "声調記号自動合字",
        "meta": "339 SYMBOLS"
    },
    {
        "num": "03",
        "title": "Syntax Tree Editor",
        "desc1": "構文木・樹形図エディタ",
        "desc2": "構成素移動矢印描画",
        "meta": "X-BAR / LATEX"
    },
    {
        "num": "04",
        "title": "Phonological Rule",
        "desc1": "音韻規則・音変化エディタ",
        "desc2": "SPE示差特徴マトリクス",
        "meta": "KATEX / SVG"
    }
]

for i, card in enumerate(cards_data):
    cx = CARDS_PAD_X + i * (CARD_W + CARD_GAP)
    cy = CARD_Y
    # Card background and border
    draw.rectangle([cx, cy, cx + CARD_W, cy + CARD_H], fill=CARD_BG, outline=BORDER_DARK, width=1)
    
    # Top red index tab
    draw.rectangle([cx, cy, cx + 46, cy + 28], fill=BORDER_DARK)
    draw.text((cx + 10, cy + 4), card["num"], font=font_card_num, fill=(255, 255, 255))
    
    # Meta pill
    draw.text((cx + 56, cy + 8), card["meta"], font=font_mono_small, fill=SWISS_RED)
    
    # Card Title
    draw.text((cx + 12, cy + 42), card["title"], font=font_card_title, fill=TEXT_PRIMARY)
    
    # Divider
    draw.line([(cx + 12, cy + 74), (cx + CARD_W - 12, cy + 74)], fill=BORDER_LIGHT, width=1)
    
    # Card Desc
    draw.text((cx + 12, cy + 86), card["desc1"], font=font_card_desc, fill=TEXT_PRIMARY)
    draw.text((cx + 12, cy + 110), card["desc2"], font=font_card_desc, fill=TEXT_MUTED)
    
    # Bottom accent line
    draw.rectangle([cx, cy + CARD_H - 4, cx + CARD_W, cy + CARD_H], fill=SWISS_RED)

# 4. Footer Bar
FOOTER_Y = HEIGHT - BORDER_MARGIN - 42
draw.line([(BORDER_MARGIN, FOOTER_Y), (WIDTH - BORDER_MARGIN, FOOTER_Y)], fill=BORDER_DARK, width=2)

FOOTER_CONTENT_Y = FOOTER_Y + 12
draw.text((BORDER_MARGIN + 36, FOOTER_CONTENT_Y), "URL: https://okawawaka.github.io/linguistics-suite-portal/", font=font_mono_small, fill=TEXT_PRIMARY)

copy_text = "OKAWAWAKA // MIT LICENSE"
bbox_c = font_mono_small.getbbox(copy_text)
w_c = bbox_c[2] - bbox_c[0]
draw.text((WIDTH - BORDER_MARGIN - 36 - w_c, FOOTER_CONTENT_Y), copy_text, font=font_mono_small, fill=TEXT_MUTED)

# Ensure assets directory exists
os.makedirs("assets", exist_ok=True)
output_path = "assets/ogp.png"
img.save(output_path, "PNG", quality=95)
print(f"Generated OGP image successfully at: {output_path} ({os.path.getsize(output_path)} bytes)")
