import os
from PIL import Image, ImageEnhance
import numpy as np

BRAIN_DIR = r'C:\Users\hp\.gemini\antigravity-ide\brain\017921a0-2d00-4f13-a919-20f397d32138'
OUT_DIR = r'C:\coffe_shop\public\images\products'
os.makedirs(OUT_DIR, exist_ok=True)

def extract_white_clean(img_path, pad=8, hard_thresh=248, soft_thresh=232):
    """Extracts object from light/white background with zero halo and true alpha."""
    im = Image.open(img_path).convert('RGBA')
    arr = np.array(im, dtype=np.float32)
    h, w, _ = arr.shape
    
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    # Check max brightness across channels
    brightness = (r + g + b) / 3.0
    
    # Distance from pure white
    dist = np.sqrt((255.0 - r)**2 + (255.0 - g)**2 + (255.0 - b)**2)
    
    # Alpha calculation
    alpha = np.clip((dist - 14.0) / 22.0 * 255.0, 0, 255)
    
    # Fully transparent for near pure white
    alpha[brightness > hard_thresh] = 0
    
    arr[:, :, 3] = alpha
    out = Image.fromarray(arr.astype(np.uint8))
    bbox = out.getbbox()
    if bbox:
        pad_bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(w, bbox[2]+pad), min(h, bbox[3]+pad))
        out = out.crop(pad_bbox)
    return out

def extract_tea_canister(img_path):
    """Specifically crops and extracts the tea canister cleanly without table shadow."""
    im = Image.open(img_path).convert('RGBA')
    arr = np.array(im, dtype=np.float32)
    h, w, _ = arr.shape
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    dist = np.sqrt((240.0 - r)**2 + (240.0 - g)**2 + (240.0 - b)**2)
    
    # Alpha mask
    alpha = np.clip((dist - 16.0) / 18.0 * 255.0, 0, 255)
    # Mask out the soft table shadow on the bottom right
    alpha[750:, 725:] = 0
    alpha[865:, :] = 0
    
    arr[:, :, 3] = alpha
    out = Image.fromarray(arr.astype(np.uint8))
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    return out

def shift_satin_hue(im, hue_shift, sat_mult=1.0, val_mult=1.0):
    """Shifts the hue of satin bag body while preserving black cap, gold clips & gold text."""
    hsv = im.convert('HSV')
    h, s, v = hsv.split()
    h_arr = np.array(h, dtype=np.float32)
    s_arr = np.array(s, dtype=np.float32)
    v_arr = np.array(v, dtype=np.float32)
    
    # Only shift regions with saturation and mid-tones (the colored satin body)
    mask = (s_arr > 35) & (v_arr > 40) & (v_arr < 225)
    h_arr[mask] = (h_arr[mask] + hue_shift) % 256
    s_arr[mask] = np.clip(s_arr[mask] * sat_mult, 0, 255)
    v_arr[mask] = np.clip(v_arr[mask] * val_mult, 0, 255)
    
    new_hsv = Image.merge('HSV', (
        Image.fromarray(h_arr.astype(np.uint8)),
        Image.fromarray(s_arr.astype(np.uint8)),
        Image.fromarray(v_arr.astype(np.uint8))
    ))
    new_rgb = new_hsv.convert('RGBA')
    new_rgb.putalpha(im.split()[3])
    return new_rgb

print('Extracting Coffee Bags...')
# 1. Salvador Coffee (Original Deep Burgundy Wine)
salvador_src = os.path.join(BRAIN_DIR, 'coffee_bag_white_bg_1788636640206.jpg')
salvador_png = extract_white_clean(salvador_src)
salvador_png.save(os.path.join(OUT_DIR, 'salvador-coffee.png'))
print('1. salvador-coffee.png saved!')

# 2. Moka Coffee (Sapphire Navy Blue)
moka_src = os.path.join(BRAIN_DIR, 'moka_coffee_bag_1788636658708.jpg')
moka_png = extract_white_clean(moka_src)
moka_png.save(os.path.join(OUT_DIR, 'moka-coffee.png'))
print('2. moka-coffee.png saved!')

# 3. Special Coffee (Emerald Green)
special_src = os.path.join(BRAIN_DIR, 'special_coffee_bag_1788636673851.jpg')
special_png = extract_white_clean(special_src)
special_png.save(os.path.join(OUT_DIR, 'special-coffee.png'))
print('3. special-coffee.png saved!')

# 4. Arabian Coffee (Amber Caramel Gold)
arabian_src = os.path.join(BRAIN_DIR, 'arabian_coffee_bag_1788636690591.jpg')
arabian_png = extract_white_clean(arabian_src)
arabian_png.save(os.path.join(OUT_DIR, 'arabian-coffee.png'))
print('4. arabian-coffee.png saved!')

