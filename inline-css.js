const juice = require("juice");
const fs = require("fs");

// Read your HTML and CSS files
const html = fs.readFileSync("index.html", "utf-8");
const css = fs.readFileSync("style.css", "utf-8");

// Convert the CSS to inline styles
juice.juiceResources(
  html,
  {
    extraCss: css,
  },
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      // Save the result with inline styles to an output file
      fs.writeFileSync("output-inline-css.html", result, "utf-8");
    }
  }
);
