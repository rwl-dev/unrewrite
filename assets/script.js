/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

const testId = document.querySelector("#NavButton");

testId.addEventListener("click", () => {
  console.log("test");
});
