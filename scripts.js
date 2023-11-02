var postcss = require("postcss");
var cssvariables = require("postcss-css-variables");

var fs = require("fs");

var mycss = fs.readFileSync("style.css", "utf8");

// Process your CSS with postcss-css-variables
var output = postcss([cssvariables(/*options*/)]).process(mycss).css;

fs.writeFile("style-css-variables-values.css", output, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

