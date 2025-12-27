# 🎨 tcolorss

<div align="center">

[![npm version](https://img.shields.io/npm/v/tcolorss.svg?style=flat-square)](https://www.npmjs.com/package/tcolorss)
[![npm downloads](https://img.shields.io/npm/dm/tcolorss.svg?style=flat-square)](https://www.npmjs.com/package/tcolorss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/tcolorss?style=flat-square)](https://bundlephobia.com/package/tcolorss)
[![license](https://img.shields.io/npm/l/tcolorss.svg?style=flat-square)](https://github.com/aulilkez/tcolorss/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/aulilkez/tcolorss?style=flat-square)](https://github.com/aulilkez/tcolorss)

**⚡ The fastest ANSI color library for Node.js with zero dependencies**

Built for maximum performance and developer experience.

[Installation](#-installation) • [Quick Start](#-quick-start) • [API](#-api-documentation) • [Benchmarks](#-performance-benchmarks) • [Examples](#-advanced-usage)

</div>

---

## 📑 Table of Contents

- [Why tcolors?](#-why-tcolors)
- [Features](#-features)
- [Performance Benchmarks](#-performance-benchmarks)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
  - [Basic Colors](#basic-colors)
  - [Background Colors](#background-colors)
  - [Bright Colors](#bright-colors)
  - [Text Styles](#text-styles)
  - [Chaining Methods](#chaining-methods)
  - [RGB & Hex Colors](#rgb--hex-colors)
  - [True Color (24-bit)](#true-color-24-bit)
  - [ANSI 256 Colors](#ansi-256-colors)
  - [Gradients & Rainbow](#gradients--rainbow)
  - [Direct Functions](#direct-functions)
  - [Utility Methods](#utility-methods)
- [Advanced Usage](#-advanced-usage)
- [Environment Support](#-environment-support)
- [TypeScript Support](#-typescript-support)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Why tcolors?

`tcolors` is built from the ground up with **performance as the #1 priority**. It provides a rich feature set while consistently outperforming popular alternatives.

```javascript
// 🐌 Other libraries (100k ops)
chalk.red.bold('text');      // ~451ms
kleur.red().bold('text');    // ~726ms

// ⚡ tcolors
tcolors('text').red().bold(); // ~193ms
tcolors.red('text');          // Even faster for single styles!
```

**Up to 145% faster than Chalk** • **Almost 300% faster than Kleur** • **Zero dependencies**

---

## ✨ Features

### Core Features
- 🚀 **Blazing Fast** - Significantly faster than popular alternatives in overall performance.
- 📦 **Zero Dependencies** - No bloat, pure speed, tiny bundle size.
- 🔥 **Dual Module** - Full ESM and CommonJS support.
- 💪 **TypeScript First** - Complete type definitions included.
- 🪶 **Lightweight** - Only ~2KB minified.
- ⛓️ **Chainable API** - Intuitive and flexible.

### Color Support
- 🎨 **16 Basic Colors** - Standard ANSI colors.
- ✨ **Bright Colors** - 8 additional bright variants.
- 🖼️ **Background Colors** - All colors available as backgrounds.
- 🌈 **RGB Support** - Converts RGB to the nearest ANSI 256 color.
- #️⃣ **Hex Colors** - Use hex color codes (e.g., `#ff6347`).
- 🎯 **True Color** - 24-bit RGB (16.7 million colors) for maximum precision.
- 🔢 **ANSI 256** - Full support for the 256 color palette.
- 📊 **Gradients** - Create beautiful multi-color transitions.
- 🌟 **Rainbow** - Automatic rainbow effects on text.

### Developer Experience
- 🎭 **Multiple Styles** - Bold, italic, underline, and more.
- 🔗 **Method Chaining** - Combine multiple styles with ease.
- 🎪 **Direct Calls** - A separate, faster API for single styles.
- 🛠️ **Utilities** - Strip ANSI codes and automatic color support detection.
- 📝 **Template Literals** - Works seamlessly with strings via automatic `toString`.
- 🌍 **Universal** - Node.js 14+ support.
- 🧪 **Well Tested** - Comprehensive test suite.

---

## 📊 Performance Benchmarks

> **Note:** Benchmark results can fluctuate based on system activity and environment. The key takeaway is the performance *ratio* between libraries, which remains consistent.

Benchmark results running 100,000 iterations. Lower is better.

| Test | tcolors | Chalk | Kleur | Winner |
|------|--------|-------|-------|--------|
| Simple color | 15.72ms | 20.78ms | 15.68ms | 🏆 Kleur |
| **Chained styles** | **16.21ms** | 21.64ms | 239.79ms | 🏆 **Tcolor** |
| **RGB color** | **16.81ms** | 147.25ms | Not Supported | 🏆 **Tcolor** |
| **Hex color** | **52.72ms** | 218.46ms | Not Supported | 🏆 **Tcolor** |
| **Background + foreground** | **12.56ms** | 23.28ms | 253.11ms | 🏆 **Tcolor** |
| **Multiple styles** | **22.71ms** | 41.88ms | 260.28ms | 🏆 **Tcolor** |
| **Direct function call** | **7.74ms** | 17.68ms | 11.24ms | 🏆 **Tcolor** |
| Strip ANSI codes | 32.09ms | 30.60ms | 30.27ms | 🏆 Kleur |

### Performance Graph (Total Time)

```
tcolors: ███████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 176.55ms
Chalk:  ████████████████████████████████░░░░░░░░░░░░░░░░░░ 521.58ms (+195% slower)
Kleur:  ██████████████████████████████████████████████████ 810.36ms (+359% slower)
```

### Why So Fast?

1.  **Pre-computed ANSI strings** - Style methods use pre-computed strings instead of concatenating on every call.
2.  **Inlined Functions** - Critical code paths are optimized by removing extra function calls.
3.  **Prototype-based Methods** - The fastest way to generate chainable methods for class instances.
4.  **Optimized Converters** - Highly efficient `rgbToAnsi256` and `hexToRgb` functions.
5.  **Zero Dependencies** - No overhead from external libraries.

**Run benchmarks yourself:**
```bash
npm run benchmark
```

---

## 📦 Installation

### npm
```bash
npm install tcolors
```

### yarn
```bash
yarn add tcolors
```

### pnpm
```bash
pnpm add tcolors
```

### Requirements
- Node.js >= 14.0.0
- Works with any bundler (Webpack, Rollup, Vite, esbuild, etc.)
- Compatible with TypeScript 4.0+

---

## 🚀 Quick Start

### Basic Usage (ESM)

```javascript
import tcolors from 'tcolors';

// Simple colors
console.log(tcolors('Hello World').red());
console.log(tcolors('Success!').green().bold());
console.log(tcolors('Warning').yellow().underline());

// Background colors
console.log(tcolors('Error').white().bgRed());

// Chaining multiple styles
console.log(tcolors('Important').red().bold().underline().bgYellow());

// Direct function calls for single styles (faster)
console.log(tcolors.blue('Blue text'));
```

### CommonJS

```javascript
const tcolors = require('tcolors');

console.log(tcolors('Hello').green());
console.log(tcolors.red('Red text'));
```

### TypeScript

```typescript
import tcolors from 'tcolors';

// The tcolors object converts to a string automatically
console.log(tcolors('TypeScript').blue().bold());

// You can also explicitly convert it
const message: string = tcolors('Explicit conversion').green().toString();
console.log(message);
```

---

## 📚 API Documentation

### Basic Colors

Apply foreground colors to your text.

```javascript
tcolors('text').black();
tcolors('text').red();
tcolors('text').green();
tcolors('text').yellow();
tcolors('text').blue();
tcolors('text').magenta();
tcolors('text').cyan();
tcolors('text').white();
tcolors('text').gray(); // or .grey()
```

---

### Background Colors

Apply background colors to your text.

```javascript
tcolors('text').bgBlack();
tcolors('text').bgRed();
tcolors('text').bgGreen();
// ...and so on for all basic and bright colors.
```

**Example with Foreground + Background:**
```javascript
console.log(tcolors('Success').green().bgBlack());
console.log(tcolors('Error').white().bgRed());
```

---

### Bright Colors

Brighter, more vibrant color variants.

```javascript
// Bright foreground
tcolors('text').brightRed();
tcolors('text').brightGreen();
// ...etc

// Bright background
tcolors('text').bgBrightRed();
tcolors('text').bgBrightGreen();
// ...etc
```

---

### Text Styles

Apply text styling and formatting.

```javascript
tcolors('text').bold();
tcolors('text').dim();
tcolors('text').italic();
tcolors('text').underline();
tcolors('text').inverse();
tcolors('text').hidden();
tcolors('text').strikethrough();
```

---

### Chaining Methods

Combine multiple styles by chaining methods in any order.

```javascript
// Multiple styles
tcolors('text').red().bold();
tcolors('text').green().underline().italic();

// All together
tcolors('Important!').red().bold().underline().bgYellow();
```

---

### RGB & Hex Colors

Use custom RGB or Hex colors. These are converted to the nearest ANSI 256 color.

```javascript
// RGB (0-255)
tcolors('text').rgb(255, 100, 50);
tcolors('text').bgRgb(30, 144, 255);

// Hex (with or without #)
tcolors('text').hex('#ff6347');
tcolors('text').bgHex('1e90ff');
```

---

### True Color (24-bit)

For terminals that support it, use full 24-bit RGB for maximum color precision.

```javascript
// Foreground true color
tcolors('text').truetcolors(255, 99, 71);

// Background true color
tcolors('text').bgTruetcolors(30, 144, 255);
```

---

### ANSI 256 Colors

Directly use a color from the 256-color palette (0-255).

```javascript
tcolors('text').ansi256(196);    // Bright red
tcolors('text').bgAnsi256(21);     // Bright blue
```

---

### Gradients & Rainbow

Create beautiful multi-color text.

```javascript
// Custom gradient
const gradient = tcolors.gradient('Hello World', ['#ff0000', '#0000ff']);
console.log(gradient);

// Rainbow effect
console.log(tcolors.rainbow('Rainbow text!'));
```

---

### Direct Functions

For single styles, calling functions directly on `tcolors` is slightly faster as it avoids creating an intermediate object.

```javascript
tcolors.red('Red text');
tcolors.bold('Bold text');

// For multiple styles, nest the calls:
tcolors.bold(tcolors.green('Green and bold'));
```

---

### Utility Methods

#### `tcolors.strip(text)`
Remove all ANSI escape codes from a string.

```javascript
const colored = tcolors('Hello').red().bold();
const plain = tcolors.strip(colored); // .toString() is not needed

console.log(plain);  // 'Hello'
```

#### `tcolors.enabled`
A boolean property to check if colors are currently enabled.

```javascript
if (tcolors.enabled) {
  console.log(tcolors.green('Colors are supported!'));
}
```

---

## 🎓 Advanced Usage

### Custom Color Palettes

```javascript
const theme = {
  success: (text) => tcolors(text).green(),
  warning: (text) => tcolors(text).hex('#ffa500'), // Orange
  error: (text) => tcolors(text).bold().red(),
  info: (text) => tcolors.cyan(text),
};

console.log(theme.success('Operation completed.'));
console.log(theme.error('File not found!'));
```

### Progress Bars

```javascript
function progressBar(percent) {
  const filled = Math.round(percent / 5);
  const empty = 20 - filled;
  
  const bar = tcolors('█'.repeat(filled)).green() 
            + tcolors('░'.repeat(empty)).gray();
  
  const percentage = tcolors(`${percent}%`).bold();
  
  return `${bar} ${percentage}`;
}

console.log(progressBar(50));
```

---

## 🌍 Environment Support

`tcolors` automatically detects color support. This follows standard conventions.

- **Disabled** if `NO_COLOR` environment variable is present.
- **Enabled** if `FORCE_COLOR` environment variable is present.
- Otherwise, it checks if the output stream is a TTY (a terminal).

You can manually override this detection:
```javascript
// Disable colors programmatically
tcolors.enabled = false;
```

---

## 💪 TypeScript Support

`tcolors` is written in TypeScript and provides complete type definitions.

```typescript
import tcolors, { ColorInstance, Color } from 'tcolors';

// The main function returns a ColorInstance
const instance: ColorInstance = tcolors('text');

// The instance can be used as a string directly
const text: string = instance.red().bold();
console.log('Message: ' + text);

// The main export has a type
const tcolorsFn: Color = tcolors;
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a pull request.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.