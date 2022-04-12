const related = require("./related");

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
});
