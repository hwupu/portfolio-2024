import fs from "node:fs";
import path from "node:path";

import {
  inlineScriptHashes,
  inlineStyleHashes,
  extScriptHashes,
  extStyleHashes,
} from "./src/generated/sriHashes.mjs";

const quoted = (str) => `'${str}'`;

const updateCSPHeader = async () => {
  try {
    const headerPath = path.join("./public/headers");
    const outputPath = path.join("./public/_headers");
    const content = await fs.promises.readFile(headerPath, "utf8");

    // Split into lines
    const lines = content.split("\n");

    // Find the first line starting with "Content-Security-Policy"
    const cspLineIndex = lines.findIndex((line) =>
      line.trim().startsWith("Content-Security-Policy"),
    );

    if (cspLineIndex === -1) {
      console.error("No Content-Security-Policy header found");
      return content;
    }

    // Modify the CSP line - here you can add your specific modifications
    // For example, adding hashes:
    let cspLine = lines[cspLineIndex];

    // Example modification (adjust based on your actual requirements)
    cspLine = cspLine.replace(
      "script-src",
      `script-src ${inlineScriptHashes.map((i) => quoted(i)).join(" ")} ${extScriptHashes.map((i) => quoted(i)).join(" ")}`,
    );

    // Add style-src hashes
    cspLine = cspLine.replace(
      "style-src",
      `style-src ${inlineStyleHashes.map((i) => quoted(i)).join(" ")} ${extStyleHashes.map((i) => quoted(i)).join(" ")}`,
    );

    // Update the line in the array
    lines[cspLineIndex] = cspLine;

    // Join back into a single string
    const updatedContent = lines.join("\n");

    // Write the updated content to the new _header file instead of overwriting the original
    await fs.promises.writeFile(outputPath, updatedContent, "utf8");

    console.log(
      "Created modified _header file with updated Content-Security-Policy",
    );
    return updatedContent;
  } catch (error) {
    console.error("Error updating CSP header:", error);
    throw error;
  }
};

updateCSPHeader().catch((err) =>
  console.error("Failed to update CSP header:", err),
);
