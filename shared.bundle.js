(self["webpackChunksrb2_legacy_web"] = self["webpackChunksrb2_legacy_web"] || []).push([[804],{

/***/ 5925
(module) {

var dialog = {
  styles: {
    //Container (Holds both background and dialog box)
    containerClassName: "windowDialogContainer",
    //Background
    backgroundClassName: "windowDialogBackground",
    //Dialog
    dialogClassName: "windowDialogBox",
    //Button
    buttonClassName: "windowDialogButton",
    //Header
    headerClassName: "windowDialogHeader",
    //Input (Where you type text)
    inputClassName: "windowDialogInput",
  },
  texts: {
    ok: "OK",
    cancel: "Cancel",
  },
  _createDialogBase() {
    var background = document.createElement("div");
    background.style.position = "fixed";
    background.style.top = "0";
    background.style.left = "0";
    background.style.width = "100vw";
    background.style.height = "100vh";
    background.style.opacity = "0.5";
    background.className = this.styles.backgroundClassName;

    var dialogBox = document.createElement("div");
    dialogBox.style.position = "fixed";
    dialogBox.style.top = "50%";
    dialogBox.style.left = "50%";
    dialogBox.style.transform = "translate(-50%, -50%)";
    dialogBox.style.width = "fit-content";
    dialogBox.style.height = "fit-content";
    dialogBox.style.padding = "20px";
    dialogBox.style.maxWidth = "500px";
    dialogBox.style.maxHeight = "300px";
    dialogBox.style.minWidth = "100px";
    dialogBox.style.minHeight = "100px";
    dialogBox.style.overflow = "auto";
    dialogBox.className = this.styles.dialogClassName;

    var dialogContainer = document.createElement("div");
    dialogContainer.style.zIndex = "100";
    dialogContainer.className = this.styles.containerClassName;
    dialogContainer.append(background);
    dialogContainer.append(dialogBox);

    return { background, dialogBox, dialogContainer };
  },
  _createButtonBase() {
    var button = document.createElement("div");
    button.className = this.styles.buttonClassName;
    button.style.width = "fit-content";
    button.style.height = "fit-content";
    button.style.minWidth = "30px";
    button.style.minHeight = "20px";
    button.style.padding = "4px";
    button.style.cursor = "pointer";
    button.style.display = "inline-block";
    button.style.margin = "2px 2px";
    button.style.fontWeight = "bold";

    return button;
  },
  _createHeaderBase() {
    var span = document.createElement("span");
    span.className = this.styles.headerClassName;

    return span;
  },
  _createColorInputBase() {
    var input = document.createElement("input");
    input.type = "color";

    return input;
  },
  _createBreakBase() {
    var br = document.createElement("br");
    return br;
  },
  _createTextInputBase() {
    var input = document.createElement("input");
    input.type = "text";
    input.className = this.styles.inputClassName;

    return input;
  },
  _appendHeaders(message, dialogBox) {
    var m = message.toString();
    for (var m of m.split("\n")) {
      var header = this._createHeaderBase();
      header.textContent = m;
      dialogBox.append(header);
      dialogBox.append(this._createBreakBase());
    }
  },
  displayButtonChooser: function (message, buttonTexts) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    this._appendHeaders(message, dialogBox);

    document.body.append(dialogContainer);

    return new Promise((accept) => {
      buttonTexts.forEach((buttonText, index) => {
        var button = this._createButtonBase();
        button.textContent = buttonText;
        button.onclick = function () {
          dialogContainer.remove();
          accept(index);
        };
        dialogBox.append(button);
      });
    });
  },
  alertWithElement: function (element) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    dialogBox.append(element);

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    return new Promise((accept) => {
      acceptButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
  alert: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    return new Promise((accept) => {
      acceptButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
  prompt: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var input = this._createTextInputBase();
    dialogBox.append(input);

    dialogBox.append(this._createBreakBase());

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    var cancelButton = this._createButtonBase();
    cancelButton.textContent = this.texts.cancel;
    dialogBox.append(cancelButton);

    return new Promise((accept) => {
      input.onkeydown = function (e) {
        if (e.key == "Enter") {
          e.preventDefault();
          acceptButton.click();
        }
      };
      acceptButton.onclick = function () {
        if (input.value.length < 1) {
          accept(undefined);
        } else {
          accept(input.value);
        }
        dialogContainer.remove();
      };
      cancelButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
  confirm: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    var cancelButton = this._createButtonBase();
    cancelButton.textContent = this.texts.cancel;
    dialogBox.append(cancelButton);

    return new Promise((accept) => {
      acceptButton.onclick = function () {
        accept(true);
        dialogContainer.remove();
      };
      cancelButton.onclick = function () {
        accept(false);
        dialogContainer.remove();
      };
    });
  },
  colorPrompt: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var colorInput = this._createColorInputBase();
    dialogBox.append(colorInput);

    dialogBox.append(this._createBreakBase());

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    var cancelButton = this._createButtonBase();
    cancelButton.textContent = this.texts.cancel;
    dialogBox.append(cancelButton);

    return new Promise((accept) => {
      acceptButton.onclick = function () {
        accept(colorInput.value);
        dialogContainer.remove();
      };
      cancelButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
  passwordPrompt: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var input = this._createTextInputBase();
    input.type = "password";
    dialogBox.append(input);

    dialogBox.append(this._createBreakBase());

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    var cancelButton = this._createButtonBase();
    cancelButton.textContent = this.texts.cancel;
    dialogBox.append(cancelButton);

    return new Promise((accept) => {
      input.onkeydown = function (e) {
        if (e.key == "Enter") {
          e.preventDefault();
          acceptButton.click();
        }
      };
      acceptButton.onclick = function () {
        if (input.value.length < 1) {
          accept(undefined);
        } else {
          accept(input.value);
        }
        dialogContainer.remove();
      };
      cancelButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
};

module.exports = dialog;


/***/ },

/***/ 3694
(module, __unused_webpack_exports, __webpack_require__) {

var FONT_DATA_URL = __webpack_require__(7762);
FONT_DATA_URL = FONT_DATA_URL.default ? FONT_DATA_URL.default : FONT_DATA_URL;

module.exports = [
    {
        element: "style",
        textContent: `@font-face { src: url(${FONT_DATA_URL}); font-family: PixelFont; font-size: 20px; }`
    }
];

/***/ },

/***/ 5100
(module) {

//Webpack compatible version of elements module from gvbvdxx-pack-2
//With some new updates as well.
var __GP_elements = {};
function isDOM(Obj) {
  return Obj instanceof Element;
}
var elements = {
  appendElements: function (elm, appendArray) {
    for (var appendElm of appendArray) {
      elm.append(appendElm);
    }
  },
  getStylelessAJSON(props = {}) {
    return {
      element: "a",
      style: {
        all: "unset",
      },
      ...props,
    };
  },
  removeAllChildren: function (elm) {
    Array.from(elm.children).forEach((elm) => elm.remove());
  },
  appendElementsFromJSON: function (elm, appendJSONArray) {
    var elms = elements.createElementsFromJSON(appendJSONArray);
    elements.appendElements(elm, elms);
    return elms;
  },
  setInnerJSON: function (elm, appendJSONArray) {
    elements.removeAllChildren(elm);
    var elms = elements.createElementsFromJSON(appendJSONArray);
    elements.appendElements(elm, elms);
    return elms;
  },
  createElementsFromJSON: function (jsonelmArray) {
    //converts an array of json's with element properties to a element list.
    function runElements(arry) {
      var myRealElms = [];
      for (var elm of arry) {
        if (!isDOM(elm)) {
          if (typeof elm == "object") {
            var realElm = document.createElement(elm.element);
            for (var attriName of Object.keys(elm)) {
              if (!(attriName == "element" || attriName == "children")) {
                var attributeValue = elm[attriName];
                var setattri = true;
                if (attriName == "gid") {
                  __GP_elements[attributeValue] = realElm;
                  setattri = false;
                }
                if (attriName == "style") {
                  for (var styleName of Object.keys(attributeValue)) {
                    var styleValue = attributeValue[styleName];
                    realElm.style[styleName] = styleValue;
                  }
                  setattri = false;
                }
                if (attriName == "styleProperties") {
                  for (var styleName of Object.keys(attributeValue)) {
                    var styleValue = attributeValue[styleName];
                    realElm.style.setProperty(styleName, styleValue);
                  }
                  setattri = false;
                }
                if (attriName == "dangerouslySetInnerHTML") {
                  realElm.innerHTML = attributeValue;
                  setattri = false;
                } else if (attriName == "innerHTML") {
                  console.trace(
                    'Warning: The "innerHTML" property is deprecated. ' +
                      'Please use "dangerouslySetInnerHTML" instead.',
                  );
                  realElm.innerHTML = attributeValue;
                  setattri = false;
                }
                if (attriName == "textContent") {
                  realElm.textContent = attributeValue;
                  setattri = false;
                }
                if (attriName == "src") {
                  realElm.src = attributeValue;
                  setattri = false;
                }
                if (attriName == "srcObject") {
                  realElm.srcObject = attributeValue;
                  setattri = false;
                }
                if (attriName == "value") {
                  realElm.value = attributeValue;
                  setattri = false;
                }
                if (attriName == "min") {
                  realElm.min = attributeValue;
                  setattri = false;
                }
                if (attriName == "max") {
                  realElm.max = attributeValue;
                  setattri = false;
                }
                if (attriName == "width") {
                  realElm.width = attributeValue;
                  setattri = false;
                }
                if (attriName == "height") {
                  realElm.height = attributeValue;
                  setattri = false;
                }
                if (attriName == "className") {
                  realElm.className = attributeValue;
                  setattri = false;
                }
                if (attriName == "hidden") {
                  if (attributeValue) {
                    realElm.hidden = true;
                  }
                  setattri = false;
                }
                if (attriName == "selected") {
                  if (attributeValue) {
                    realElm.selected = true;
                  }
                  setattri = false;
                }
                if (attriName == "eventListeners") {
                  if (Array.isArray(attributeValue)) {
                    for (var event of attributeValue) {
                      realElm.addEventListener(event.event, event.func);
                    }
                  }
                  setattri = false;
                }
                if (attriName == "GPWhenCreated") {
                  attributeValue.bind(realElm)(realElm); //This seems weird, but first realElm is the "this" value refrence, then the second realElm is for the function value, as well as calling the new binded function.
                  setattri = false;
                }
                if (setattri) {
                  if (typeof realElm[attriName] !== "undefined") {
                    realElm[attriName] = attributeValue;
                    setattri = false;
                  }
                }
                if (setattri) {
                  realElm.setAttribute(attriName, attributeValue);
                }
              }
            }

            if (elm.children) {
              var elmsToAppend = runElements(elm.children);
              for (var elmAppend of elmsToAppend) {
                realElm.append(elmAppend);
              }
            }
            myRealElms.push(realElm);
          } else {
            myRealElms.push(elm);
          }
        } else {
          if (elm) {
            myRealElms.push(elm);
          }
        }
      }
      return myRealElms;
    }
    return runElements(jsonelmArray);
  },
  getById: function (id) {
    return document.getElementById(id);
  },
  setGPId: function (el, id) {
    __GP_elements[id] = el;
    return el;
  },
  disposeGPId: function (id) {
    __GP_elements[id] = undefined;
  },
  getGPId: function (id) {
    if (__GP_elements[id]) {
      return __GP_elements[id];
    }
    return null;
  },
  body: document.body,
  __GP_elements: __GP_elements,
};
module.exports = elements;


/***/ },

/***/ 7526
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ },

/***/ 8287
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(7526)
const ieee754 = __webpack_require__(251)
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ },

/***/ 7833
(module, exports, __webpack_require__) {

/* provided dependency */ var process = __webpack_require__(5606);
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	let m;

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	// eslint-disable-next-line no-return-assign
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG') ;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(736)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ },

/***/ 736
(module, __unused_webpack_exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(6585);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		const split = (typeof namespaces === 'string' ? namespaces : '')
			.trim()
			.replace(/\s+/g, ',')
			.split(',')
			.filter(Boolean);

		for (const ns of split) {
			if (ns[0] === '-') {
				createDebug.skips.push(ns.slice(1));
			} else {
				createDebug.names.push(ns);
			}
		}
	}

	/**
	 * Checks if the given string matches a namespace template, honoring
	 * asterisks as wildcards.
	 *
	 * @param {String} search
	 * @param {String} template
	 * @return {Boolean}
	 */
	function matchesTemplate(search, template) {
		let searchIndex = 0;
		let templateIndex = 0;
		let starIndex = -1;
		let matchIndex = 0;

		while (searchIndex < search.length) {
			if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
				// Match character or proceed with wildcard
				if (template[templateIndex] === '*') {
					starIndex = templateIndex;
					matchIndex = searchIndex;
					templateIndex++; // Skip the '*'
				} else {
					searchIndex++;
					templateIndex++;
				}
			} else if (starIndex !== -1) { // eslint-disable-line no-negated-condition
				// Backtrack to the last '*' and try to match more characters
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else {
				return false; // No match
			}
		}

		// Handle trailing '*' in template
		while (templateIndex < template.length && template[templateIndex] === '*') {
			templateIndex++;
		}

		return templateIndex === template.length;
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names,
			...createDebug.skips.map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		for (const skip of createDebug.skips) {
			if (matchesTemplate(name, skip)) {
				return false;
			}
		}

		for (const ns of createDebug.names) {
			if (matchesTemplate(name, ns)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ },

/***/ 6310
(module) {

"use strict";


/**
 * @typedef {{ [key: string]: any }} Extensions
 * @typedef {Error} Err
 * @property {string} message
 */

/**
 *
 * @param {Error} obj
 * @param {Extensions} props
 * @returns {Error & Extensions}
 */
function assign(obj, props) {
    for (const key in props) {
        Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true,
        });
    }

    return obj;
}

/**
 *
 * @param {any} err - An Error
 * @param {string|Extensions} code - A string code or props to set on the error
 * @param {Extensions} [props] - Props to set on the error
 * @returns {Error & Extensions}
 */
function createError(err, code, props) {
    if (!err || typeof err === 'string') {
        throw new TypeError('Please pass an Error to err-code');
    }

    if (!props) {
        props = {};
    }

    if (typeof code === 'object') {
        props = code;
        code = '';
    }

    if (code) {
        props.code = code;
    }

    try {
        return assign(err, props);
    } catch (_) {
        props.message = err.message;
        props.stack = err.stack;

        const ErrClass = function () {};

        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));

        // @ts-ignore
        const output = assign(new ErrClass(), props);

        return output;
    }
}

module.exports = createError;


/***/ },

/***/ 7007
(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ },

/***/ 5064
(module) {

// originally pulled out of simple-peer

module.exports = function getBrowserRTC () {
  if (typeof globalThis === 'undefined') return null
  var wrtc = {
    RTCPeerConnection: globalThis.RTCPeerConnection || globalThis.mozRTCPeerConnection ||
      globalThis.webkitRTCPeerConnection,
    RTCSessionDescription: globalThis.RTCSessionDescription ||
      globalThis.mozRTCSessionDescription || globalThis.webkitRTCSessionDescription,
    RTCIceCandidate: globalThis.RTCIceCandidate || globalThis.mozRTCIceCandidate ||
      globalThis.webkitRTCIceCandidate
  }
  if (!wrtc.RTCPeerConnection) return null
  return wrtc
}


/***/ },

/***/ 251
(__unused_webpack_module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ },

/***/ 6698
(module) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ },

/***/ 1710
(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var process = __webpack_require__(5606);
/*!

JSZip v3.10.2 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if(true)module.exports=e();else // removed by dead control flow
{}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t=undefined;if(!e&&t)return require(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l=undefined,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.2",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){if("string"==typeof e)return"string";var t=Object.prototype.toString.call(e);return"[object Array]"===t?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&"[object Uint8Array]"===t?"uint8array":o.arraybuffer&&"[object ArrayBuffer]"===t?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))?void 0!==Blob.prototype.arrayBuffer?n.arrayBuffer():"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):u.Promise.reject(new Error(r+" is a Blob, but we have no way of reading it.")):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});

/***/ },

/***/ 6585
(module) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ },

/***/ 5606
(module) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ },

/***/ 9596
(module, __unused_webpack_exports, __webpack_require__) {

/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : __webpack_require__.g)
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0))


/***/ },

/***/ 3209
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);


// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
var MAX_BYTES = 65536

// Node supports requesting up to this number of bytes
// https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48
var MAX_UINT32 = 4294967295

function oldBrowser () {
  throw new Error('Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11')
}

var Buffer = (__webpack_require__(2861).Buffer)
var crypto = __webpack_require__.g.crypto || __webpack_require__.g.msCrypto

if (crypto && crypto.getRandomValues) {
  module.exports = randomBytes
} else {
  module.exports = oldBrowser
}

function randomBytes (size, cb) {
  // phantomjs needs to throw
  if (size > MAX_UINT32) throw new RangeError('requested too many random bytes')

  var bytes = Buffer.allocUnsafe(size)

  if (size > 0) {  // getRandomValues fails on IE if size == 0
    if (size > MAX_BYTES) { // this is the max bytes crypto.getRandomValues
      // can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
      for (var generated = 0; generated < size; generated += MAX_BYTES) {
        // buffer.slice automatically checks if the end is past the end of
        // the buffer so we don't have to here
        crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES))
      }
    } else {
      crypto.getRandomValues(bytes)
    }
  }

  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes)
    })
  }

  return bytes
}


/***/ },

/***/ 2861
(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(8287)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ },

