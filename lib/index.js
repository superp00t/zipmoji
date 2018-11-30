const ut    = require("./util");
const emojiex = require("./emojiex");
const mani = require("./manifest.json");
const transforms = require("./transforms");

function ZIPmoji(opts) {
  this.opts = getOpts(opts);
}

ZIPmoji.regex = emojiex;
ZIPmoji.util = ut;

function getOpts(o) {
  o              = o || {};
  o.limit        = o.limit || -1;
  o.addEmoticons = o.addEmoticons || false;
  return o;
}

ZIPmoji.prototype.process = function(text) {
  opts = this.opts;

  var $this = this;

  var emojisReplaced = 0;

  var preText = text;
  preText = preText.replace(emojiex(), function(emoj) {
    var pT = transforms[emoj];
    if (pT) {
      emoj = transforms[emoj];
    }

    var cp = ut.toCodePoint(emoj);
    if (opts.limit !== -1) {
      if (emojisReplaced > opts.limit) {
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
    return `<span draggable="false" class="zm zm-${cp}">${emoj}</span>`;
  });

  return preText;
}

module.exports = ZIPmoji;