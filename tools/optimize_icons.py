"""Generate metadata-free Android PNG launcher assets from one square branding source.

Usage:
  python3 tools/optimize_icons.py path/to/source.png app/src/main/res
"""

from pathlib import Path
import sys

from PIL import Image


def write_png(source: Image.Image, target: Path, size: int) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    rendered = source.resize((size, size), Image.Resampling.LANCZOS)
    # Re-create the bitmap so EXIF and other unnecessary metadata are not retained.
    clean = Image.new("RGBA", rendered.size)
    clean.alpha_composite(rendered)
    clean.save(target, "PNG", optimize=True, compress_level=9)


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: optimize_icons.py SOURCE.png RES_DIRECTORY")

    source_path = Path(sys.argv[1])
    resource_root = Path(sys.argv[2])
    with Image.open(source_path) as image:
        source = image.convert("RGBA")

    densities = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
    for density, edge in densities.items():
        write_png(source, resource_root / f"mipmap-{density}" / "ic_launcher.png", edge)

    write_png(source, resource_root / "drawable" / "splash_logo.png", 512)


if __name__ == "__main__":
    main()