/***/ 1770
(module, __unused_webpack_exports, __webpack_require__) {

/*! simple-peer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
const debug = __webpack_require__(7833)('simple-peer')
const getBrowserRTC = __webpack_require__(5064)
const randombytes = __webpack_require__(3209)
const stream = __webpack_require__(6828)
const queueMicrotask = __webpack_require__(9596) // TODO: remove when Node 10 is not supported
const errCode = __webpack_require__(6310)
const { Buffer } = __webpack_require__(8287)

const MAX_BUFFERED_AMOUNT = 64 * 1024
const ICECOMPLETE_TIMEOUT = 5 * 1000
const CHANNEL_CLOSING_TIMEOUT = 5 * 1000

// HACK: Filter trickle lines when trickle is disabled #354
function filterTrickle (sdp) {
  return sdp.replace(/a=ice-options:trickle\s\n/g, '')
}

function warn (message) {
  console.warn(message)
}

/**
 * WebRTC peer connection. Same API as node core `net.Socket`, plus a few extra methods.
 * Duplex stream.
 * @param {Object} opts
 */
class Peer extends stream.Duplex {
  constructor (opts) {
    opts = Object.assign({
      allowHalfOpen: false
    }, opts)

    super(opts)

    this._id = randombytes(4).toString('hex').slice(0, 7)
    this._debug('new peer %o', opts)

    this.channelName = opts.initiator
      ? opts.channelName || randombytes(20).toString('hex')
      : null

    this.initiator = opts.initiator || false
    this.channelConfig = opts.channelConfig || Peer.channelConfig
    this.channelNegotiated = this.channelConfig.negotiated
    this.config = Object.assign({}, Peer.config, opts.config)
    this.offerOptions = opts.offerOptions || {}
    this.answerOptions = opts.answerOptions || {}
    this.sdpTransform = opts.sdpTransform || (sdp => sdp)
    this.streams = opts.streams || (opts.stream ? [opts.stream] : []) // support old "stream" option
    this.trickle = opts.trickle !== undefined ? opts.trickle : true
    this.allowHalfTrickle = opts.allowHalfTrickle !== undefined ? opts.allowHalfTrickle : false
    this.iceCompleteTimeout = opts.iceCompleteTimeout || ICECOMPLETE_TIMEOUT

    this.destroyed = false
    this.destroying = false
    this._connected = false

    this.remoteAddress = undefined
    this.remoteFamily = undefined
    this.remotePort = undefined
    this.localAddress = undefined
    this.localFamily = undefined
    this.localPort = undefined

    this._wrtc = (opts.wrtc && typeof opts.wrtc === 'object')
      ? opts.wrtc
      : getBrowserRTC()

    if (!this._wrtc) {
      if (typeof window === 'undefined') {
        throw errCode(new Error('No WebRTC support: Specify `opts.wrtc` option in this environment'), 'ERR_WEBRTC_SUPPORT')
      } else {
        throw errCode(new Error('No WebRTC support: Not a supported browser'), 'ERR_WEBRTC_SUPPORT')
      }
    }

    this._pcReady = false
    this._channelReady = false
    this._iceComplete = false // ice candidate trickle done (got null candidate)
    this._iceCompleteTimer = null // send an offer/answer anyway after some timeout
    this._channel = null
    this._pendingCandidates = []

    this._isNegotiating = false // is this peer waiting for negotiation to complete?
    this._firstNegotiation = true
    this._batchedNegotiation = false // batch synchronous negotiations
    this._queuedNegotiation = false // is there a queued negotiation request?
    this._sendersAwaitingStable = []
    this._senderMap = new Map()
    this._closingInterval = null

    this._remoteTracks = []
    this._remoteStreams = []

    this._chunk = null
    this._cb = null
    this._interval = null

    try {
      this._pc = new (this._wrtc.RTCPeerConnection)(this.config)
    } catch (err) {
      this.destroy(errCode(err, 'ERR_PC_CONSTRUCTOR'))
      return
    }

    // We prefer feature detection whenever possible, but sometimes that's not
    // possible for certain implementations.
    this._isReactNativeWebrtc = typeof this._pc._peerConnectionId === 'number'

    this._pc.oniceconnectionstatechange = () => {
      this._onIceStateChange()
    }
    this._pc.onicegatheringstatechange = () => {
      this._onIceStateChange()
    }
    this._pc.onconnectionstatechange = () => {
      this._onConnectionStateChange()
    }
    this._pc.onsignalingstatechange = () => {
      this._onSignalingStateChange()
    }
    this._pc.onicecandidate = event => {
      this._onIceCandidate(event)
    }

    // HACK: Fix for odd Firefox behavior, see: https://github.com/feross/simple-peer/pull/783
    if (typeof this._pc.peerIdentity === 'object') {
      this._pc.peerIdentity.catch(err => {
        this.destroy(errCode(err, 'ERR_PC_PEER_IDENTITY'))
      })
    }

    // Other spec events, unused by this implementation:
    // - onconnectionstatechange
    // - onicecandidateerror
    // - onfingerprintfailure
    // - onnegotiationneeded

    if (this.initiator || this.channelNegotiated) {
      this._setupData({
        channel: this._pc.createDataChannel(this.channelName, this.channelConfig)
      })
    } else {
      this._pc.ondatachannel = event => {
        this._setupData(event)
      }
    }

    if (this.streams) {
      this.streams.forEach(stream => {
        this.addStream(stream)
      })
    }
    this._pc.ontrack = event => {
      this._onTrack(event)
    }

    this._debug('initial negotiation')
    this._needsNegotiation()

    this._onFinishBound = () => {
      this._onFinish()
    }
    this.once('finish', this._onFinishBound)
  }

  get bufferSize () {
    return (this._channel && this._channel.bufferedAmount) || 0
  }

  // HACK: it's possible channel.readyState is "closing" before peer.destroy() fires
  // https://bugs.chromium.org/p/chromium/issues/detail?id=882743
  get connected () {
    return (this._connected && this._channel.readyState === 'open')
  }

  address () {
    return { port: this.localPort, family: this.localFamily, address: this.localAddress }
  }

  signal (data) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot signal after peer is destroyed'), 'ERR_DESTROYED')
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (err) {
        data = {}
      }
    }
    this._debug('signal()')

    if (data.renegotiate && this.initiator) {
      this._debug('got request to renegotiate')
      this._needsNegotiation()
    }
    if (data.transceiverRequest && this.initiator) {
      this._debug('got request for transceiver')
      this.addTransceiver(data.transceiverRequest.kind, data.transceiverRequest.init)
    }
    if (data.candidate) {
      if (this._pc.remoteDescription && this._pc.remoteDescription.type) {
        this._addIceCandidate(data.candidate)
      } else {
        this._pendingCandidates.push(data.candidate)
      }
    }
    if (data.sdp) {
      this._pc.setRemoteDescription(new (this._wrtc.RTCSessionDescription)(data))
        .then(() => {
          if (this.destroyed) return

          this._pendingCandidates.forEach(candidate => {
            this._addIceCandidate(candidate)
          })
          this._pendingCandidates = []

          if (this._pc.remoteDescription.type === 'offer') this._createAnswer()
        })
        .catch(err => {
          this.destroy(errCode(err, 'ERR_SET_REMOTE_DESCRIPTION'))
        })
    }
    if (!data.sdp && !data.candidate && !data.renegotiate && !data.transceiverRequest) {
      this.destroy(errCode(new Error('signal() called with invalid signal data'), 'ERR_SIGNALING'))
    }
  }

  _addIceCandidate (candidate) {
    const iceCandidateObj = new this._wrtc.RTCIceCandidate(candidate)
    this._pc.addIceCandidate(iceCandidateObj)
      .catch(err => {
        if (!iceCandidateObj.address || iceCandidateObj.address.endsWith('.local')) {
          warn('Ignoring unsupported ICE candidate.')
        } else {
          this.destroy(errCode(err, 'ERR_ADD_ICE_CANDIDATE'))
        }
      })
  }

  /**
   * Send text/binary data to the remote peer.
   * @param {ArrayBufferView|ArrayBuffer|Buffer|string|Blob} chunk
   */
  send (chunk) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot send after peer is destroyed'), 'ERR_DESTROYED')
    this._channel.send(chunk)
  }

  /**
   * Add a Transceiver to the connection.
   * @param {String} kind
   * @param {Object} init
   */
  addTransceiver (kind, init) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot addTransceiver after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('addTransceiver()')

    if (this.initiator) {
      try {
        this._pc.addTransceiver(kind, init)
        this._needsNegotiation()
      } catch (err) {
        this.destroy(errCode(err, 'ERR_ADD_TRANSCEIVER'))
      }
    } else {
      this.emit('signal', { // request initiator to renegotiate
        type: 'transceiverRequest',
        transceiverRequest: { kind, init }
      })
    }
  }

  /**
   * Add a MediaStream to the connection.
   * @param {MediaStream} stream
   */
  addStream (stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot addStream after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('addStream()')

    stream.getTracks().forEach(track => {
      this.addTrack(track, stream)
    })
  }

  /**
   * Add a MediaStreamTrack to the connection.
   * @param {MediaStreamTrack} track
   * @param {MediaStream} stream
   */
  addTrack (track, stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot addTrack after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('addTrack()')

    const submap = this._senderMap.get(track) || new Map() // nested Maps map [track, stream] to sender
    let sender = submap.get(stream)
    if (!sender) {
      sender = this._pc.addTrack(track, stream)
      submap.set(stream, sender)
      this._senderMap.set(track, submap)
      this._needsNegotiation()
    } else if (sender.removed) {
      throw errCode(new Error('Track has been removed. You should enable/disable tracks that you want to re-add.'), 'ERR_SENDER_REMOVED')
    } else {
      throw errCode(new Error('Track has already been added to that stream.'), 'ERR_SENDER_ALREADY_ADDED')
    }
  }

  /**
   * Replace a MediaStreamTrack by another in the connection.
   * @param {MediaStreamTrack} oldTrack
   * @param {MediaStreamTrack} newTrack
   * @param {MediaStream} stream
   */
  replaceTrack (oldTrack, newTrack, stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot replaceTrack after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('replaceTrack()')

    const submap = this._senderMap.get(oldTrack)
    const sender = submap ? submap.get(stream) : null
    if (!sender) {
      throw errCode(new Error('Cannot replace track that was never added.'), 'ERR_TRACK_NOT_ADDED')
    }
    if (newTrack) this._senderMap.set(newTrack, submap)

    if (sender.replaceTrack != null) {
      sender.replaceTrack(newTrack)
    } else {
      this.destroy(errCode(new Error('replaceTrack is not supported in this browser'), 'ERR_UNSUPPORTED_REPLACETRACK'))
    }
  }

  /**
   * Remove a MediaStreamTrack from the connection.
   * @param {MediaStreamTrack} track
   * @param {MediaStream} stream
   */
  removeTrack (track, stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot removeTrack after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('removeSender()')

    const submap = this._senderMap.get(track)
    const sender = submap ? submap.get(stream) : null
    if (!sender) {
      throw errCode(new Error('Cannot remove track that was never added.'), 'ERR_TRACK_NOT_ADDED')
    }
    try {
      sender.removed = true
      this._pc.removeTrack(sender)
    } catch (err) {
      if (err.name === 'NS_ERROR_UNEXPECTED') {
        this._sendersAwaitingStable.push(sender) // HACK: Firefox must wait until (signalingState === stable) https://bugzilla.mozilla.org/show_bug.cgi?id=1133874
      } else {
        this.destroy(errCode(err, 'ERR_REMOVE_TRACK'))
      }
    }
    this._needsNegotiation()
  }

  /**
   * Remove a MediaStream from the connection.
   * @param {MediaStream} stream
   */
  removeStream (stream) {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot removeStream after peer is destroyed'), 'ERR_DESTROYED')
    this._debug('removeSenders()')

    stream.getTracks().forEach(track => {
      this.removeTrack(track, stream)
    })
  }

  _needsNegotiation () {
    this._debug('_needsNegotiation')
    if (this._batchedNegotiation) return // batch synchronous renegotiations
    this._batchedNegotiation = true
    queueMicrotask(() => {
      this._batchedNegotiation = false
      if (this.initiator || !this._firstNegotiation) {
        this._debug('starting batched negotiation')
        this.negotiate()
      } else {
        this._debug('non-initiator initial negotiation request discarded')
      }
      this._firstNegotiation = false
    })
  }

  negotiate () {
    if (this.destroying) return
    if (this.destroyed) throw errCode(new Error('cannot negotiate after peer is destroyed'), 'ERR_DESTROYED')

    if (this.initiator) {
      if (this._isNegotiating) {
        this._queuedNegotiation = true
        this._debug('already negotiating, queueing')
      } else {
        this._debug('start negotiation')
        setTimeout(() => { // HACK: Chrome crashes if we immediately call createOffer
          this._createOffer()
        }, 0)
      }
    } else {
      if (this._isNegotiating) {
        this._queuedNegotiation = true
        this._debug('already negotiating, queueing')
      } else {
        this._debug('requesting negotiation from initiator')
        this.emit('signal', { // request initiator to renegotiate
          type: 'renegotiate',
          renegotiate: true
        })
      }
    }
    this._isNegotiating = true
  }

  // TODO: Delete this method once readable-stream is updated to contain a default
  // implementation of destroy() that automatically calls _destroy()
  // See: https://github.com/nodejs/readable-stream/issues/283
  destroy (err) {
    this._destroy(err, () => {})
  }

  _destroy (err, cb) {
    if (this.destroyed || this.destroying) return
    this.destroying = true

    this._debug('destroying (error: %s)', err && (err.message || err))

    queueMicrotask(() => { // allow events concurrent with the call to _destroy() to fire (see #692)
      this.destroyed = true
      this.destroying = false

      this._debug('destroy (error: %s)', err && (err.message || err))

      this.readable = this.writable = false

      if (!this._readableState.ended) this.push(null)
      if (!this._writableState.finished) this.end()

      this._connected = false
      this._pcReady = false
      this._channelReady = false
      this._remoteTracks = null
      this._remoteStreams = null
      this._senderMap = null

      clearInterval(this._closingInterval)
      this._closingInterval = null

      clearInterval(this._interval)
      this._interval = null
      this._chunk = null
      this._cb = null

      if (this._onFinishBound) this.removeListener('finish', this._onFinishBound)
      this._onFinishBound = null

      if (this._channel) {
        try {
          this._channel.close()
        } catch (err) {}

        // allow events concurrent with destruction to be handled
        this._channel.onmessage = null
        this._channel.onopen = null
        this._channel.onclose = null
        this._channel.onerror = null
      }
      if (this._pc) {
        try {
          this._pc.close()
        } catch (err) {}

        // allow events concurrent with destruction to be handled
        this._pc.oniceconnectionstatechange = null
        this._pc.onicegatheringstatechange = null
        this._pc.onsignalingstatechange = null
        this._pc.onicecandidate = null
        this._pc.ontrack = null
        this._pc.ondatachannel = null
      }
      this._pc = null
      this._channel = null

      if (err) this.emit('error', err)
      this.emit('close')
      cb()
    })
  }

  _setupData (event) {
    if (!event.channel) {
      // In some situations `pc.createDataChannel()` returns `undefined` (in wrtc),
      // which is invalid behavior. Handle it gracefully.
      // See: https://github.com/feross/simple-peer/issues/163
      return this.destroy(errCode(new Error('Data channel event is missing `channel` property'), 'ERR_DATA_CHANNEL'))
    }

    this._channel = event.channel
    this._channel.binaryType = 'arraybuffer'

    if (typeof this._channel.bufferedAmountLowThreshold === 'number') {
      this._channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT
    }

    this.channelName = this._channel.label

    this._channel.onmessage = event => {
      this._onChannelMessage(event)
    }
    this._channel.onbufferedamountlow = () => {
      this._onChannelBufferedAmountLow()
    }
    this._channel.onopen = () => {
      this._onChannelOpen()
    }
    this._channel.onclose = () => {
      this._onChannelClose()
    }
    this._channel.onerror = event => {
      const err = event.error instanceof Error
        ? event.error
        : new Error(`Datachannel error: ${event.message} ${event.filename}:${event.lineno}:${event.colno}`)
      this.destroy(errCode(err, 'ERR_DATA_CHANNEL'))
    }

    // HACK: Chrome will sometimes get stuck in readyState "closing", let's check for this condition
    // https://bugs.chromium.org/p/chromium/issues/detail?id=882743
    let isClosing = false
    this._closingInterval = setInterval(() => { // No "onclosing" event
      if (this._channel && this._channel.readyState === 'closing') {
        if (isClosing) this._onChannelClose() // closing timed out: equivalent to onclose firing
        isClosing = true
      } else {
        isClosing = false
      }
    }, CHANNEL_CLOSING_TIMEOUT)
  }

  _read () {}

  _write (chunk, encoding, cb) {
    if (this.destroyed) return cb(errCode(new Error('cannot write after peer is destroyed'), 'ERR_DATA_CHANNEL'))

    if (this._connected) {
      try {
        this.send(chunk)
      } catch (err) {
        return this.destroy(errCode(err, 'ERR_DATA_CHANNEL'))
      }
      if (this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
        this._debug('start backpressure: bufferedAmount %d', this._channel.bufferedAmount)
        this._cb = cb
      } else {
        cb(null)
      }
    } else {
      this._debug('write before connect')
      this._chunk = chunk
      this._cb = cb
    }
  }

  // When stream finishes writing, close socket. Half open connections are not
  // supported.
  _onFinish () {
    if (this.destroyed) return

    // Wait a bit before destroying so the socket flushes.
    // TODO: is there a more reliable way to accomplish this?
    const destroySoon = () => {
      setTimeout(() => this.destroy(), 1000)
    }

    if (this._connected) {
      destroySoon()
    } else {
      this.once('connect', destroySoon)
    }
  }

  _startIceCompleteTimeout () {
    if (this.destroyed) return
    if (this._iceCompleteTimer) return
    this._debug('started iceComplete timeout')
    this._iceCompleteTimer = setTimeout(() => {
      if (!this._iceComplete) {
        this._iceComplete = true
        this._debug('iceComplete timeout completed')
        this.emit('iceTimeout')
        this.emit('_iceComplete')
      }
    }, this.iceCompleteTimeout)
  }

  _createOffer () {
    if (this.destroyed) return

    this._pc.createOffer(this.offerOptions)
      .then(offer => {
        if (this.destroyed) return
        if (!this.trickle && !this.allowHalfTrickle) offer.sdp = filterTrickle(offer.sdp)
        offer.sdp = this.sdpTransform(offer.sdp)

        const sendOffer = () => {
          if (this.destroyed) return
          const signal = this._pc.localDescription || offer
          this._debug('signal')
          this.emit('signal', {
            type: signal.type,
            sdp: signal.sdp
          })
        }

        const onSuccess = () => {
          this._debug('createOffer success')
          if (this.destroyed) return
          if (this.trickle || this._iceComplete) sendOffer()
          else this.once('_iceComplete', sendOffer) // wait for candidates
        }

        const onError = err => {
          this.destroy(errCode(err, 'ERR_SET_LOCAL_DESCRIPTION'))
        }

        this._pc.setLocalDescription(offer)
          .then(onSuccess)
          .catch(onError)
      })
      .catch(err => {
        this.destroy(errCode(err, 'ERR_CREATE_OFFER'))
      })
  }

  _requestMissingTransceivers () {
    if (this._pc.getTransceivers) {
      this._pc.getTransceivers().forEach(transceiver => {
        if (!transceiver.mid && transceiver.sender.track && !transceiver.requested) {
          transceiver.requested = true // HACK: Safari returns negotiated transceivers with a null mid
          this.addTransceiver(transceiver.sender.track.kind)
        }
      })
    }
  }

  _createAnswer () {
    if (this.destroyed) return

    this._pc.createAnswer(this.answerOptions)
      .then(answer => {
        if (this.destroyed) return
        if (!this.trickle && !this.allowHalfTrickle) answer.sdp = filterTrickle(answer.sdp)
        answer.sdp = this.sdpTransform(answer.sdp)

        const sendAnswer = () => {
          if (this.destroyed) return
          const signal = this._pc.localDescription || answer
          this._debug('signal')
          this.emit('signal', {
            type: signal.type,
            sdp: signal.sdp
          })
          if (!this.initiator) this._requestMissingTransceivers()
        }

        const onSuccess = () => {
          if (this.destroyed) return
          if (this.trickle || this._iceComplete) sendAnswer()
          else this.once('_iceComplete', sendAnswer)
        }

        const onError = err => {
          this.destroy(errCode(err, 'ERR_SET_LOCAL_DESCRIPTION'))
        }

        this._pc.setLocalDescription(answer)
          .then(onSuccess)
          .catch(onError)
      })
      .catch(err => {
        this.destroy(errCode(err, 'ERR_CREATE_ANSWER'))
      })
  }

  _onConnectionStateChange () {
    if (this.destroyed) return
    if (this._pc.connectionState === 'failed') {
      this.destroy(errCode(new Error('Connection failed.'), 'ERR_CONNECTION_FAILURE'))
    }
  }

  _onIceStateChange () {
    if (this.destroyed) return
    const iceConnectionState = this._pc.iceConnectionState
    const iceGatheringState = this._pc.iceGatheringState

    this._debug(
      'iceStateChange (connection: %s) (gathering: %s)',
      iceConnectionState,
      iceGatheringState
    )
    this.emit('iceStateChange', iceConnectionState, iceGatheringState)

    if (iceConnectionState === 'connected' || iceConnectionState === 'completed') {
      this._pcReady = true
      this._maybeReady()
    }
    if (iceConnectionState === 'failed') {
      this.destroy(errCode(new Error('Ice connection failed.'), 'ERR_ICE_CONNECTION_FAILURE'))
    }
    if (iceConnectionState === 'closed') {
      this.destroy(errCode(new Error('Ice connection closed.'), 'ERR_ICE_CONNECTION_CLOSED'))
    }
  }

  getStats (cb) {
    // statreports can come with a value array instead of properties
    const flattenValues = report => {
      if (Object.prototype.toString.call(report.values) === '[object Array]') {
        report.values.forEach(value => {
          Object.assign(report, value)
        })
      }
      return report
    }

    // Promise-based getStats() (standard)
    if (this._pc.getStats.length === 0 || this._isReactNativeWebrtc) {
      this._pc.getStats()
        .then(res => {
          const reports = []
          res.forEach(report => {
            reports.push(flattenValues(report))
          })
          cb(null, reports)
        }, err => cb(err))

    // Single-parameter callback-based getStats() (non-standard)
    } else if (this._pc.getStats.length > 0) {
      this._pc.getStats(res => {
        // If we destroy connection in `connect` callback this code might happen to run when actual connection is already closed
        if (this.destroyed) return

        const reports = []
        res.result().forEach(result => {
          const report = {}
          result.names().forEach(name => {
            report[name] = result.stat(name)
          })
          report.id = result.id
          report.type = result.type
          report.timestamp = result.timestamp
          reports.push(flattenValues(report))
        })
        cb(null, reports)
      }, err => cb(err))

    // Unknown browser, skip getStats() since it's anyone's guess which style of
    // getStats() they implement.
    } else {
      cb(null, [])
    }
  }

  _maybeReady () {
    this._debug('maybeReady pc %s channel %s', this._pcReady, this._channelReady)
    if (this._connected || this._connecting || !this._pcReady || !this._channelReady) return

    this._connecting = true

    // HACK: We can't rely on order here, for details see https://github.com/js-platform/node-webrtc/issues/339
    const findCandidatePair = () => {
      if (this.destroyed) return

      this.getStats((err, items) => {
        if (this.destroyed) return

        // Treat getStats error as non-fatal. It's not essential.
        if (err) items = []

        const remoteCandidates = {}
        const localCandidates = {}
        const candidatePairs = {}
        let foundSelectedCandidatePair = false

        items.forEach(item => {
          // TODO: Once all browsers support the hyphenated stats report types, remove
          // the non-hypenated ones
          if (item.type === 'remotecandidate' || item.type === 'remote-candidate') {
            remoteCandidates[item.id] = item
          }
          if (item.type === 'localcandidate' || item.type === 'local-candidate') {
            localCandidates[item.id] = item
          }
          if (item.type === 'candidatepair' || item.type === 'candidate-pair') {
            candidatePairs[item.id] = item
          }
        })

        const setSelectedCandidatePair = selectedCandidatePair => {
          foundSelectedCandidatePair = true

          let local = localCandidates[selectedCandidatePair.localCandidateId]

          if (local && (local.ip || local.address)) {
            // Spec
            this.localAddress = local.ip || local.address
            this.localPort = Number(local.port)
          } else if (local && local.ipAddress) {
            // Firefox
            this.localAddress = local.ipAddress
            this.localPort = Number(local.portNumber)
          } else if (typeof selectedCandidatePair.googLocalAddress === 'string') {
            // TODO: remove this once Chrome 58 is released
            local = selectedCandidatePair.googLocalAddress.split(':')
            this.localAddress = local[0]
            this.localPort = Number(local[1])
          }
          if (this.localAddress) {
            this.localFamily = this.localAddress.includes(':') ? 'IPv6' : 'IPv4'
          }

          let remote = remoteCandidates[selectedCandidatePair.remoteCandidateId]

          if (remote && (remote.ip || remote.address)) {
            // Spec
            this.remoteAddress = remote.ip || remote.address
            this.remotePort = Number(remote.port)
          } else if (remote && remote.ipAddress) {
            // Firefox
            this.remoteAddress = remote.ipAddress
            this.remotePort = Number(remote.portNumber)
          } else if (typeof selectedCandidatePair.googRemoteAddress === 'string') {
            // TODO: remove this once Chrome 58 is released
            remote = selectedCandidatePair.googRemoteAddress.split(':')
            this.remoteAddress = remote[0]
            this.remotePort = Number(remote[1])
          }
          if (this.remoteAddress) {
            this.remoteFamily = this.remoteAddress.includes(':') ? 'IPv6' : 'IPv4'
          }

          this._debug(
            'connect local: %s:%s remote: %s:%s',
            this.localAddress,
            this.localPort,
            this.remoteAddress,
            this.remotePort
          )
        }

        items.forEach(item => {
          // Spec-compliant
          if (item.type === 'transport' && item.selectedCandidatePairId) {
            setSelectedCandidatePair(candidatePairs[item.selectedCandidatePairId])
          }

          // Old implementations
          if (
            (item.type === 'googCandidatePair' && item.googActiveConnection === 'true') ||
            ((item.type === 'candidatepair' || item.type === 'candidate-pair') && item.selected)
          ) {
            setSelectedCandidatePair(item)
          }
        })

        // Ignore candidate pair selection in browsers like Safari 11 that do not have any local or remote candidates
        // But wait until at least 1 candidate pair is available
        if (!foundSelectedCandidatePair && (!Object.keys(candidatePairs).length || Object.keys(localCandidates).length)) {
          setTimeout(findCandidatePair, 100)
          return
        } else {
          this._connecting = false
          this._connected = true
        }

        if (this._chunk) {
          try {
            this.send(this._chunk)
          } catch (err) {
            return this.destroy(errCode(err, 'ERR_DATA_CHANNEL'))
          }
          this._chunk = null
          this._debug('sent chunk from "write before connect"')

          const cb = this._cb
          this._cb = null
          cb(null)
        }

        // If `bufferedAmountLowThreshold` and 'onbufferedamountlow' are unsupported,
        // fallback to using setInterval to implement backpressure.
        if (typeof this._channel.bufferedAmountLowThreshold !== 'number') {
          this._interval = setInterval(() => this._onInterval(), 150)
          if (this._interval.unref) this._interval.unref()
        }

        this._debug('connect')
        this.emit('connect')
      })
    }
    findCandidatePair()
  }

  _onInterval () {
    if (!this._cb || !this._channel || this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
      return
    }
    this._onChannelBufferedAmountLow()
  }

  _onSignalingStateChange () {
    if (this.destroyed) return

    if (this._pc.signalingState === 'stable') {
      this._isNegotiating = false

      // HACK: Firefox doesn't yet support removing tracks when signalingState !== 'stable'
      this._debug('flushing sender queue', this._sendersAwaitingStable)
      this._sendersAwaitingStable.forEach(sender => {
        this._pc.removeTrack(sender)
        this._queuedNegotiation = true
      })
      this._sendersAwaitingStable = []

      if (this._queuedNegotiation) {
        this._debug('flushing negotiation queue')
        this._queuedNegotiation = false
        this._needsNegotiation() // negotiate again
      } else {
        this._debug('negotiated')
        this.emit('negotiated')
      }
    }

    this._debug('signalingStateChange %s', this._pc.signalingState)
    this.emit('signalingStateChange', this._pc.signalingState)
  }

  _onIceCandidate (event) {
    if (this.destroyed) return
    if (event.candidate && this.trickle) {
      this.emit('signal', {
        type: 'candidate',
        candidate: {
          candidate: event.candidate.candidate,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          sdpMid: event.candidate.sdpMid
        }
      })
    } else if (!event.candidate && !this._iceComplete) {
      this._iceComplete = true
      this.emit('_iceComplete')
    }
    // as soon as we've received one valid candidate start timeout
    if (event.candidate) {
      this._startIceCompleteTimeout()
    }
  }

  _onChannelMessage (event) {
    if (this.destroyed) return
    let data = event.data
    if (data instanceof ArrayBuffer) data = Buffer.from(data)
    this.push(data)
  }

  _onChannelBufferedAmountLow () {
    if (this.destroyed || !this._cb) return
    this._debug('ending backpressure: bufferedAmount %d', this._channel.bufferedAmount)
    const cb = this._cb
    this._cb = null
    cb(null)
  }

  _onChannelOpen () {
    if (this._connected || this.destroyed) return
    this._debug('on channel open')
    this._channelReady = true
    this._maybeReady()
  }

  _onChannelClose () {
    if (this.destroyed) return
    this._debug('on channel close')
    this.destroy()
  }

  _onTrack (event) {
    if (this.destroyed) return

    event.streams.forEach(eventStream => {
      this._debug('on track')
      this.emit('track', event.track, eventStream)

      this._remoteTracks.push({
        track: event.track,
        stream: eventStream
      })

      if (this._remoteStreams.some(remoteStream => {
        return remoteStream.id === eventStream.id
      })) return // Only fire one 'stream' event, even though there may be multiple tracks per stream

      this._remoteStreams.push(eventStream)
      queueMicrotask(() => {
        this._debug('on stream')
        this.emit('stream', eventStream) // ensure all tracks have been added
      })
    })
  }

  _debug () {
    const args = [].slice.call(arguments)
    args[0] = '[' + this._id + '] ' + args[0]
    debug.apply(null, args)
  }
}

