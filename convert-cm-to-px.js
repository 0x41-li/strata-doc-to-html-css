const fs = require("fs");

const inputFile = "index-inline-css.html"; // Replace with the path to your HTML file
const outputFile = "px.html"; // Replace with the desired output file path

const cmToPx = (cmValue) => cmValue * (96 / 2.54);

const convertCmToPxInFile = (inputFile, outputFile) => {
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the input file:", err);
      return;
    }

    const convertedContent = data.replace(
      /(\d+(\.\d+)?)cm/g,
      (match, value) => {
        const pxValue = cmToPx(parseFloat(value));
        return `${pxValue.toFixed(2)}px`;
      }
    );

    fs.writeFile(outputFile, convertedContent, (err) => {
      if (err) {
        console.error("Error writing the output file:", err);
      } else {
        console.log("Conversion complete. Output written to", outputFile);
      }
    });
  });
};

convertCmToPxInFile(inputFile, outputFile);
