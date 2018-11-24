# ZIPmoji

ZIPmoji is a simple Web library for adding cross-platform support for emojis, without making a new HTTP request every time a different Emoji is used.

This is necessary for applications in which it is desirable to leave as little metadata as possible on CDN servers.

It works by compacting the Twitter Emoji SVGs into a single, 6.8 MB-long CSS file.

This is not very useful if you don't care about generating a lot of HTTP requests, in which case, it is probably more prudent to use [Twemoji](https://github.com/twitter/twemoji/).

```js
const ZIPmoji = require("zipmoji");

var zm = new ZIPmoji();

var html = zm.process("🙌");
  // <img alt="🙌" draggable="false" class="zipmoji" src="blob:..."></img>

document.body.innerHTML += html;
```

# Credits

Emoji set is provided by Twitter under the terms of the Creative Commons Attribution 4.0 License.