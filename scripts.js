const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const base64Img = require("base64-img");

// Read the contents of the style.css file
const css = fs.readFileSync(path.join(__dirname, "style.css"), "utf8");

// Read the contents of the index.html file
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

// Load the HTML into Cheerio for easy manipulation
const $ = cheerio.load(html);

// Find all the image tags in the HTML file and extract their source URLs
const imgSrcs = $("img")
  .map((i, el) => $(el).attr("src"))
  .get();

// For each image URL, read the contents of the corresponding image file and convert it to base64 encoding
const base64Imgs = imgSrcs.reduce((acc, src) => {
  const imgPath = path.join(__dirname, src);
  const base64 = base64Img.base64Sync(imgPath);
  return { ...acc, [src]: base64 };
}, {});

// Replace the image URLs in the HTML file with their base64 encoded data
$("img").each((i, el) => {
  const src = $(el).attr("src");
  const base64 = base64Imgs[src];
  $(el).attr("src", `${base64}`);
});

// Inline the CSS styles into the HTML file
$("head").append(`<style>${css}</style>`);

// Write the modified HTML file to a new file
fs.writeFileSync(path.join(__dirname, "output.html"), $.html());
