#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const etc = require("etc-js");

const dest="dist/zipmoji.min.css";
const src= "twemoji-2/";

var css = fs.readFileSync("zipmoji.css").toString("utf8");

var items = fs.readdirSync(src);

function svgToURL(input) {
  var utf8 = input.toString("utf8");
  
  var chars = utf8
  .split("")
  .filter(e => e !== "\t" && e !== "\n").join("");

  return encodeURIComponent(chars);
} 

var manifest = [];

items.map((e) => {
  var rdata = fs.readFileSync(src + e);

  var data = svgToURL(rdata);

  var fi = e.split(".")[0];
  manifest.push(fi);
  css += ".zm-" + fi + "{";
  css += "content: url('data:image/svg+xml;utf8," + data + "');} ";
});

fs.writeFileSync(dest, css);
fs.writeFileSync("lib/manifest.json", JSON.stringify(manifest));