Peer.WEBRTC_SUPPORT = !!getBrowserRTC()

/**
 * Expose peer and data channel config for overriding all Peer
 * instances. Otherwise, just set opts.config or opts.channelConfig
 * when constructing a Peer.
 */
Peer.config = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:global.stun.twilio.com:3478'
      ]
    }
  ],
  sdpSemantics: 'unified-plan'
}

Peer.channelConfig = {}

module.exports = Peer


/***/ },

/***/ 9939
(module) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.F = codes;


/***/ },

/***/ 6641
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
};
/*</replacement>*/

module.exports = Duplex;
var Readable = __webpack_require__(7431);
var Writable = __webpack_require__(6347);
__webpack_require__(6698)(Duplex, Readable);
{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;
  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;
    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}
Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

// the no-half-open enforcer
function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  process.nextTick(onEndNT, this);
}
function onEndNT(self) {
  self.end();
}
Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

/***/ },

/***/ 4869
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;
var Transform = __webpack_require__(7495);
__webpack_require__(6698)(PassThrough, Transform);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}
PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ },

/***/ 7431
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



module.exports = Readable;

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = (__webpack_require__(7007).EventEmitter);
var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(2728);
/*</replacement>*/

var Buffer = (__webpack_require__(8287).Buffer);
var OurUint8Array = (typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*<replacement>*/
var debugUtil = __webpack_require__(7919);
var debug;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/

var BufferList = __webpack_require__(6626);
var destroyImpl = __webpack_require__(8543);
var _require = __webpack_require__(9600),
  getHighWaterMark = _require.getHighWaterMark;
var _require$codes = (__webpack_require__(9939)/* .codes */ .F),
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
  ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;

// Lazy loaded to improve the startup performance.
var StringDecoder;
var createReadableStreamAsyncIterator;
var from;
__webpack_require__(6698)(Readable, Stream);
var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}
function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(6641);
  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true;

  // Should close be emitted on destroy. Defaults to true.
  this.emitClose = options.emitClose !== false;

  // Should .destroy() be called after 'end' (and potentially 'finish')
  this.autoDestroy = !!options.autoDestroy;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = (__webpack_require__(3141)/* .StringDecoder */ .I);
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {
  Duplex = Duplex || __webpack_require__(6641);
  if (!(this instanceof Readable)) return new Readable(options);

  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5
  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex);

  // legacy
  this.readable = true;
  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }
  Stream.call(this);
}
Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;
  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }
  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};
function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  }

  // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.
  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}
function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }
  return er;
}
Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = (__webpack_require__(3141)/* .StringDecoder */ .I);
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder;
  // If setEncoding(null), decoder.encoding equals utf8
  this._readableState.encoding = this._readableState.decoder.encoding;

  // Iterate over current buffer to convert already stored Buffers:
  var p = this._readableState.buffer.head;
  var content = '';
  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }
  this._readableState.buffer.clear();
  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
};

// Don't raise the hwm > 1GB
var MAX_HWM = 0x40000000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }
  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }
  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;
  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }
  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }
  if (ret !== null) this.emit('data', ret);
  return ret;
};
function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;
  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;
    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}
function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);
  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  }

  // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.
  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}
function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};
Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;
  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }
  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);
    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);
  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }
  return dest;
};
function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}
Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    for (var i = 0; i < len; i++) dests[i].emit('unpipe', this, {
      hasUnpiped: false
    });
    return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;
  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0;

    // Try start flowing on next tick if stream isn't explicitly paused
    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);
      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }
  return res;
};
Readable.prototype.addListener = Readable.prototype.on;
Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);
  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }
  return res;
};
Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);
  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }
  return res;
};
function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;
  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true;

    // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}
function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()
    state.flowing = !state.readableListening;
    resume(this, state);
  }
  state.paused = false;
  return this;
};
function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}
function resume_(stream, state) {
  debug('resume', state.reading);
  if (!state.reading) {
    stream.read(0);
  }
  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}
Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  this._readableState.paused = true;
  return this;
};
function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null);
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;
  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }
    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };
  return this;
};
if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = __webpack_require__(9238);
    }
    return createReadableStreamAsyncIterator(this);
  };
}
Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
});

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}
function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);
  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}
function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length);

  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;
      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}
if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = __webpack_require__(8668);
    }
    return from(Readable, iterable, opts);
  };
}
function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

/***/ },

/***/ 7495
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;
var _require$codes = (__webpack_require__(9939)/* .codes */ .F),
  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
  ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
  ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
  ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
var Duplex = __webpack_require__(6641);
__webpack_require__(6698)(Transform, Duplex);
function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }
  ts.writechunk = null;
  ts.writecb = null;
  if (data != null)
    // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}
function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}
function prefinish() {
  var _this = this;
  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}
Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};
Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;
  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};
Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};
function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null)
    // single equals check for both `null` and `undefined`
    stream.push(data);

  // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}

/***/ },

/***/ 6347
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;
  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(4643)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(2728);
/*</replacement>*/

var Buffer = (__webpack_require__(8287).Buffer);
var OurUint8Array = (typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
var destroyImpl = __webpack_require__(8543);
var _require = __webpack_require__(9600),
  getHighWaterMark = _require.getHighWaterMark;
var _require$codes = (__webpack_require__(9939)/* .codes */ .F),
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
  ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
  ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
  ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
  ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
  ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
  ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
var errorOrDestroy = destroyImpl.errorOrDestroy;
__webpack_require__(6698)(Writable, Stream);
function nop() {}
function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(6641);
  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // Should close be emitted on destroy. Defaults to true.
  this.emitClose = options.emitClose !== false;

  // Should .destroy() be called after 'finish' (and potentially 'end')
  this.autoDestroy = !!options.autoDestroy;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}
function Writable(options) {
  Duplex = Duplex || __webpack_require__(6641);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.

  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5
  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex);

  // legacy.
  this.writable = true;
  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }
  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};
function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END();
  // TODO: defer error events consistently everywhere, not just the cb
  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var er;
  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }
  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }
  return true;
}
Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);
  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }
  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }
  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};
Writable.prototype.cork = function () {
  this._writableState.corked++;
};
Writable.prototype.uncork = function () {
  var state = this._writableState;
  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};
Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}
Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;
  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }
  return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}
function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}
function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;
    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }
    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}
function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;
  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }
    if (entry === null) state.lastBufferedRequest = null;
  }
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}
Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};
Writable.prototype._writev = null;
Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;
  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }
  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending) endWritable(this, state, cb);
  return this;
};
Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});
function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      errorOrDestroy(stream, err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}
function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;
        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }
  return need;
}
function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}
function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }

  // reuse the free corkReq.
  state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  cb(err);
};

/***/ },

/***/ 9238
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);


var _Object$setPrototypeO;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var finished = __webpack_require__(7413);
var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');
function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}
function readAndResolve(iter) {
  var resolve = iter[kLastResolve];
  if (resolve !== null) {
    var data = iter[kStream].read();
    // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'
    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}
function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}
function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }
      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}
var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },
  next: function next() {
    var _this = this;
    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];
    if (error !== null) {
      return Promise.reject(error);
    }
    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }
    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    }

    // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time
    var lastPromise = this[kLastPromise];
    var promise;
    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();
      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }
      promise = new Promise(this[kHandlePromise]);
    }
    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;
  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);
var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;
  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();
      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject];
      // reject if we are waiting for data in the Promise
      // returned by next() and store the error
      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }
      iterator[kError] = err;
      return;
    }
    var resolve = iterator[kLastResolve];
    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }
    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};
module.exports = createReadableStreamAsyncIterator;

/***/ },

/***/ 6626
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = __webpack_require__(8287),
  Buffer = _require.Buffer;
var _require2 = __webpack_require__(5187),
  inspect = _require2.inspect;
