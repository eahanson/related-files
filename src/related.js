// @related [test](/src/related.test.js)

// Accepts a single string and returns an array of related file objects with `name` and `path` keys.
function related(text) {
  if (text && typeof text == "string") {
    return findRelated(text);
  } else {
    return [];
  }
}

module.exports = related;

// // //

function findRelated(text) {
  const re = /@related\s+[^\[]*\[([^\]]+)\]\(([^\)]+)\)/g;
  let result = [];

  while ((match = re.exec(text))) {
    result.push({ name: match[1], path: match[2] });
  }

  return result;
}
