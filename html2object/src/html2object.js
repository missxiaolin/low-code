import htmlparser2 from 'htmlparser2'

function getNodeContent(node) {
  return node[Object.keys(node)[0]];
}

function generateNewNode(tagName, attributes = {}) {
  // build new node
  attributes.__children = [];
  const newNode = {
    [tagName]: attributes,
  };
  return newNode;
}

function parseHtml(htmlData) {
  return new Promise((resolve, reject) => {
    const root = generateNewNode("root");
    let currentAccessObject = root;
    let lastAccessStack = [root];

    // options docment: https://github.com/fb55/htmlparser2/wiki/Parser-options
    const parser = new htmlparser2.Parser({
      onopentag(tagname, attributes) {
        const newNode = generateNewNode(tagname, attributes);
        lastAccessStack.push(newNode);
        getNodeContent(currentAccessObject).__children.push(newNode);
        currentAccessObject = newNode;
      },
      ontext(text) {
        if (text.trim()) {
          getNodeContent(currentAccessObject).__text__ = text.trim();
        }
      },
      onclosetag(tagname) {
        lastAccessStack.pop();
        currentAccessObject = lastAccessStack[lastAccessStack.length - 1];
      },
      onend() {
        resolve(root);
      },

      onerror(error) {
        reject(error);
      },
    });
    parser.write(htmlData);
    parser.end();
  });
}

export async function html2Json(htmlData) {
  return await parseHtml(htmlData);
}