var custom = inspect && inspect.custom || 'inspect';
function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}
module.exports = /*#__PURE__*/function () {
  function BufferList() {
    _classCallCheck(this, BufferList);
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;
      while (p = p.next) ret += s + p.data;
      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;
      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }
      return ret;
    }

    // Consumes a specified amount of bytes or characters from the buffered data.
  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;
      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }
      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    }

    // Consumes a specified amount of characters from the buffered data.
  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;
      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;
        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }
          break;
        }
        ++c;
      }
      this.length -= c;
      return ret;
    }

    // Consumes a specified amount of bytes from the buffered data.
  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;
      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;
        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }
          break;
        }
        ++c;
      }
      this.length -= c;
      return ret;
    }

    // Make sure the linked list only shows the minimal necessary information.
  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);
  return BufferList;
}();

/***/ },

/***/ 8543
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);


// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;
  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;
  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }
  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });
  return this;
}
function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}
function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}
function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }
  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}
function emitErrorNT(self, err) {
  self.emit('error', err);
}
function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.

  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}
module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};

/***/ },

/***/ 7413
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).



var ERR_STREAM_PREMATURE_CLOSE = (__webpack_require__(9939)/* .codes */ .F).ERR_STREAM_PREMATURE_CLOSE;
function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    callback.apply(this, args);
  };
}
function noop() {}
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}
function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;
  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };
  var writableEnded = stream._writableState && stream._writableState.finished;
  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };
  var readableEnded = stream._readableState && stream._readableState.endEmitted;
  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };
  var onerror = function onerror(err) {
    callback.call(stream, err);
  };
  var onclose = function onclose() {
    var err;
    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };
  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };
  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }
  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}
module.exports = eos;

/***/ },

/***/ 8668
(module) {

module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};


/***/ },

/***/ 6943
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).



var eos;
function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}
var _require$codes = (__webpack_require__(9939)/* .codes */ .F),
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
  ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}
function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = __webpack_require__(7413);
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true;

    // request.destroy just do .end - .abort is what we want
    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}
function call(fn) {
  fn();
}
function pipe(from, to) {
  return from.pipe(to);
}
function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}
function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }
  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];
  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }
  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}
module.exports = pipeline;

/***/ },

/***/ 9600
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var ERR_INVALID_OPT_VALUE = (__webpack_require__(9939)/* .codes */ .F).ERR_INVALID_OPT_VALUE;
function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }
    return Math.floor(hwm);
  }

  // Default value
  return state.objectMode ? 16 : 16 * 1024;
}
module.exports = {
  getHighWaterMark: getHighWaterMark
};

/***/ },

/***/ 2728
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(7007).EventEmitter;


/***/ },

/***/ 6828
(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7431);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(6347);
exports.Duplex = __webpack_require__(6641);
exports.Transform = __webpack_require__(7495);
exports.PassThrough = __webpack_require__(4869);
exports.finished = __webpack_require__(7413);
exports.pipeline = __webpack_require__(6943);


/***/ },

/***/ 3141
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = (__webpack_require__(2861).Buffer);
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.I = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ },

/***/ 7762
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:font/ttf;base64,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AGUAbgBzAGUALgBvAHIAZwBUAGgAaQBzACAARgBvAG4AdAAgAFMAbwBmAHQAdwBhAHIAZQAgAGkAcwAgAGwAaQBjAGUAbgBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAUwBJAEwAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUALAAgAFYAZQByAHMAaQBvAG4AIAAxAC4AMQAuACAAVABoAGkAcwAgAGwAaQBjAGUAbgBzAGUAIABpAHMAIABhAHYAYQBpAGwAYQBiAGwAZQAgAHcAaQB0AGgAIABhACAARgBBAFEAIABhAHQAOgAgAGgAdAB0AHAAcwA6AC8ALwBvAHAAZQBuAGYAbwBuAHQAbABpAGMAZQBuAHMAZQAuAG8AcgBnAFMAYQByAGEAaAAgAEMAYQBkAGkAZwBhAG4ALQBGAHIAaQBlAGQASgBlAHIAcwBlAHkAMQAwAC0AUgBlAGcAdQBsAGEAcgBWAGUAcgBzAGkAbwBuACAAMQAuADAAMAAxADsAIAB0AHQAZgBhAHUAdABvAGgAaQBuAHQAIAAoAHYAMQAuADgALgA0AC4ANwAtADUAZAA1AGIAKQBKAGUAcgBzAGUAeQAgADEAMAAgAFIAZQBnAHUAbABhAHIAMQAuADAAMAAxADsATgBPAE4ARQA7AEoAZQByAHMAZQB5ADEAMAAtAFIAZQBnAHUAbABhAHIAUgBlAGcAdQBsAGEAcgBKAGUAcgBzAGUAeQAgADEAMABDAG8AcAB5AHIAaQBnAGgAdAAgADIAMAAyADMAIABUAGgAZQAgAFMAbwBmAHQAIABUAHkAcABlACAAUAByAG8AagBlAGMAdAAgAEEAdQB0AGgAbwByAHMAIAAoAGgAdAB0AHAAcwA6AC8ALwBnAGkAdABoAHUAYgAuAGMAbwBtAC8AcwBjAGYAcgBpAGUAZAAvAHMAbwBmAHQALQB0AHkAcABlAC0AagBlAHIAcwBlAHkAKQAAAAIAAAADAAAAFAADAAEAAAAUAAQD8gAAAGIAQAAFACIALwA5AH4AowClAKsAsAC0ALgAuwEHARMBGwEjAScBKwEzATcBPgFIAU0BWwFhAWUBfgIbAjcCxwLdAwQDCAMMAxIDKB6FHp4e8yAKIBQgGiAeICIgJiA6IKwhIiISJpj//wAAACAAMAA6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aW1hY3Jvbgdpb2dvbmVrB3VuaTAyMzcLdW5pMDA2QTAzMDEHdW5pMDEzNwZsYWN1dGUGbGNhcm9uB3VuaTAxM0MGbmFjdXRlBm5jYXJvbgd1bmkwMTQ2A2VuZw1vaHVuZ2FydW1sYXV0B29tYWNyb24GcmFjdXRlBnJjYXJvbgd1bmkwMTU3BnNhY3V0ZQd1bmkwMjE5BnRjYXJvbgd1bmkwMjFCBnVicmV2ZQ11aHVuZ2FydW1sYXV0B3VtYWNyb24HdW9nb25lawV1cmluZwZ3YWN1dGULd2NpcmN1bWZsZXgJd2RpZXJlc2lzBndncmF2ZQt5Y2lyY3VtZmxleAZ5Z3JhdmUGemFjdXRlCnpkb3RhY2NlbnQHemVyby50ZgZvbmUudGYGdHdvLnRmCHRocmVlLnRmB2ZvdXIudGYHZml2ZS50ZgZzaXgudGYIc2V2ZW4udGYIZWlnaHQudGYHbmluZS50Zgd1bmkyMDBBB3VuaTAwQTAWcGVyaW9kY2VudGVyZWQubG9jbENBVBtwZXJpb2RjZW50ZXJlZC5sb2NsQ0FULmNhc2UHdW5pMjY5OARFdXJvB3VuaTAzMDgHdW5pMDMwNwlncmF2ZWNvbWIJYWN1dGVjb21iB3VuaTAzMEIHdW5pMDMwMgd1bmkwMzBDB3VuaTAzMDYHdW5pMDMwQQl0aWxkZWNvbWIHdW5pMDMwNAd1bmkwMzEyB3VuaTAzMjYHdW5pMDMyNwd1bmkwMzI4DHVuaTAzMDguY2FzZQx1bmkwMzA3LmNhc2UOZ3JhdmVjb21iLmNhc2UOYWN1dGVjb21iLmNhc2UMdW5pMDMwQi5jYXNlDHVuaTAzMDIuY2FzZQx1bmkwMzBDLmNhc2UMdW5pMDMwNi5jYXNlDHVuaTAzMEEuY2FzZQ50aWxkZWNvbWIuY2FzZQx1bmkwMzA0LmNhc2WwACwgsABVWEVZICBLuAAOUUuwBlNaWLA0G7AoWWBmIIpVWLACJWG5CAAIAGNjI2IbISGwAFmwAEMjRLIAAQBDYEItsAEssCBgZi2wAiwjISMhLbADLCBkswMUFQBCQ7ATQyBgYEKxAhRDQrElA0OwAkNUeCCwDCOwAkNDYWSwBFB4sgICAkNgQrAhZRwhsAJDQ7IOFQFCHCCwAkMjQrITARNDYEIjsABQWGVZshYBAkNgQi2wBCyw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");
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "default", 0, __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ ]);


/***/ },

/***/ 4643
(module, __unused_webpack_exports, __webpack_require__) {


/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!__webpack_require__.g.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = __webpack_require__.g.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}


/***/ },

/***/ 595
(__unused_webpack_module, exports) {

"use strict";

// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
exports.deflate = deflate;
exports.deflateSync = deflateSync;
exports.inflate = inflate;
exports.inflateSync = inflateSync;
exports.gzip = gzip;
exports.compress = gzip;
exports.gzipSync = gzipSync;
exports.compressSync = gzipSync;
exports.gunzip = gunzip;
exports.gunzipSync = gunzipSync;
exports.zlib = zlib;
exports.zlibSync = zlibSync;
exports.unzlib = unzlib;
exports.unzlibSync = unzlibSync;
exports.gzip = gzip;
exports.compress = gzip;
exports.decompress = decompress;
exports.decompressSync = decompressSync;
exports.strToU8 = strToU8;
exports.strFromU8 = strFromU8;
exports.zip = zip;
exports.zipSync = zipSync;
exports.unzip = unzip;
exports.unzipSync = unzipSync;
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).
var ch2 = {};
var node_worker_1 = {};
node_worker_1["default"] = (function (c, id, msg, transfer, cb) {
    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], { type: 'text/javascript' }))));
    w.onmessage = function (e) {
        var d = e.data, ed = d.$e$;
        if (ed) {
            var err = new Error(ed[0]);
            err['code'] = ed[1];
            err.stack = ed[2];
            cb(err, null);
        }
        else
            cb(null, d);
    };
    w.postMessage(msg, transfer);
    return w;
});

// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
// fixed length extra bits
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
// fixed distance extra bits
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
// code length index map
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
// get base, reverse index map from extra bits
var freb = function (eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    var r = new i32(b[30]);
    for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i;
        }
    }
    return { b: b, r: r };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b.b, revfd = _b.r;
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    var x = ((i & 0xAAAA) >> 1) | ((i & 0x5555) << 1);
    x = ((x & 0xCCCC) >> 2) | ((x & 0x3333) << 2);
    x = ((x & 0xF0F0) >> 4) | ((x & 0x0F0F) << 4);
    rev[i] = (((x & 0xFF00) >> 8) | ((x & 0x00FF) << 8)) >> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = (function (cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for (; i < s; ++i) {
        if (cd[i])
            ++l[cd[i] - 1];
    }
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for (i = 1; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1;
    }
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = (i << 4) | cd[i];
                // free bits
                var r_1 = mb - cd[i];
                // start value
                var v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >> rvb] = sv;
                }
            }
        }
    }
    else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
            if (cd[i]) {
                co[i] = rev[le[cd[i] - 1]++] >> (15 - cd[i]);
            }
        }
    }
    return co;
});
// fixed length tree
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
    flt[i] = 8;
for (var i = 144; i < 256; ++i)
    flt[i] = 9;
for (var i = 256; i < 280; ++i)
    flt[i] = 7;
for (var i = 280; i < 288; ++i)
    flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
// fixed length map
var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
var max = function (a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
        if (a[i] > m)
            m = a[i];
    }
    return m;
};
// read d, starting at bit p and mask with m
var bits = function (d, p, m) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
};
// read d, starting at bit p continuing for at least 16 bits
var bits16 = function (d, p) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
};
// get end of byte
var shft = function (p) { return ((p + 7) / 8) | 0; };
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function (v, s, e) {
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    // can't use .constructor in case user-supplied
    return new u8(v.subarray(s, e));
};
/**
 * Codes for errors generated within this library
 */
