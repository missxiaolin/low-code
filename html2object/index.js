export { html2Json as html2Object } from "./src/html2object";

import { Parser } from "./src/object2html";
const defaultOptions = {
  attributeNamePrefix: "@_",
  attrNodeName: false, //default is false
  textNodeName: "#text",
  ignoreAttributes: false,
  cdataTagName: "__cdata", //default is false
  cdataPositionChar: "\\c",
  format: true,
  indentBy: "  ",
  supressEmptyNode: false,
};

const parser = new Parser(defaultOptions);

export function object2Html(obj) {
  return Promise.resolve(parser.parse(obj));
}
