"use strict";

function isExist(v) {
  return typeof v !== "undefined";
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */
function merge(target, a, arrayMode) {
  if (a) {
    const keys = Object.keys(a); // will return an array of own properties
    const len = keys.length; //don't make it inline
    for (let i = 0; i < len; i++) {
      if (arrayMode === "strict") {
        target[keys[i]] = [a[keys[i]]];
      } else {
        target[keys[i]] = a[keys[i]];
      }
    }
  }
}
/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */

function getValue(v) {
  if (isExist(v)) {
    return v;
  } else {
    return "";
  }
}

// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};

function buildOptions(options, defaultOptions, props) {
  var newOptions = {};
  if (!options) {
    return defaultOptions; //if there are not options
  }

  for (let i = 0; i < props.length; i++) {
    if (options[props[i]] !== undefined) {
      newOptions[props[i]] = options[props[i]];
    } else {
      newOptions[props[i]] = defaultOptions[props[i]];
    }
  }
  return newOptions;
}

export default {
  buildOptions,
  getValue,
  merge,
  isEmptyObject,
  isExist,
};