exports.FlateErrorCode = {
    UnexpectedEOF: 0,
    InvalidBlockType: 1,
    InvalidLengthLiteral: 2,
    InvalidDistance: 3,
    StreamFinished: 4,
    NoStreamHandler: 5,
    InvalidHeader: 6,
    NoCallback: 7,
    InvalidUTF8: 8,
    ExtraFieldTooLong: 9,
    InvalidDate: 10,
    FilenameTooLong: 11,
    StreamFinishing: 12,
    InvalidZipData: 13,
    UnknownCompressionMethod: 14
};
// error codes
var ec = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    , // determined by compression function
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data'
    // determined by unknown compression method
];
;
var err = function (ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
    if (!nt)
        throw e;
    return e;
};
// expands raw DEFLATE data
var inflt = function (dat, st, buf, dict) {
    // source length       dict length
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
        return buf || new u8(0);
    var noBuf = !buf;
    // have to estimate size
    var resize = noBuf || st.i != 2;
    // no state
    var noSt = st.i;
    // Assumes roughly 33% compression ratio average
    if (noBuf)
        buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    var cbuf = function (l) {
        var bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            var nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    var tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                if (t > sl) {
                    if (noSt)
                        err(0);
                    break;
                }
                // ensure size
                if (resize)
                    cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l, st.p = pos = t * 8, st.f = final;
                continue;
            }
            else if (type == 1)
                lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
                //  literal                            lengths
                var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                var tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                var ldt = new u8(tl);
                // code length tree
                var clt = new u8(19);
                for (var i = 0; i < hcLen; ++i) {
                    // use index map to get real code
                    clt[clim[i]] = bits(dat, pos + i * 3, 7);
                }
                pos += hcLen * 3;
                // code lengths bits
                var clb = max(clt), clbmsk = (1 << clb) - 1;
                // code lengths map
                var clm = hMap(clt, clb, 1);
                for (var i = 0; i < tl;) {
                    var r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    var s = r >> 4;
                    // code length to copy
                    if (s < 16) {
                        ldt[i++] = s;
                    }
                    else {
                        //  copy   count
                        var c = 0, n = 0;
                        if (s == 16)
                            n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                        else if (s == 17)
                            n = 3 + bits(dat, pos, 7), pos += 3;
                        else if (s == 18)
                            n = 11 + bits(dat, pos, 127), pos += 7;
                        while (n--)
                            ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max(lt);
                // max dist bits
                dbt = max(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            }
            else
                err(1);
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17
        if (resize)
            cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (;; lpos = pos) {
            // bits read, code
            var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
            pos += c & 15;
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
            if (!c)
                err(2);
            if (sym < 256)
                buf[bt++] = sym;
            else if (sym == 256) {
                lpos = pos, lm = null;
                break;
            }
            else {
                var add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    var i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
                if (!d)
                    err(3);
                pos += d & 15;
                var dt = fd[dsym];
                if (dsym > 3) {
                    var b = fdeb[dsym];
                    dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
                }
                if (pos > tbts) {
                    if (noSt)
                        err(0);
                    break;
                }
                if (resize)
                    cbuf(bt + 131072);
                var end = bt + add;
                if (bt < dt) {
                    var shift = dl - dt, dend = Math.min(dt, end);
                    if (shift + bt < 0)
                        err(3);
                    for (; bt < dend; ++bt)
                        buf[bt] = dict[shift + bt];
                }
                for (; bt < end; ++bt)
                    buf[bt] = buf[bt - dt];
            }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    // don't reallocate for streams or user buffers
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
// starting at p, write the minimum number of bits that can hold v to d
var wbits = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
};
// starting at p, write the minimum number of bits (>8) that can hold v to d
var wbits16 = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
    d[o + 2] |= v >> 16;
};
// creates code lengths from a frequency table
var hTree = function (d, mb) {
    // Need extra info to make a tree
    var t = [];
    for (var i = 0; i < d.length; ++i) {
        if (d[i])
            t.push({ s: i, f: d[i] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
        return { t: et, l: 0 };
    if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return { t: v, l: 1 };
    }
    t.sort(function (a, b) { return a.f - b.f; });
    // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols
    t.push({ s: -1, f: 25001 });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
    // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
    while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
    }
    var maxSym = t2[0].s;
    for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym)
            maxSym = t2[i].s;
    }
    // code lengths
    var tr = new u16(maxSym + 1);
    // max bits in tree
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0, dt = 0;
        //    left            cost
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
        for (; i < s; ++i) {
            var i2_1 = t2[i].s;
            if (tr[i2_1] > mb) {
                dt += cst - (1 << (mbt - tr[i2_1]));
                tr[i2_1] = mb;
            }
            else
                break;
        }
        dt >>= lft;
        while (dt > 0) {
            var i2_2 = t2[i].s;
            if (tr[i2_2] < mb)
                dt -= 1 << (mb - tr[i2_2]++ - 1);
            else
                ++i;
        }
        for (; i >= 0 && dt; --i) {
            var i2_3 = t2[i].s;
            if (tr[i2_3] == mb) {
                --tr[i2_3];
                ++dt;
            }
        }
        mbt = mb;
    }
    return { t: new u8(tr), l: mbt };
};
// get the max length and assign length codes
var ln = function (n, l, d) {
    return n.s == -1
        ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
        : (l[n.s] = d);
};
// length codes generation
var lc = function (c) {
    var s = c.length;
    // Note that the semicolon was intentional
    while (s && !c[--s])
        ;
    var cl = new u16(++s);
    //  ind      num         streak
    var cli = 0, cln = c[0], cls = 1;
    var w = function (v) { cl[cli++] = v; };
    for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
            ++cls;
        else {
            if (!cln && cls > 2) {
                for (; cls > 138; cls -= 138)
                    w(32754);
                if (cls > 2) {
                    w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                    cls = 0;
                }
            }
            else if (cls > 3) {
                w(cln), --cls;
                for (; cls > 6; cls -= 6)
                    w(8304);
                if (cls > 2)
                    w(((cls - 3) << 5) | 8208), cls = 0;
            }
            while (cls--)
                w(cln);
            cls = 1;
            cln = c[i];
        }
    }
    return { c: cl.subarray(0, cli), n: s };
};
// calculate the length of output from tree, code lengths
var clen = function (cf, cl) {
    var l = 0;
    for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
    return l;
};
// writes a fixed block
// returns the new bit pos
var wfblk = function (out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
};
// writes a block
var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a = hTree(lf, 15), dlt = _a.t, mlb = _a.l;
    var _b = hTree(df, 15), ddt = _b.t, mdb = _b.l;
    var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
    var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
    var lcfreq = new u16(19);
    for (var i = 0; i < lclt.length; ++i)
        ++lcfreq[lclt[i] & 31];
    for (var i = 0; i < lcdt.length; ++i)
        ++lcfreq[lcdt[i] & 31];
    var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
    var flen = (bl + 5) << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
    if (bs >= 0 && flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
            wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
            var clct = lcts[it];
            for (var i = 0; i < clct.length; ++i) {
                var len = clct[i] & 31;
                wbits(out, p, llm[len]), p += lct[len];
                if (len > 15)
                    wbits(out, p, (clct[i] >> 5) & 127), p += clct[i] >> 12;
            }
        }
    }
    else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i = 0; i < li; ++i) {
        var sym = syms[i];
        if (sym > 255) {
            var len = (sym >> 18) & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7)
                wbits(out, p, (sym >> 23) & 31), p += fleb[len];
            var dst = sym & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3)
                wbits16(out, p, (sym >> 5) & 8191), p += fdeb[dst];
        }
        else {
            wbits16(out, p, lm[sym]), p += ll[sym];
        }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
};
// deflate options (nice << 13) | chain
var deo = /*#__PURE__*/ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
// empty
var et = /*#__PURE__*/ new u8(0);
// compresses data into a raw DEFLATE buffer
var dflt = function (dat, lvl, plvl, pre, post, st) {
    var s = st.z || dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
    // writing to this writes to the output buffer
    var w = o.subarray(pre, o.length - post);
    var lst = st.l;
    var pos = (st.r || 0) & 7;
    if (lvl) {
        if (pos)
            w[0] = st.r >> 3;
        var opt = deo[lvl - 1];
        var n = opt >> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        //    prev 2-byte val map    curr 2-byte val map
        var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
        // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block
        var syms = new i32(25000);
        // length/literal freq   distance freq
        var lf = new u16(288), df = new u16(32);
        //  l/lcnt  exbits  index          l/lind  waitdx          blkpos
        var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
        for (; i + 2 < s; ++i) {
            // hash value
            var hv = hsh(i);
            // index mod 32768    previous index mod
            var imod = i & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)
            if (wi <= i) {
                // bytes remaining
                var rem = s - i;
                if ((lc_1 > 7000 || li > 24576) && (rem > 423 || !lst)) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                    li = lc_1 = eb = 0, bs = i;
                    for (var j = 0; j < 286; ++j)
                        lf[j] = 0;
                    for (var j = 0; j < 30; ++j)
                        df[j] = 0;
                }
                //  len    dist   chain
                var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1;
                    var maxd = Math.min(32767, i);
                    // max possible length
                    // not capped at dif because decompressors implement "rolling" index population
                    var ml = Math.min(258, rem);
                    while (dif <= maxd && --ch_1 && imod != pimod) {
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0;
                            for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                ;
                            if (nl > l) {
                                l = nl, d = dif;
                                // break out early when we reach "nice" (we are satisfied enough)
                                if (nl > maxn)
                                    break;
                                // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start
                                var mmd = Math.min(dif, nl - 2);
                                var md = 0;
                                for (var j = 0; j < mmd; ++j) {
                                    var ti = i - dif + j & 32767;
                                    var pti = prev[ti];
                                    var cd = ti - pti & 32767;
                                    if (cd > md)
                                        md = cd, pimod = ti;
                                }
                            }
                        }
                        // check the previous match
                        imod = pimod, pimod = prev[imod];
                        dif += imod - pimod & 32767;
                    }
                }
                // d will be nonzero only when a match was found
                if (d) {
                    // store both dist and len data in one int32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                    var lin = revfl[l] & 31, din = revfd[d] & 31;
                    eb += fleb[lin] + fdeb[din];
                    ++lf[257 + lin];
                    ++df[din];
                    wi = i + l;
                    ++lc_1;
                }
                else {
                    syms[li++] = dat[i];
                    ++lf[dat[i]];
                }
            }
        }
        for (i = Math.max(i, wi); i < s; ++i) {
            syms[li++] = dat[i];
            ++lf[dat[i]];
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        if (!lst) {
            st.r = (pos & 7) | w[(pos / 8) | 0] << 3;
            // shft(pos) now 1 less if pos & 7 != 0
            pos -= 7;
            st.h = head, st.p = prev, st.i = i, st.w = wi;
        }
    }
    else {
        for (var i = st.w || 0; i < s + lst; i += 65535) {
            // end
            var e = i + 65535;
            if (e >= s) {
                // write final block
                w[(pos / 8) | 0] = lst;
                e = s;
            }
            pos = wfblk(w, pos + 1, dat.subarray(i, e));
        }
        st.i = s;
    }
    return slc(o, 0, pre + shft(pos) + post);
};
// CRC32 table
var crct = /*#__PURE__*/ (function () {
    var t = new Int32Array(256);
    for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
            c = ((c & 1) && -306674912) ^ (c >>> 1);
        t[i] = c;
    }
    return t;
})();
// CRC32
var crc = function () {
    var c = -1;
    return {
        p: function (d) {
            // closures have awful performance
            var cr = c;
            for (var i = 0; i < d.length; ++i)
                cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
            c = cr;
        },
        d: function () { return ~c; }
    };
};
// Adler32
var adler = function () {
    var a = 1, b = 0;
    return {
        p: function (d) {
            // closures have awful performance
            var n = a, m = b;
            var l = d.length | 0;
            for (var i = 0; i != l;) {
                var e = Math.min(i + 2655, l);
                for (; i < e; ++i)
                    m += n += d[i];
                n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
            }
            a = n, b = m;
        },
        d: function () {
            a %= 65521, b %= 65521;
            return (a & 255) << 24 | (a & 0xFF00) << 8 | (b & 255) << 8 | (b >> 8);
        }
    };
};
;
// deflate with opts
var dopt = function (dat, opt, pre, post, st) {
    if (!st) {
        st = { l: 1 };
        if (opt.dictionary) {
            var dict = opt.dictionary.subarray(-32768);
            var newDat = new u8(dict.length + dat.length);
            newDat.set(dict);
            newDat.set(dat, dict.length);
            dat = newDat;
            st.w = dict.length;
        }
    }
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? (st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20) : (12 + opt.mem), pre, post, st);
};
// Walmart object spread
var mrg = function (a, b) {
    var o = {};
    for (var k in a)
        o[k] = a[k];
    for (var k in b)
        o[k] = b[k];
    return o;
};
// worker clone
// This is possibly the craziest part of the entire codebase, despite how simple it may seem.
// The only parameter to this function is a closure that returns an array of variables outside of the function scope.
// We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
// We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
// The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
// This took me three weeks to figure out how to do.
var wcln = function (fn, fnStr, td) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/\s+/g, '').split(',');
    for (var i = 0; i < dt.length; ++i) {
        var v = dt[i], k = ks[i];
        if (typeof v == 'function') {
            fnStr += ';' + k + '=';
            var st_1 = v.toString();
            if (v.prototype) {
                // for global objects
                if (st_1.indexOf('[native code]') != -1) {
                    var spInd = st_1.indexOf(' ', 8) + 1;
                    fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                }
                else {
                    fnStr += st_1;
                    for (var t in v.prototype)
                        fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                }
            }
            else
                fnStr += st_1;
        }
        else
            td[k] = v;
    }
    return fnStr;
};
var ch = [];
// clone bufs
var cbfs = function (v) {
    var tl = [];
    for (var k in v) {
        if (v[k].buffer) {
            tl.push((v[k] = new v[k].constructor(v[k])).buffer);
        }
    }
    return tl;
};
// use a worker to execute code
var wrkr = function (fns, init, id, cb) {
    if (!ch[id]) {
        var fnStr = '', td_1 = {}, m = fns.length - 1;
        for (var i = 0; i < m; ++i)
            fnStr = wcln(fns[i], fnStr, td_1);
        ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };
    }
    var td = mrg({}, ch[id].e);
    return (0, node_worker_1.default)(ch[id].c + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
};
// base async inflate fn
var bInflt = function () { return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt]; };
var bDflt = function () { return [u8, u16, i32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
// gzip extra
var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
// gunzip extra
var guze = function () { return [gzs, gzl]; };
// zlib extra
var zle = function () { return [zlh, wbytes, adler]; };
// unzlib extra
var zule = function () { return [zls]; };
// post buf
var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
// get opts
var gopt = function (o) { return o && {
    out: o.size && new u8(o.size),
    dictionary: o.dictionary
}; };
// async helper
var cbify = function (dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function (err, dat) {
        w.terminate();
        cb(err, dat);
    });
    w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
    return function () { w.terminate(); };
};
// auto stream
var astrm = function (strm) {
    strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
    return function (ev) {
        if (ev.data[0]) {
            strm.push(ev.data[0], ev.data[1]);
            postMessage([ev.data[0].length]);
        }
        else
            strm.flush(ev.data[1]);
    };
};
// async stream attach
var astrmify = function (fns, strm, opts, init, id, flush, ext) {
    var t;
    var w = wrkr(fns, init, id, function (err, dat) {
        if (err)
            w.terminate(), strm.ondata.call(strm, err);
        else if (!Array.isArray(dat))
            ext(dat);
        else if (dat.length == 1) {
            strm.queuedSize -= dat[0];
            if (strm.ondrain)
                strm.ondrain(dat[0]);
        }
        else {
            if (dat[1])
                w.terminate();
            strm.ondata.call(strm, err, dat[0], dat[1]);
        }
    });
    w.postMessage(opts);
    strm.queuedSize = 0;
    strm.push = function (d, f) {
        if (!strm.ondata)
            err(5);
        if (t)
            strm.ondata(err(4, 0, 1), null, !!f);
        strm.queuedSize += d.length;
        // can fail for cross-realm Uint8Array, but ok - only a small performance penalty
        w.postMessage([d, t = f], d.buffer instanceof ArrayBuffer ? [d.buffer] : []);
    };
    strm.terminate = function () { w.terminate(); };
    if (flush) {
        strm.flush = function (sync) { w.postMessage([0, sync]); };
    }
};
// read 2 bytes
var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
// read 4 bytes
var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
// read 8 bytes
var b8 = function (d, b) { return b4(d, b) + (b4(d, b + 4) * 4294967296); };
// write bytes
var wbytes = function (d, b, v) {
    for (; v; ++b)
        d[b] = v, v >>>= 8;
};
// gzip header
var gzh = function (c, o) {
    var fn = o.filename;
    c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
    if (o.mtime != 0)
        wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
    if (fn) {
        c[3] = 8;
        for (var i = 0; i <= fn.length; ++i)
            c[i + 10] = fn.charCodeAt(i);
    }
};
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
var gzs = function (d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        err(6, 'invalid gzip data');
    var flg = d[3];
    var st = 10;
    if (flg & 4)
        st += (d[10] | d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
    return st + (flg & 2);
};
// gzip length
var gzl = function (d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
// gzip header length
var gzhl = function (o) { return 10 + (o.filename ? o.filename.length + 1 : 0); };
// zlib header
var zlh = function (c, o) {
    var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
    c[0] = 120, c[1] = (fl << 6) | (o.dictionary && 32);
    c[1] |= 31 - ((c[0] << 8) | c[1]) % 31;
    if (o.dictionary) {
        var h = adler();
        h.p(o.dictionary);
        wbytes(c, 2, h.d());
    }
};
// zlib start
var zls = function (d, dict) {
    if ((d[0] & 15) != 8 || (d[0] >> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
        err(6, 'invalid zlib data');
    if ((d[1] >> 5 & 1) == +!dict)
        err(6, 'invalid zlib data: ' + (d[1] & 32 ? 'need' : 'unexpected') + ' dictionary');
    return (d[1] >> 3 & 4) + 2;
};
function StrmOpt(opts, cb) {
    if (typeof opts == 'function')
        cb = opts, opts = {};
    this.ondata = cb;
    return opts;
}
/**
 * Streaming DEFLATE compression
 */
var Deflate = /*#__PURE__*/ (function () {
    function Deflate(opts, cb) {
        if (typeof opts == 'function')
            cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
        this.s = { l: 0, i: 32768, w: 32768, z: 32768 };
        // Buffer length must always be 0 mod 32768 for index calculations to be correct when modifying head and prev
        // 98304 = 32768 (lookback) + 65536 (common chunk size)
        this.b = new u8(98304);
        if (this.o.dictionary) {
            var dict = this.o.dictionary.subarray(-32768);
            this.b.set(dict, 32768 - dict.length);
            this.s.i = 32768 - dict.length;
        }
    }
    Deflate.prototype.p = function (c, f) {
        this.ondata(dopt(c, this.o, 0, 0, this.s), f);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Deflate.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (this.s.l)
            err(4);
        var endLen = chunk.length + this.s.z;
        if (endLen > this.b.length) {
            if (endLen > 2 * this.b.length - 32768) {
                var newBuf = new u8(endLen & -32768);
                newBuf.set(this.b.subarray(0, this.s.z));
                this.b = newBuf;
            }
            var split = this.b.length - this.s.z;
            this.b.set(chunk.subarray(0, split), this.s.z);
            this.s.z = this.b.length;
            this.p(this.b, false);
            this.b.set(this.b.subarray(-32768));
            this.b.set(chunk.subarray(split), 32768);
            this.s.z = chunk.length - split + 32768;
            this.s.i = 32766, this.s.w = 32768;
        }
        else {
            this.b.set(chunk, this.s.z);
            this.s.z += chunk.length;
        }
        this.s.l = final & 1;
        if (this.s.z > this.s.w + 8191 || final) {
            this.p(this.b, final || false);
            this.s.w = this.s.i, this.s.i -= 2;
        }
        if (final) {
            // cleanup unneeded buffers/state to reduce memory usage
            this.s = this.o = {};
            this.b = et;
        }
    };
    /**
     * Flushes buffered uncompressed data. Useful to immediately retrieve the
     * deflated output for small inputs.
     * @param sync Whether to flush to a byte boundary. A sync flush takes 4-5
     *             extra bytes, but guarantees all pushed data is immediately
     *             decompressible. A separate DEFLATE stream may be concatenated
     *             with the current output after a sync flush.
     */
    Deflate.prototype.flush = function (sync) {
        if (!this.ondata)
            err(5);
        if (this.s.l)
            err(4);
        this.p(this.b, false);
        this.s.w = this.s.i, this.s.i -= 2;
        // could technically skip writing the type-0 block for (this.s.r & 7) == 0,
        // but the deterministic trailer (00 00 FF FF) is useful in some situations
        if (sync) {
            var c = new u8(6);
            c[0] = this.s.r >> 3;
            // write empty, non-final type-0 block
            var ep = wfblk(c, this.s.r, et);
            this.s.r = 0;
            this.ondata(c.subarray(0, ep >> 3), false);
        }
    };
    return Deflate;
}());
exports.Deflate = Deflate;
/**
 * Asynchronous streaming DEFLATE compression
 */
var AsyncDeflate = /*#__PURE__*/ (function () {
    function AsyncDeflate(opts, cb) {
        astrmify([
            bDflt,
            function () { return [astrm, Deflate]; }
        ], this, StrmOpt.call(this, opts, cb), function (ev) {
            var strm = new Deflate(ev.data);
            onmessage = astrm(strm);
        }, 6, 1);
    }
    return AsyncDeflate;
}());
exports.AsyncDeflate = AsyncDeflate;
function deflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
    ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
}
/**
 * Compresses data with DEFLATE without any wrapper
 * @param data The data to compress
 * @param opts The compression options
 * @returns The deflated version of the data
 */
function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
}
/**
 * Streaming DEFLATE decompression
 */
var Inflate = /*#__PURE__*/ (function () {
    function Inflate(opts, cb) {
        // no StrmOpt here to avoid adding to workerizer
        if (typeof opts == 'function')
            cb = opts, opts = {};
        this.ondata = cb;
        var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
        this.s = { i: 0, b: dict ? dict.length : 0 };
        this.o = new u8(32768);
        this.p = new u8(0);
        if (dict)
            this.o.set(dict);
    }
    Inflate.prototype.e = function (c) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        if (!this.p.length)
            this.p = c;
        else if (c.length) {
            var n = new u8(this.p.length + c.length);
            n.set(this.p), n.set(c, this.p.length), this.p = n;
        }
    };
    Inflate.prototype.c = function (final) {
        this.s.i = +(this.d = final || false);
        var bts = this.s.b;
        var dt = inflt(this.p, this.s, this.o);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, (this.s.p / 8) | 0), this.s.p &= 7;
    };
    /**
     * Pushes a chunk to be inflated
     * @param chunk The chunk to push
     * @param final Whether this is the final chunk
     */
    Inflate.prototype.push = function (chunk, final) {
        this.e(chunk), this.c(final);
    };
    return Inflate;
}());
exports.Inflate = Inflate;
/**
 * Asynchronous streaming DEFLATE decompression
 */
var AsyncInflate = /*#__PURE__*/ (function () {
    function AsyncInflate(opts, cb) {
        astrmify([
            bInflt,
            function () { return [astrm, Inflate]; }
        ], this, StrmOpt.call(this, opts, cb), function (ev) {
            var strm = new Inflate(ev.data);
            onmessage = astrm(strm);
        }, 7, 0);
    }
    return AsyncInflate;
}());
exports.AsyncInflate = AsyncInflate;
function inflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt
    ], function (ev) { return pbf(inflateSync(ev.data[0], gopt(ev.data[1]))); }, 1, cb);
}
function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
// before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
/**
 * Streaming GZIP compression
 */
var Gzip = /*#__PURE__*/ (function () {
    function Gzip(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be GZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gzip.prototype.push = function (chunk, final) {
        this.c.p(chunk);
        this.l += chunk.length;
        Deflate.prototype.push.call(this, chunk, final);
    };
    Gzip.prototype.p = function (c, f) {
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, this.s);
        if (this.v)
            gzh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
    };
    /**
     * Flushes buffered uncompressed data. Useful to immediately retrieve the
     * GZIPped output for small inputs.
     * @param sync Whether to flush to a byte boundary. A sync flush takes 4-5
     *             extra bytes, but guarantees all pushed data is immediately
     *             decompressible.
     */
    Gzip.prototype.flush = function (sync) {
        Deflate.prototype.flush.call(this, sync);
    };
    return Gzip;
}());
exports.Gzip = Gzip;
exports.Compress = Gzip;
/**
 * Asynchronous streaming GZIP compression
 */
var AsyncGzip = /*#__PURE__*/ (function () {
    function AsyncGzip(opts, cb) {
        astrmify([
            bDflt,
            gze,
            function () { return [astrm, Deflate, Gzip]; }
        ], this, StrmOpt.call(this, opts, cb), function (ev) {
            var strm = new Gzip(ev.data);
            onmessage = astrm(strm);
        }, 8, 1);
    }
    return AsyncGzip;
}());
exports.AsyncGzip = AsyncGzip;
exports.AsyncCompress = AsyncGzip;
function gzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
        gze,
        function () { return [gzipSync]; }
    ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
}
/**
 * Compresses data with GZIP
 * @param data The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */
