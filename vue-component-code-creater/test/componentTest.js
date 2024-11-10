// var parser = require("fast-xml-parser");
const { html2Json } = require("../product/bundle-html2json-common");

const fs = require("fs");
const xmlData = fs.readFileSync("./test/test.vue", {
  encoding: "utf-8",
});

(async function exec() {
  const root = await html2Json(xmlData);
  const { Parser } = require("../product/bundle-json2html-common");

  const parser = new Parser({
    attributeNamePrefix: "@_",
    attrNodeName: false, //default is false
    textNodeName: "#text",
    ignoreAttributes: false,
    cdataTagName: "__cdata", //default is false
    cdataPositionChar: "\\c",
    format: true,
    indentBy: "  ",
    supressEmptyNode: false,
  });
  const xml = parser.parse(root.root);
  console.info(xml);
})()