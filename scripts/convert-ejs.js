import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [,, inputPath] = process.argv;

if (!inputPath) {
  console.error("Usage: node convert-ejs.js <relative-ejs-path>");
  process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), inputPath);
if (!fs.existsSync(absolutePath)) {
  console.error(`File not found: ${absolutePath}`);
  process.exit(1);
}

const fileDir = path.dirname(absolutePath);
const fileName = path.basename(absolutePath, ".ejs");
const targetPath = path.resolve(fileDir, `${fileName}.jsx`);

let content = fs.readFileSync(absolutePath, "utf8");

// Remove header/footer includes
content = content.replace(/<%-\s*include\(['\"](?:..\\/)?partials\\/header['\"]\)\s*%>/g, "");
content = content.replace(/<%-\s*include\(['\"](?:..\\/)?partials\\/footer['\"]\)\s*%>/g, "");

// Extract script tags
const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
const inlineScripts = [];
const externalScripts = [];

content = content.replace(scriptRegex, (match, attrs, body) => {
  const srcMatch = attrs.match(/src\s*=\s*['\"]([^'\"]+)['\"]/i);
  if (srcMatch) {
    externalScripts.push(srcMatch[1]);
    return "";
  }
  const trimmed = body.trim();
  if (trimmed.length > 0) {
    inlineScripts.push(trimmed);
  }
  return "";
});

content = content.trim();

const templateLiteral = JSON.stringify(content);
const inlineScriptsLiteral = JSON.stringify(inlineScripts);
const externalScriptsLiteral = JSON.stringify(externalScripts);

const componentName = fileName
  .split(/[-_]/)
  .filter(Boolean)
  .map(part => part.charAt(0).toUpperCase() + part.slice(1))
  .join("");

const fallbackPath = path.resolve(__dirname, "../views/utils/fallbackData.js");
let fallbackImport = path.relative(fileDir, fallbackPath).replace(/\\/g, "/");
if (!fallbackImport.startsWith(".")) {
  fallbackImport = "./" + fallbackImport;
}

const component = `const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");
const fallbackData = require("${fallbackImport.replace(/\.js$/, "")}");

const template = ${templateLiteral};
const inlineScripts = ${inlineScriptsLiteral};
const externalScripts = ${externalScriptsLiteral};

function ${componentName}(props) {
  const defaults = (fallbackData && fallbackData["${fileName}"]) || {};
  const data = { ...defaults, ...props };

  const defaultLocals = defaults.locals || {};
  const overrideLocals = props && props.locals ? props.locals : {};
  const locals = {
    ...defaultLocals,
    ...overrideLocals,
    isLoggedIn: data.isLoggedIn ?? defaultLocals.isLoggedIn ?? false,
    userRole: data.userRole ?? defaultLocals.userRole ?? "guest",
    userName: data.userName ?? defaultLocals.userName ?? "Guest",
  };

  data.locals = locals;

  let html = ejs.render(template, data);

  const collectedInlineScripts = [...inlineScripts];
  html = html.replace(/<script[^>]*>([\s\S]*?)<\\/script>/gi, (_, body) => {
    const trimmed = body.trim();
    if (trimmed.length) {
      collectedInlineScripts.push(trimmed);
    }
    return "";
  });

  return (
    <MainLayout {...data} scripts={externalScripts}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {collectedInlineScripts.map((script, index) => (
        <script key={index} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </MainLayout>
  );
}

module.exports = ${componentName};
`;

fs.writeFileSync(targetPath, component, "utf8");
console.log(`Converted ${inputPath} -> ${path.relative(process.cwd(), targetPath)}`);

fs.unlinkSync(absolutePath);