function gzipSync(data, opts) {
    if (!opts)
        opts = {};
    var c = crc(), l = data.length;
    c.p(data);
    var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
/**
 * Streaming single or multi-member GZIP decompression
 */
var Gunzip = /*#__PURE__*/ (function () {
    function Gunzip(opts, cb) {
        this.v = 1;
        this.r = 0;
        Inflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be GUNZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gunzip.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        this.r += chunk.length;
        if (this.v) {
            var p = this.p.subarray(this.v - 1);
            var s = p.length > 3 ? gzs(p) : 4;
            if (s > p.length) {
                if (!final)
                    return;
            }
            else if (this.v > 1 && this.onmember) {
                this.onmember(this.r - p.length);
            }
            this.p = p.subarray(s), this.v = 0;
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, 0);
        // process concatenated GZIP
        if (this.s.f && !this.s.l) {
            this.v = shft(this.s.p) + 9;
            this.s = { i: 0 };
            this.o = new u8(0);
            this.push(new u8(0), final);
        }
        else if (final) {
            Inflate.prototype.c.call(this, final);
        }
    };
    return Gunzip;
}());
exports.Gunzip = Gunzip;
/**
 * Asynchronous streaming single or multi-member GZIP decompression
 */
var AsyncGunzip = /*#__PURE__*/ (function () {
    function AsyncGunzip(opts, cb) {
        var _this = this;
        astrmify([
            bInflt,
            guze,
            function () { return [astrm, Inflate, Gunzip]; }
        ], this, StrmOpt.call(this, opts, cb), function (ev) {
            var strm = new Gunzip(ev.data);
            strm.onmember = function (offset) { return postMessage(offset); };
            onmessage = astrm(strm);
        }, 9, 0, function (offset) { return _this.onmember && _this.onmember(offset); });
    }
    return AsyncGunzip;
}());
exports.AsyncGunzip = AsyncGunzip;
function gunzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt,
        guze,
        function () { return [gunzipSync]; }
    ], function (ev) { return pbf(gunzipSync(ev.data[0], ev.data[1])); }, 3, cb);
}
function gunzipSync(data, opts) {
    var st = gzs(data);
    if (st + 8 > data.length)
        err(6, 'invalid gzip data');
    return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
}
/**
 * Streaming Zlib compression
 */
var Zlib = /*#__PURE__*/ (function () {
    function Zlib(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be zlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Zlib.prototype.push = function (chunk, final) {
        this.c.p(chunk);
        Deflate.prototype.push.call(this, chunk, final);
    };
    Zlib.prototype.p = function (c, f) {
        var raw = dopt(c, this.o, this.v && (this.o.dictionary ? 6 : 2), f && 4, this.s);
        if (this.v)
            zlh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
    };
    /**
     * Flushes buffered uncompressed data. Useful to immediately retrieve the
     * zlibbed output for small inputs.
     * @param sync Whether to flush to a byte boundary. A sync flush takes 4-5
     *             extra bytes, but guarantees all pushed data is immediately
     *             decompressible.
     */
    Zlib.prototype.flush = function (sync) {
        Deflate.prototype.flush.call(this, sync);
    };
    return Zlib;
}());
exports.Zlib = Zlib;
/**
 * Asynchronous streaming Zlib compression
 */
var AsyncZlib = /*#__PURE__*/ (function () {
    function AsyncZlib(opts, cb) {
        astrmify([
            bDflt,
            zle,
            function () { return [astrm, Deflate, Zlib]; }
        ], this, StrmOpt.call(this, opts, cb), function (ev) {
            var strm = new Zlib(ev.data);
            onmessage = astrm(strm);
        }, 10, 1);
    }
    return AsyncZlib;
}());
exports.AsyncZlib = AsyncZlib;
function zlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
        zle,
        function () { return [zlibSync]; }
    ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
}
/**
 * Compress data with Zlib
 * @param data The data to compress
 * @param opts The compression options
 * @returns The zlib-compressed version of the data
 */
function zlibSync(data, opts) {
    if (!opts)
        opts = {};
    var a = adler();
    a.p(data);
    var d = dopt(data, opts, opts.dictionary ? 6 : 2, 4);
    return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
/**
 * Streaming Zlib decompression
 */
var Unzlib = /*#__PURE__*/ (function () {
    function Unzlib(opts, cb) {
        Inflate.call(this, opts, cb);
        this.v = opts && opts.dictionary ? 2 : 1;
    }
    /**
     * Pushes a chunk to be unzlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzlib.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            if (this.p.length < 6 && !final)
                return;
            this.p = this.p.subarray(zls(this.p, this.v - 1)), this.v = 0;
        }
        if (final) {
            if (this.p.length < 4)
                err(6, 'invalid zlib data');
            this.p = this.p.subarray(0, -4);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Unzlib;
}());
exports.Unzlib = Unzlib;
/**
 * Asynchronous streaming Zlib decompression
 */
var AsyncUnzlib = /*#__PURE__*/ (function () {
    function AsyncUnzlib(opts, cb) {
        astrmify([
            bInflt,
            zule,
            function () { return [astrm, Inflate, Unzlib]; }
        ], this, StrmOpt.call(this, opts, cb), function (ev) {
            var strm = new Unzlib(ev.data);
            onmessage = astrm(strm);
        }, 11, 0);
    }
    return AsyncUnzlib;
}());
exports.AsyncUnzlib = AsyncUnzlib;
function unzlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt,
        zule,
        function () { return [unzlibSync]; }
    ], function (ev) { return pbf(unzlibSync(ev.data[0], gopt(ev.data[1]))); }, 5, cb);
}
function unzlibSync(data, opts) {
    return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
/**
 * Streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var Decompress = /*#__PURE__*/ (function () {
    function Decompress(opts, cb) {
        this.o = StrmOpt.call(this, opts, cb) || {};
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
    }
    // init substream
    // overriden by AsyncDecompress
    Decompress.prototype.i = function () {
        var _this = this;
        this.s.ondata = function (dat, final) {
            _this.ondata(dat, final);
        };
    };
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Decompress.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (!this.s) {
            if (this.p && this.p.length) {
                var n = new u8(this.p.length + chunk.length);
                n.set(this.p), n.set(chunk, this.p.length);
            }
            else
                this.p = chunk;
            if (this.p.length > 2) {
                this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                    ? new this.G(this.o)
                    : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                        ? new this.I(this.o)
                        : new this.Z(this.o);
                this.i();
                this.s.push(this.p, final);
                this.p = null;
            }
        }
        else
            this.s.push(chunk, final);
    };
    return Decompress;
}());
exports.Decompress = Decompress;
/**
 * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var AsyncDecompress = /*#__PURE__*/ (function () {
    function AsyncDecompress(opts, cb) {
        Decompress.call(this, opts, cb);
        this.queuedSize = 0;
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
    }
    AsyncDecompress.prototype.i = function () {
        var _this = this;
        this.s.ondata = function (err, dat, final) {
            _this.ondata(err, dat, final);
        };
        this.s.ondrain = function (size) {
            _this.queuedSize -= size;
            if (_this.ondrain)
                _this.ondrain(size);
        };
    };
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncDecompress.prototype.push = function (chunk, final) {
        this.queuedSize += chunk.length;
        Decompress.prototype.push.call(this, chunk, final);
    };
    return AsyncDecompress;
}());
exports.AsyncDecompress = AsyncDecompress;
function decompress(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzip(data, opts, cb)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflate(data, opts, cb)
            : unzlib(data, opts, cb);
}
/**
 * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param data The data to decompress
 * @param opts The decompression options
 * @returns The decompressed version of the data
 */
function decompressSync(data, opts) {
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzipSync(data, opts)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflateSync(data, opts)
            : unzlibSync(data, opts);
}
// flatten a directory structure
var fltn = function (d, p, t, o) {
    for (var k in d) {
        var val = d[k], n = p + k, op = o;
        if (Array.isArray(val))
            op = mrg(o, val[1]), val = val[0];
        if (ArrayBuffer.isView(val))
            t[n] = [val, op];
        else {
            t[n += '/'] = [new u8(0), op];
            fltn(val, n, t, o);
        }
    }
};
// text encoder
var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
// text decoder
var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
// text decoder stream
var tds = 0;
try {
    td.decode(et, { stream: true });
    tds = 1;
}
catch (e) { }
// decode UTF8
var dutf8 = function (d) {
    for (var r = '', i = 0;;) {
        var c = d[i++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length)
            return { s: r, r: slc(d, i - 1) };
        if (!eb)
            r += String.fromCharCode(c);
        else if (eb == 3) {
            c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63)) - 65536,
                r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
        }
        else if (eb & 1)
            r += String.fromCharCode((c & 31) << 6 | (d[i++] & 63));
        else
            r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63));
    }
};
/**
 * Streaming UTF-8 decoding
 */
var DecodeUTF8 = /*#__PURE__*/ (function () {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is decoded
     */
    function DecodeUTF8(cb) {
        this.ondata = cb;
        if (tds)
            this.t = new TextDecoder();
        else
            this.p = et;
    }
    /**
     * Pushes a chunk to be decoded from UTF-8 binary
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    DecodeUTF8.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        final = !!final;
        if (this.t) {
            this.ondata(this.t.decode(chunk, { stream: true }), final);
            if (final) {
                if (this.t.decode().length)
                    err(8);
                this.t = null;
            }
            return;
        }
        if (!this.p)
            err(4);
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p);
        dat.set(chunk, this.p.length);
        var _a = dutf8(dat), s = _a.s, r = _a.r;
        if (final) {
            if (r.length)
                err(8);
            this.p = null;
        }
        else
            this.p = r;
        this.ondata(s, final);
    };
    return DecodeUTF8;
}());
exports.DecodeUTF8 = DecodeUTF8;
/**
 * Streaming UTF-8 encoding
 */
var EncodeUTF8 = /*#__PURE__*/ (function () {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is encoded
     */
    function EncodeUTF8(cb) {
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be encoded to UTF-8
     * @param chunk The string data to push
     * @param final Whether this is the last chunk
     */
    EncodeUTF8.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        this.ondata(strToU8(chunk), this.d = final || false);
    };
    return EncodeUTF8;
}());
exports.EncodeUTF8 = EncodeUTF8;
/**
 * Converts a string into a Uint8Array for use with compression/decompression methods
 * @param str The string to encode
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless decoding a binary string.
 * @returns The string encoded in UTF-8/Latin-1 binary
 */
function strToU8(str, latin1) {
    if (latin1) {
        var ar_1 = new u8(str.length);
        for (var i = 0; i < str.length; ++i)
            ar_1[i] = str.charCodeAt(i);
        return ar_1;
    }
    if (te)
        return te.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function (v) { ar[ai++] = v; };
    for (var i = 0; i < l; ++i) {
        if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + ((l - i) << 1));
            n.set(ar);
            ar = n;
        }
        var c = str.charCodeAt(i);
        if (c < 128 || latin1)
            w(c);
        else if (c < 2048)
            w(192 | (c >> 6)), w(128 | (c & 63));
        else if (c > 55295 && c < 57344)
            c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                w(240 | (c >> 18)), w(128 | ((c >> 12) & 63)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
        else
            w(224 | (c >> 12)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
    }
    return slc(ar, 0, ai);
}
/**
 * Converts a Uint8Array to a string
 * @param dat The data to decode to string
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless encoding to binary string.
 * @returns The original UTF-8/Latin-1 string
 */
function strFromU8(dat, latin1) {
    if (latin1) {
        var r = '';
        for (var i = 0; i < dat.length; i += 16384)
            r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
        return r;
    }
    else if (td) {
        return td.decode(dat);
    }
    else {
        var _a = dutf8(dat), s = _a.s, r = _a.r;
        if (r.length)
            err(8);
        return s;
    }
}
;
// deflate bit flag
var dbf = function (l) { return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0; };
// skip local zip header
var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
// read zip header
var zh = function (d, b, z) {
    var fnl = b2(d, b + 28), efl = b2(d, b + 30), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl;
    var _a = z64hs(d, es, efl, z, b4(d, b + 20), b4(d, b + 24), b4(d, b + 42)), sc = _a[0], su = _a[1], off = _a[2];
    return [b2(d, b + 10), sc, su, fn, es + efl + b2(d, b + 32), off];
};
// read zip64 header sizes
var z64hs = function (d, b, l, z, sc, su, off) {
    var nsc = sc == 4294967295, nsu = su == 4294967295, noff = off == 4294967295, e = b + l;
    var nf = nsc + nsu + noff;
    if (z && nf) {
        for (; b + 4 < e; b += 4 + b2(d, b + 2)) {
            if (b2(d, b) == 1) {
                return [
                    nsc ? b8(d, b + 4 + 8 * nsu) : sc,
                    nsu ? b8(d, b + 4) : su,
                    noff ? b8(d, b + 4 + 8 * (nsu + nsc)) : off,
                    1
                ];
            }
        }
        // z == 2 for unknown whether or not zip64
        if (z < 2)
            err(13);
    }
    return [sc, su, off, 0];
};
// extra field length
var exfl = function (ex) {
    var le = 0;
    if (ex) {
        for (var k in ex) {
            var l = ex[k].length;
            if (l > 65535)
                err(9);
            le += l + 4;
        }
    }
    return le;
};
// write zip header
var wzh = function (d, b, f, fn, u, c, ce, co) {
    var fl = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
    if (ce != null)
        d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2; // spec compliance? what's that?
    d[b++] = (f.flag << 1) | (c < 0 && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119)
        err(10);
    wbytes(d, b, (y << 25) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >> 1)), b += 4;
    if (c != -1) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c < 0 ? -c - 2 : c);
        wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl;
    if (exl) {
        for (var k in ex) {
            var exf = ex[k], l = exf.length;
            wbytes(d, b, +k);
            wbytes(d, b + 2, l);
            d.set(exf, b + 4), b += 4 + l;
        }
    }
    if (col)
        d.set(co, b), b += col;
    return b;
};
// write zip footer (end of central directory)
var wzf = function (o, b, c, d, e) {
    wbytes(o, b, 0x6054B50); // skip disk
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
};
/**
 * A pass-through stream to keep data uncompressed in a ZIP archive.
 */
