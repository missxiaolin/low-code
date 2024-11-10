const { html2Object, object2Html } = require("../dist/bundle-common.js");


html2Object("<div label><span>This is span</span></div>")
  .then((object) => {
    const json = JSON.stringify(object);
    console.info(json);

    // modify object property
    const anotherSpanNode = {
      span: { __text__: "This is another span", class: "class-name" },
    };
    object.root.__children[0].div.__children.push(anotherSpanNode);

    return object2Html(object.root);
  })
  .then((html) => {
    console.info(html);
  });
