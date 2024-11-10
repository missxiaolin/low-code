"use strict";

import util from "./utils2.js";

export default function convertToJson(node, options) {
  const jObj = {};

  //when no child node or attr is present
  if (
    (!node.child || util.isEmptyObject(node.child)) &&
    (!node.attrsMap || util.isEmptyObject(node.attrsMap))
  ) {
    if (util.isExist(node.val)) {
      return {
        undefined: node.val,
      };
    } else return { undefined: "" };
  } else {
    //otherwise create a textnode if node has some text
    if (util.isExist(node.val)) {
      if (
        !(
          typeof node.val === "string" &&
          (node.val === "" || node.val === options.cdataPositionChar)
        )
      ) {
        if (options.arrayMode === "strict") {
          // jObj[options.textNodeName] = [node.val];
        } else {
          jObj[options.textNodeName] = node.val;
        }
      }
    }
  }

  util.merge(jObj, node.attrsMap, options.arrayMode);

  const keys = Object.keys(node.child);
  for (let index = 0; index < keys.length; index++) {
    const tagname = keys[index];
    if (node.child[tagname] && node.child[tagname].length > 1) {
      if (!jObj["__children"]) jObj["__children"] = [];
      for (const tag in node.child[tagname]) {
        const newObj = {
          [tagname]: convertToJson(node.child[tagname][tag], options),
        };
        jObj["__children"].push(newObj);
      }
    } else {
      if (options.arrayMode === true) {
        // const result = convertToJson(node.child[tagname][0], options);
        // if (typeof result === "object") {
        //   if (!jObj["__children"]) {
        //     jObj["__children"] = [];
        //   }
        //   jObj["__children"].push(result);
        // } else {
        //   jObj[tagname] = result;
        // }
      } else if (options.arrayMode === "strict") {
        // jObj[tagname] = [convertToJson(node.child[tagname][0], options)];
      } else {
        if (!jObj["__children"]) {
          jObj["__children"] = [];
        }
        const newObj = {
          [tagname]: convertToJson(node.child[tagname][0], options),
        };
        jObj["__children"].push(newObj);
      }
    }
  }

  //add value
  return jObj;
}
