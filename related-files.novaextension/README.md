**Open Related File…** opens a file related to the current file.

It's common for code editors to have a built-in or extension-provided feature to switch between
a code file and its test, using some heuristics that work most of the time. Some editors and
extensions will also try to jump to other kinds of related files, such as CSS files. In my
experience, these tools find the related files often enough to sound promising, but are
frustrating in practice because they don't work 100% of the time, or don't work on entire
types of files.

This extension ~~forces~~ allows authors to specify each related file using a simple
syntax. The upside is that the extension works perfectly all the time. The downside is
that the author has to list each related file, and maybe more annoyingly, has to update
them when files move.

To specify a related file, add an annotation somewhere in the file (perhaps in a comment).
The annotation must start with `@related` and contain one or more Markdown-style links in the
form `[name](file-path)`, where `name` is any string and `file-path` is a path to the file,
relative to the project root.

```
// @related [test](/src/main.test.js)
```

You can list multiple related files as separate annotations:

```
// @related [css](/assets/main.css)
// @related [js](/assets/main.js)
```

or as a single annotation:

```
<!-- @related [css](/assets/main.css) [js](/assets/main.js) -->
```

(Multi-line annotations are not yet supported; use multiple annotations instead.)

This works with any text file; the `@related` annotation can be in a comment, in a README, etc.

## Usage

To run Open Related Files, select the **Editor → Open Related File…** menu item
or open the command palette and type `Open Related File…`. (It will be a lot more useful if you assign
a keyboard shortcut. I use `ctrl+option+R`.) If there is a `@related` annotation in the file, that
file will be opened. If there is more than one annotation in the file, a palette will appear letting
you choose the file to open.

## Contributing

Contributions are welcome. See [the outer project's README](https://github.com/eahanson/related-files/blob/main/README.md).

## License, Copyright, Attributions

Copyright 2022 Erik Hanson.
Apache 2.0 licensed (see [LICENSE](https://github.com/eahanson/related-files/blob/main/LICENSE)).
The extension icon is a modified version of an icon from [Font Awesome](https://fontawesome.com/)
which is licensed under [CC BY 4.0](https://fontawesome.com/license).
