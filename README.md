# related-files

Parses a string (usually the contents of a file) to find related files based on annotations within the file.

## Contents

- `src/related.js` is the main implementation
- `related-files.novaextension` is an extension for the [Nova](https://nova.app) editor

## Annotations

An annotation starts with `@related`, followed by one or more Markdown-style links consisting of an arbitrary
file type (e.g., "test", "css", "header") and a path to the file. The annotation ends with a newline character.

This is a simple annotation:

    @related [test](/src/related.test.js)

Annotations are usually in comments:

    // @related [test](/src/related.test.js)
    /* @related [test](/src/related.test.js) */
    # @related [test](/src/related.test.js)

A single line can have multiple annotations and unrelated text:

    // See @related [test](/src/related.test.js), [test](/src/other.test.js), and [css](/assets/style.css)

## Multi-line annotations

If the last non-space character in an annotation is a backslash (`\`), the next line of text is scanned
for annotations:

    # @related \
    #   [test](/test/core/foo_test.exs) \
    #   [test](/test/integration/bar_test.exs) \
    #   [sass](/assets/css/foo.sass)

## File paths

File paths are not validated by this library; they are just returned as-is. Paths starting with `/` are
expected to be project-relative while paths that don't start with `/` are expected to be relative to the
current file.

## TODO

    [X] one annotation per line
    [ ] multiple annotations per line
    [ ] multi-line annotations
