#!/usr/bin/env node

const ZIPmoji = require("../lib/");

const test = (name, expected, f) => {
  var cs = f();
  if (cs !== expected) {
    console.log(`Test ${name} failed.\nExpected ${expected}, got ${cs}.`);
    console.trace();
    process.exit(1);
  }

  console.log(`Test ${name} passed!`);
}

[
  ["🙁", `<span draggable="false" class="zm zm-1f641">🙁</span>`],
  ["☹", `<span draggable="false" class="zm zm-1f641">🙁</span>`],
  ["🙌", `<span draggable="false" class="zm zm-1f64c">🙌</span>`]
].map(a =>
  test("HTML generation", a[1], (c) => {
    return new ZIPmoji().process(a[0]);
  })
);
