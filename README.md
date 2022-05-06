# related-files

A Javascript library that parses a string (usually the contents of a file) to find related file paths
based on annotations within the file.

## Intro

It's common for code editors to have a built-in or extension-provided features to switch between
a code file and its test, using some heuristics that work most of the time. Some editors and
extensions will also try to jump to other kinds of related files, such as CSS files. In my
experience, these tools find the related files often enough to sound promising, but are
frustrating in practice because they don't work 100% of the time, or don't work on entire
types of files.

This repository holds the Javascript that does the work of matching files. See the next section
for text editor plugins.

## Text Editor Plugins

### [neovim](https://neovim.io)
* repo: [synchronal/related-files.nvim](https://github.com/synchronal/related-files.nvim)

### [nova](https://nova.app)
* repo: [synchronal/related-files.novaextension](https://github.com/synchronal/related-files.novaextension)
* plugin: [Open Related File](https://extensions.panic.com/extensions/eahanson/eahanson.related-files/)

### [vscode](https://code.visualstudio.com)
* repo: [synchronal/related-files.vscode](https://github.com/synchronal/related-files.vscode)
* plugin: _in progress_

## Details

### Annotations

An annotation starts with `@related`, followed by one or more Markdown-style links consisting of an arbitrary
file type (e.g., "test", "css", "header") and a path to the file. The annotation ends with a newline character.

This is a simple annotation:

    @related [test](/src/related.test.js)

which would return:

    [{name: "test", path: "/src/related.test.js"}]

Annotations are usually in comments:

    // @related [test](/src/related.test.js)
    /* @related [test](/src/related.test.js) */
    # @related [test](/src/related.test.js)

A single line can have multiple annotations and unrelated text:

    // See @related [test](/src/related.test.js), [test](/src/other.test.js), and [css](/assets/style.css)

which would return:

    [
      {name: "test", path: "/src/related.test.js"},
      {name: "test", path: "/src/other.test.js"},
      {name: "css", path: "/assets/style.css"}
    ]

### Multi-line annotations

**NOT YET SUPPORTED**

If the last non-space character in an annotation is a backslash (`\`), the next line of text is scanned
for annotations:

    # @related \
    #   [test](/test/core/foo_test.exs) \
    #   [test](/test/integration/bar_test.exs) \
    #   [sass](/assets/css/foo.sass)

### File paths

File paths are not validated by this library; they are just returned as-is. Paths starting with `/` are
expected to be project-relative while paths that don't start with `/` are expected to be relative to the
current file.

## Usage

This repo contains Javascript code to parse annotations in a string, returning a list of `key`/`path` objects.

See the list of editor extensions above if you want a "related items" feature in your text editor.

## TODO

- [x] one annotation per line
- [x] multiple annotations per line
- [ ] multi-line annotations

## Contributing

Contributions are welcome. Use the following scripts:
* `bin/dev/update` will pull from git and then run `bin/dev/build` and `bin/dev/test`
* `bin/dev/build` will install NPM packages and do any other necessary build-related tasks
* `bin/dev/test` will run tests
* `bin/dev/shipit` will update, build, test, and if all those succeed, push to `origin HEAD`

## License, Copyright, Attributions

Copyright 2022 Erik Hanson and synchronal.dev.
Apache 2.0 licensed (see [LICENSE](https://github.com/synchronal/related-files/blob/main/LICENSE)).