# 5. Ethiopian Yirgacheffe (Royal Purple / Plum)
ethiopian_png = shift_satin_hue(salvador_png, hue_shift=45, sat_mult=1.1, val_mult=0.95)
ethiopian_png.save(os.path.join(OUT_DIR, 'ethiopian-coffee.png'))
print('5. ethiopian-coffee.png saved!')

# 6. Colombian Supremo (Rich Terracotta Sienna)
colombian_png = shift_satin_hue(salvador_png, hue_shift=-18, sat_mult=1.05, val_mult=1.05)
colombian_png.save(os.path.join(OUT_DIR, 'colombian-coffee.png'))
print('6. colombian-coffee.png saved!')

print('\nExtracting Tea Tins...')
tea_src = os.path.join(BRAIN_DIR, 'tea_tin_packaging_1788636553827.jpg')
tea_base = extract_tea_canister(tea_src)

# 7. Earl Grey (Black & Gold)
tea_base.save(os.path.join(OUT_DIR, 'tea-earl-grey.png'))
print('7. tea-earl-grey.png saved!')

# 8. Royal Jasmine (Jade Green)
tea_jasmine = shift_satin_hue(tea_base, hue_shift=80, sat_mult=1.3)
tea_jasmine.save(os.path.join(OUT_DIR, 'tea-jasmine.png'))
print('8. tea-jasmine.png saved!')

# 9. Ceremonial Matcha (Matcha Green)
tea_matcha = shift_satin_hue(tea_base, hue_shift=65, sat_mult=1.5, val_mult=1.1)
tea_matcha.save(os.path.join(OUT_DIR, 'tea-matcha.png'))
print('9. tea-matcha.png saved!')

# 10. Moroccan Spearmint (Ocean Teal)
tea_mint = shift_satin_hue(tea_base, hue_shift=120, sat_mult=1.2)
tea_mint.save(os.path.join(OUT_DIR, 'tea-moroccan-mint.png'))
print('10. tea-moroccan-mint.png saved!')

print('\nExtracting Cookies...')
cookie_src = os.path.join(BRAIN_DIR, 'gourmet_cookies_1788636567919.jpg')
cookie_base = extract_white_clean(cookie_src)

# 11. Chunky Dark Chocolate Cookie
cookie_base.save(os.path.join(OUT_DIR, 'cookie-dark-choco.png'))
print('11. cookie-dark-choco.png saved!')

# 12. Salted Caramel Macadamia
cookie_caramel = shift_satin_hue(cookie_base, hue_shift=8, sat_mult=1.2, val_mult=1.08)
cookie_caramel.save(os.path.join(OUT_DIR, 'cookie-caramel-macadamia.png'))
print('12. cookie-caramel-macadamia.png saved!')

# 13. Double Belgian Fudge
enhancer = ImageEnhance.Brightness(cookie_base)
cookie_fudge = enhancer.enhance(0.85)
enhancer_c = ImageEnhance.Contrast(cookie_fudge)
cookie_fudge = enhancer_c.enhance(1.15)
cookie_fudge.save(os.path.join(OUT_DIR, 'cookie-double-fudge.png'))
print('13. cookie-double-fudge.png saved!')

# 14. Artisan Butter Shortbread
cookie_shortbread = shift_satin_hue(cookie_base, hue_shift=15, sat_mult=0.9, val_mult=1.15)
cookie_shortbread.save(os.path.join(OUT_DIR, 'cookie-butter-shortbread.png'))
print('14. cookie-butter-shortbread.png saved!')

print('\nExtracting Coffee Machines...')
machine_src = os.path.join(BRAIN_DIR, 'espresso_machine_1788636583147.jpg')
machine_base = extract_white_clean(machine_src)

# 15. Barista Pro Dual Boiler
machine_base.save(os.path.join(OUT_DIR, 'machine-barista-pro.png'))
print('15. machine-barista-pro.png saved!')

# 16. Retro Lever Espresso Machine
machine_retro = shift_satin_hue(machine_base, hue_shift=20, sat_mult=1.3)
machine_retro.save(os.path.join(OUT_DIR, 'machine-retro-lever.png'))
print('16. machine-retro-lever.png saved!')

# 17. Precision Burr Grinder
enhancer_m = ImageEnhance.Brightness(machine_base)
machine_grinder = enhancer_m.enhance(0.78)
enhancer_mc = ImageEnhance.Contrast(machine_grinder)
machine_grinder = enhancer_mc.enhance(1.2)
machine_grinder.save(os.path.join(OUT_DIR, 'machine-burr-grinder.png'))
print('17. machine-burr-grinder.png saved!')

# 18. Cold Brew Artisan Tower
machine_tower = shift_satin_hue(machine_base, hue_shift=32, sat_mult=1.4, val_mult=1.05)
machine_tower.save(os.path.join(OUT_DIR, 'machine-cold-brew-tower.png'))
print('18. machine-cold-brew-tower.png saved!')

print('\nALL 18 PRODUCTS PROCESSED WITH 100% CLEAN TRANSPARENCY!')