var ZipPassThrough = /*#__PURE__*/ (function () {
    /**
     * Creates a pass-through stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     */
    function ZipPassThrough(filename) {
        this.filename = filename;
        this.c = crc();
        this.size = 0;
        this.compression = 0;
    }
    /**
     * Processes a chunk and pushes to the output stream. You can override this
     * method in a subclass for custom behavior, but by default this passes
     * the data through. You must call this.ondata(err, chunk, final) at some
     * point in this method.
     * @param chunk The chunk to process
     * @param final Whether this is the last chunk
     */
    ZipPassThrough.prototype.process = function (chunk, final) {
        this.ondata(null, chunk, final);
    };
    /**
     * Pushes a chunk to be added. If you are subclassing this with a custom
     * compression algorithm, note that you must push data from the source
     * file only, pre-compression.
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    ZipPassThrough.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        this.c.p(chunk);
        this.size += chunk.length;
        if (final)
            this.crc = this.c.d();
        // we shouldn't really do this cast, but properly handling ArrayBufferLike
        // makes the API unergonomic with Buffer
        this.process(chunk, final || false);
    };
    return ZipPassThrough;
}());
exports.ZipPassThrough = ZipPassThrough;
// I don't extend because TypeScript extension adds 1kB of runtime bloat
/**
 * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
 * for better performance
 */
var ZipDeflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */
    function ZipDeflate(filename, opts) {
        var _this = this;
        if (!opts)
            opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new Deflate(opts, function (dat, final) {
            _this.ondata(null, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
    }
    ZipDeflate.prototype.process = function (chunk, final) {
        try {
            this.d.push(chunk, final);
        }
        catch (e) {
            this.ondata(e, null, final);
        }
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    ZipDeflate.prototype.push = function (chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return ZipDeflate;
}());
exports.ZipDeflate = ZipDeflate;
/**
 * Asynchronous streaming DEFLATE compression for ZIP archives
 */
var AsyncZipDeflate = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */
    function AsyncZipDeflate(filename, opts) {
        var _this = this;
        if (!opts)
            opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new AsyncDeflate(opts, function (err, dat, final) {
            _this.ondata(err, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
        this.terminate = this.d.terminate;
    }
    AsyncZipDeflate.prototype.process = function (chunk, final) {
        this.d.push(chunk, final);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncZipDeflate.prototype.push = function (chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return AsyncZipDeflate;
}());
exports.AsyncZipDeflate = AsyncZipDeflate;
// TODO: Better tree shaking
/**
 * A zippable archive to which files can incrementally be added
 */
var Zip = /*#__PURE__*/ (function () {
    /**
     * Creates an empty ZIP archive to which files can be added
     * @param cb The callback to call whenever data for the generated ZIP archive
     *           is available
     */
    function Zip(cb) {
        this.ondata = cb;
        this.u = [];
        this.d = 1;
    }
    /**
     * Adds a file to the ZIP archive
     * @param file The file stream to add
     */
    Zip.prototype.add = function (file) {
        var _this = this;
        if (!this.ondata)
            err(5);
        // finishing or finished
        if (this.d & 2)
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
        else {
            var f = strToU8(file.filename), fl_1 = f.length;
            var com = file.comment, o = com && strToU8(com);
            var u = fl_1 != file.filename.length || (o && (com.length != o.length));
            var hl_1 = fl_1 + exfl(file.extra) + 30;
            if (fl_1 > 65535)
                this.ondata(err(11, 0, 1), null, false);
            var header = new u8(hl_1);
            wzh(header, 0, file, f, u, -1);
            var chks_1 = [header];
            var pAll_1 = function () {
                for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
                    var chk = chks_2[_i];
                    _this.ondata(null, chk, false);
                }
                chks_1 = [];
            };
            var tr_1 = this.d;
            this.d = 0;
            var ind_1 = this.u.length;
            var uf_1 = mrg(file, {
                f: f,
                u: u,
                o: o,
                t: function () {
                    if (file.terminate)
                        file.terminate();
                },
                r: function () {
                    pAll_1();
                    if (tr_1) {
                        var nxt = _this.u[ind_1 + 1];
                        if (nxt)
                            nxt.r();
                        else
                            _this.d = 1;
                    }
                    tr_1 = 1;
                }
            });
            var cl_1 = 0;
            file.ondata = function (err, dat, final) {
                if (err) {
                    _this.ondata(err, dat, final);
                    _this.terminate();
                }
                else {
                    cl_1 += dat.length;
                    chks_1.push(dat);
                    if (final) {
                        var dd = new u8(16);
                        wbytes(dd, 0, 0x8074B50);
                        wbytes(dd, 4, file.crc);
                        wbytes(dd, 8, cl_1);
                        wbytes(dd, 12, file.size);
                        chks_1.push(dd);
                        uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                        if (tr_1)
                            uf_1.r();
                        tr_1 = 1;
                    }
                    else if (tr_1)
                        pAll_1();
                }
            };
            this.u.push(uf_1);
        }
    };
    /**
     * Ends the process of adding files and prepares to emit the final chunks.
     * This *must* be called after adding all desired files for the resulting
     * ZIP file to work properly.
     */
    Zip.prototype.end = function () {
        var _this = this;
        if (this.d & 2) {
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
            return;
        }
        if (this.d)
            this.e();
        else
            this.u.push({
                r: function () {
                    if (!(_this.d & 1))
                        return;
                    _this.u.splice(-1, 1);
                    _this.e();
                },
                t: function () { }
            });
        this.d = 3;
    };
    Zip.prototype.e = function () {
        var bt = 0, l = 0, tl = 0;
        for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
            var f = _a[_i];
            tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        var out = new u8(tl + 22);
        for (var _b = 0, _c = this.u; _b < _c.length; _b++) {
            var f = _c[_b];
            wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
            bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l);
        this.ondata(null, out, true);
        this.d = 2;
    };
    /**
     * A method to terminate any internal workers used by the stream. Subsequent
     * calls to add() will fail.
     */
    Zip.prototype.terminate = function () {
        for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
            var f = _a[_i];
            f.t();
        }
        this.d = 2;
    };
    return Zip;
}());
exports.Zip = Zip;
function zip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    var r = {};
    fltn(data, '', r, opts);
    var k = Object.keys(r);
    var lft = k.length, o = 0, tot = 0;
    var slft = lft, files = new Array(lft);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var cbd = function (a, b) {
        mt(function () { cb(a, b); });
    };
    mt(function () { cbd = cb; });
    var cbf = function () {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for (var i = 0; i < slft; ++i) {
            var f = files[i];
            try {
                var l = f.c.length;
                wzh(out, tot, f, f.f, f.u, l);
                var badd = 30 + f.f.length + exfl(f.extra);
                var loc = tot + badd;
                out.set(f.c, loc);
                wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
            }
            catch (e) {
                return cbd(e, null);
            }
        }
        wzf(out, o, files.length, cdl, oe);
        cbd(null, out);
    };
    if (!lft)
        cbf();
    var _loop_1 = function (i) {
        var fn = k[i];
        var _a = r[fn], file = _a[0], p = _a[1];
        var c = crc(), size = file.length;
        c.p(file);
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        var compression = p.level == 0 ? 0 : 8;
        var cbl = function (e, d) {
            if (e) {
                tAll();
                cbd(e, null);
            }
            else {
                var l = d.length;
                files[i] = mrg(p, {
                    size: size,
                    crc: c.d(),
                    c: d,
                    f: f,
                    m: m,
                    u: s != fn.length || (m && (com.length != ms)),
                    compression: compression
                });
                o += 30 + s + exl + l;
                tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                if (!--lft)
                    cbf();
            }
        };
        if (s > 65535)
            cbl(err(11, 0, 1), null);
        if (!compression)
            cbl(null, file);
        else if (size < 160000) {
            try {
                cbl(null, deflateSync(file, p));
            }
            catch (e) {
                cbl(e, null);
            }
        }
        else
            term.push(deflate(file, p, cbl));
    };
    // Cannot use lft because it can decrease
    for (var i = 0; i < slft; ++i) {
        _loop_1(i);
    }
    return tAll;
}
/**
 * Synchronously creates a ZIP file. Prefer using `zip` for better performance
 * with more than one file.
 * @param data The directory structure for the ZIP archive
 * @param opts The main options, merged with per-file options
 * @returns The generated ZIP archive
 */
function zipSync(data, opts) {
    if (!opts)
        opts = {};
    var r = {};
    var files = [];
    fltn(data, '', r, opts);
    var o = 0;
    var tot = 0;
    for (var fn in r) {
        var _a = r[fn], file = _a[0], p = _a[1];
        var compression = p.level == 0 ? 0 : 8;
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        if (s > 65535)
            err(11);
        var d = compression ? deflateSync(file, p) : file, l = d.length;
        var c = crc();
        c.p(file);
        files.push(mrg(p, {
            size: file.length,
            crc: c.d(),
            c: d,
            f: f,
            m: m,
            u: s != fn.length || (m && (com.length != ms)),
            o: o,
            compression: compression
        }));
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for (var i = 0; i < files.length; ++i) {
        var f = files[i];
        wzh(out, f.o, f, f.f, f.u, f.c.length);
        var badd = 30 + f.f.length + exfl(f.extra);
        out.set(f.c, f.o + badd);
        wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
}
/**
 * Streaming pass-through decompression for ZIP archives
 */
var UnzipPassThrough = /*#__PURE__*/ (function () {
    function UnzipPassThrough() {
    }
    UnzipPassThrough.prototype.push = function (chunk, final) {
        // same as ZipPassThrough: cast to retain Buffer ergonomics
        this.ondata(null, chunk, final);
    };
    UnzipPassThrough.compression = 0;
    return UnzipPassThrough;
}());
exports.UnzipPassThrough = UnzipPassThrough;
/**
 * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
 * better performance.
 */
var UnzipInflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */
    function UnzipInflate() {
        var _this = this;
        this.i = new Inflate(function (dat, final) {
            _this.ondata(null, dat, final);
        });
    }
    UnzipInflate.prototype.push = function (chunk, final) {
        try {
            this.i.push(chunk, final);
        }
        catch (e) {
            this.ondata(e, null, final);
        }
    };
    UnzipInflate.compression = 8;
    return UnzipInflate;
}());
exports.UnzipInflate = UnzipInflate;
/**
 * Asynchronous streaming DEFLATE decompression for ZIP archives
 */
var AsyncUnzipInflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */
    function AsyncUnzipInflate(_, sz) {
        var _this = this;
        if (sz < 320000) {
            this.i = new Inflate(function (dat, final) {
                _this.ondata(null, dat, final);
            });
        }
        else {
            this.i = new AsyncInflate(function (err, dat, final) {
                _this.ondata(err, dat, final);
            });
            this.terminate = this.i.terminate;
        }
    }
    AsyncUnzipInflate.prototype.push = function (chunk, final) {
        if (this.i.terminate)
            chunk = slc(chunk, 0);
        this.i.push(chunk, final);
    };
    AsyncUnzipInflate.compression = 8;
    return AsyncUnzipInflate;
}());
exports.AsyncUnzipInflate = AsyncUnzipInflate;
/**
 * A ZIP archive decompression stream that emits files as they are discovered
 */
var Unzip = /*#__PURE__*/ (function () {
    /**
     * Creates a ZIP decompression stream
     * @param cb The callback to call whenever a file in the ZIP archive is found
     */
    function Unzip(cb) {
        this.onfile = cb;
        this.k = [];
        this.o = {
            0: UnzipPassThrough
        };
        this.p = et;
    }
    /**
     * Pushes a chunk to be unzipped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzip.prototype.push = function (chunk, final) {
        var _this = this;
        if (!this.onfile)
            err(5);
        if (!this.p)
            err(4);
        if (this.c > 0) {
            var len = Math.min(this.c, chunk.length);
            var toAdd = chunk.subarray(0, len);
            this.c -= len;
            if (this.d)
                this.d.push(toAdd, !this.c);
            else
                this.k[0].push(toAdd);
            chunk = chunk.subarray(len);
            if (chunk.length)
                return this.push(chunk, final);
        }
        else {
            var f = 0, i = 0, is = void 0, buf = void 0;
            if (!this.p.length)
                buf = chunk;
            else if (!chunk.length)
                buf = this.p;
            else {
                buf = new u8(this.p.length + chunk.length);
                buf.set(this.p), buf.set(chunk, this.p.length);
            }
            var l = buf.length, oc = this.c, add = oc && this.d;
            var _loop_2 = function () {
                var sig = b4(buf, i);
                if (sig == 0x4034B50) {
                    f = 1, is = i;
                    this_1.d = null;
                    this_1.c = 0;
                    var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                    if (l > i + 30 + fnl + es) {
                        var chks_3 = [];
                        this_1.k.unshift(chks_3);
                        f = 2;
                        var lsc = b4(buf, i + 18), lsu = b4(buf, i + 22);
                        var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                        var _a = z64hs(buf, i, es, 2, lsc, lsu, 0), sc_1 = _a[0], su_1 = _a[1], z64 = _a[3];
                        if (dd)
                            sc_1 = -1 - z64;
                        i += es;
                        this_1.c = sc_1;
                        var d_1;
                        var file_1 = {
                            name: fn_1,
                            compression: cmp_1,
                            start: function () {
                                if (!file_1.ondata)
                                    err(5);
                                if (!sc_1)
                                    file_1.ondata(null, et, true);
                                else {
                                    var ctr = _this.o[cmp_1];
                                    if (!ctr)
                                        file_1.ondata(err(14, 'unknown compression type ' + cmp_1, 1), null, false);
                                    d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                    d_1.ondata = function (err, dat, final) { file_1.ondata(err, dat, final); };
                                    for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                                        var dat = chks_4[_i];
                                        d_1.push(dat, false);
                                    }
                                    if (_this.k[0] == chks_3 && _this.c)
                                        _this.d = d_1;
                                    else
                                        d_1.push(et, true);
                                }
                            },
                            terminate: function () {
                                if (d_1 && d_1.terminate)
                                    d_1.terminate();
                            }
                        };
                        if (sc_1 >= 0)
                            file_1.size = sc_1, file_1.originalSize = su_1;
                        this_1.onfile(file_1);
                    }
                    return "break";
                }
                else if (oc) {
                    if (sig == 0x8074B50) {
                        is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                        return "break";
                    }
                    else if (sig == 0x2014B50) {
                        is = i -= 4, f = 3, this_1.c = 0;
                        return "break";
                    }
                }
            };
            var this_1 = this;
            for (; i < l - 4; ++i) {
                var state_1 = _loop_2();
                if (state_1 === "break")
                    break;
            }
            this.p = et;
            if (oc < 0) {
                var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                if (add)
                    add.push(dat, !!f);
                else
                    this.k[+(f == 2)].push(dat);
            }
            if (f & 2)
                return this.push(buf.subarray(i), final);
            this.p = buf.subarray(i);
        }
        if (final) {
            if (this.c)
                err(13);
            this.p = null;
        }
    };
    /**
     * Registers a decoder with the stream, allowing for files compressed with
     * the compression type provided to be expanded correctly
     * @param decoder The decoder constructor
     */
    Unzip.prototype.register = function (decoder) {
        this.o[decoder.compression] = decoder;
    };
    return Unzip;
}());
exports.Unzip = Unzip;
var mt = typeof queueMicrotask == 'function' ? queueMicrotask : typeof setTimeout == 'function' ? setTimeout : function (fn) { fn(); };
function unzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var files = {};
    var cbd = function (a, b) {
        mt(function () { cb(a, b); });
    };
    mt(function () { cbd = cb; });
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558) {
            cbd(err(13, 0, 1), null);
            return tAll;
        }
    }
    ;
    var lft = b2(data, e + 8);
    if (lft) {
        var c = lft;
        var o = b4(data, e + 16);
        var z = b4(data, e - 20) == 0x7064B50;
        if (z) {
            var ze = b4(data, e - 12);
            z = b4(data, ze) == 0x6064B50;
            if (z) {
                c = lft = b4(data, ze + 32);
                o = b4(data, ze + 48);
            }
        }
        var fltr = opts && opts.filter;
        var _loop_3 = function (i) {
            var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
            o = no;
            var cbl = function (e, d) {
                if (e) {
                    tAll();
                    cbd(e, null);
                }
                else {
                    if (d)
                        files[fn] = d;
                    if (!--lft)
                        cbd(null, files);
                }
            };
            if (!fltr || fltr({
                name: fn,
                size: sc,
                originalSize: su,
                compression: c_1
            })) {
                if (!c_1)
                    cbl(null, slc(data, b, b + sc));
                else if (c_1 == 8) {
                    var infl = data.subarray(b, b + sc);
                    // Synchronously decompress under 512KB, or barely-compressed data
                    if (su < 524288 || sc > 0.8 * su) {
                        try {
                            cbl(null, inflateSync(infl, { out: new u8(su) }));
                        }
                        catch (e) {
                            cbl(e, null);
                        }
                    }
                    else
                        term.push(inflate(infl, { size: su }, cbl));
                }
                else
                    cbl(err(14, 'unknown compression type ' + c_1, 1), null);
            }
            else
                cbl(null, null);
        };
        for (var i = 0; i < c; ++i) {
            _loop_3(i);
        }
    }
    else
        cbd(null, {});
    return tAll;
}
/**
 * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
 * performance with more than one file.
 * @param data The raw compressed ZIP file
 * @param opts The ZIP extraction options
 * @returns The decompressed files
 */
function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558)
            err(13);
    }
    ;
    var c = b2(data, e + 8);
    if (!c)
        return {};
    var o = b4(data, e + 16);
    var z = b4(data, e - 20) == 0x7064B50;
    if (z) {
        var ze = b4(data, e - 12);
        z = b4(data, ze) == 0x6064B50;
        if (z) {
            c = b4(data, ze + 32);
            o = b4(data, ze + 48);
        }
    }
    var fltr = opts && opts.filter;
    for (var i = 0; i < c; ++i) {
        var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        if (!fltr || fltr({
            name: fn,
            size: sc,
            originalSize: su,
            compression: c_2
        })) {
            if (!c_2)
                files[fn] = slc(data, b, b + sc);
            else if (c_2 == 8)
                files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
            else
                err(14, 'unknown compression type ' + c_2);
        }
    }
    return files;
}


/***/ },

