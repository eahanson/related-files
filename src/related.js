// @related [test](/src/related.test.js)

/*
 * Accepts a single string and returns an array of related file objects with `name` and `path` keys.
 * An optional config object can be passed as the second argument. If it contains a `projectRoot` key, then
 * its value will be removed from each found path.
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
    result.push({ name: match[1], path: removeProjectRoot(match[2], config) });
  }

  return result;
}

function isNonEmptyString(s) {
  return s && typeof s == "string" && !/^\s*$/.test(s);
}

function removeProjectRoot(path, config) {
  const projectRoot = (config && config.projectRoot);
  if (projectRoot) {
    const regex = new RegExp("^/?" + removeLeadingSlash(projectRoot), "i");
    return ensureLeadingSlash(path.replace(regex, ""));
  } else {
    return path;
  }
}

function removeLeadingSlash(s) {
  return s.replace(/^\//, "");
}

function ensureLeadingSlash(s) {
  if (s.startsWith("/")) {
    return s;
  } else {
    return `/${s}`;
  }
}

module.exports = {
  related,
  _removeProjectRoot: removeProjectRoot,
  _findAnnotatedLines: findAnnotatedLines,
  _findLinks: findLinks
};
