# create-object-url

Normalize `URL.createObjectURL`, `webkitURL.createObjectURL` and don't crash older browsers. Safe to use inside a Web Worker.

```
npm install create-object-url
```

```js
var createObjectURL = require('create-object-url');
var url = createObjectURL(file);

```