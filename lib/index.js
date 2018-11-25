const ut    = require("./util");
const emojiex = require("./emojiex");
const mani = require("./manifest.json");

function ZIPmoji() {
}

ZIPmoji.regex = emojiex;
ZIPmoji.util = ut;

ZIPmoji.prototype.process = function(text, limit) {
  var $this = this;

  if (typeof limit === "undefined") {
    limit = 256;
  }

  var emojisReplaced = 0;

  var preText = text;
  preText = preText.replace(emojiex(), function(emoj) {
    var cp = ut.toCodePoint(emoj);
    if (limit !== -1) {
      if (emojisReplaced > limit) {
        return emoj;
      }
    }

    var cps = cp.split("-");

    if (mani.includes(cp) === false) {
      if (mani.includes(cps[0])) {
        cp = cps[0];
      } else {
        if (cps.length === 3) {
          if (!mani.includes([cps[0], cps[2]].join("-"))) {
            console.warn("unknown codepoint", cp);
            return `<span class="zm-none">` + emoj + `</span>`
          }

          cp = [cps[0], cps[2]].join("-");
        }
      }
    }

    emojisReplaced ++;
    return `<img alt="` + emoj + `" draggable="false" class="zm zm-` + cp +`"></img>`;
  });

  return preText;
}

module.exports = ZIPmoji;