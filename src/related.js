// @related [test](/src/related.test.js)

/*
 * Accepts a single string and returns an array of related file objects with `name` and `path` keys.
 * An optional config object can be passed as the second argument. If it contains a `projectRoot` key, then
 * its value will be prepended each found path.
 */
function related(text, config) {
  return findAnnotatedLines(text).reduce((lines, line) => {
    return lines.concat(findLinks(line, config));
  }, []);
}

// // //

function findAnnotatedLines(text) {
  if (isNonEmptyString(text)) {
    return text.split("\n").filter((line) => /@related/.test(line));
  } else {
    return [];
  }
}

function findLinks(line, config) {
  const re = /[^\[]*\[([^\]]+)\]\(([^\)]+)\)/g;
  let result = [];
  let match;

  while ((match = re.exec(line))) {
    result.push({ name: match[1], path: applyProjectRoot(match[2], config) });
  }

  return result;
}

function isNonEmptyString(s) {
  return s && typeof s == "string" && !/^\s*$/.test(s);
}

function applyProjectRoot(path, config) {
  if (path && path.startsWith("/")) {
    const projectRoot = (config && config.projectRoot) || "";
    return projectRoot.concat(path);
  } else {
    return path;
  }
}

module.exports = {
  related,
  _applyProjectRoot: applyProjectRoot,
  _findAnnotatedLines: findAnnotatedLines,
  _findLinks: findLinks
};
