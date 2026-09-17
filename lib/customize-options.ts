export type Option = {
  id: string;
  label: string;
  description: string;
};

export type Swatch = {
  id: string;
  label: string;
  hex: string;
};

export const PALETTE: Swatch[] = [
  { id: "black", label: "Black", hex: "#0A0A0A" },
  { id: "charcoal", label: "Charcoal grey", hex: "#2B2B2B" },
  { id: "stone", label: "Stone", hex: "#B9B2AC" },
  { id: "grey", label: "Grey", hex: "#DAD5D2" },
  { id: "white", label: "White", hex: "#FFFFFF" },
  { id: "cream", label: "Cream", hex: "#F4EFE9" },
  { id: "sand", label: "Sand", hex: "#E4D9C7" },
  { id: "navy", label: "Navy", hex: "#0B1E3A" },
  { id: "blue", label: "Blue", hex: "#1E3A8A" },
  { id: "teal", label: "Teal", hex: "#148C8C" },
  { id: "forest", label: "Forest green", hex: "#14432A" },
  { id: "olive", label: "Olive", hex: "#6B7A4F" },
  { id: "lime", label: "Lime", hex: "#84CC16" },
  { id: "burgundy", label: "Burgundy", hex: "#6E0D25" },
  { id: "red", label: "Red", hex: "#FF2E3B" },
  { id: "terracotta", label: "Terracotta", hex: "#C1653A" },
  { id: "orange", label: "Orange", hex: "#F77737" },
  { id: "gold", label: "Gold", hex: "#D4AF37" },
  { id: "yellow", label: "Yellow", hex: "#FCAF45" },
  { id: "purple", label: "Purple", hex: "#833AB4" },
  { id: "magenta", label: "Magenta", hex: "#E1306C" },
  { id: "pastel-pink", label: "Pastel pink", hex: "#FBCFE8" },
  { id: "pastel-blue", label: "Pastel blue", hex: "#BFDBFE" },
];

export const BACKGROUND_STYLES: Option[] = [
  { id: "solid", label: "Solid colour", description: "One flat background colour on every page. Simple and fast-loading." },
  { id: "gradient-wash", label: "Soft gradient wash", description: "A subtle colour blend behind sections, like the one on this site right now." },
  { id: "photo", label: "Full-width photo", description: "A large photo of your shop, product, or team behind the main heading." },
  { id: "pattern", label: "Pattern or texture", description: "A subtle repeating pattern or texture instead of a flat colour." },
];

export const IMAGE_OPTIONS: Option[] = [
  { id: "stock", label: "We supply stock photos", description: "We pick professional, relevant photos for you at no extra cost." },
  { id: "own", label: "I'll provide my own photos", description: "You send us photos of your business, products, or team to use." },
  { id: "shoot", label: "Book a photoshoot", description: "We arrange a photographer to shoot your business. This is a paid add-on." },
];

export function swatchLabel(id: string | null) {
  return PALETTE.find((s) => s.id === id)?.label ?? null;
}
export function swatchHex(id: string | null) {
  return PALETTE.find((s) => s.id === id)?.hex ?? null;
}
export function optionLabel(list: Option[], id: string | null) {
  return list.find((o) => o.id === id)?.label ?? null;
}
