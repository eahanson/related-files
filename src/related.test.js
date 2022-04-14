const { related, _findAnnotatedLines, _findLinks } = require("./related");

describe("related", () => {
  test("returns [] when the input is not a string", () => {
    expect(related(undefined)).toStrictEqual([]);
    expect(related(4)).toStrictEqual([]);
  });

  test("returns [] when the input is blank", () => {
    expect(related("")).toStrictEqual([]);
  });

  test("returns [] when the input contains no annotations", () => {
    expect(related("foo\nbar\n")).toStrictEqual([]);
  });

  test("simple annotation", () => {
    expect(related("@related [test](/src/related.test.js)")).toStrictEqual([
      {
        name: "test",
        path: "/src/related.test.js",
      },
    ]);
  });

  test("annotation with extra text", () => {
    expect(
      related("foo @related bar [test](/src/related.test.js) baz")
    ).toStrictEqual([
      {
        name: "test",
        path: "/src/related.test.js",
      },
    ]);
  });

  test("annotation with spaces in link name", () => {
    expect(
      related("foo @related bar [unit test](/src/related.test.js) baz")
    ).toStrictEqual([
      {
        name: "unit test",
        path: "/src/related.test.js",
      },
    ]);
  });

  test("multiple links on the same line", () => {
    expect(
      related(
        "foo @related bar [test](/src/related.test.js) glorp [css](/assets/related.css) baz"
      )
    ).toStrictEqual([
      {
        name: "test",
        path: "/src/related.test.js",
      },
      {
        name: "css",
        path: "/assets/related.css",
      },
    ]);
  });

  test("multiple links on the multiple lines", () => {
    expect(
      related(
        `
          blah
          foo @related bar [test](/src/related.test.js) glorp [css](/assets/related.css) baz
          blah
          @related fez [icon](/assets/related.png) quux
          blah
        `
      )
    ).toStrictEqual([
      {
        name: "test",
        path: "/src/related.test.js",
      },
      {
        name: "css",
        path: "/assets/related.css",
      },
      {
        name: "icon",
        path: "/assets/related.png",
      },
    ]);
  });
});

describe("findAnnotatedLines", () => {
  test("returns [] when the input is not a string", () => {
    expect(_findAnnotatedLines(undefined)).toStrictEqual([]);
    expect(_findAnnotatedLines(4)).toStrictEqual([]);
  });

  test("returns [] when the input is blank", () => {
    expect(_findAnnotatedLines("")).toStrictEqual([]);
    expect(_findAnnotatedLines("  ")).toStrictEqual([]);
  });

  test("returns [] when there are no annotated lines", () => {
    expect(_findAnnotatedLines("foo\nbar\nbaz\n")).toStrictEqual([]);
  });

  test("returns annotated lines", () => {
    expect(
      _findAnnotatedLines("foo\n@related bar\nbaz @related baz\nfez\n")
    ).toStrictEqual(["@related bar", "baz @related baz"]);
  });
});

describe("findLinks", () => {
  test("returns [] when the input is blank", () => {
    expect(_findLinks(" ")).toStrictEqual([]);
  });

  test("returns the link when there is one", () => {
    expect(_findLinks("[foo](/foo.txt)")).toStrictEqual([
      { name: "foo", path: "/foo.txt" },
    ]);

    expect(_findLinks("blah [foo](/foo.txt) blah")).toStrictEqual([
      { name: "foo", path: "/foo.txt" },
    ]);
  });

  test("returns all the links", () => {
    expect(
      _findLinks("blah [foo](/foo.txt) blah [bar](/bar.txt) blah")
    ).toStrictEqual([
      { name: "foo", path: "/foo.txt" },
      { name: "bar", path: "/bar.txt" },
    ]);
  });
});
