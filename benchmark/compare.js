import { performance } from "perf_hooks";
import tcolors from "../dist/index.mjs";
import chalk from "chalk";
import kleur from "kleur";

const ITERATIONS = 100000;
const NOT_SUPPORTED = "Not Supported";

// Benchmark function
function benchmark(name, fn, iterations = ITERATIONS) {
  // Warm up
  for (let i = 0; i < 1000; i++) fn();

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();

  return end - start;
}

console.log("⚡ ANSI Color Library Benchmark\n");
console.log(`Running ${ITERATIONS.toLocaleString()} iterations per test...\n`);

// Test cases
const tests = [
  {
    name: "Simple color",
    tcolors: () => tcolors("test").red(),
    chalk: () => chalk.red("test"),
    kleur: () => kleur.red("test"),
  },
  {
    name: "Chained styles",
    tcolors: () => tcolors("test").red().bold().underline(),
    chalk: () => chalk.red.bold.underline("test"),
    kleur: () => kleur.red().bold().underline("test"),
  },
  {
    name: "RGB color",
    tcolors: () => tcolors("test").rgb(255, 100, 50),
    chalk: () => chalk.rgb(255, 100, 50)("test"),
    kleur: null, // kleur doesn't support RGB
  },
  {
    name: "Hex color",
    tcolors: () => tcolors("test").hex("#ff6347"),
    chalk: () => chalk.hex("#ff6347")("test"),
    kleur: null, // kleur doesn't support hex
  },
  {
    name: "Background + foreground",
    tcolors: () => tcolors("test").bgBlue().white(),
    chalk: () => chalk.bgBlue.white("test"),
    kleur: () => kleur.bgBlue().white("test"),
  },
  {
    name: "Multiple styles",
    tcolors: () => tcolors("test").red().bold().italic().underline().bgWhite(),
    chalk: () => chalk.red.bold.italic.underline.bgWhite("test"),
    kleur: () => kleur.red().bold().italic().underline().bgWhite("test"),
  },
  {
    name: "Direct function call",
    tcolors: () => tcolors.red("test"),
    chalk: () => chalk.red("test"),
    kleur: () => kleur.red("test"),
  },
  {
    name: "Strip ANSI codes",
    tcolors: () => tcolors.strip("\x1b[31mtest\x1b[0m"),
    chalk: () => {
      const stripAnsi = (str) => str.replace(/\x1b\[[0-9;]*m/g, "");
      return stripAnsi("\x1b[31mtest\x1b[0m");
    },
    kleur: () => {
      const stripAnsi = (str) => str.replace(/\x1b\[[0-9;]*m/g, "");
      return stripAnsi("\x1b[31mtest\x1b[0m");
    },
  },
];

// Results storage
const results = {
  tcolors: [],
  chalk: [],
  kleur: [],
};

let tcolorsTotal = 0;
let chalkTotal = 0;
let kleurTotal = 0;

const libraries = ["tcolors", "chalk", "kleur"];

// Run benchmarks
tests.forEach((test) => {
  console.log(`📊 Testing: ${test.name}`);

  libraries.forEach((lib) => {
    const fn = test[lib];
    if (fn) {
      const time = benchmark(lib, fn);
      results[lib].push(time);
      console.log(`   ${lib.padEnd(10)}: ${time.toFixed(2)}ms`);
      if (lib === "tcolors") tcolorsTotal += time;
      else if (lib === "chalk") chalkTotal += time;
      else if (lib === "kleur") kleurTotal += time;
    } else {
      results[lib].push(NOT_SUPPORTED);
      console.log(`   ${lib.padEnd(10)}: ${NOT_SUPPORTED}`);
    }
  });

  
});

console.log("\n" + "=".repeat(60));
console.log("📈 BENCHMARK SUMMARY");
console.log("=".repeat(60) + "\n");

console.log("Total time (for supported tests):");
console.log(`  tcolors:     ${tcolorsTotal.toFixed(2)}ms`);
console.log(`  chalk:      ${chalkTotal.toFixed(2)}ms`);
console.log(`  kleur:      ${kleurTotal.toFixed(2)}ms`);

console.log("\n" + "=".repeat(60));
console.log("📊 MARKDOWN TABLE");
console.log("=".repeat(60) + "\n");

// Generate markdown table
console.log("| Test | tcolors | Chalk | Kleur | Winner |");
console.log("|------|--------|-------|-------|--------|");

tests.forEach((test, i) => {
  const formatResult = (res) =>
    typeof res === "number" ? `${res.toFixed(2)}ms` : NOT_SUPPORTED;

  const tcolorsRes = formatResult(results.tcolors[i]);
  const chalkRes = formatResult(results.chalk[i]);
  const kleurRes = formatResult(results.kleur[i]);

  const times = [
    results.tcolors[i],
    results.chalk[i],
    results.kleur[i],
  ].filter((t) => typeof t === "number");

  let winner = "-";
  if (times.length > 0) {
    const fastestTime = Math.min(...times);
    const winnerLib = libraries.find(
      (lib) => results[lib][i] === fastestTime
    );
    winner = `🏆 ${winnerLib.charAt(0).toUpperCase() + winnerLib.slice(1)}`;
  }

  console.log(
    `| ${test.name} | ${tcolorsRes} | ${chalkRes} | ${kleurRes} | ${winner} |
`
  );
});

console.log("\n✨ Benchmark complete!\n");