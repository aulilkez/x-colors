// ANSI escape codes constants (pre-computed for max performance)
const ESC = "\x1b[";
const RESET = "\x1b[0m";

// Color codes map (using numeric keys for fastest lookup)
const CODES = {
  // Styles
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  // Foreground colors
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  // Bright foreground colors
  brightRed: [91, 39],
  brightGreen: [92, 39],
  brightYellow: [93, 39],
  brightBlue: [94, 39],
  brightMagenta: [95, 39],
  brightCyan: [96, 39],
  brightWhite: [97, 39],

  // Background colors
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  bgGray: [100, 49],
  bgGrey: [100, 49],

  // Bright background colors
  bgBrightRed: [101, 49],
  bgBrightGreen: [102, 49],
  bgBrightYellow: [103, 49],
  bgBrightBlue: [104, 49],
  bgBrightMagenta: [105, 49],
  bgBrightCyan: [106, 49],
  bgBrightWhite: [107, 49],
} as const;

type StyleName = keyof typeof CODES;

// Fast RGB to ANSI 256 conversion
const rgbToAnsi256 = (r: number, g: number, b: number): number => {
  // Grayscale
  if (r === g && g === b) {
    if (r < 8) return 16;
    if (r > 248) return 231;
    return Math.round(((r - 8) / 247) * 24) + 232;
  }

  // Color
  return (
    16 +
    36 * Math.round((r / 255) * 5) +
    6 * Math.round((g / 255) * 5) +
    Math.round((b / 255) * 5)
  );
};

// Hex to RGB conversion (optimized)
const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.startsWith("#") ? hex.slice(1) : hex;
  const num = parseInt(
    h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h,
    16,
  ) as number;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

// Main tcolors class (optimized for chaining)
class ColorInstance {
  protected str: string;

  constructor(str: string = "") {
    this.str = str;
  }

  // Generate all style methods dynamically
  [key: string]: any;

  // Custom RGB tcolors (foreground)
  rgb(r: number, g: number, b: number): this {
    this.str = `${ESC}38;5;${rgbToAnsi256(r, g, b)}m${this.str}${ESC}39m`;
    return this;
  }

  // Custom RGB background
  bgRgb(r: number, g: number, b: number): this {
    this.str = `${ESC}48;5;${rgbToAnsi256(r, g, b)}m${this.str}${ESC}49m`;
    return this;
  }

  // Hex tcolors support
  hex(tcolors: string): this {
    const [r, g, b] = hexToRgb(tcolors);
    return this.rgb(r, g, b);
  }

  // Hex background
  bgHex(tcolors: string): this {
    const [r, g, b] = hexToRgb(tcolors);
    return this.bgRgb(r, g, b);
  }

  // 256 tcolors support
  ansi256(code: number): this {
    this.str = `${ESC}38;5;${code}m${this.str}${ESC}39m`;
    return this;
  }

  bgAnsi256(code: number): this {
    this.str = `${ESC}48;5;${code}m${this.str}${ESC}49m`;
    return this;
  }

  // True tcolors (24-bit RGB)
  truecolor(r: number, g: number, b: number): this {
    this.str = `${ESC}38;2;${r};${g};${b}m${this.str}${ESC}39m`;
    return this;
  }

  bgTruecolor(r: number, g: number, b: number): this {
    this.str = `${ESC}48;2;${r};${g};${b}m${this.str}${ESC}49m`;
    return this;
  }

  toString(): string {
    return this.str;
  }

  [Symbol.toPrimitive](): string {
    return this.str;
  }
}

// Add all standard styles to prototype (fastest method)
Object.keys(CODES).forEach((name) => {
  const [open, close] = CODES[name as StyleName];
  const openCode = ESC + open + "m";
  const closeCode = ESC + close + "m";

  ColorInstance.prototype[name] = function (this: ColorInstance): ColorInstance {
    this.str = openCode + this.str + closeCode;
    return this;
  };
});

// Main tcolors function (factory pattern for performance)
interface ColorFunction {
  (str: string): ColorInstance;
  [key: string]: any;
}

const tcolors = ((str: string) => new ColorInstance(str)) as ColorFunction;

// Add direct style functions to tcolors object
Object.keys(CODES).forEach((name) => {
  const [open, close] = CODES[name as StyleName];
  const openCode = ESC + open + "m";
  const closeCode = ESC + close + "m";
  
  tcolors[name] = (str: string) => openCode + str + closeCode;
});

// Utility functions
tcolors.strip = (str: string): string => str.replace(/\x1b\[[0-9;]*m/g, "");

tcolors.enabled =
  !("NO_COLOR" in process.env) &&
  ("FORCE_COLOR" in process.env ||
    process.platform !== "win32" ||
    !!process.env.CI ||
    process.stdout?.isTTY);

// Gradient function (optimized)
tcolors.gradient = (text: string, colorsArr: string[]): string => {
  const len = text.length;
  const stops = colorsArr.length - 1;
  let result = "";

  for (let i = 0; i < len; i++) {
    const pos = (i / (len - 1)) * stops;
    const idx = Math.floor(pos);
    const frac = pos - idx;

    const [r1, g1, b1] = hexToRgb(colorsArr[idx]!);
    const [r2, g2, b2] = hexToRgb(colorsArr[Math.min(idx + 1, stops)]!);

    const r = Math.round(r1 + (r2 - r1) * frac);
    const g = Math.round(g1 + (g2 - g1) * frac);
    const b = Math.round(b1 + (b2 - b1) * frac);

    result += `${ESC}38;2;${r};${g};${b}m${text[i]}`;
  }

  return result + RESET;
};

// Rainbow effect
tcolors.rainbow = (text: string): string =>
  tcolors.gradient(text, [
    "#ff0000",
    "#ff7f00",
    "#ffff00",
    "#00ff00",
    "#0000ff",
    "#4b0082",
    "#9400d3",
  ]);

// Export for both ESM and CommonJS
export default tcolors;
export { tcolors, ColorInstance, CODES, rgbToAnsi256, hexToRgb };

// Type definitions
export type Color = typeof tcolors;
