**Open Related File…** opens a file related to the current file.

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

To run Open Related Files:

- Select the **Editor → Open Related File…** menu item; or
- Open the command palette and type `Open Related File…`

## Contributing

Contributions are welcome. See [the outer project's README](https://github.com/eahanson/related-files/blob/main/README.md).

## License, Copyright, Attributions

Copyright 2022 Erik Hanson.
Apache 2.0 licensed (see [LICENSE](https://github.com/eahanson/related-files/blob/main/LICENSE)).
The extension icon is a modified version of an icon from [Font Awesome](https://fontawesome.com/)
which is licensed under [CC BY 4.0](https://fontawesome.com/license).