/***/ 9776
(__unused_webpack_module, exports) {

"use strict";
/**
 * filesize
 *
 * @copyright 2026 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 11.0.23
 */


// Error Messages
const INVALID_NUMBER = "Invalid number";
const INVALID_ROUND = "Invalid rounding method";

// Standard Types
const IEC = "iec";
const JEDEC = "jedec";
const SI = "si";

// Unit Types
const BIT = "bit";
const BITS = "bits";
const BYTE = "byte";
const BYTES = "bytes";
const SI_KBIT = "kbit";
const SI_KBYTE = "kB";

// Output Format Types
const ARRAY = "array";
const FUNCTION = "function";
const OBJECT = "object";
const STRING = "string";

// Processing Constants
const EXPONENT = "exponent";
const ROUND = "round";

// Special Characters and Values
const E = "e";
const EMPTY = "";
const PERIOD = ".";
const S = "s";
const SPACE = " ";
const ZERO = "0";

// Data Structures
const STRINGS = {
	symbol: {
		iec: {
			bits: ["bit", "Kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit"],
			bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
		},
		jedec: {
			bits: ["bit", "Kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"],
			bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
		},
	},
	fullform: {
		iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
		jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"],
	},
};

// Pre-computed lookup tables for performance optimization
const BINARY_POWERS = [
	1, // 2^0
	1024, // 2^10
	1048576, // 2^20
	1073741824, // 2^30
	1099511627776, // 2^40
	1125899906842624, // 2^50
	1152921504606846976, // 2^60
	1180591620717411303424, // 2^70
	1208925819614629174706176, // 2^80
];

const DECIMAL_POWERS = [
	1, // 10^0
	1000, // 10^3
	1000000, // 10^6
	1000000000, // 10^9
	1000000000000, // 10^12
	1000000000000000, // 10^15
	1000000000000000000, // 10^18
	1000000000000000000000, // 10^21
	1000000000000000000000000, // 10^24
];

// Pre-computed log values for faster exponent calculation
const LOG_2_1024 = Math.log(1024);
const LOG_10_1000 = Math.log(1000);

// Cached configuration lookup for better performance
const STANDARD_CONFIGS = {
	[SI]: { isDecimal: true, ceil: 1000, actualStandard: JEDEC },
	[IEC]: { isDecimal: false, ceil: 1024, actualStandard: IEC },
	[JEDEC]: { isDecimal: false, ceil: 1024, actualStandard: JEDEC },
};

/**
 * Optimized base configuration lookup
 * @param {string} standard - Standard type
 * @param {number} base - Base number
 * @returns {Object} Configuration object
 */
function getBaseConfiguration(standard, base) {
	// Use cached lookup table for better performance
	if (STANDARD_CONFIGS[standard]) {
		return STANDARD_CONFIGS[standard];
	}

	// Base override
	if (base === 2) {
		return { isDecimal: false, ceil: 1024, actualStandard: IEC };
	}

	// Default
	return { isDecimal: true, ceil: 1000, actualStandard: JEDEC };
}

/**
 * Optimized zero value handling
 * @param {number} precision - Precision value
 * @param {string} actualStandard - Standard to use
 * @param {boolean} bits - Whether to use bits
 * @param {Object} symbols - Custom symbols
 * @param {boolean} full - Whether to use full form
 * @param {Array} fullforms - Custom full forms
 * @param {string} output - Output format
 * @param {string} spacer - Spacer character
 * @param {boolean} pad - Whether to pad decimal places
 * @param {number} round - Number of decimal places for padding
 * @param {string} [symbol] - Symbol to use (defaults based on bits/standard)
 * @returns {string|Array|Object|number} Formatted result
 */
function handleZeroValue(
	precision,
	actualStandard,
	bits,
	symbols,
	full,
	fullforms,
	output,
	spacer,
	pad,
	round,
	symbol,
) {
	let value;
	if (precision > 0) {
		value = (0).toPrecision(precision);
	} else if (pad && round > 0) {
		value = (0).toFixed(round);
	} else {
		value = 0;
	}

	if (output === EXPONENT) {
		return 0;
	}

	// Set default symbol if not provided
	if (!symbol) {
		symbol = bits
			? STRINGS.symbol[actualStandard].bits[0]
			: STRINGS.symbol[actualStandard].bytes[0];
	}

	// Apply symbol customization
	if (symbols[symbol]) {
		symbol = symbols[symbol];
	}

	// Apply full form
	if (full) {
		if (fullforms[0]) {
			symbol = fullforms[0];
		} else {
			symbol = STRINGS.fullform[actualStandard][0];
			if (bits) {
				symbol += BIT;
			} else {
				symbol += BYTE;
			}
		}
	}

	// Return in requested format
	if (output === ARRAY) {
		return [value, symbol];
	}

	if (output === OBJECT) {
		return { value, symbol, exponent: 0, unit: symbol };
	}

	return value + spacer + symbol;
}

/**
 * Optimized value calculation with bits handling
 * @param {number} num - Input number
 * @param {number} e - Exponent
 * @param {boolean} isDecimal - Whether to use decimal powers
 * @param {boolean} bits - Whether to calculate bits
 * @param {number} ceil - Ceiling value for auto-increment
 * @param {boolean} autoExponent - Whether exponent is auto (-1 or NaN)
 * @returns {Object} Object with result and e properties
 */
function calculateOptimizedValue(num, e, isDecimal, bits, ceil, autoExponent = true) {
	let d;
	if (isDecimal) {
		d = DECIMAL_POWERS[e];
	} else {
		d = BINARY_POWERS[e];
	}
	let result = num / d;

	if (bits) {
		result *= 8;
		// Handle auto-increment for bits (only when exponent is auto)
		if (autoExponent && result >= ceil && e < 8) {
			result /= ceil;
			e++;
		}
	}

	return { result, e };
}

/**
 * Optimized precision handling with scientific notation correction
 * @param {number} value - Current value
 * @param {number} precision - Precision to apply
 * @param {number} e - Current exponent
 * @param {number} num - Original number
 * @param {boolean} isDecimal - Whether using decimal base
 * @param {boolean} bits - Whether calculating bits
 * @param {number} ceil - Ceiling value
 * @param {Function} roundingFunc - Rounding function
 * @param {number} round - Round value
 * @param {number} exponent - Forced exponent (-1 for auto)
 * @returns {Object} Object with value and e properties
 */
function applyPrecisionHandling(
	value,
	precision,
	e,
	num,
	isDecimal,
	bits,
	ceil,
	roundingFunc,
	round,
	exponent,
) {
	if (typeof value === "string") {
		value = parseFloat(value);
	}

	let result = value.toPrecision(precision);

	const autoExponent = exponent === -1 || isNaN(exponent);

	// Handle scientific notation by recalculating with incremented exponent
	if (result.includes(E) && e < 8 && autoExponent) {
		e++;
		const { result: valueResult } = calculateOptimizedValue(num, e, isDecimal, bits, ceil);
		let p;
		if (round > 0) {
			p = Math.pow(10, round);
		} else {
			p = 1;
		}
		let computed;
		if (p === 1) {
			computed = roundingFunc(valueResult);
		} else {
			computed = roundingFunc(valueResult * p) / p;
		}
		result = computed.toPrecision(precision);
	}

	return { value: result, e };
}

/**
 * Optimized number formatting with locale, separator, and padding
 * @param {number|string} value - Value to format
 * @param {string|boolean} locale - Locale setting
 * @param {Object} localeOptions - Locale options
 * @param {string} separator - Custom separator
 * @param {boolean} pad - Whether to pad
 * @param {number} round - Round value
 * @returns {string|number} Formatted value
 */
function applyNumberFormatting(
	value,
	locale,
	localeOptions,
	separator,
	pad,
	round,
	roundingFunc,
) {
	let result = value;

	// When padding alongside a locale, let the locale formatter emit the fixed
	// number of fraction digits. The manual string padding below cannot tell a
	// locale-inserted grouping separator from the decimal separator, so it
	// dropped digits (e.g. "1,234,500" became "1,234").
	const localePad =
		pad && round > 0 ? { minimumFractionDigits: round, maximumFractionDigits: round } : undefined;

	// Apply locale formatting
	if (locale === true) {
		result = result.toLocaleString(undefined, localePad);
	} else if (locale.length > 0) {
		result = result.toLocaleString(locale, { ...localeOptions, ...localePad });
	} else if (separator.length > 0) {
		// Round before separator replacement to ensure excess decimal places
		// are truncated when pad is also set (fixes padding + separator bug).
		if (pad && round > 0) {
			const p = Math.pow(10, round);
			result = roundingFunc(result * p) / p;
		}
		result = result.toString().replace(PERIOD, separator);
	}

	// Apply padding for the non-locale paths, where the string has a single
	// decimal separator and no grouping is inserted.
	if (pad && round > 0 && locale !== true && locale.length === 0) {
		const resultStr = result.toString();
		const x = separator || PERIOD;
		const tmp = resultStr.split(x);
		const s = tmp[1] || EMPTY;

		result = `${tmp[0]}${x}${s.padEnd(round, ZERO)}`;
	}

	return result;
}

/**
 * Calculates exponent from the input value using pre-computed log values and clamps to supported range
 * Also adjusts precision when exponent exceeds the lookup table bounds
 * @param {number} num - Input file size in bytes
 * @param {number} e - Current exponent value
 * @param {number} exponent - Original user-provided exponent option (-1 for auto)
 * @param {boolean} isDecimal - Whether to use decimal (SI) base
 * @param {number} precision - Current precision value (modified when e > 8)
 * @returns {Object} Object with computed e value and possibly adjusted precision
 */
function calculateExponent(num, e, exponent, isDecimal, precision) {
	if (e === -1 || isNaN(e)) {
		if (isDecimal) {
			e = Math.floor(Math.log(num) / LOG_10_1000);
		} else {
			e = Math.floor(Math.log(num) / LOG_2_1024);
		}
		if (e < 0) {
			e = 0;
		}
	} else if (e < 0) {
		// A forced exponent below the auto sentinel (-1) has no meaning and
		// would otherwise index the power-of-ten/two lookup tables out of
		// bounds (producing NaN). Clamp to 0, mirroring the e > 8 clamp below.
		e = 0;
	}

	if (e > 8) {
		if (precision > 0) {
			precision += 8 - e;
		}
		return { e: 8, precision };
	}

	return { e, precision };
}

/**
 * Applies rounding to the raw calculated value and handles auto-increment ceiling
 * @param {number} val - Raw value before rounding
 * @param {number} ceil - Ceiling threshold (1000 for SI, 1024 for IEC)
 * @param {number} e - Current exponent value
 * @param {number} round - Number of decimal places
 * @param {Function} roundingFunc - Rounding method (Math.round, Math.floor, Math.ceil)
 * @param {boolean} autoExponent - Whether exponent is auto-calculated (-1 or NaN)
 * @returns {Object} Object with rounded value and possibly incremented exponent
 */
function applyRounding(val, ceil, e, round, roundingFunc, autoExponent) {
	let p;
	if (e > 0 && round > 0) {
		p = Math.pow(10, round);
	} else {
		p = 1;
	}
	let r;
	if (p === 1) {
		r = roundingFunc(val);
	} else {
		r = roundingFunc(val * p) / p;
	}

	if (r === ceil && e < 8 && autoExponent) {
		r = 1;
		e++;
	}

	return { value: r, e };
}

/**
 * Resolves the unit symbol for the given standard, bits mode, and exponent
 * Handles SI standard special case where exponent 1 always uses "kB" or "kbit"
 * @param {string} actualStandard - The resolved standard (iec, jedec)
 * @param {boolean} bits - Whether formatting bit values
 * @param {number} e - Current exponent index
 * @param {boolean} isDecimal - Whether using decimal (SI) base
 * @returns {string} The resolved unit symbol string
 */
function resolveSymbol(actualStandard, bits, e, isDecimal) {
	const symbolTable = STRINGS.symbol[actualStandard][bits ? BITS : BYTES];
	let result;
	if (isDecimal && e === 1) {
		if (bits) {
			result = SI_KBIT;
		} else {
			result = SI_KBYTE;
		}
	} else {
		result = symbolTable[e];
	}
	return result;
}

/**
 * Decorates the result: applies negation, custom symbols, number formatting, and full form names
 * Mutates the result array in-place for both value (index 0) and symbol (index 1)
 * @param {Array} result - Result array with numeric value at [0] and string symbol at [1]
 * @param {boolean} neg - Whether the original input was negative
 * @param {Object} symbols - Custom symbol override map
 * @param {string|boolean} locale - Locale string for formatting
 * @param {Object} localeOptions - Additional locale formatting options
 * @param {string} separator - Custom decimal separator
 * @param {boolean} pad - Whether zero-pad decimals
 * @param {number} round - Target decimal count for padding
 * @param {boolean} full - Whether to use full unit names
 * @param {Array} fullforms - Custom full unit name overrides
 * @param {string} actualStandard - Unit standard for full form lookup
 * @param {number} e - Current exponent index
 * @param {boolean} bits - Whether formatting bit values
 * @returns {void} Mutates result array in place
 */
function decorateResult(
	result,
	neg,
	symbols,
	locale,
	localeOptions,
	separator,
	pad,
	round,
	full,
	fullforms,
	actualStandard,
	e,
	bits,
	roundingFunc,
) {
	if (neg) {
		// `precision` leaves the value as a string from toPrecision (e.g. "1.50").
		// Negating that arithmetically coerces it back to a number and drops the
		// trailing zeros the option asked for, so prefix the sign instead.
		result[0] = typeof result[0] === "string" ? `-${result[0]}` : -result[0];
	}

	if (symbols[result[1]]) {
		result[1] = symbols[result[1]];
	}

	// Capture the numeric value before formatting; a comma decimal separator
	// (via separator or a locale such as de-DE) would otherwise make parseFloat
	// read "1,5" as 1 and select the singular unit name.
	let numericValue;
	if (typeof result[0] === "string") {
		numericValue = parseFloat(result[0]);
	} else {
		numericValue = result[0];
	}

	result[0] = applyNumberFormatting(
		result[0],
		locale,
		localeOptions,
		separator,
		pad,
		round,
		roundingFunc,
	);

	if (full) {
		let unit;
		if (bits) {
			unit = BIT;
		} else {
			unit = BYTE;
		}
		// Determine singular/plural suffix
		let suffix;
		if (numericValue === 1) {
			suffix = EMPTY;
		} else {
			suffix = S;
		}
		// Determine symbol — custom fullforms are the complete name, defaults get unit+suffix
		if (fullforms[e]) {
			result[1] = fullforms[e];
		} else {
			result[1] = STRINGS.fullform[actualStandard][e] + unit + suffix;
		}
	}
}

/**
 * Formats the computed result array into the requested output type
 * @param {Array} result - Result array with formatted value at [0] and symbol at [1]
 * @param {number} e - Current exponent
 * @param {string} u - Original resolved symbol (before custom override)
 * @param {string} output - Output type (ARRAY, OBJECT, STRING)
 * @param {string} spacer - String separator between value and unit
 * @returns {string|Array|Object|number} Formatted result in requested type
 */
function formatOutput(result, e, u, output, spacer) {
	if (output === ARRAY) {
		return result;
	}

	if (output === OBJECT) {
		return {
			value: result[0],
			symbol: result[1],
			exponent: e,
			unit: u,
		};
	}

	let formatted;
	if (spacer === SPACE) {
		formatted = `${result[0]} ${result[1]}`;
	} else {
		formatted = result.join(spacer);
	}
	return formatted;
}

/**
 * Converts a file size in bytes to a human-readable string with appropriate units
 * @param {number|string|bigint} arg - The file size in bytes to convert
 * @param {Object} [options={}] - Configuration options for formatting
 * @param {boolean} [options.bits=false] - If true, calculates bits instead of bytes
 * @param {boolean} [options.pad=false] - If true, pads decimal places to match round parameter
 * @param {number} [options.base=-1] - Number base (2 for binary, 10 for decimal, -1 for auto)
 * @param {number} [options.round=2] - Number of decimal places to round to
 * @param {string|boolean} [options.locale=""] - Locale for number formatting, true for system locale
 * @param {Object} [options.localeOptions={}] - Additional options for locale formatting
 * @param {string} [options.separator=""] - Custom decimal separator
 * @param {string} [options.spacer=" "] - String to separate value and unit
 * @param {Object} [options.symbols={}] - Custom unit symbols
 * @param {string} [options.standard=""] - Unit standard to use (SI, IEC, JEDEC)
 * @param {string} [options.output="string"] - Output format: "string", "array", "object", or "exponent"
 * @param {boolean} [options.fullform=false] - If true, uses full unit names instead of abbreviations
 * @param {Array} [options.fullforms=[]] - Custom full unit names
 * @param {number} [options.exponent=-1] - Force specific exponent (-1 for auto)
 * @param {string} [options.roundingMethod="round"] - Math rounding method to use
 * @param {number} [options.precision=0] - Number of significant digits (0 for auto)
 * @returns {string|Array|Object|number} Formatted file size based on output option
 * @throws {TypeError} When arg is not a valid number or roundingMethod is invalid
 * @example
 * filesize(1024) // "1.02 kB"
 * filesize(1024, {bits: true}) // "8.19 kbit"
 * filesize(1024, {output: "object"}) // {value: 1.02, symbol: "kB", exponent: 1, unit: "kB"}
 */
function filesize(
	arg,
	{
		bits = false,
		pad = false,
		base = -1,
		round = 2,
		locale = EMPTY,
		localeOptions = {},
		separator = EMPTY,
		spacer = SPACE,
		symbols = {},
		standard = EMPTY,
		output = STRING,
		fullform = false,
		fullforms = [],
		exponent = -1,
		roundingMethod = ROUND,
		precision = 0,
	} = {},
) {
	let e = exponent,
		num,
		result = [],
		val = 0,
		u = EMPTY;

	if (typeof arg === "bigint") {
		num = Number(arg);
	} else {
		num = Number(arg);

		if (isNaN(num)) {
			throw new TypeError(INVALID_NUMBER);
		}

		if (!isFinite(num)) {
			throw new TypeError(INVALID_NUMBER);
		}
	}

	const { isDecimal, ceil, actualStandard } = getBaseConfiguration(standard, base);

	const full = fullform === true,
		neg = num < 0,
		roundingFunc = Math[roundingMethod];

	if (typeof roundingFunc !== FUNCTION) {
		throw new TypeError(INVALID_ROUND);
	}

	if (neg) {
		num = -num;
	}

	if (num === 0) {
		return handleZeroValue(
			precision,
			actualStandard,
			bits,
			symbols,
			full,
			fullforms,
			output,
			spacer,
			pad,
			round,
		);
	}

	// Exponent calculation + clamp + precision adjustment
	const { e: calculatedE, precision: precisionAdjusted } = calculateExponent(
		num,
		e,
		exponent,
		isDecimal,
		precision,
	);
	e = calculatedE;
	const autoExponent = exponent === -1 || isNaN(exponent);

	const { result: valueResult, e: valueExponent } = calculateOptimizedValue(
		num,
		e,
		isDecimal,
		bits,
		ceil,
		autoExponent,
	);
	val = valueResult;
	e = valueExponent;

	// Rounding + auto-increment ceiling
	const rounded = applyRounding(val, ceil, e, round, roundingFunc, autoExponent);
	result[0] = rounded.value;
	e = rounded.e;

	// Precision handling
	if (precisionAdjusted > 0) {
		const precisionResult = applyPrecisionHandling(
			result[0],
			precisionAdjusted,
			e,
			num,
			isDecimal,
			bits,
			ceil,
			roundingFunc,
			round,
			exponent,
		);
		result[0] = precisionResult.value;
		e = precisionResult.e;
	}

	// Return the exponent only after every adjustment that other output
	// modes apply (bits auto-increment, rounding overflow, precision), so
	// it always matches the exponent reported by object output.
	if (output === EXPONENT) {
		return e;
	}

	u = resolveSymbol(actualStandard, bits, e, isDecimal);
	result[1] = u;

	decorateResult(
		result,
		neg,
		symbols,
		locale,
		localeOptions,
		separator,
		pad,
		round,
		full,
		fullforms,
		actualStandard,
		e,
		bits,
		roundingFunc,
	);

	return formatOutput(result, e, u, output, spacer);
}

/**
 * Creates a partially applied version of filesize with preset options
 * @param {Object} [options={}] - Configuration options (same as filesize)
 * @param {boolean} [options.bits=false] - If true, calculates bits instead of bytes
 * @param {boolean} [options.pad=false] - If true, pads decimal places to match round parameter
 * @param {number} [options.base=-1] - Number base (2 for binary, 10 for decimal, -1 for auto)
 * @param {number} [options.round=2] - Number of decimal places to round to
 * @param {string|boolean} [options.locale=""] - Locale for number formatting, true for system locale
 * @param {Object} [options.localeOptions={}] - Additional options for locale formatting
 * @param {string} [options.separator=""] - Custom decimal separator
 * @param {string} [options.spacer=" "] - String to separate value and unit
 * @param {Object} [options.symbols={}] - Custom unit symbols
 * @param {string} [options.standard=""] - Unit standard to use (SI, IEC, JEDEC)
 * @param {string} [options.output="string"] - Output format: "string", "array", "object", or "exponent"
 * @param {boolean} [options.fullform=false] - If true, uses full unit names instead of abbreviations
 * @param {Array} [options.fullforms=[]] - Custom full unit names
 * @param {number} [options.exponent=-1] - Force specific exponent (-1 for auto)
 * @param {string} [options.roundingMethod="round"] - Math rounding method to use
 * @param {number} [options.precision=0] - Number of significant digits (0 for auto)
 * @returns {Function} A function that takes a file size and returns formatted output
 * @example
 * const formatBytes = partial({round: 1, standard: "iec"});
 * formatBytes(1024) // "1 KiB"
 * formatBytes(2048) // "2 KiB"
 * formatBytes(1536) // "1.5 KiB"
 */
function partial({
	bits = false,
	pad = false,
	base = -1,
	round = 2,
	locale = EMPTY,
	separator = EMPTY,
	spacer = SPACE,
	standard = EMPTY,
	output = STRING,
	fullform = false,
	exponent = -1,
	roundingMethod = ROUND,
	precision = 0,
	localeOptions = {},
	symbols = {},
	fullforms = [],
} = {}) {
	/**
	 * Safely clone an object using structuredClone with JSON fallback.
	 * structuredClone can throw for functions, circular refs, etc.
	 */
	function safeClone(value) {
		try {
			return typeof structuredClone === "function"
				? structuredClone(value)
				: JSON.parse(JSON.stringify(value));
		} catch {
			return JSON.parse(JSON.stringify(value));
		}
	}

	const cloned = {
		localeOptions: safeClone(localeOptions),
		symbols: safeClone(symbols),
		fullforms: safeClone(fullforms),
	};

	return (arg) =>
		filesize(arg, {
			bits,
			pad,
			base,
			round,
			locale,
			localeOptions: cloned.localeOptions,
			separator,
			spacer,
			symbols: cloned.symbols,
			standard,
			output,
			fullform,
			fullforms: cloned.fullforms,
			exponent,
			roundingMethod,
			precision,
		});
}

exports.filesize = filesize;
exports.partial = partial;


/***/ }

}]);