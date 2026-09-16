/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8140
(module) {

//External script now for easy access.
const ASSET_LIST = [
    { url: "assets/legacy.pk3", filename: "legacy.pk3" },
    { url: "assets/music.dta", filename: "music.dta" },
    { url: "assets/patch.dta", filename: "patch.dta" },
    { url: "assets/player.dta", filename: "player.dta" },
    { url: "assets/rings.dta", filename: "rings.dta" },
    { url: "assets/srb2.srb", filename: "srb2.srb" },
    { url: "assets/zones.dta", filename: "zones.dta" },
  ];

//Note to self: change this once you update/merge any updates and change the resources.
const CACHE_NAME = "srb2legacy-assets-v1";

module.exports = {
    ASSET_LIST,
    CACHE_NAME
};

/***/ },

/***/ 1973
(module, __unused_webpack_exports, __webpack_require__) {

var elements = __webpack_require__(5100);

//var resizeModeSelect = elements.getGPId("resizeModeSelect");
//var resizeModes = ["safe", "force"];

function getSafeValue(elm,safeValues) {
    var val = ""+elm.value;
    if (safeValues.indexOf(val) == -1) {
        return safeValues[0];
    }
    return val;
}

function getDisplayOptions() {
    return {
        //resolutionChangeMethod: getSafeValue(resizeModeSelect, resizeModes)
    };
}

function addLocalStorageHandler(elm, id) {
    var loadedValue = localStorage.getItem(""+id);
    if (loadedValue) {
        elm.value = loadedValue;

        for (var c of elm.children) {
            if (c.value == loadedValue) {
                c.selected = true;
            } else {
                c.selected = false;
            }
        }
    }

    elm.addEventListener("change", () => {
        localStorage.setItem(""+id, elm.value);
    });
}

//addLocalStorageHandler(resizeModeSelect, "srb2web-resize-mode-select");

module.exports = {
    getDisplayOptions
};

/***/ },

/***/ 4305
(module) {

module.exports = [
  {
    element: "button",
    className: "button browseButton",
    children: [
      {
        element: "img",
        src: "images/wifi.svg",
        style: {
          height: "32px",
        },
      },
      {
        element: "span",
        textContent: "Browse & Host Netgames",
      },
    ],
    gid: "browseNetgamesLargeButton",
  },
];


/***/ },

/***/ 3022
(module) {

module.exports = [
    {
        element: "div",
        children: [
            /////////////////////////////////////
            
            {
                element: "span",
                className: "sectionHeader",
                textContent: "Display options:",
            },

            /////////////////////////////////////
            //Button to open touch controls to move and customize them.

            {
                element: "button",
                className: "button",
                gid: "configureTouchControlsButton",
                textContent: "Customize touch controls",
            },

            /////////////////////////////////////
        ]
    }
];

/***/ },

/***/ 7496
(module) {

module.exports = [
  {
    element: "a",
    className: "button fsButton",
    href: "file.html",
    children: [
      {
        element: "img",
        src: "images/folder.svg",
        style: {
          height: "32px",
        },
      },
      {
        element: "span",
        textContent: "Manage files & addons",
      },
    ],
    gid: "fsButton",
  },
];


/***/ },

/***/ 7255
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = [
  ...__webpack_require__(4682),
  {
    element: "div",
    className: "srb2BG",
  },
  ...__webpack_require__(53),
  ...__webpack_require__(1652),
  {
    element: "div",
    className: "logsContainer",
    gid: "dedicatedServerLogs",
    hidden: true,
  },
  {
    element: "canvas",
    className: "gameCanvas",
    gid: "gameCanvas",
    tabindex: "0",
  },
  ...__webpack_require__(8515),

  ...__webpack_require__(6495),
];


/***/ },

/***/ 8752
(module) {

module.exports = [
  /////////////////////////////////////////////////////////

  {
    element: "h2",
    textContent: "Experience SRB2 Legacy Anywhere",
  },

  "SRB2Legacy Web is an advanced, browser-based launcher for Sonic Robo Blast 2 —the premier fan-made 3D Sonic the Hedgehog experience. Built on the Doom Legacy engine, this port allows you to jump into high-speed gameplay and full online multiplayer directly in your browser, no installation required.",

  /////////////////////////////////////////////////////////

  {
    element: "h2",
    textContent: "Development & Credits",
  },

  "This project is developed and maintained by ",
  {
    element: "a",
    href: "https://github.com/gvbvdxxalt2",
    target: "_blank",
    textContent: "Gvbvdxx",
  },
  ". The realization of this port was made possible through the power of Emscripten and the collaborative assistance of Google Gemini and other generative AI tools.",

  {
    element: "br",
  },

  "It stands as a testament to modern web technology, bringing classic fangame heritage to the modern web platform.",

  /////////////////////////////////////////////////////////

  {
    element: "h2",
    textContent: "Found a Bug?",
  },

  "As this is an experimental web port, you may encounter technical issues or performance bugs. If the game crashes, please check your browser's developer console (F12) for error logs and report them on our ",
  {
    element: "a",
    href: "https://github.com/gvbvdxxalt2/SRB2LegacyWeb/issues",
    target: "_blank",
    textContent: "GitHub Issues page",
  },
  ". Your feedback helps improve the experience for everyone!",

  /////////////////////////////////////////////////////////

  {
    element: "h2",
    textContent: "Legal & Disclaimers",
  },

  "Sonic Robo Blast 2, including its name, characters, and related themes, are trademarks and copyrights of their respective owners. This project is a non-profit, fan-made initiative and is not affiliated with, endorsed by, or representative of SEGA Corporation or Sonic Team.",

  {
    element: "br",
  },

  "This project is strictly for personal, non-commercial use and must not be sold or redistributed for profit. All rights to the original game assets belong to the SRB2 Community and their respective creators.",

  {
    element: "br",
  },

  "By using this launcher, you acknowledge that the developers are not liable for any issues arising from the use of this software and that you are using this fan-port for personal enjoyment only.",

  /////////////////////////////////////////////////////////
];


/***/ },

/***/ 53
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = [
  {
    element: "div",
    className: "launcherMain",
    gid: "launcherMain",
    children: [
      ////////////////////////////////////////////

      ...__webpack_require__(6439),

      ////////////////////////////////////////////

      ...__webpack_require__(9766),
      ...__webpack_require__(4305),
      ...__webpack_require__(7496),
      ...__webpack_require__(5875),

      ////////////////////////////////////////////

      { element: "div", className: "sep" },

      ...__webpack_require__(3022),

      ////////////////////////////////////////////

      { element: "div", className: "sep" },

      {
        element: "div",
        children: __webpack_require__(1713),
      },

      ////////////////////////////////////////////

      { element: "div", className: "sep" },

      {
        element: "div",
        children: __webpack_require__(8752),
        style: {
          marginTop: "20px",
          fontSize: "14px",
          color: "#ffffff",
        },
        gid: "launcherInfo",
      },

      ////////////////////////////////////////////
    ],
  },
];


/***/ },

/***/ 1652
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = [
  {
    element: "div",
    className: "loaderMain",
    gid: "loaderMain",
    children: [
      ////////////////////////////////////////

      ...__webpack_require__(5151),

      ////////////////////////////////////////

      {
        element: "div",
        className: "dontSellText",
        textContent: "THIS GAME SHOULD NOT BE SOLD!",
      },

      ////////////////////////////////////////

      {
        element: "div",
        gid: "loadProgressMain",
        className: "loadProgressMain",
        children: [
          {
            element: "div",
            gid: "loadProgressCurrent",
            className: "loadProgressCurrent"
          },
          {
            element: "span",
            gid: "loadProgressCurrentText",
            className: "loadProgressCurrentText",
          }
        ]
      },

      {
        element: "div",
        gid: "loaderContent",
        textContent: "Loading...",
        style: {
          textAlign: "center",
          fontSize: "20px",
          color: "#ffffff",
        },
      },

      {
        element: "div",
        gid: "loaderCacheWarning",
        hidden: true,
        textContent: "It seems like your cache is having trouble storing the game data. This game may take long to load next time.",
        style: {
          textAlign: "center",
          fontSize: "15px",
          color: "#e3d400",
        },
      },

      ////////////////////////////////////////
    ],
  },
];


/***/ },

/***/ 5151
(module) {

module.exports = [
  {
    element: "img",
    style: {
      width: "300px",
      height: "160px",
      objectFit: "contain",
      imageRendering: "pixelated"
    },
    src: "images/legacylogo.png",
  },
];


/***/ },

/***/ 6495
(module) {

module.exports = [
  {
    element: "div",
    gid: "publicNetgameBrowserContainer",
    className: "publicNetgameBrowserContainer",
    hidden: true,

    children: [
      {
        element: "div",
        gid: "netgameLoadingListsContainer",
        className: "netgameLoadingListsContainer",
        children: [
          {
            element: "img",
            src: "images/loading.gif",
            className: "netgameLoadingListsImg",
          },
          "Loading...",
        ],
      },

      {
        element: "div",
        gid: "publicNetgameBrowser",
        className: "publicNetgameBrowserDialog",
        hidden: true,
        children: [
          {
            element: "div",
            gid: "publicNetgameBrowserLeft",
            className: "publicNetgameBrowserLeft",
          },
          {
            element: "div",
            gid: "publicNetgameBrowserRight",
            className: "publicNetgameBrowserRight",
          },
        ],
      },
    ],
  },
];


/***/ },

/***/ 6439
(module) {

module.exports = [
  {
    element: "img",
    style: {
      width: "100%",
      height: "200px",
      objectFit: "contain",
      imageRendering: "pixelated",
    },
    src: "images/legacylogo.png",
  },
];


/***/ },

/***/ 9766
(module) {

module.exports = [
  {
    element: "button",
    className: "button playButton",
    children: [
      {
        element: "img",
        src: "images/play.svg",
        style: {
          height: "32px",
        },
      },
      {
        element: "span",
        textContent: "Play",
      },
    ],
    gid: "playButton",
  },
];


/***/ },

/***/ 1713
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = [
  /////////////////////////////////////////////////////////

  {
    element: "span",
    className: "sectionHeader",
    textContent: "Relay server configuration:",
  },

  /////////////////////////////////////////////////////////

  //Enable relay server toggle
  {
    element: "div",
    style: {
      display: "flex",
    },
    children: [
      {
        element: "span",
        style: { fontWeight: "bold" },
        textContent: "Enable relay server:",
      },
      {
        element: "input",
        type: "checkbox",
        gid: "relayServerCheckbox",
      },
    ],
  },

  /////////////////////////////////////////////////////////

  {
    element: "button",
    className: "button",
    gid: "addRelayButton",
    textContent: "Add relay server",
  },

  /////////////////////////////////////////////////////////

  {
    element: "button",
    className: "button",
    gid: "browsePublicGames",
    textContent: "Browse public netgames",
  },

  /////////////////////////////////////////////////////////

  //Relay configuration, options are rendered in relayconfig.js

  {
    element: "div",
    gid: "relayConfig",
    className: "relayConfig",
  },

  /////////////////////////////////////////////////////////

  {
    element: "button",
    className: "button",
    gid: "addDefaultServers",
    textContent: "Add default servers",
  },

  /////////////////////////////////////////////////////////

  //Useful details for relay servers
  ...__webpack_require__(3313),
];


/***/ },

/***/ 3313
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = [
  {
    element: "div",
    style: {
      lineHeight: "1.6", // Increased slightly for better readability
    },
    children: [
      /////////////////////////////////////////////////////////

      {
        element: "h2",
        textContent: "What is a Relay Server?",
      },
      "Relay servers act as a bridge between players, simulating port-forwarding so you can host and join games without modifying your router settings. This bypasses the need for complex network configurations.",
      {
        element: "br",
      },
      "Performance is determined by the connection protocol (WebRTC or WebSocket), the host's game stability, and your overall internet speed.",

      /////////////////////////////////////////////////////////

      {
        element: "h2",
        textContent: "Connection Troubleshooting",
      },
      'To begin, click "Use this server" next to an active relay. If you experience issues connecting, use the "Add default servers" button to refresh the available list.',
      {
        element: "br",
      },
      'Note: Our default relays are hosted on free-tier services. They may take 15–30 seconds to "spin up" if they haven\'t been used recently.',
      {
        element: "br",
      },
      "Pro Tip: Enabling WebRTC in the settings offers significantly lower latency. This is a host-side setting; clients will automatically switch to WebRTC if the host supports it.",

      /////////////////////////////////////////////////////////

      {
        element: "h2",
        textContent: "Project Source Code",
      },

      {
        element: "a",
        href: "https://github.com/gvbvdxxalt2/SRB2Web-Relay/",
        target: "_blank",
        textContent: "SRB2web Relay Server Source",
      },
      {
        element: "br",
      },
      {
        element: "a",
        href: "https://github.com/gvbvdxxalt2/SRB2LegacyWeb/",
        target: "_blank",
        textContent: "SRB2LegacyWeb Main Repository",
      },
      {
        element: "br",
      },

      /////////////////////////////////////////////////////////

      ...__webpack_require__(518),
    ],
  },
];


/***/ },

/***/ 518
(module, __unused_webpack_exports, __webpack_require__) {

var RelayOption = __webpack_require__(9153);

module.exports = [
  {
    element: "h2",
    textContent: "Status details",
  },

  {
    element: "li",
    children: [
      {
        element: "img",
        className: "relayStatusImg",
        src: RelayOption.FETCHING_IMG,
      },
      {
        element: "span",
        textContent: " - Fetching: Attempting to connect to the server.",
      },
    ],
  },
  {
    element: "li",
    children: [
      {
        element: "img",
        className: "relayStatusImg",
        src: RelayOption.ONLINE_IMG,
      },
      {
        element: "span",
        textContent: " - Online: The server is active and ready to go!",
      },
    ],
  },
  {
    element: "li",
    children: [
      {
        element: "img",
        className: "relayStatusImg",
        src: RelayOption.OFFLINE_IMG,
      },
      {
        element: "span",
        textContent:
          " - Offline: The server is offline, unreachable, or blocked.",
      },
    ],
  },
  {
    element: "li",
    children: [
      {
        element: "img",
        className: "relayStatusImg",
        src: RelayOption.OUTDATED_IMG,
      },
      {
        element: "span",
        textContent:
          " - Outdated: The relay server is running an older version protocol. It may not be compatible with the current launcher.",
      },
    ],
  },
];


/***/ },

/***/ 4682
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = [
  ...__webpack_require__(3694),
  {
    element: "style",
    textContent: __webpack_require__(492),
  },
  {
    element: "style",
    textContent: "[hidden] { display: none !important; }",
  },
];


/***/ },

/***/ 5875
(module) {

function retSwitchGameButton(name, icon, link) {
  return {
    element: "a",
    className: "button switchGameButton",
    href: link,
    target: "_blank",
    children: [
      {
        element: "img",
        src: icon,
        style: {
          height: "32px",
        },
      },
      {
        element: "span",
        textContent: `Switch to ${name}`,
      },
    ],
  };
}

module.exports = [
  //Comment the current port out, keep the others uncommented.
  //Allows for quick switching between ports (nobody wants to dig through links).

  retSwitchGameButton("SRB2 Web", "images/ports/srb2web.png", "https://srb2web.gvbvdxx.me"),
  retSwitchGameButton("SRB2Kart Web", "images/ports/kartweb.png", "https://kartweb.gvbvdxx.me"),
  //retSwitchGameButton("SRB2Legacy Web", "images/ports/legacyweb.png", "https://legacyweb.gvbvdxx.me"),
];


/***/ },

/***/ 8364
(module) {

var editSpacing = {element: "div",className: "touchControlsEditButtonsSpacing"};

////////////////////////////////////////////////////////////////////////////////

var content = [
    ///////////////////////////////////////
    //Title and tips.
    {
        element: "span",
        className: "touchControlsDialogTitle",
        textContent: "Customize Touch Controls",
    },
    {
        element: "span",
        className: "touchControlsDialogTip",
        textContent: "You can't move touch controls without a touch screen, sorry!",
    },
    {
        element: "span",
        className: "touchControlsDialogTip2",
        textContent: "To move a control, just drag and drop it anywhere on the screen. To edit or delete a control, just tap on it.",
    },

    ///////////////////////////////////////
    //Buttons to customize touch controls.
    {
        element: "div",
        className: "touchControlDialogEditButtons",
        children: [
            ////////////////////
            //Close button.
            //Needs to be clickable on non-touch devices so you don't get softlocked on to this screen.
            {
                element: "div",
                className: "touchControlsDialogButton touchControlsDialogRedButton",
                textContent: "Close",
                gid: "touchControlsClose",
            },editSpacing,
            ////////////////////
            //Add button and dropdown.
            {
                element: "div",
                className: "touchControlsAddDropdownContainer",
                children: [
                    {
                        element: "div",
                        className: "touchControlsAddDropdown",
                        gid: "touchControlsAddDropdown",
                        hidden: true,
                    },
                ]
            },
            {
                element: "div",
                className: "touchControlsDialogButton",
                gid: "touchControlsAdd",
                children: [
                    {
                        element: "span",
                        textContent: "Add control"
                    }
                ]
            },editSpacing,
            ////////////////////
            //Reset button.
            {
                element: "div",
                className: "touchControlsDialogButton touchControlsDialogRedButton",
                textContent: "Reset",
                gid: "touchControlsReset"
            },editSpacing,
            ////////////////////
            //Save button.
            {
                element: "div",
                className: "touchControlsDialogButton",
                textContent: "Save",
                gid: "touchControlsSave"
            },editSpacing,
            ////////////////////
        ]
    },

    ///////////////////////////////////////
];

module.exports = [
    {
        element: "div",
        className: "touchControlsContent",
        children: content,
    }
];

/***/ },

/***/ 8515
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = [
    ////////////////////////////////////////////
    //The dialog used to customize touch controls.

    {
        element: "div",
        gid: "touchControlsDialog",
        hidden: true,
        children: [
            {
                element: "div",
                className: "blackDialogBG",
            },
            {
                element: "div",
                className: "touchControlsDialog",
                children: [
                    ...__webpack_require__(8364)
                ]
            }
        ]
    },

    ////////////////////////////////////////////
    // JavaScript would fill this in with the touch controls.

    {
        element: "div",
        gid: "touchControlsContainer",
        className: "touchControlsContainer",
        hidden: true,
    },

    ////////////////////////////////////////////
];

/***/ },

/***/ 4954
() {

(function () {

    function fallbackOverride() {
        window.requestAnimationFrame = (c) => {
            return setTimeout(c,1);
        };
        window.cancelAnimationFrame = clearTimeout;
    }

    if (!window.Worker) {
        fallbackOverride();
        return;
    }

    var workerCode = `
    var started = false;
    self.onmessage = function(e) {
        if (e.data === 'start') {
            if (started) { return; }
            started = true;
            setInterval(() => {
                self.postMessage('tick');
            },1);
        }
    };
    `;

    try{
        //Thing so that it isn't extremely laggy when switching tabs and running netgames.

        var blob = new Blob([workerCode], { type: 'application/javascript' });
        var workerUrl = URL.createObjectURL(blob);
        var worker = new Worker(workerUrl);

        var requestFrames = {};

        worker.onmessage = (e) => {
        if (e.data == "tick") {
            for (var key of Object.keys(requestFrames)) {
                requestFrames[key]();
                delete requestFrames[key];
            }
        }
        };
        worker.postMessage('start');

        window.requestAnimationFrame = (callback = () => {}) => {
            var f = function () {
                callback();
            };
            var id = 1;
            while (requestFrames[id]) {
                id += 1;
            }
            requestFrames[id] = f;
            return id;
        };

        window.cancelAnimationFrame = (id) => {
            if (typeof id !== "number") {
                return;
            }
            delete requestFrames[id];
        };

    }catch(e){
        fallbackOverride();
        return;
    }

    setTimeout(() => {
        URL.revokeObjectURL(workerUrl);
    },10);
})();

/***/ },

/***/ 7063
(module, __unused_webpack_exports, __webpack_require__) {

var elements = __webpack_require__(5100);
if (window["Module"]) {
  var Module = window["Module"];
}
var dialog = __webpack_require__(5925);
var IDBFS = null;
var gameCanvas = elements.getGPId("gameCanvas");
var didStart = false;
var beforeUnloadQuit = false; //Becomes true if the game is quitting because of before unload event.
var loaderContent = elements.getGPId("loaderContent");
var serverOpts = null;
var launcherMain = elements.getGPId("launcherMain");
var loaderMain = elements.getGPId("loaderMain");
var resolutionChangeMethod = "safe";

var loadProgressMain = elements.getGPId("loadProgressMain");
var loadProgressCurrent = elements.getGPId("loadProgressCurrent");
var loadProgressCurrentText = elements.getGPId("loadProgressCurrentText");
var loaderCacheWarning = elements.getGPId("loaderCacheWarning");
loadProgressMain.hidden = true;
loaderCacheWarning.hidden = true;

const {ASSET_LIST, CACHE_NAME} = __webpack_require__(8140);

var gameResolutionWidth = 0;
var gameResolutionHeight = 0;

var connectAddr = null;

var Touch = __webpack_require__(2229);
var touchState = Touch.state;
var {startupTouchControls} = Touch;

function isErrno44(err) {
  return !!err && Number(err.errno) === 44;
}

function safeSymlink(targetPath, linkPath) {
  try {
    if (!FS.analyzePath(linkPath).exists) {
      FS.symlink(targetPath, linkPath);
    }
  } catch (err) {
    if (!FS.analyzePath(linkPath).exists) {
      console.warn("Symlink setup failed:", linkPath, err);
    }
  }
}

function ensureUserDataTree() {
  FS.mkdirTree("/home/web_user/.srb2_21/addons");
  FS.mkdirTree("/home/web_user/.srb2_21/logs");
  FS.mkdirTree("/addons");
  safeSymlink("/home/web_user/.srb2_21", "/addons/.srb2_21");
  safeSymlink("/home/web_user/.srb2_21", "/addons/userdata");
}

async function keepAlive() {
  if (navigator.requestWakeLock) {
    await navigator.requestWakeLock("screen");
  }

  if (navigator.locks) {
    navigator.locks.request(
      "srb2_game_running",
      { mode: "exclusive" },
      async () => {
        return await new Promise((resolve) => {});
      },
    );
  }
}

function enableStartServer(dedicated = false) {
  serverOpts = {
    dedicated: !!dedicated,
  };
}

function disableStartServer() {
  serverOpts = null;
}

function loadScript() {
  return new Promise((resolve, reject) => {
    loaderContent.textContent = "Loading game script...";
    var script = document.createElement("script");
    script.src = "srb2legacy.js?n=1&v=" + Date.now();
    script.onload = resolve;
    script.onerror = reject;
    document.body.append(script);
  });
}

async function downloadAndSaveAssets() {
  var cache = await caches.open(CACHE_NAME);
  var assetCount = 0;
  var assetLength = ASSET_LIST.length;

  for (var asset of ASSET_LIST) {

    //Why not show the user how many resources are needed and currently finished?
    loaderContent.textContent = `[${assetCount+1}/${assetLength} resources]`;

    var response = await cache.match(asset.url);
    var didCache = false;

    if (response) {
      didCache = true;
    } else {
      try {
        const request = new Request(asset.url);
        loadProgressMain.hidden = false;
        loadProgressCurrentText.textContent = "Requesting resource...";
        loadProgressCurrent.style.width = "0%";
        const networkResponse = await fetch(request);

        if (!networkResponse.ok) {
          throw new Error(
            `Server returned ${networkResponse.status} ${networkResponse.statusText} for file: ${asset.url}`,
          );
        }

        response = networkResponse;

      } catch (err) {
        console.error(`FATAL ERROR: Could not load ${asset.url}`);
        loaderContent.textContent = `ERROR: ${err.message}`;
        loadProgressMain.hidden = true;
        throw err;
      }
    }

    var buffer = null;
    if (!didCache) {
      var contentLength = response.headers.get('content-length');
      var total = contentLength ? parseInt(contentLength, 10) : 0;
      var reader = response.body.getReader();
      var loaded = 0;

      if (total == 0) {
        loadProgressMain.hidden = true;
      }

      function updatePercent() {
        var percent = total ? (loaded / total) * 100 : 0;
        if (percent < 0) {
          percent = 0; //Somehow going to negatives? Just cap it anyways.
        }
        if (percent > 100) {
          percent = 100; //Why are we going past 100%? Just cap it anyways.
        }
        loadProgressCurrent.style.width = percent + "%";
        loadProgressCurrentText.textContent = `Downloading "${asset.filename}"... (${percent.toFixed(1)}%)`;
      }

      updatePercent();

      var stream = new ReadableStream({
        async start(controller) {
          while (true) {

            updatePercent();

            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            loaded += value.byteLength;
            updatePercent();

            controller.enqueue(value);
          }
        }
      });

      var trackedResponse = new Response(stream, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      });

      var cachePromise = cache.put(asset.url, trackedResponse.clone()).catch((e) => {
        loaderCacheWarning.hidden = false;
        console.warn(`Unable to put in cache: ${e}`);
      });

      buffer = await trackedResponse.arrayBuffer();

      loadProgressCurrentText.textContent = `Waiting for "${asset.filename}" cache...`;
      
      try{
      await cachePromise;
      }catch(e){}
    } else {
      loadProgressCurrentText.textContent = `Pulling "${asset.filename}" from cache...`;
      buffer = await response.arrayBuffer();
    }
    var data = new Uint8Array(buffer);

    //This is probably sync so it won't display but whatever.
    loadProgressCurrentText.textContent = `Attaching resource "${asset.filename}"...`;
    FS.writeFile(asset.filename, data);
    
    loadProgressMain.hidden = true;

    assetCount += 1;
  }
}

const RUNNING_CHECK_NAME = "srb2web_running_check";

async function initGame() {
  IDBFS = FS.filesystems.IDBFS;

  await downloadAndSaveAssets();

  loaderContent.textContent = "SRB2 Legacy is starting...";

  keepAlive(); // Try to keep the screen awake while playing

  ensureUserDataTree();
  console.log(IDBFS,FS);
  FS.mount(IDBFS, {}, "/home/web_user");
  FS.syncfs(true, (err) => {
    if (err) {
      if (isErrno44(err)) {
        console.warn("Recoverable SyncFS hydration error:", err);
        try {
          ensureUserDataTree();
        } catch (recoverErr) {
          console.error("Failed to recover filesystem paths:", recoverErr);
        }
      } else {
        console.error("SyncFS hydration failed:", err);
      }
    }

    console.log("SyncFS done", err);

    //Give some breathing room for the sync to complete before starting the game, seems to help with stability on some browsers.
    setTimeout(() => {
      Module.callMain(["-home", "/home/web_user"].concat(Module.arguments));
    },500);
  });
}

var GetViewportWidth = () => {
  return Math.round(document.documentElement.clientWidth);
};

var GetViewportHeight = () => {
  return Math.round(document.documentElement.clientHeight);
};

function getTargetSize(x, y) {
  // Use devicePixelRatio to fix the "tiny box in the corner" issue
  const dpr = window.devicePixelRatio || 1;
  const targetX = Math.floor((x || GetViewportWidth()) * dpr);
  const targetY = Math.floor((y || GetViewportHeight()) * dpr);

  gameCanvas.width = targetX;
  gameCanvas.height = targetY;

  // Match the CSS size to the viewport size
  gameCanvas.style.width = targetX / dpr + "px";
  gameCanvas.style.height = targetY / dpr + "px";

  return { targetX, targetY };
}

window.ChangeResolution = (x, y) => {
  if (didStart) {
    if (typeof x === "undefined") x = GetViewportWidth();
    if (typeof y === "undefined") y = GetViewportHeight();
    gameCanvas.width = x;
    gameCanvas.height = y;
    gameCanvas.style.width = x + "px";
    gameCanvas.style.height = y + "px";
    Module.ccall("change_resolution_"+resolutionChangeMethod, "number", ["number", "number"], [x, y]);
  }
};

async function startGame(options = {}) {
  loaderMain.hidden = false;
  launcherMain.hidden = true;
  var { targetX, targetY } = getTargetSize();

  Module.arguments = [];
  if (serverOpts) {
    Module.arguments.push("-server");
    if (serverOpts.dedicated) {
      Module.arguments.push("-dedicated");
    }
  }
  if (options) {
    if (options.host) {
      Module.arguments.push("-server");
    }
    if (options.joinURL) {
      Module.arguments.push("-connect");
      Module.arguments.push(options.joinURL);
    }
    if (options.resolutionChangeMethod) {
      resolutionChangeMethod = options.resolutionChangeMethod;
    }
  }

  Module.noInitialRun = true;
  Module.print = console.log;
  Module.printErr = console.log;
  Module.canvas = gameCanvas;
  Module.onRuntimeInitialized = initGame;
  Module.pauseOnVisibilityChange = false;
  Module.onExit = function () {
    if (beforeUnloadQuit) {
      return;
    }
    window.location.reload();
  };
  Module.onAbort = function(what) {
    console.error('--- WASM CRASH DETECTED ---');
    console.error('Abort reason:', what);
    console.error('Callstack:', new Error().stack);
  };

  try {
    await loadScript();
  } catch (e) {
    dialog.alert(
      "Error loading the game, look in the console for full error. \n" + e,
    );
    console.error("SRB2 Legacy Load error: ", e);
    return;
  }
}

window.SRB2HandleVideoResolution = function (width,height) {
  //We pass the resolution into variables because we need this to accurately calculate mouse movements.
  gameResolutionWidth = width;
  gameResolutionHeight = height;
};

window.StartedMainLoopCallback = function () {
  didStart = true;
  gameCanvas.hidden = false;
  window.ChangeResolution();

  gameCanvas.addEventListener("click", () => {
    LockMouse();
  });

  document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement === gameCanvas) {
      Module.ccall("SRB2_AddMouseDelta", "void", ["number", "number"], [
        Math.round(e.movementX),
        Math.round(e.movementY),
      ]);
    }
  });

  startupTouchControls();

  var isSyncing = false;
  setInterval(() => {
    if (!isSyncing) {
      isSyncing = true;
      FS.syncfs(false, (err) => {
        if (err) {
          if (isErrno44(err)) {
            try {
              ensureUserDataTree();
            } catch (recoverErr) {
              console.error("Failed to recover filesystem paths:", recoverErr);
            }
          } else {
            console.warn("Background SyncFS error:", err);
          }
        }
        isSyncing = false;
      });
    }
    localStorage.setItem(RUNNING_CHECK_NAME, Date.now());
  }, 600);
};

window.addEventListener("resize", () => {
  window.ChangeResolution();
});

var LockMouse = () => {
  if (touchState.ingameTouch) {
    return;
  }
  if (didStart) {
    Module.ccall("lock_mouse", null, [], []);
    gameCanvas.focus();
    if (gameCanvas.requestPointerLock) {
      try {
        gameCanvas.requestPointerLock().catch((e) => {});
      } catch (e) {
        console.warn("Mouse lock request failed: ", e);
      }
    }
  }
};

var UnlockMouse = (force = false) => {
  if (touchState.ingameTouch) {
    return;
  }
  if (didStart) {
    if (force && document.pointerLockElement)
      document.exitPointerLock(); // this method should fire again, so don't unlock_mouse right now
    else if (!document.pointerLockElement)
      Module.ccall("unlock_mouse", null, [], []);
  }
};

touchState.UnlockMouse = UnlockMouse;

var CaptureFullscreenKey = (e) => {
  // Let F11 do fullscreen
  if (e instanceof KeyboardEvent && e.key === "F11") e.stopPropagation();
};

window.addEventListener("mousedown", LockMouse, false);
document.addEventListener("pointerlockchange", (_) => UnlockMouse(), false);
document.addEventListener(
  "mousedown",
  (e) => {
    if (document.pointerLockElement === gameCanvas) {
      Module.ccall("mouse_button_down", "void", ["number"], [e.button]);
      e.preventDefault();
    }
  },
  true,
);
document.addEventListener(
  "mouseup",
  (e) => {
    if (document.pointerLockElement === gameCanvas) {
      Module.ccall("mouse_button_up", "void", ["number"], [e.button]);
      e.preventDefault();
    }
  },
  true,
);
document.addEventListener(
  "wheel",
  (e) => {
    if (document.pointerLockElement === gameCanvas) {
      Module.ccall(
        "mouse_wheel_xy",
        "void",
        ["number", "number"],
        [Math.round(e.deltaX), Math.round(e.deltaY)],
      );
      e.preventDefault();
    }
  },
  true,
);
var mouseMoveX = 0;
var mouseMoveY = 0;
setInterval(() => {
  if (didStart) {
    if (gameResolutionWidth > 0 && gameResolutionHeight > 0) {
      var scaleX = gameResolutionWidth / gameCanvas.clientWidth;
      var scaleY = gameResolutionHeight / gameCanvas.clientHeight;
      var finalX = mouseMoveX * scaleX;
      var finalY = mouseMoveY * scaleY;
      Module.ccall(
        "SRB2_AddMouseDelta",
        "void",
        ["number", "number"],
        [finalX, finalY],
      );
      mouseMoveX = 0;
      mouseMoveY = 0;
    }
  }
}, 1000 / 55);
window.addEventListener(
  "load",
  (_) => {
    document.addEventListener("keydown", CaptureFullscreenKey, true);
    document.addEventListener("keyup", CaptureFullscreenKey, true);
    document.addEventListener("keypress", CaptureFullscreenKey, true);
  },
  { once: true },
);

var touches = [];

gameCanvas.addEventListener("touchstart", function (e) {
    if (!didStart) {
        return;
    }
    for (var touch of e.changedTouches) {
        if (!touches.find(t => t.id == touch.identifier)) {
            touches.push({
                id: touch.identifier,
                rid: Math.random() + "_" + Date.now(),
                clientX: touch.clientX,
                clientY: touch.clientY,
                radiusX: touch.radiusX,
                radiusY: touch.radiusY,
                top: touch.clientY,
                left: touch.clientX,
                width: touch.radiusX < 2 ? 2 : touch.radiusX,
                height: touch.radiusY < 2 ? 2 : touch.radiusY,
                touching: true
            });
        }
    }
    e.preventDefault();
}, { passive: false });
gameCanvas.addEventListener("touchmove", function (e) {
    if (!didStart) {
        return;
    }
    for (var touch of e.changedTouches) {
        var t = touches.find(t => t.id == touch.identifier);
        if (t) {
            var movementX = touch.clientX - t.clientX;
            var movementY = touch.clientY - t.clientY;
            t.clientX = touch.clientX;
            t.clientY = touch.clientY;
            t.radiusX = touch.radiusX;
            t.radiusY = touch.radiusY;
            t.left = touch.clientX;
            t.top = touch.clientY;
            t.width = touch.radiusX < 2 ? 2 : touch.radiusX;
            t.height = touch.radiusY < 2 ? 2 : touch.radiusY;

            mouseMoveX += movementX*5;
            mouseMoveY += movementY*5;
        }
    }
    e.preventDefault();
}, { passive: false });
gameCanvas.addEventListener("touchend", function (e) {
    if (!didStart) {
        return;
    }
    for (var touch of e.changedTouches) {
        var t = touches.find(t => t.id == touch.identifier);
        if (t) {
            t.touching = false;
            touches = touches.filter(t => t.id !== touch.identifier);
        }
    }
    e.preventDefault();
}, { passive: false });

/*
School computer debugging stuff here
var textarea = document.createElement("textarea");
textarea.style.width = "300px";
textarea.style.height = "300px";
textarea.style.background = "rgba(0,0,0,0.5)";
textarea.style.color = "green";
textarea.style.top = "0";
textarea.style.left = "0";
textarea.style.position = "fixed";
document.body.append(textarea);

async function debugTextDiv(...content) {
  textarea.textContent += content.join(" ") + "\n";
}
window.debugTextDiv = debugTextDiv;*/

window.addEventListener('error', (event) => {
  if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT')) {
    console.error('Resource failed to load:', event.target);
    return;
  }

  const errorObj = event.error;
  const stackTrace = errorObj && errorObj.stack ? errorObj.stack : null;

  const errorData = {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: stackTrace
  };

  console.error('Captured JS Error:', errorData);

  dialog.alert(`Uncaught JS Error: ${event.message}\n\nStack Trace:\n${stackTrace || 'No stack available'}`);
}, true);

window.addEventListener("beforeunload", () => {
  if (didStart) {
    beforeUnloadQuit = true;
    //Module.ccall("SRB2_BeforeUnloadHandler", "void", [], []);
  }
});

module.exports = { startGame, ...void (enableStartServer), ...void (disableStartServer) };


/***/ },

/***/ 8769
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

if (!window["Module"]) {
  window["Module"] = {};
}

var elements = __webpack_require__(5100);
elements.appendElementsFromJSON(document.body, __webpack_require__(7255));

var gameCanvas = elements.getGPId("gameCanvas");
var launcherMain = elements.getGPId("launcherMain");
var loaderMain = elements.getGPId("loaderMain");
var dialog = __webpack_require__(5925);

gameCanvas.hidden = true;
loaderMain.hidden = true;
launcherMain.hidden = false;

var playButton = elements.getGPId("playButton");
var touchConfigureButton = elements.getGPId("configureTouchControlsButton");
var { startTouchCustomization } = __webpack_require__(2229);
var { startGame } = __webpack_require__(7063);

var { getDisplayOptions } = __webpack_require__(1973);

playButton.addEventListener("click", function () {
  startGame(getDisplayOptions());
});
touchConfigureButton.addEventListener("click", function () {
  startTouchCustomization();
});

__webpack_require__(1618);

__webpack_require__(4954);

//var relay = require("./oldnet");
//var relayURL = "wss://rczylh-3000.csb.app/";
//var relayConnect = new relay.SRB2Relay(relayURL);


/***/ },

/***/ 2052
(module, __unused_webpack_exports, __webpack_require__) {

var attach = {};
var Module = {};
if (window["Module"]) {
  var Module = window["Module"];
}

var fflate = __webpack_require__(595);

class SRB2WebNet {
  static InitNetwork() {
    if (attach.oninit) {
      attach.oninit();
    }
    return 0;
  }

  static ConnectTo(address, port) {
    if (attach.onconnect) {
      attach.onconnect(address, port);
    }
    return 0;
  }

  static SendPacket(node_id, data_ptr, length) {
    if (attach.onpacket) {
      var uncompressedData = new Uint8Array(Module.HEAPU8.buffer, data_ptr, length);
      var compressedData = fflate.zlibSync(uncompressedData, { level: 1 });
      attach.onpacket(compressedData, node_id);
    }
    return 0;
  }

  static ListenOn(port) {
    if (attach.onlisten) {
      attach.onlisten(port);
    }
    return 0;
  }

  static CloseSocket() {
    if (attach.onclose) {
      attach.onclose();
    }
    return 0;
  }
}
window.SRB2WebNet = SRB2WebNet;

// Pre-allocate these outside the function to avoid GC hits
var SRB2_Receive = null;
var receiveBufferPtr = null; 
attach.emitPacket = function (data, id, ip) {
  var decompressedData = fflate.unzlibSync(data);
  if (!SRB2_Receive) {
    SRB2_Receive = Module.cwrap("SRB2_NetworkReceive", "void", ["number", "number", "number", "string"]);
  }
  if (!receiveBufferPtr) {
    receiveBufferPtr = Module._malloc(2048);
  }
  Module.HEAPU8.set(decompressedData, receiveBufferPtr);
  SRB2_Receive(receiveBufferPtr, decompressedData.length, +id || 0, ip);
};

attach.emitClose = function (id) {
  try {
    Module.ccall("SRB2_NetworkClosed", "null", ["number"], [id || 0]);
  } catch (e) {}
};

attach.logInSRB2 = function (msg) {
  try {
    if (!Module.ccall) {
      return;
    }
    Module.ccall("SRB2_LOG", "void", ["string"], [msg + "\n"]);
  } catch (e) {}
};

var pendingServerInfoResponses = [];

window.SRB2_ServerInfoResponse = function (info) {
  for (var func of pendingServerInfoResponses) {
    func(info);
  }
};

attach.getServerInfo = function () {
  return new Promise((resolve, reject) => {
    pendingServerInfoResponses.push(resolve);
    try {
      Module.ccall("SRB2_GetServerInfo", "void", [], []);
    } catch (e) {}
  });
};

module.exports = attach;


/***/ },

/***/ 1509
(module, __unused_webpack_exports, __webpack_require__) {

var { ConnectState, ListenState } = __webpack_require__(9391);
var attachSRB2 = __webpack_require__(2052);
var dialog = __webpack_require__(5925);

var enabled = false;
var publicEnabled = false;
var host = "";
var curState = null;

attachSRB2.onconnect = function (address, port) {
  if (!enabled) {
    return;
  }
  if (curState) {
    curState.dispose();
  }
  curState = new ConnectState(host, { address, port });
};

attachSRB2.onlisten = function () {
  if (!enabled) {
    return;
  }
  if (curState) {
    curState.dispose();
  }
  curState = new ListenState(host, publicEnabled);
};

attachSRB2.onclose = function () {
  if (curState) {
    curState.dispose();
  }
  curState = null;
};

function enable(h) {
  if (curState) {
    curState.dispose();
    curState = null;
  }
  enabled = true;
  host = h;
}

function enablePublic() {
  publicEnabled = true;
}

function disable() {
  if (curState) {
    curState.dispose();
    curState = null;
  }
  enabled = false;
  host = null;
}

function disablePublic() {
  publicEnabled = false;
}

async function listPublicGames() {
  if (!enabled) {
    throw new Error(`Relay server is disabled`);
    // removed by dead control flow

  }
  if (!host) {
    throw new Error(`No host provided`);
    // removed by dead control flow

  }
  try {
    var response = await fetch(`https://${host}/public`);
    if (!response.ok) {
      throw new Error(`Got Non-OK response: ${response.status}`);
    }
  } catch (e) {
    console.warn(
      "Failed to fetch public games through https, trying http. Error message:",
      e,
    );
    try {
      var response = await fetch(`http://${host}/public`);
      if (!response.ok) {
        console.warn(
          "Failed to fetch public games, response not ok. Status:",
          response.status,
        );
        throw new Error(`Got Non-OK response: ${response.status}`);
        // removed by dead control flow

      }
    } catch (e) {
      throw e;
      // removed by dead control flow

    }
  }
  var publicNetgames = await response.json();

  return publicNetgames;
}

async function countPublicGames() {
  if (!enabled) {
    throw new Error(`Relay server is disabled`);
    // removed by dead control flow

  }
  if (!host) {
    throw new Error(`No host provided`);
    // removed by dead control flow

  }
  try {
    var response = await fetch(`https://${host}/countpublic`);
    if (!response.ok) {
      throw new Error(`Got Non-OK response: ${response.status}`);
    }
  } catch (e) {
    console.warn(
      "Failed to fetch public games through https, trying http. Error message:",
      e,
    );
    try {
      var response = await fetch(`http://${host}/countpublic`);
      if (!response.ok) {
        console.warn(
          "Failed to fetch public games, response not ok. Status:",
          response.status,
        );
        throw new Error(`Got Non-OK response: ${response.status}`);
        // removed by dead control flow

      }
    } catch (e) {
      throw e;
      // removed by dead control flow

    }
  }
  var countInfo = await response.json();

  return countInfo.count;
}

var isAlerting = false;
document.addEventListener("visibilitychange", (e) => {
  if (document.visibilityState == "hidden") {
    if (!curState) {
      return;
    }

    if (isAlerting) { //Don't stack multiple alerts if the user keeps switching back and forth.
      return;
    }
    if (curState.listen) {
      var promise = dialog.alert("Warning: Switching off this page can cause connection problems on other players, to avoid this, please move the tab onto a portion of your desktop thats always visible.");
      isAlerting = true;
      promise.then(() => {
        isAlerting = false;
      });
    }
    if (curState.connect) {
      var promise = dialog.alert("Warning: Switching off this page can cause connection problems, to avoid this, please move the tab onto a portion of your desktop thats always visible.");
      isAlerting = true;
      promise.then(() => {
        isAlerting = false;
      });
    }
  }
});

module.exports = {
  enable,
  disable,
  enablePublic,
  disablePublic,
  listPublicGames,
  countPublicGames,
};


/***/ },

/***/ 1133
(module, __unused_webpack_exports, __webpack_require__) {

var { getWebsocketURL, getHttpURL, PLACEHOLDER_IP } = __webpack_require__(3615);
var ErrorCodes = __webpack_require__(4888);
var attachSRB2 = __webpack_require__(2052);
var peer = __webpack_require__(1770);

class ConnectState {
  static createConnectURL(wsHost, { address, port }) {
    var connectURL = (address || '').trim();

    if (connectURL.includes(':') && !connectURL.startsWith('[')) {
      connectURL = `[${connectURL}]`;
    }

    if (port) {
      connectURL += ":" + port;
    } else {
      connectURL += ":5029";
    }

    return `${getWebsocketURL(wsHost)}connect/${encodeURIComponent(connectURL.trim())}`;
  }

  constructor(wsHost, { address, port }) {
    this.connect = true;
    this.address = address;
    this.port = port;

    this.wsHost = wsHost;
    this.disposed = false;
    this.isOpen = false;
    this.socketOpen = false;
    this.peer = null;
    this.socket = null;
    this.rtcConfig = null;
    this.initWebsocket();
  }

  initWebsocket() {
    var { wsHost, address, port } = this;
    var _this = this;
    var connectURL = ConnectState.createConnectURL(wsHost, { address, port });
    this.url = connectURL;
    console.log(`[Relay ConnectState]: Attempting to connect to ${connectURL}`);

    if (this.peer) {
      try{
        this.peer.destroy();
      }catch(e){}
      this.peer = null;
    }
    this.isOpen = false;
    this.socketOpen = false;
    this.initialQueue = [];

    var socket = new WebSocket(connectURL);

    socket.onclose = function (event) {
      _this.socketOpen = false;
      var code = event.code;
      if (code == ErrorCodes.NETGAME_NOT_FOUND) {
        console.warn(`[Relay ConnectState]: Connection not found, not retrying.`);
        return;
      }
      if (!_this.isOpen) {
        console.warn(
          `[Relay ConnectState]: Disconnected unexpectedly, reconnecting...`,
        );
        socket.onmessage = () => {};
        setTimeout(() => {
          if (_this.disposed) {
            return;
          }
          _this.initWebsocket();
        },500);
      }
    };
    socket.binaryType = "arraybuffer";
    socket.onopen = this.handleOpen.bind(this);
    this.socket = socket;
  }

  peerSetup(rtcConfig) {
    var _this = this;
    this.rtcConfig = rtcConfig;
    this.peer = new peer({
      initiator: false,
      trickle: true,
      config: this.rtcConfig,
      channelConfig: {
        ordered: false,          // Do NOT wait for missing packets
        maxRetransmits: 0,       // Do NOT try to resend lost packets
        priority: 'high'         // Hints to the browser to prioritize this traffic
      }
    });
    this.peer.on("error", () => {});
    this.peer.on("signal", (data) => {
      if (!_this.socketOpen) {
        return;
      }
      _this.socket.send(JSON.stringify({
        signal: data
      }));
    });
    this.peer.on("connect", () => {
      _this.isOpen = true;
      _this.socket.close();
      for (var msg of _this.initialQueue) {
        _this.peer.send(msg);
      }
      _this.initialQueue = [];
      console.log(`[Relay ConnectState]: Peer connection established.`);
    });
    this.peer.on("close", () => {
      if (!_this.isOpen) {
        _this.isOpen = false;
        console.warn(
          `[Relay ConnectState]: Peer connection closed without completing handshake, retrying handshake...`,
        );
        if (_this.socket) {
          _this.socket.onmessage = () => {};
          _this.socket.onclose = () => {};
          try{
            _this.socket.close();
          } catch (e) {}
        }
        setTimeout(() => {
          if (_this.disposed) {
            return;
          }
          _this.initWebsocket();
        },500);
        return;
      }
      _this.isOpen = false;
      console.log(`[Relay ConnectState]: Peer connection closed.`);
    });
    this.peer.on("data", (data) => { //send straight to SRB2.
      attachSRB2.emitPacket(data, 0, PLACEHOLDER_IP);
    });
  }

  handleOpen() {
    var _this = this;
    var { socket } = this;
    this.isOpen = false;
    this.socketOpen = true;
    console.log(
      `[Relay ConnectState]: Websocket connection established. Waiting for WebRTC handshake to complete...`,
    );
    socket.onmessage = function (event) {
      if (event.data instanceof ArrayBuffer) {
        try{
          socket.close();
        }catch(e){}
        return;
      } else {

        var json = JSON.parse(event.data);
        if (json.rtcConfig) {
          _this.peerSetup(json.rtcConfig);
        }
        if (json.signal && _this.peer) {
          _this.peer.signal(json.signal);
        }

      }
    };

    attachSRB2.onpacket = this.handleSRB2Packet.bind(this);
  }

  handleSRB2Packet(data) {
    if (this.isOpen) {
      try {
        this.peer.send(data);
      } catch (e) {}
      return;
    } else {
      this.initialQueue.push(data);
    }
  }

  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      if (this.socket) {
        this.socket.onclose = () => {};
        this.socket.close();
      }
      if (this.peer) {
        this.peer.destroy();
        this.peer = null;
      }
      this.socket = null;
      this.initWebsocket = () => {};
      this.initialQueue = null;
    }
    attachSRB2.onpacket = null;
    console.log(`[Relay ConnectState]: State disposed & going offline.`);
  }
}

module.exports = ConnectState;


/***/ },

/***/ 4888
(module) {

class WSErrorCodes {
  //(4000-4999)
  static BAD_PATH = 4000;
  static DATA_CHANNEL_INVALID = 4001;
  static HOST_CONNECT_TIMEOUT = 4002;
  static NETGAME_NOT_FOUND = 4003;
}

module.exports = WSErrorCodes;


/***/ },

/***/ 9391
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = {
  ConnectState: __webpack_require__(1133),
  ListenState: __webpack_require__(3052),
};


/***/ },

/***/ 3052
(module, __unused_webpack_exports, __webpack_require__) {

var { getWebsocketURL, getHttpURL, PLACEHOLDER_IP } = __webpack_require__(3615);
var ErrorCodes = __webpack_require__(4888);
var attachSRB2 = __webpack_require__(2052);
var ListenChannel = __webpack_require__(6091);
var version = __webpack_require__(3085);

class ListenState {
  static getChannelURL(wsHost, code) {
    return getWebsocketURL(wsHost) + "listench/" + code;
  }

  constructor(wsHost, isPublic = true) {
    this.listen = true;
    this.wsHost = wsHost;
    this.isOpen = false;
    this.connections = {};
    this.address = PLACEHOLDER_IP + ":5029";
    this.isPublic = isPublic;
    this.disposed = false;
    this.rtcConfig = null;
    this.wsConnections = {};
    this.pingPongInterval = null;
    console.log(`[Relay ListenState]: Starting ListenState with wsHost: ${wsHost}, ${isPublic ? "with public listing enabled" : "with public listing disabled"}.`);
    this.prepareSocket();
    this.setUpdateInterval();
  }

  setPingPongInterval() {
    clearInterval(this.pingPongInterval);
    var _this = this;
    this.pingPongInterval = setInterval(() => {
      if (!_this.isOpen) {
        return;
      }
      if (!_this.socket) {
        return;
      }
      _this.socket.send(JSON.stringify({
        ping: true
      }));
    }, 5000);
  }

  clearPingPongInterval() {
    clearInterval(this.pingPongInterval);
    this.pingPongInterval = null;
  }

  attachConnection(wsId, ip) {
    if (this.wsConnections[wsId]) {
      this.wsConnections[wsId].requestDispose();
      delete this.wsConnections[wsId];
    }
    var id = 1;
    while (this.connections[id]) {
      id += 1;
    }
    var ch = new ListenChannel(
      this,
      id,
      ip,
      this.rtcConfig,
      wsId
    );
    //window.alert("Connection request: "+id);
    this.wsConnections[wsId] = ch;
    this.connections[id] = ch;
    var _this = this;

    ch.requestDispose = () => {
      ch.dispose();
      delete _this.connections[id];
      delete this.wsConnections[wsId];
      attachSRB2.emitClose(id);
    };

    ch.removeWsConnection = () => {
      delete this.wsConnections[wsId];
    };

    ch.ondata = (data) => {
      attachSRB2.emitPacket(new Uint8Array(data), id, ip);
    };
  }

  disconnectAll() {
    for (var id of Object.keys(this.connections)) {
      this.connections[id].requestDispose();
    }
  }

  prepareSocket() {
    var _this = this;
    var host = this.wsHost;
    var iceconfigURL = getHttpURL(host)+"iceconfig";

    fetch(iceconfigURL).then((response) => {
      if (!response.ok) {
        attachSRB2.logInSRB2("[RELAY FAIL!]: Unable to get WebRTC configuration from server. Check your browser's developer tools for more details.");
        console.error("Response not OK: ",response);
        return;
      }
      response.json().then((json) => {
        if (!Array.isArray(json.iceServers)) {
          attachSRB2.logInSRB2("[RELAY FAIL!]: Unable to get WebRTC configuration from server. Check your browser's developer tools for more details.");
          console.error("IceServers aren't provided in the configuration: ", json);
          return;
        }
        _this.rtcConfig = json;
        _this.openSocket();
      }).catch((e) => {
        console.error("Unable to parse json: ",e);
        attachSRB2.logInSRB2("[RELAY FAIL!]: Unable to get WebRTC configuration from server. Check your browser's developer tools for more details.");
      });
    }).catch((e) => {
      attachSRB2.logInSRB2("[RELAY FAIL!]: Unable to get WebRTC configuration from server. Check your browser's developer tools for more details.");
      console.error("Unable to fetch webrtc configuration: ",e);
    });
  }

  openSocket() {
    var _this = this;
    var { wsHost, isPublic } = this;
    if (this._socket) { //Safety because there might be two on accident and we don't want broken/extra netgame lists. 
      try{
        this._socket.onclose = () => {};
        this._socket.close();
      }catch(e){}
      this._socket = null;
    }
    this.socket = new WebSocket(
      getWebsocketURL(wsHost) + (isPublic ? "host/public" : "host"),
    );
    this._socket = this.socket;
    this.isOpen = false;
    this._lastServerInfo = {};

    this.socket.onclose = function () {
      _this._lastServerInfo = {};
      _this.clearPingPongInterval();
      _this.isOpen = false;
      console.warn(
        `[Relay Connection]: Lost connection, connection might become unstable temporarily. Reconnecting...`,
      );
      attachSRB2.logInSRB2("[RELAY CONNECTION]: Lost connection to relay server, attempting to reconnect...");
      setTimeout(() => {
        if (_this.disposed) {
          return;
        }
        attachSRB2.logInSRB2("[RELAY CONNECTION]: Contacting relay server...");
        _this.openSocket();
      }, 500);
    };
    this.socket.onmessage = function (event) {
      var json = JSON.parse(event.data);

      if (json.method == "listening") {
        _this.address = json.url;
        if (!_this.isPublic) {
          setTimeout(() => {
            attachSRB2.logInSRB2("[NOTICE]: This is a private netgame session. Enter the following netgame IP in the multiplayer menu to connect: " + json.url);
          }, 200); //Short delay to put in front of the logs in srb2 when starting.
        } else {
          setTimeout(() => {
            attachSRB2.logInSRB2("[RELAY CONNECTION]: Now active on: " + json.url);
          }, 200); //Short delay to put in front of the logs in srb2 when starting.
        }
      }

      if (json.method == "connection") {
        _this.attachConnection(json.id, json.ip);
      }

      if (json.method == "disconnect") {
        var ch = _this.wsConnections[json.id];
        if (!ch) {
          return;
        }
        ch.wsclosed();
      }

      if (json.method == "message") {
        var ch = _this.wsConnections[json.id]; 
        if (!ch) {
          return;
        }
        ch.onwsmsg(json.data);
      }
    };
    this.setPingPongInterval();
    this.socket.onopen = function () {
      _this.isOpen = true;
      _this._lastServerInfo = {};
      attachSRB2.onpacket = _this.handleSRB2Send.bind(_this);
    };
  }

  handleSRB2Send(data, rid) {
    var ch = this.connections[rid];
    if (!ch) {
      return;
    }
    ch.send(data);
  }

  async handleUpdateInterval() {
    var { socket } = this;
    if (!this.isPublic) {
      return;
    }

    var info = await attachSRB2.getServerInfo();

    info.usesWebRTC = this.useRTC; //Completley separate property from the actual game server info.
    info.gameName = version.GAME_NAME;
    info.gameID = version.GAME_ID;

    if (!info) {
      this._lastServerInfo = {};
      return;
    }
    if (!this.isOpen) {
      this._lastServerInfo = {};
      return;
    }
    var toUpdate = {};
    var needsUpdate = false;
    for (var key of Object.keys(info)) {
      if (this._lastServerInfo[key] !== info[key]) {
        needsUpdate = true;
        this._lastServerInfo[key] = info[key];
        toUpdate[key] = info[key];
      }
    }

    if (needsUpdate) {
      socket.send(JSON.stringify({
        update: true,
        ...toUpdate
      }));
    }
  }

  setUpdateInterval() {
    this._lastServerInfo = {};
    this.updateInterval = setInterval(
      this.handleUpdateInterval.bind(this),
      1000,
    );
  }

  dispose() {
    this.clearPingPongInterval();
    if (this.socket) {
      this.socket.onclose = () => {};
      this.socket.close();
    }
    if (this._socket) {
      try{
        this._socket.onclose = () => {};
        this._socket.close();
      }catch(e){}
    }
    this._socket = null;
    this.socket = null;
    this.disposed = true;
    this.disconnectAll();
    clearInterval(this.updateInterval);
    attachSRB2.onpacket = null;
    console.log(`[Relay ListenState]: State disposed & going offline.`);
  }
}

module.exports = ListenState;


/***/ },

/***/ 6091
(module, __unused_webpack_exports, __webpack_require__) {

var { getWebsocketURL, PLACEHOLDER_IP } = __webpack_require__(3615);
var ErrorCodes = __webpack_require__(4888);
var attachSRB2 = __webpack_require__(2052);
var SimplePeer = __webpack_require__(1770);

class ListenChannel {
  constructor(parent, id, ip, rtcConfig, wsId) {
    this.parent = parent;
    this.id = id;
    this.ip = ip;
    this.rtcConfig = rtcConfig;
    this.wsId = wsId;

    this.isOpen = false;
    this.socketOpen = true;
    this.peer = null;
    this.removeWsConnection = () => {}; //Added in by listen.js

    this.init();

    console.log(`[Relay ListenChannel]: Handling connection IP: ${ip} ID: ${id} Websocket ID: ${wsId}`);
  }

  wsclosed() {
    if (this.socketOpen) {
      console.log(`[Relay ListenChannel]: Websocket connection closed IP: ${this.ip} ID: ${this.id} Websocket ID: ${this.wsId}`);
    }
    this.socketOpen = false;
    this.removeWsConnection();
    if (!this.isOpen) {
      this.requestDispose();
    }
  }

  wssend(data) { //the host socket share both the status updates and the connection process now.
    if (!this.parent.socket) {
      return;
    }
    this.parent.socket.send(JSON.stringify({
      data,
      id: this.wsId
    }));
  }

  closews() {
    if (!this.parent.socket) {
      return;
    }
    if (!this.socketOpen) {
      return;
    }
    this.socketOpen = false;
    this.parent.socket.send(JSON.stringify({
      disconnect: true,
      id: this.wsId
    }));
    this.removeWsConnection();
  }

  onwsmsg(data) { //message handler.
    try{
      var json = JSON.parse(data);
    }catch(e){}
    if (json.signal) {
      this.peer.signal(json.signal);
    }
  }

  init() {
    var _this = this;
    this.isOpen = true;
    
    this.wssend(JSON.stringify({ rtcConfig: this.rtcConfig }));

    this.peer = new SimplePeer({
      initiator: true,
      trickle: true,
      config: this.parent.rtcConfig,
      channelConfig: {
        ordered: false,          // Do NOT wait for missing packets
        maxRetransmits: 0,       // Do NOT try to resend lost packets
        priority: 'high'         // Hints to the browser to prioritize this traffic
      }
    });

    this.peer.on("error", (err) => {});

    this.peer.on("connect", () => {
      console.log(`[Relay ListenChannel]: Peer connection established IP: ${_this.ip} ID: ${_this.id} Websocket ID: ${_this.wsId}`);
      _this.isOpen = true;
      _this.closews(); //close once the handshake is finished.
    });

    this.peer.on("signal", (data) => {
      if (!_this.isOpen) {
        return;
      }
      _this.wssend(JSON.stringify({ signal: data }));
    });

    this.peer.on("close", () => {
      console.log(`[Relay ListenChannel]: Peer connection closed IP: ${_this.ip} ID: ${_this.id} Websocket ID: ${_this.wsId}`);
      _this.closews();
      _this.handleClose();
      _this.isOpen = false;
    });

    this.peer.on("data", (data) => {
      if (_this.ondata) { //this is added by listen.js
        _this.ondata(data);
      }
    });
  }

  handleClose() {
    if (this.peer) {
      try {
        this.peer.destroy();
      } catch (e) {}
      this.peer = null;
    }
    this.closews();
    this.isOpen = false;
    if (this.requestDispose) {
      this.requestDispose();
    }
  }

  dispose() {
    this.isOpen = false;
    if (this.peer) {
      try{
      this.peer.destroy();
      }catch(e){}
      this.peer = null;
    }
    this.closews();
    this.requestDispose = null;
    if (!this.disposed) {
      this.disposed = true;
      console.log(`[Relay ListenChannel]: Channel closed IP: ${this.ip} ID: ${this.id} Websocket ID: ${this.wsId}`);
    }
  }

  send(data) { //recieving message from srb2.
    if (this.isOpen && this.peer) {
      try {
        this.peer.send(data);
      } catch (e) {}
      return;
    }
  }
}

module.exports = ListenChannel;


/***/ },

/***/ 3615
(module) {

function getWebsocketURL(wsHost) {
  var url = "";
  if (window.location.protocol.startsWith("https")) {
    url += "wss://";
  } else {
    url += "ws://";
  }
  url += wsHost;
  if (!url.endsWith("/")) {
    url += "/";
  }
  return url;
}

function getHttpURL(wsHost) {
  var url = "";
  if (window.location.protocol.startsWith("https")) {
    url += "https://";
  } else {
    url += "http://";
  }
  url += wsHost;
  if (!url.endsWith("/")) {
    url += "/";
  }
  return url;
}

var PLACEHOLDER_IP = "0.0.0.0";

module.exports = { getWebsocketURL, getHttpURL, PLACEHOLDER_IP };


/***/ },

/***/ 3085
(module) {

class SRB2WebRelayProtocol {
    static RELAY_PROTOCOL = "SRB2W_QRTC_V2";

    static GAME_NAME = "SRB2Legacy Web";

    static GAME_ID = "SRB2LEGACY";
}

module.exports = SRB2WebRelayProtocol;

/***/ },

/***/ 1618
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var elements = __webpack_require__(5100);
var dialog = __webpack_require__(5925);
var relayConfig = elements.getGPId("relayConfig");
var relayServerCheckbox = elements.getGPId("relayServerCheckbox");
var lstorageName = "SRB2WebRelayConfig";
var RelayOption = __webpack_require__(9153);
var net = __webpack_require__(1509);
var version = __webpack_require__(3085);

var browsePublicGames = elements.getGPId("browsePublicGames");
var browseNetgamesLargeButton = elements.getGPId("browseNetgamesLargeButton");
var publicNetgameBrowserContainer = elements.getGPId(
  "publicNetgameBrowserContainer",
);
var publicNetgameBrowser = elements.getGPId("publicNetgameBrowser");
var publicNetgameBrowserLeft = elements.getGPId("publicNetgameBrowserLeft");
var publicNetgameBrowserRight = elements.getGPId("publicNetgameBrowserRight");

var relays = [];
var relayOpts = [];

var usedRelay = 0;
var relayEnabled = true;

function getPublicHosts() {
  return [
    {
      host: "srb2web-lan.gvbvdxx.me",
      name: "Public server 1",
    },
  ];
}

var defaultRelays = getPublicHosts();

async function setBrowsePublicGamesText(count) {
  if (count == 0) {
    browsePublicGames.textContent =
      "Join/host a public netgame (none active yet)";
    return;
  }
  browsePublicGames.textContent = `Join/host a public netgame (${count} netgames active)`;
}
async function updatePublicNetgameCount() {
  try {
    var games = await net.countPublicGames();
    setBrowsePublicGamesText(games);
  } catch (e) {
    setBrowsePublicGamesText(0);
  }
}

setInterval(updatePublicNetgameCount, 1000 * 60 * 1);

function saveRelays() {
  relays = relayOpts.map((r) => r.save());
  localStorage.setItem(
    lstorageName,
    JSON.stringify({
      relays,
      used: usedRelay,
      enabled: relayEnabled,
    }),
  );
}

var currentRelayName = null;
var currentHost = null;

function updateRelayUsed() {
  relayOpts.forEach((r, i) => {
    r.setUsed(usedRelay == i);
    if (usedRelay == i) {
      currentHost = r.relay.host;
      currentRelayName = r.relay.name;
    }
  });
  if (relayEnabled) {
    net.disable();
    net.enable(currentHost);
  } else {
    net.disable();
  }

  setBrowsePublicGamesText(0);
  updatePublicNetgameCount();
}

var addRelayButton = elements.getGPId("addRelayButton");
var addDefaultServers = elements.getGPId("addDefaultServers");

function addRelayIfNotExist(relay, useThisOne) {
  if (!relay) {
    return false;
  }
  if (relays.find((r) => r.host == relay.host)) {
    return false;
  }
  relays.push(relay);
  usedRelay = relays.length - 1;
  reloadRelayConfig();
  saveRelays();
  return true;
}

addRelayButton.onclick = async function () {
  var relay = await RelayOption.relayAddDialog();
  if (!relay) {
    return;
  }
  if (relays.find((r) => r.host == relay.host)) {
    dialog.alert("This relay server was already added!");
    return;
  }
  relays.push(relay);
  usedRelay = relays.length - 1;
  reloadRelayConfig();
  saveRelays();
};

addDefaultServers.onclick = async function () {
  var defaults = getPublicHosts();
  if (defaults.length > 0) {
    for (var relay of defaults) {
      addRelayIfNotExist(relay);
    }
    usedRelay = relays.length - defaults.length;
    reloadRelayConfig();
    saveRelays();
  }
};

function reloadRelayConfig() {
  elements.setInnerJSON(relayConfig, []);
  relayOpts.forEach((r) => {
    r.dispose();
  });
  relayOpts = [];
  relays.forEach((relay, i) => {
    var opt = new RelayOption(
      relay,
      () => {
        updateRelayUsed();
        saveRelays();
      },
      () => {
        //Use button clicked.
        usedRelay = i;
        updateRelayUsed();
        saveRelays();
      },
      () => {
        //Remove accepted.
        relayOpts = relayOpts.filter((r) => r.relay.host !== relay.host);
        opt.dispose();
        saveRelays();
        reloadRelayConfig();
      },
    );
    relayConfig.append(opt.div);
    relayOpts.push(opt);
  });
  updateRelayUsed();
  if (usedRelay > relayOpts.length - 1) {
    usedRelay = relayOpts.length - 1;
    updateRelayUsed();
    saveRelays();
  }

  relayServerCheckbox.checked = relayEnabled;

  if (relayOpts.length == 0) {
    elements.setInnerJSON(relayConfig, [
      {
        element: "div",
        className: "noRelayContainer",
        children: [
          {
            element: "div",
            className: "noRelayText",
            textContent: "No relay servers!",
          },
        ],
      },
    ]);
  }
}

relayServerCheckbox.onchange = function () {
  relayEnabled = relayServerCheckbox.checked;
  saveRelays();
  reloadRelayConfig();
};


setInterval(
  () => {
    relayOpts.forEach((r) => {
      r.fetchStatus();
    });
  },
  1000 * 60 * 1,
);

var storedConfig = localStorage.getItem(lstorageName);
if (storedConfig) {
  try {
    var json = JSON.parse(storedConfig);
    usedRelay = json.used;
    relays = json.relays;
    relayEnabled = json.enabled;
  } catch (e) {
    relays = Array.from(defaultRelays);
    dialog.alert(
      `Unable to load your relay configuration, it may have been corrupted.`,
    );
    console.error(e);
  }
} else {
  relays = Array.from(defaultRelays);
}

reloadRelayConfig();
net.disablePublic();

//Browser for public games.

function closePublicList() {
  publicNetgameBrowserContainer.hidden = true;
}

function getCloseButton() {
  return {
    element: "div",
    className: "button publicNetgameBrowserCloseButton",
    textContent: "Close",
    onclick: closePublicList,
  };
}

function getHostButton(hostClicked) {
  return {
    element: "div",
    className: "publicNetgameItem",
    onclick: hostClicked,
    children: [
      {
        element: "div",
        style: {
          display: "flex",
          fontSize: "32px",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px"
        },
        children: [
          {
            element: "img",
            src: "images/wifi.svg",
            className: "refreshIcon",
          },
          "Host public netgame",
        ],
      },
    ],
  };
}

function getReloadButton(reload) {
  return {
    element: "div",
    className: "publicNetgameItem",
    onclick: reload,
    children: [
      {
        element: "div",
        style: {
          display: "flex",
          fontSize: "32px",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px"
        },
        children: [
          {
            element: "img",
            src: "images/refresh.svg",
            className: "refreshIcon",
          },
          "Refresh",
        ],
      },
    ],
  };
}

function gameToButton(game, selectedURL, onClick) {
  return {
    element: "div",
    className: "publicNetgameItem",
    eventListeners: [{ event: "click", func: onClick }],
    children: [
      {
        element: "div",
        style: {
          display: "flex",
          flexDirection: "column",
        },
        children: [
          {
            element: "span",
            className: "netgameGameName",
            textContent: game.gameName,
          },
          {
            element: "span",
            className: "netgameServerName",
            textContent: game.name,
          },
        ],
      },
      {
        element: "span",
        className: "netgameServerURL",
        textContent: game.url,
      },
    ],
  };
}

var { getDisplayOptions } = __webpack_require__(1973);
var { startGame } = __webpack_require__(7063);

async function launchToNetgame(game) {
  var confirmed = await dialog.confirm(`Launch game to join "${game.name}"?`);
  if (!confirmed) return;

  closePublicList();
  startGame({
    ...getDisplayOptions(),
    joinURL: game.url,
  });
}

async function launchToHost() {
  var confirmed = await dialog.confirm(`Launch game to host public netgame?`+
    "\nTip: If you want to host an unlisted netgame, launch the game normally and use Multiplayer > Internet/LAN."+
    "\nThe console (press `) will display your netgame's IP for others to join."
  );
  if (!confirmed) return;

  closePublicList();
  net.enablePublic();
  startGame({
    ...getDisplayOptions(),
    host: true,
  });
}

function displayPublicGames(games, selectedURL) {
  setBrowsePublicGamesText(games.length);
  publicNetgameBrowser.hidden = false;

  var gameslist = games.map((game) => {
        return gameToButton(game, selectedURL, () => {
          displayPublicGames(games, game.url);
        });
      });
  elements.setInnerJSON(
    publicNetgameBrowserLeft,
    [
      {
        element: "span",
        style: {
          fontWeight: "bold",
        },
        children: [
          "Now viewing on server: ",
          {
            element: "br",
          },
          {
            element: "span",
            className: "relayHost",
            textContent: currentHost,
            style: {
              fontSize: "20px",
            },
          },
        ],
      },
      {
        element: "div",
        className: "publicGameSeparator",
      },
      getReloadButton(loadPublicList),
      getHostButton(launchToHost),
      {
        element: "div",
        className: "publicGameSeparator",
      },
    ].concat(
      gameslist.length > 0 ? gameslist : [
        {
          element: "span",
          textContent: "No active public netgames found.",
        },
        {
          element: "br"
        },
        {
          element: "span",
          textContent: "Click \"Host public netgame\" to host one yourself! It's simple as one click!"
        }
      ],
    ),
  );

  var game = games.find((g) => selectedURL == g.url);

  if (!game) {
    elements.setInnerJSON(publicNetgameBrowserRight, [
      {
        element: "span",
        className: "viewPublicNetgameDetails",
        children: [
          {
            element: "span",
            textContent: "Select a public netgame on the left to view its details and connect to it!",
          },
          { element: "br" },
          {
            element: "span",
            textContent: "Host your own by clicking the \"Host public netgame\" button above! It's simple as one click!",
          }
        ]
      },
      getCloseButton(),
    ]);

    return;
  }

  if (game.gameID !== version.GAME_ID) {
    elements.setInnerJSON(publicNetgameBrowserRight, [
      {
        element: "span",
        className: "viewPublicNetgameDetails",
        children: [
          {
            element: "span",
            textContent: `This netgame belongs to ${game.gameName}, but you are using ${version.GAME_NAME}.`,
          },
          { element: "br" },
          {
            element: "span",
            textContent: "If you want to join this netgame, you need to use "+game.gameName+" instead.",
          }
        ]
      },
      getCloseButton(),
    ]);

    return;
  }

  elements.setInnerJSON(publicNetgameBrowserRight, [
    {
      element: "div",
      className: "publicNetgameDetails",
      children: [
        {
          element: "span",
          className: "netgameServerName",
          textContent: game.name,
        },
        {
          element: "br",
        },
        {
          element: "span",
          className: "netgameServerURL",
          textContent: game.url,
        },
        {
          element: "div",
          className: "publicGameSeparator",
        },

        {
          element: "button",
          className: "button",
          children: [
            {
              element: "div",
              style: {
                display: "flex",
                alignItems: "center",
                gap: "2px",
              },
              onclick: () => {
                launchToNetgame(game);
              },
              children: [
                {
                  element: "img",
                  style: {
                    width: "32px",
                    height: "32px",
                    objectFit: "contain",
                  },
                  src: "images/wifi.svg",
                },
                {
                  element: "span",
                  textContent: "Connect/Join",
                },
              ],
            },
          ],
        },

        {
          element: "div",
          className: "publicGameSeparator",
        },
        {
          element: "br",
        },
        {
          element: "li",
          children: [
            {
              element: "ri",
              textContent: game.mapTitle
                ? "Map Title: " + game.mapTitle
                : "(No map title)",
            },
          ],
        },
        {
          element: "li",
          children: [
            {
              element: "ri",
              textContent: game.map ? "Map: " + game.map : "(No map)",
            },
          ],
        },

        {
          element: "br",
        },
        {
          element: "div",
          className: "publicGameSeparator",
        },
        {
          element: "span",
          textContent: `Players: ${game.ingamePlayers} / ${game.maxPlayers || "(Unknown)"}`,
        },
      ].concat(
        game.playerNames.map((name) => {
          return {
            element: "li",
            textContent: name,
          };
        }),
      ),
    },
    getCloseButton(),
  ]);
}

async function loadPublicList() {
  publicNetgameBrowserContainer.hidden = false;
  publicNetgameBrowser.hidden = true;
  try {
    var games = await net.listPublicGames();
  } catch (e) {
    dialog.alert(
      "Failed to fetch public hosted games. Make sure your selected relay server is working and try again.\nError: " +
        e,
    );
    console.error(e);
    publicNetgameBrowserContainer.hidden = true;
    return;
  }

  var gamesListOrganized = games.sort((game) => (game.gameID !== version.GAME_ID) ? 1 : -1);

  displayPublicGames(gamesListOrganized);
}

async function handleBrowseButtonClick () {
  if (!relayEnabled) {
    dialog.alert("You don't have the relay server enabled!");
    return;
  }
  if (usedRelay < 0) {
    dialog.alert("You don't have a relay server selected");
    return;
  }

  if (relayOpts[usedRelay].isOutdated) {
    var accepted = await dialog.confirm("This relay server is (probably) outdated or uses an different protocol!\nYou may need to ask the owner of the relay server to update to the latest version of the relay server.\nContinue anyways?");
    if (!accepted) {
      return;
    }
  }

  loadPublicList();
}

browsePublicGames.addEventListener("click", handleBrowseButtonClick);
browseNetgamesLargeButton.addEventListener("click", handleBrowseButtonClick);


/***/ },

/***/ 9153
(module, __unused_webpack_exports, __webpack_require__) {

var elements = __webpack_require__(5100);
var dialog = __webpack_require__(5925);
var SRB2WebRelayProtocol = __webpack_require__(3085);

class RelayOption {
  static FETCHING_IMG = "images/loading.gif";
  static FETCHING_TEXT = "Loading...";

  static ONLINE_IMG = "images/green.png";
  static ONLINE_TEXT = "Online!";

  static OFFLINE_IMG = "images/red.png";
  static OFFLINE_TEXT = "Offline.";

  static OUTDATED_IMG = "images/outdatedrelay.png";
  static OUTDATED_TEXT = "Outdated version.";

  static async relayAddDialog() {
    var nameInput = null;
    var hostInput = null;
    var editDiv = elements.createElementsFromJSON([
      {
        element: "div",
        children: [
          {
            element: "span",
            style: { fontWeight: "bold" },
            textContent: "Placeholder name: ",
          },
          {
            element: "input",
            GPWhenCreated: (elm) => (nameInput = elm),
            placeholder: "Relay server",
          },
          {
            element: "br",
          },
          {
            element: "span",
            style: { fontWeight: "bold" },
            textContent: "Host: ",
          },
          {
            element: "input",
            GPWhenCreated: (elm) => (hostInput = elm),
            placeholder: "example-relay.com",
          },
        ],
      },
    ])[0];

    await dialog.alertWithElement(editDiv); //Wait for close.
    var returned = {
      name: nameInput.value || "Relay server",
      host: (""+hostInput.value).trim(),
    };
    var err = RelayOption.confirmRelayStuff(returned);
    if (err) {
      dialog.alert(err);
      return;
    }
    return returned;
  }

  static confirmRelayStuff({ name, host }) {
    if (typeof name !== "string") {
      return "Name is not string.";
    }
    if (typeof host !== "string") {
      return "Host is not string.";
    }

    var allowedURLChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.-:";

    for (var char of host) {
      if (allowedURLChars.indexOf(char) == -1) {
        return `Character "${char}" is not allowed in host.`;
      }
    }

    if (name.length > 150) {
      return `Name is too long!`;
    }
    if (name.length < 1) {
      return `Name is empty`;
    }

    if (host.length > 200) {
      return `Host is too long!`;
    }
    if (host.length < 1) {
      return `Host is empty`;
    }

    return null; //Nothing means its valid.
  }

  constructor(relay, requestSave, requestSetUsed, requestDelete) {
    this.relay = relay;
    this.requestSave = requestSave;
    this.requestSetUsed = requestSetUsed;
    this.requestDelete = requestDelete;
    this.firstFetch = true;
    this.isOutdated = false;
    this.loadOption();
    this.createElements();
    this.updateContents();
    this.fetchStatus();
  }

  async relayEditButtonClicked() {
    var nameInput = null;
    var hostInput = null;
    var editDiv = elements.createElementsFromJSON([
      {
        element: "div",
        children: [
          {
            element: "span",
            style: { fontWeight: "bold" },
            textContent: "Placeholder name: ",
          },
          {
            element: "input",
            GPWhenCreated: (elm) => (nameInput = elm),
            value: this.relay.name,
          },
          {
            element: "br",
          },
          {
            element: "span",
            style: { fontWeight: "bold" },
            textContent: "Host: ",
          },
          {
            element: "input",
            GPWhenCreated: (elm) => (hostInput = elm),
            value: this.relay.host,
          },
        ],
      },
    ])[0];

    await dialog.alertWithElement(editDiv); //Wait for close.

    var err = RelayOption.confirmRelayStuff({
      name: nameInput.value,
      host: hostInput.value,
    });
    if (err) {
      dialog.alert(err);
      return;
    }

    this.relay.name = nameInput.value;
    this.relay.host = (""+hostInput.value).trim();
    this.loadOption();
    this.updateContents();
    this.fetchStatus();
    this.requestSave();
  }

  async relayDeleteButtonClicked() {
    var msg = `Remove relay server "${this.relay.host}"?\nYou might not be able to get it back once its removed.`;
    if (await dialog.confirm(msg)) {
      this.requestDelete();
    }
  }

  setUsed(u) {
    var { relayUseButton } = this;
    if (u) {
      this.div.setAttribute("used", "");
      relayUseButton.textContent = "Using this server";
    } else {
      this.div.removeAttribute("used");
      relayUseButton.textContent = "Use this server";
    }
  }
  dispose() {
    this.relay = null;
    this.div.remove();
  }
  loadOption() {
    this.name = this.relay.name ? this.relay.name : "";
    this.host = this.relay.host;
  }
  createElements() {
    var _this = this;
    this.div = elements.createElementsFromJSON([
      {
        element: "div",
        className: "configuredRelay",
        children: [
          //Name and stuff.
          {
            element: "div",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
            },
            children: [
              {
                element: "div",
                className: "relayStatus",
                children: [
                  {
                    element: "img",
                    src: RelayOption.FETCHING_IMG,
                    className: "relayStatusImg",
                    GPWhenCreated: (elm) => (_this.statusImg = elm),
                  },
                  {
                    element: "span",
                    className: "relayStatusText",
                    GPWhenCreated: (elm) => (_this.statusText = elm),
                  },
                ],
              },
              {
                element: "span",
                className: "relayName",
                GPWhenCreated: (elm) => (_this.relayNameSpan = elm),
              },
              {
                element: "span",
                className: "relayHost relayHostClickable",
                GPWhenCreated: (elm) => (_this.relayHostSpan = elm),
              },
            ],
          },
          //Description
          {
            element: "span",
            className: "relayDescription",
            GPWhenCreated: (elm) => (_this.relayDescriptionSpan = elm),
          },
          //Public count
          {
            element: "span",
            className: "relayPublicCount",
            GPWhenCreated: (elm) => (_this.relayPublicCountSpan = elm),
          },
          //Buttons
          {
            element: "div",
            className: "relayButtons",
            children: [
              {
                element: "button",
                className: "button",
                textContent: "Use this server",
                GPWhenCreated: (elm) => (_this.relayUseButton = elm),
              },
              {
                element: "button",
                className: "button",
                textContent: "Edit",
                GPWhenCreated: (elm) => (_this.relayEditButton = elm),
              },
              {
                element: "button",
                className: "button",
                textContent: "Remove",
                GPWhenCreated: (elm) => (_this.relayDeleteButton = elm),
              },
            ],
          },
        ],
      },
    ])[0];

    function copyHostText() {
      var elm = this;
      var previous = elm.textContent;
      elm.textContent = "Copied!";
      setTimeout(() => {
        elm.textContent = previous;
        elm.onclick = copyHostText;
      }, 1000);
      try {
        navigator.clipboard.writeText(previous);
      } catch (e) {}
      elm.onclick = function () {};
    }

    this.relayHostSpan.onclick = copyHostText;
    this.relayUseButton.onclick = this.requestSetUsed;
    this.relayEditButton.onclick = this.relayEditButtonClicked.bind(this);
    this.relayDeleteButton.onclick = this.relayDeleteButtonClicked.bind(this);
  }

  updateContents() {
    var { relayNameSpan, relayHostSpan, relay, relayDescriptionSpan } = this;
    relayNameSpan.textContent = relay.name;
    relayHostSpan.textContent = relay.host;
    relayDescriptionSpan.textContent = "";
  }
  save() {
    return {
      host: this.relay.host,
      name: this.relay.name,
    };
  }
  getFetchURL() {
    var url = "";
    if (window.location.protocol.startsWith("https")) {
      url += "https://";
    } else {
      url += "http://";
    }
    url += this.host;
    if (!url.endsWith("/")) {
      url += "/";
    }
    return url;
  }

  setPublicCount(count) {
    var { relayPublicCountSpan } = this;
    if (count == "requesting") {
      relayPublicCountSpan.textContent = "Loading public netgames...";
      return;
    }
    if (count == "error") {
      relayPublicCountSpan.textContent = "Error loading public netgames";
      return;
    }
    if (!count) {
      relayPublicCountSpan.textContent = "No public netgames available";
      return;
    }
    relayPublicCountSpan.textContent = `${count} public netgames available`;
  }

  async fetchPublicCount() {
    var url = this.getFetchURL();
    this.setPublicCount("loading");
    try {
      var response = await fetch(url + "countpublic");
      if (response.ok) {
        var json = await response.json();
        this.setPublicCount(json.count);
      } else if (response.status == 404) {
        var response2 = await fetch(url + "public");
        if (response2.ok) {
          var json2 = await response2.json();
          this.setPublicCount(json2.length);
        } else {
          this.setPublicCount("error");
        }
      } else {
        this.setPublicCount("error");
      }
    } catch (e) {
      this.setPublicCount("error");
    }
  }
  async fetchStatus() {
    var { relayNameSpan, relayDescriptionSpan, statusImg, statusText } = this;
    if (this.firstFetch) {
      statusImg.src = RelayOption.FETCHING_IMG;
      statusText.textContent = RelayOption.FETCHING_TEXT;
      relayDescriptionSpan.textContent = "";
      statusText.setAttribute("state", "fetch");
      this.firstFetch = false;
      this.setPublicCount("loading");
    }
    var online = false;
    var outdated = false;
    var url = this.getFetchURL();
    try{
      var response = await fetch(url + "version");
      if (response.ok) {
        try{
          var json = await response.json();
        }catch(e){
          console.error(e);
          online = false;
        }

        //outdated = true; //for testing

        if (json.protocol !== SRB2WebRelayProtocol.RELAY_PROTOCOL) {
          outdated = true;
        }
      } else if (response.status == 404) {
        outdated = true;
      } else {
        console.error("Non OK status from '"+url+"version': "+response.ok);
        online = false;
      }
    }catch(e){
      console.error(e);
      online = false;
    }

    this.isOutdated = false;
    if (outdated) {
      this.isOutdated = true;
      statusImg.src = RelayOption.OUTDATED_IMG;
      statusText.textContent = RelayOption.OUTDATED_TEXT;
      statusText.setAttribute("state", "error");
      this.setPublicCount("error");
      return;
    }

    try {
      var response = await fetch(url + "status");
      if (response.ok) {
        var json = await response.json();
        if (json.status == "online") {
          relayNameSpan.innerHTML = "";
          elements.setInnerJSON(relayNameSpan, [
            {
              element: "span",
              textContent: json.name,
            },
            {
              element: "br",
            },
            {
              element: "span",
              style: {
                fontSize: "12px",
                marginLeft: "8px",
              },
              textContent: this.relay.name,
            },
          ]);

          relayDescriptionSpan.textContent = `${json.description}`;
          online = true;
          this.fetchPublicCount();
        }
      }
    } catch (e) {
      console.error(e);
      online = false;
    }
    if (!online) {
      statusImg.src = RelayOption.OFFLINE_IMG;
      statusText.textContent = RelayOption.OFFLINE_TEXT;
      statusText.setAttribute("state", "offline");
      this.setPublicCount("error");
      return;
    }
    statusImg.src = RelayOption.ONLINE_IMG;
    statusText.textContent = RelayOption.ONLINE_TEXT;
    statusText.setAttribute("state", "online");
  }
}

function preloadImage(h) {
  var link = document.createElement("link");
  link.rel = "preload";
  link.href = h;
  link.as = "image";
  document.head.append(link);
}

preloadImage(RelayOption.FETCHING_IMG);
preloadImage(RelayOption.OFFLINE_IMG);
preloadImage(RelayOption.ONLINE_IMG);

module.exports = RelayOption;


/***/ },

/***/ 7841
(module, __unused_webpack_exports, __webpack_require__) {

var { KeyNum, KeyName } = __webpack_require__(627);
var { sendInput, sendJoystick, keyboardIsActive } = __webpack_require__(8897);

var elements = __webpack_require__(5100);

class TouchControlButton {
    static calculatePercentSize(x,y, cx = window.innerWidth, cy = window.innerHeight) {
        var percentX = (x/cx)*100;
        var percentY = (y/cy)*100;
        return {percentX, percentY};
    }

    static fromSavedData(data) {
        var button = new TouchControlButton(
            data.id,
            data.side,
            data.xPos,
            data.yPos,
            data.width,
            data.height
        );
        return button;
    }

    static createEmptyButtonData(id) {
        var button = new TouchControlButton(
            id,
            "left",
            0,
            0
        );
        button.width = 10;
        button.height = 10;
        var data = button.save();
        button.destroy();
        return data;
    }

    constructor(id, side, xPos, yPos, width, height) {
        this.destroyed = false;
        this.side = side || "left";
        this.xPos = +xPos || 0;
        this.yPos = +yPos || 0;
        this.width = +width || 0;
        this.height = +height || 0;
        this.id = id;
        this.randomId = Date.now()+"_"+(Math.random()*100000); //Random ID to identify this button in edit mode, since the id can be duplicated.
        this.editMode = false;
        this.isJoystick = (KeyNum[this.id] == KeyNum.UI_JOYSTICK);
        this.joystickX = 0;
        this.joystickY = 0;
        this.touch = null;

        this.setInfo(this.id);
        this._justPressed = false;
        this.tapLength = 0;
    }

    isCollide(position, elm) {
        var aRect = position;
        var bRect = elm.getBoundingClientRect();

        return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.top + bRect.height ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.left + bRect.width
        );
    }
    
    isTouchingOneOf(touchPositions, elm = this.elm) {
        for (var position of touchPositions) {
            if (this.isCollide(position, elm)) {
                return true;
            }
        }
        return false;
    }

    isTouchingFirst(touchPositions, elm = this.elm) {
        if (touchPositions.length == 0) return false;
        return this.isCollide(touchPositions[0], elm);
    }

    generateJoystickContent() {
        var elm = this.elm;
        var joystickMain = null;
        var joystickCircle = null;
        elements.setInnerJSON(elm, [
            {
                element: "div",
                className: "touchControlsJoystick",
                GPWhenCreated: (e) => {joystickMain = e;},
                children: [
                    {
                        element: "div",
                        className: "touchControlsJoystickCircle",
                        GPWhenCreated: (e) => {joystickCircle = e;},
                    }
                ]
            },
        ]);

        this.joystickMain = joystickMain;
        this.joystickCircle = joystickCircle;
    }

    resizeJoystick() {
        if (!this.isJoystick) return;

        var elm = this.elm;
        var joystickMain = this.joystickMain;
        var joystickCircle = this.joystickCircle;
        var bounding = elm.getBoundingClientRect();
        var scale = Math.min(bounding.width, bounding.height) / 100;
        joystickMain.style.width = (100*scale) + "px";
        joystickMain.style.height = (100*scale) + "px";
    }

    handleJoystick(touchPositions, processState) {
        var elm = this.elm;
        var joystickMain = this.joystickMain;
        var joystickCircle = this.joystickCircle;

        if (!joystickMain || !joystickCircle) {
            return;
        }

        var touch = null;
        for (var position of touchPositions) {
            if (this.isCollide(position, joystickMain)) {
                touch = position;
                break;
            }
        }

        if (touch || this.touch) {
            if (processState.touchingJoystick !== this.randomId) {
                processState.touchingJoystick = this.randomId;
            }
            var bounding = joystickMain.getBoundingClientRect();
            var centerX = bounding.left + bounding.width/2;
            var centerY = bounding.top + bounding.height/2;

            if (touch) {
                this.touch = touch;
            }

            var deltaX = this.touch.left - centerX;
            var deltaY = this.touch.top - centerY;
            var percent = TouchControlButton.calculatePercentSize(deltaX, deltaY, bounding.width, bounding.height);
            
            this.joystickX = Math.max(-1, Math.min(1, percent.percentX/50));
            this.joystickY = -Math.max(-1, Math.min(1, percent.percentY/50));

            var distance = Math.sqrt(this.joystickX*this.joystickX + (-this.joystickY)*(-this.joystickY));
            if (distance > 1) {
                this.joystickX /= distance;
                this.joystickY /= distance;
            }
        } else {
            if (processState.touchingJoystick == this.randomId) {
                processState.touchingJoystick = null;
                this.joystickX = 0;
                this.joystickY = 0;
                sendJoystick(this.joystickX, this.joystickY);
            }
        }

        if (this.touch) {
            if (this.touch.touching) {
                sendJoystick(this.joystickX, this.joystickY);
                joystickCircle.setAttribute("data-touching", "");
            } else {
                this.touch = null;
                this.joystickX = 0;
                this.joystickY = 0;
                sendJoystick(this.joystickX, this.joystickY);
                processState.touchingJoystick = null;
                joystickCircle.removeAttribute("data-touching");
            }
        }

        joystickCircle.style.top = (50 + this.joystickY*-50) + "%";
        joystickCircle.style.left = (50 + this.joystickX*50) + "%";
    }

    generateElement() {
        var editBoxElm = null;
        if (this.elm) {
            this.elm.remove();
        }

        if (this.width < 0) {
            this.width = 0;
        }
        if (this.height < 0) {
            this.height = 0;
        }

        this.elm = elements.createElementsFromJSON([
            {
                element: "div",
                className: (this.isJoystick ? "touchControlsJoystickContainer" : "touchActionButton")+" touchControlPosition",
                "data-position": this.side,
                styleProperties: {
                    "--button-x": this.xPos+"%",
                    "--button-y": this.yPos+"%",
                    "--button-width": this.width+"%",
                    "--button-height": this.height+"%",
                },
                style: (this.isJoystick) ? ({"overflow": "visible !important"}) : ({}),
                children: [
                    {
                        element: "span",
                        textContent: (this.isJoystick? "": this.name),
                    },
                ]
            }
        ])[0];

        //White box, for resizing. Only shows in customization mode.
        this.editBoxElm = elements.createElementsFromJSON([
            {
                element: "div",
                className: "touchControlBox",
                "data-position": this.side,
                styleProperties: {
                    "--button-x": this.xPos+"%",
                    "--button-y": this.yPos+"%",
                    "--button-width": this.width+"%",
                    "--button-height": this.height+"%",
                },
            }
        ])[0];

        //Red box, for deleting the button. Only shows in customization mode.
        this.editBoxElm2 = elements.createElementsFromJSON([
            {
                element: "div",
                className: "touchControlDeleteBox",
                "data-position": this.side,
                styleProperties: {
                    "--button-x": this.xPos+"%",
                    "--button-y": this.yPos+"%",
                    "--button-width": this.width+"%",
                    "--button-height": this.height+"%",
                },
            }
        ])[0];

        if (this.isJoystick) {
            this.generateJoystickContent();
        }

        if (this.container) {
            this.append(this.container);
        }
    }

    setcssvar (property,value) {
        this.elm.style.setProperty(property,value);
        this.editBoxElm.style.setProperty(property,value);
        this.editBoxElm2.style.setProperty(property,value);
    }

    setInfo (id) {
        var targetId = id || this.id;
        if (this._lastid !== targetId) {
            this._lastid = targetId;
            this.name = KeyName[targetId] || "Unknown";
            this.pressNum = KeyNum[targetId] || 0;
            this.generateElement();
        }   
    }

    append (container) {
        this.elm.remove();
        this.editBoxElm.remove();
        this.editBoxElm2.remove();
        this.container = container;
        container.appendChild(this.elm);
        if (this.editMode) {
            container.appendChild(this.editBoxElm);
            container.appendChild(this.editBoxElm2);
        }
    }

    destroy () {
        this.elm.remove();
        this.editBoxElm.remove();
        this.editBoxElm2.remove();
        this.container = null;
        this.destroyed = true;
    }

    save () {
        return {
            id: this.id,
            side: this.side,
            xPos: this.xPos,
            yPos: this.yPos,
            width: this.width,
            height: this.height,
        };
    }

    editModeProcess (touchPositions, processState) {
        var elm = this.elm;
        var editBox = this.editBoxElm;
        var editBox2 = this.editBoxElm2;

        processState.disableDefault = !!processState.editing;

        if (!processState.editing) {
            if (this.isTouchingFirst(touchPositions, editBox)) {
                processState.resizing = true;
                processState.editing = this.randomId;
                
                // Save initial state
                processState.startWidth = this.width;
                processState.startHeight = this.height;
                processState.startX = touchPositions[0].left;
                processState.startY = touchPositions[0].top;
            }
            if (this.isTouchingFirst(touchPositions, editBox2) && !processState.editing) {
                this.destroy();
                this.remove = true;
                return;
            }
            if (this.isTouchingFirst(touchPositions, elm) && !processState.editing) {
                processState.resizing = false;
                processState.editing = this.randomId;
                var bounding = elm.getBoundingClientRect();

                var anchorX = bounding.left; 
                var anchorY = bounding.bottom;

                var diffX = touchPositions[0].left - anchorX;
                var diffY = touchPositions[0].top - anchorY;

                if (this.side == "left") {
                    processState.offsetX = diffX; 
                } else {
                    processState.offsetX = -diffX;
                }

                processState.offsetY = diffY;
            }
        }
        if (processState.editing == this.randomId) {
            if (touchPositions.length == 0) {
                processState.editing = null;
                return;
            }
            var position = touchPositions[0];
            var newX = position.left - processState.offsetX;
            var newY = position.top - processState.offsetY;
            

            if (processState.resizing) {
                var deltaX = position.left - processState.startX;
                var deltaY = position.top - processState.startY;

                var percentDelta = TouchControlButton.calculatePercentSize(deltaX, deltaY);

                if (this.side == "left") {
                    this.width = Math.max(5, processState.startWidth + percentDelta.percentX);
                } else {
                    this.width = Math.max(5, processState.startWidth - percentDelta.percentX);
                }

                this.height = Math.max(5, processState.startHeight - percentDelta.percentY);
            } else {
                var percentSize = TouchControlButton.calculatePercentSize(newX, newY);
                percentSize.percentY = 100-percentSize.percentY;
                this.xPos = percentSize.percentX;
                this.yPos = percentSize.percentY;
            }
            this.setcssvar("--button-x", this.xPos + "%");
            this.setcssvar("--button-y", this.yPos + "%");
            this.setcssvar("--button-width", this.width + "%");
            this.setcssvar("--button-height", this.height + "%");
        
            elm.setAttribute("data-touching", "");
        } else {
            elm.removeAttribute("data-touching");
        }
    }

    process (touchPositions, processState) {
        this.resizeJoystick();
        var elm = this.elm;

        if (KeyNum[this.id] == KeyNum.UI_SHOW_KEYBOARD) {
            this.elm.textContent = keyboardIsActive() ? "Hide touch keyboard" : "Show touch keyboard";
        }
        if (this.editMode) {
            this.editModeProcess(touchPositions, processState);
            return;
        }

        processState.disableDefault = true;

        if (this.isJoystick && (processState.touchingJoystick == this.randomId || !processState.touchingJoystick)) {
            this.handleJoystick(touchPositions, processState);
            return;
        }

        if (this.isJoystick) {
            return;
        }

        if (this.isTouchingOneOf(touchPositions)) {
            if (!this._justPressed) {
                sendInput(this.id, true);
                elm.setAttribute("data-touching", "");
                this._justPressed = true;
            }
        } else {
            if (this._justPressed) {
                sendInput(this.id, false);
                elm.removeAttribute("data-touching");
                this._justPressed = false;
            }
        }
    }
}

module.exports = {
    TouchControlButton
};

/***/ },

/***/ 7819
(module) {

module.exports = [{"id":"UI_SHOW_KEYBOARD","side":"left","xPos":40.17871058004667,"yPos":13.101481595302062,"width":18.601126943116306,"height":6.828459419670805},{"id":"UI_JOYSTICK","side":"left","xPos":3.1178431140905243,"yPos":6.758033612335666,"width":21.353488547910185,"height":45.404400196616756},{"id":"gc_jump","side":"left","xPos":78.10466090547217,"yPos":4.155836917323143,"width":20.350633121339676,"height":39.27832499967394},{"id":"gc_use","side":"left","xPos":82.46759328102124,"yPos":45.30076678089785,"width":15.717010274638543,"height":12.036459895724645},{"id":"gc_lookdown","side":"left","xPos":66.08530159052434,"yPos":31.496942739852884,"width":10,"height":10},{"id":"gc_lookup","side":"left","xPos":65.85790318591005,"yPos":44.016246763812084,"width":10,"height":10},{"id":"gc_turnleft","side":"left","xPos":54.98058492233254,"yPos":41.61250603218907,"width":10,"height":10},{"id":"gc_turnright","side":"left","xPos":54.94415149158126,"yPos":29.6598252947621,"width":10,"height":10},{"id":"gc_pause","side":"left","xPos":83.33942977436116,"yPos":89.02012438129304,"width":10,"height":10},{"id":"gc_systemmenu","side":"left","xPos":88.95395594494933,"yPos":76.18373558795909,"width":10,"height":10},{"id":"gc_console","side":"left","xPos":2.1808423200079496,"yPos":87.40042812239149,"width":10,"height":10},{"id":"gc_talkkey","side":"left","xPos":77.00709151663159,"yPos":75.84854660925762,"width":10,"height":10}];

/***/ },

/***/ 8897
(module, __unused_webpack_exports, __webpack_require__) {

var { KeyNum, KeyName } = __webpack_require__(627);
var { showKeyboard, hideKeyboard, toggleKeyboard, keyboardIsActive } = __webpack_require__(5000);
var keyState = {};

if (window["Module"]) {
  var Module = window["Module"];
}

function sendInput(nameid, down) {
    var number = KeyNum[nameid];

    if (number == KeyNum.UI_SHOW_KEYBOARD) {
        if (down) {
            toggleKeyboard();
        }
        return;
    }
    if (number == KeyNum.UI_JOYSTICK) {
        //Won't do anything because it's not a button.
        return;
    }

    var downNumber = down ? 1 : 0;
    var downBool = !!down;

    if (!Module.ccall) {
        return;
    }
    if (!!keyState[number] == !!downBool) {
        return;
    }
    Module.ccall(
        'SRB2_SetDirectAction',
        'void',
        ['number','number'],
        [number, downNumber]
    );

    if (downBool) {
        keyState[number] = downBool; 
    } else {
        delete keyState[number];
    }
    //window.alert("sent direct action: "+nameid+","+down);
}

function sendJoystick(x,y) {
    if (!Module.ccall) {
        return;
    }
    var range = 0.7;
    sendInput("gc_forward", y > range);
    sendInput("gc_backward", y < -range);
    sendInput("gc_strafeleft", x < -range);
    sendInput("gc_straferight", x > range);
}

module.exports = {
    sendInput,
    sendJoystick,
    keyboardIsActive
}

/***/ },

/***/ 2229
(module, __unused_webpack_exports, __webpack_require__) {

var { KeyNum, KeyName } = __webpack_require__(627);
var { TouchControlButton } = __webpack_require__(7841);
var { startInputProcessor, stopInputProcessor } = __webpack_require__(101);
var { showKeyboard, hideKeyboard, toggleKeyboard, keyboardIsActive, activateKeyboardChecks, deactivateKeyboardChecks } = __webpack_require__(5000);

var state = {
    ingameTouch: false,
    UnlockMouse: () => {},
};

function startupTouchControls() {
    function activate(e) {
        if (state.ingameTouch) {
            return;
        }
        if (state.UnlockMouse) {
            state.UnlockMouse();
        }
        state.ingameTouch = true;
        startInputProcessor();
        activateKeyboardChecks();
        e.preventDefault();
        e.stopPropagation();
    }
    function deactivate(e) {
        if (document.activeElement) { //So using the touch keyboard doesn't cause the touch controls to disappear.
            if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                return;
            }
        }
        if (!state.ingameTouch) {
            return;
        }
        state.ingameTouch = false;
        stopInputProcessor();
        deactivateKeyboardChecks();
        hideKeyboard();
    }

    document.addEventListener("touchstart", activate);
    document.addEventListener("keydown", deactivate);
    document.addEventListener("gamepadconnected", deactivate);
}

function startTouchCustomization() {
    startInputProcessor(true);
    deactivateKeyboardChecks();
}

module.exports = {
    startupTouchControls,
    startTouchCustomization,
    state
};

/***/ },

/***/ 5000
(module) {

if (window["Module"]) {
  var Module = window["Module"];
}

var input = document.createElement("input");
input.type = "text";
input.className = "touchControlsInput";
input.autocomplete = "off";
input.autocorrect = "off";
input.autocapitalize = "none"; 
input.inputMode = "text";
input.spellcheck = false;
input.value = "\u200b"; //Intentionally have a space to detect backspace.

// APPEND INPUT TO DOM SO IT CAN RECEIVE FOCUS
document.body.appendChild(input);
// Hide it visually but keep it functional
input.style.position = "absolute";
input.style.opacity = "0";
input.style.pointerEvents = "none";

var lastReadIndex = 1; 

function injectSafer(content) {
 for (var char of content) { //calling more than one character might crash the game, so this might be a good fix.
   Module.ccall(
                    'inject_text',
                    'void',
                    ['string'],
                    [char]
                );
 }
}

input.addEventListener("input", function (e) {
    if (!Module.ccall || !keyboardActive) {
        return;
    }

    var currentValue = input.value;
    var type = e.inputType;

    var isDelete = (
        type === "deleteContentBackward" || 
        currentValue.length === 0 || 
        currentValue.charAt(0) !== "\u200b" || 
        currentValue.length < lastReadIndex
    );

    if (isDelete) {
        try {
            // Your custom C++ backspace injection logic (keydown then keyup)
            Module.ccall('inject_keycode', null, ['int', 'int'], [8, false]);
            Module.ccall('inject_keycode', null, ['int', 'int'], [8, true]);
        } catch (err) {
            console.error("Failed to inject backspace:", err);
        }
        
        // Fully restore the anchor and reset tracking indices safely
        input.value = "\u200b";
        lastReadIndex = 1;
        e.preventDefault();
        e.stopPropagation();
        return; // Exit early since we handled the deletion
    }

    // Handle Enter key - keyCode 13
    var isEnter = (type === "insertLineBreak");
    if (isEnter) {
        try {
            Module.ccall('inject_keycode', null, ['int', 'int'], [13, false]); // keydown
            Module.ccall('inject_keycode', null, ['int', 'int'], [13, true]);  // keyup
        } catch (err) {
            console.error("Failed to inject enter:", err);
        }
        
        input.value = "\u200b";
        lastReadIndex = 1;
        e.preventDefault();
        e.stopPropagation();
        return;
    }

    // 2. Expand matching to include composition events used by Samsung/Gboard
    var isInsert = (
        type === "insertText" || 
        type === "insertFromPaste" || 
        type === "insertReplacementText" ||
        type === "insertCompositionText" ||
        currentValue.length > lastReadIndex // Fallback if inputType is missing but text grew
    );

    if (isInsert) {
        // Extract only the fresh characters typed since our last execution loop
        // Skip the zero-width anchor character at position 0
        var textToInject = currentValue.substring(Math.max(1, lastReadIndex));

        try {
            if (textToInject && textToInject.length > 0) {
              injectSafer(textToInject);
            }
        } catch (err) {
            console.error("Failed to inject text:", err);
        }

        // Lock in our new reading position
        lastReadIndex = currentValue.length;
        e.preventDefault();
        e.stopPropagation();
    }

    if (currentValue.length > 30) {
        var keepLength = 10; 
        var preservedText = currentValue.substring(currentValue.length - keepLength);
        
        input.value = "\u200b" + preservedText;
        lastReadIndex = input.value.length;
    }
});

// SAMSUNG/GBOARD FIX: Add keydown listener specifically for Enter key
// This ensures Enter is detected even when inputType doesn't fire reliably on Samsung Galaxy
input.addEventListener("keydown", function (e) {
    if (!Module.ccall || !keyboardActive) {
        return;
    }

    // Check for Enter key (keyCode 13 or key === "Enter")
    if (e.keyCode === 13 || e.key === "Enter") {
        try {
            Module.ccall('inject_keycode', null, ['int', 'int'], [13, false]); // keydown
            Module.ccall('inject_keycode', null, ['int', 'int'], [13, true]);  // keyup
        } catch (err) {
            console.error("Failed to inject enter via keydown:", err);
        }

        // Reset input state
        input.value = "\u200b";
        lastReadIndex = 1;

        e.preventDefault();
        e.stopPropagation();
    }
});

var keyboardActive = false;

input.addEventListener("focus", () => {keyboardActive = true;});
input.addEventListener("blur", () => {keyboardActive = false;});

var focusLoop = null;

function showKeyboard() {
    clearInterval(focusLoop);
    focusLoop = setInterval(() => {
        try{
            input.focus();
        }catch(e){
            console.error("Failed to focus keyboard input in focus loop:", e);
        }
    },100);
    try{
        input.focus();
    }catch(e){
        console.error("Failed initial focus for keyboard input:", e);
    }
}

function hideKeyboard() {
    try{
        input.blur();
    }catch(e){}
    clearInterval(focusLoop);
}

function toggleKeyboard() {
    if (keyboardActive) {
        hideKeyboard();
    } else {
        showKeyboard();
    }
}

function keyboardIsActive() {
    return keyboardActive;
}

var checkInterval = null;
function activateKeyboardChecks() {
    var state = false;
    deactivateKeyboardChecks();
    checkInterval = setInterval(() => {
        if (!Module.ccall) {
            return;
        }
        // Show keyboard by default since we're in touch mode
        if (!state) {
            state = true;
            //don't show because this keeps the keyboard opening even if you're trying to play the game            //showKeyboard();
        }
    }, 1000/30);
}

function deactivateKeyboardChecks() {
    clearInterval(checkInterval);
    hideKeyboard();
}

// INITIALIZE ON PAGE LOAD - This was missing!
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        activateKeyboardChecks();
    });
} else {
    activateKeyboardChecks();
}

//Coommented out since the touch button does that.
/*document.addEventListener("click", function() {
    var isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && !keyboardActive) {
        showKeyboard();
    }
});*/

module.exports = {
    showKeyboard,
    hideKeyboard,
    toggleKeyboard,
    keyboardIsActive,
    activateKeyboardChecks,
    deactivateKeyboardChecks
};


/***/ },

/***/ 627
(module) {

//////////////////////////////////////////////////////////////

var KeyNum = {
	//Purely custom key numbers, not used by the C logic, but are added to keep the UI for them consistent with the rest of the controls:
	UI_SHOW_KEYBOARD: 1000,
	UI_JOYSTICK: 1001,

	///////////////////////////////////////////
	//Source: g_input.h

    gc_null: 0, // a key/button mapped to gc_null has no effect
	gc_forward: 1,
	gc_backward: 2,
	gc_strafeleft: 3,
	gc_straferight: 4,
	gc_turnleft: 5,
	gc_turnright: 6,
	gc_weaponnext: 7,
	gc_weaponprev: 8,
	gc_wepslot1: 9,
	gc_wepslot2: 10,
	gc_wepslot3: 11,
	gc_wepslot4: 12,
	gc_wepslot5: 13,
	gc_wepslot6: 14,
	gc_wepslot7: 15,
	gc_wepslot8: 16,
	gc_wepslot9: 17,
	gc_wepslot10: 18,
	gc_fire: 19,
	gc_firenormal: 20,
	gc_tossflag: 21,
	gc_use: 22,
	gc_camtoggle: 23,
	gc_camleft: 24,
	gc_camright: 25,
	gc_camreset: 26,
	gc_lookup: 27,
	gc_lookdown: 28,
	gc_centerview: 29,
	gc_mouseaiming: 30, // mouse aiming is momentary (toggleable in the menu)
	gc_talkkey: 31,
	gc_teamkey: 32,
	gc_scores: 33,
	gc_jump: 34,
	gc_console: 35,
	gc_pause: 36,
	gc_systemmenu: 37,
	gc_screenshot: 38,
	gc_recordgif: 39,
	gc_viewpoint: 40,
	gc_custom1: 41, // Lua scriptable
	gc_custom2: 42, // Lua scriptable
	gc_custom3: 43, // Lua scriptable
};

//////////////////////////////////////////////////////////////

var KeyName = {
	//Purely custom key names, not used by C logic, but are added to keep the UI for them consistent with the rest of the controls:
	UI_SHOW_KEYBOARD: "Toggle touch keyboard",
	UI_JOYSTICK: "Virtual joystick",

	///////////////////////////////////////////
	//Source: m_menu.c

    gc_forward: "Move forward",
	gc_backward: "Move backward",
	gc_strafeleft: "Move left",
	gc_straferight: "Move right",
	gc_jump: "Jump",
	gc_use: "Spin",
	gc_lookup: "Look up",
	gc_lookdown: "Look down",
	gc_turnleft: "Turn left",
	gc_turnright: "Turn right",
	gc_centerview: "Center view",
	gc_mouseaiming: "Toggle Mouselook",
	gc_camtoggle: "Toggle third-person",
	gc_camreset: "Reset camera",
	gc_camleft: "Rotate camera L",
	gc_camright: "Rotate camera R",
	gc_talkkey: "Talk key",
	gc_teamkey: "Team-Talk key",
	gc_scores: "Rankings/Scores",
	gc_tossflag: "Toss flag",
	gc_weaponnext: "Next weapon",
	gc_weaponprev: "Prev weapon",
	gc_wepslot1: "Weapon Slot 1",
	gc_wepslot2: "Weapon Slot 2",
	gc_wepslot3: "Weapon Slot 3",
	gc_wepslot4: "Weapon Slot 4",
	gc_wepslot5: "Weapon Slot 5",
	gc_wepslot6: "Weapon Slot 6",
	gc_wepslot7: "Weapon Slot 7",
	gc_fire: "Ring Toss",
	gc_firenormal: "Ring Toss Normal",
	gc_custom1: "Custom action 1",
	gc_custom2: "Custom action 2",
	gc_custom3: "Custom action 3",
	gc_pause: "Pause",
	gc_screenshot: "Screenshot",
	gc_recordgif: "Toggle GIF recording",
	gc_systemmenu: "Open/Close menu (ESC)",
	gc_viewpoint: "Change viewpoint",
	gc_console: "Console"
};

//////////////////////////////////////////////////////////////

function getButtonLabels() {
	return Object.keys(KeyName).map(key => {
		return {id: key, label: KeyName[key]};
	});
}

//////////////////////////////////////////////////////////////

module.exports = {
    KeyNum,
    KeyName,
	getButtonLabels
};

/***/ },

/***/ 101
(module, __unused_webpack_exports, __webpack_require__) {

var { TouchControlButton } = __webpack_require__(7841);
var { KeyName, KeyNum, getButtonLabels } = __webpack_require__(627);
var { showKeyboard, hideKeyboard, toggleKeyboard, keyboardIsActive } = __webpack_require__(5000);
var dialog = __webpack_require__(5925);
var elements = __webpack_require__(5100);
var processRate = 1000/60;
var processInterval = null;
var inEditMode = false;
var buttons = [];

var defaultPreset = __webpack_require__(7819);

var touchControlsDialogDiv = elements.getGPId("touchControlsDialog");
var touchControlsContainer = elements.getGPId("touchControlsContainer");

function destroyButtons () {
    buttons.forEach((button) => {button.destroy();});
    buttons = [];
}

function createButton(data) {
    var button = data ? (TouchControlButton.fromSavedData(data)) : (new TouchControlButton());
    button.editMode = inEditMode;
    button.append(touchControlsContainer);
    return button;
}

function saveButtons() {
    var data = buttons.map((button) => {return button.save();});
    localStorage.setItem("touchControls", JSON.stringify(data));
    dialog.alert("Touch controls saved.");
}

function loadButtonsData(data) {
    var buttonsArray = [];
    if (typeof data == "string") {
        try{
            buttonsArray = JSON.parse(data);
        }catch(e){
            dialog.alert("Invalid data. "+e);
        }
    } else {
        buttonsArray = data;
    }

    if (!Array.isArray(buttonsArray)) {
        buttonsArray = [];
        dialog.alert("Invalid data, button data should be an array.");
    }

    destroyButtons();
    buttons = buttonsArray.map(buttonData => createButton(buttonData));
}
function loadButtons() {
    var data = localStorage.getItem("touchControls");
    if (!data) {
        loadButtonsData(defaultPreset);
    } else {
        loadButtonsData(data);
    }
}

var touchPositions = [];
var touches = [];
var active = false;
var processState = {};
function generateTouchRandomId() {
    return Date.now()+"_"+(Math.random()*100000);
}
touchControlsContainer.addEventListener("touchstart", function (e) {
    if (!active) {
        return;
    }
    for (var touch of e.changedTouches) {
        if (!touches.find(t => t.id == touch.identifier)) {
            touches.push({
                id: touch.identifier,
                rid: generateTouchRandomId(),
                clientX: touch.clientX,
                clientY: touch.clientY,
                radiusX: touch.radiusX,
                radiusY: touch.radiusY,
                top: touch.clientY,
                left: touch.clientX,
                width: touch.radiusX < 2 ? 2 : touch.radiusX,
                height: touch.radiusY < 2 ? 2 : touch.radiusY,
                touching: true
            });
        }
    }
    if (processState.disableDefault) {
        e.preventDefault();
        e.stopPropagation();
    }
}, { passive: false });
touchControlsContainer.addEventListener("touchmove", function (e) {
    if (!active) {
        return;
    }
    for (var touch of e.changedTouches) {
        var t = touches.find(t => t.id == touch.identifier);
        if (t) {
            t.clientX = touch.clientX;
            t.clientY = touch.clientY;
            t.radiusX = touch.radiusX;
            t.radiusY = touch.radiusY;
            t.left = touch.clientX;
            t.top = touch.clientY;
            t.width = touch.radiusX < 2 ? 2 : touch.radiusX;
            t.height = touch.radiusY < 2 ? 2 : touch.radiusY;
        }
    }
    if (processState.disableDefault) {
        e.preventDefault();
        e.stopPropagation();
    }
}, { passive: false });
touchControlsContainer.addEventListener("touchend", function (e) {
    if (!active) {
        return;
    }
    for (var touch of e.changedTouches) {
        var t = touches.find(t => t.id == touch.identifier);
        if (t) {
            t.touching = false;
            touches = touches.filter(t => t.id !== touch.identifier);
        }
    }
    if (processState.disableDefault) {
        e.preventDefault();
        e.stopPropagation();
    }
}, { passive: false });

function updateTouchPositions() {
    touchPositions = touches;
}

function startInputProcessor(editMode) {
    stopInputProcessor();
    active = true;
    inEditMode = !!editMode;

    if (editMode) {
        touchControlsDialogDiv.hidden = false;
    }
    touchControlsContainer.hidden = false;

    processInterval = setInterval(() => {
        updateTouchPositions();
        Array.from(buttons).reverse().forEach(button => {
            if (button.destroyed) {
                buttons = buttons.filter(b => b.randomId !== button.randomId);
            } else {
                button.process(touchPositions, processState);
            }
        });
    },processRate);

    loadButtons();
}

function stopInputProcessor() {
    active = false;
    clearInterval(processInterval);
    inEditMode = false;
    touchControlsDialogDiv.hidden = true;
    touchControlsContainer.hidden = true;
    processState = {};
    destroyButtons();
}

elements.getGPId("touchControlsClose").addEventListener("click", async function () {
    var promise = dialog.confirm("Are you sure you want to exit? Unsaved changes will be lost.");
    promise.then((result) => {
        if (result) {
            stopInputProcessor();
        }
    });
});

var touchControlsAddDropdown = elements.getGPId("touchControlsAddDropdown");
var touchControlsAdd = elements.getGPId("touchControlsAdd");
function closeAddDropdown() {
    touchControlsAddDropdown.hidden = true;
    elements.removeAllChildren(touchControlsAddDropdown);
}
touchControlsAdd.addEventListener("click", function (e) {
    e.stopPropagation();
    if (touchControlsAddDropdown.hidden) {
        touchControlsAddDropdown.hidden = false;
        elements.removeAllChildren(touchControlsAddDropdown);
        function clickHandler(event, keyid) {
            var button = createButton(TouchControlButton.createEmptyButtonData(keyid));
            buttons.push(button);
            closeAddDropdown();
            event.stopPropagation();
        }
        elements.setInnerJSON(
            touchControlsAddDropdown,
            getButtonLabels().map((key) => {
                if (!key.label) {
                    return;
                }
                return {
                    element: "div",
                    className: "option",
                    textContent: key.label,
                    eventListeners: [
                        {
                            event: "click",
                            func: (e) => {clickHandler(e, key.id)}
                        }
                    ]
                };
            })
        );
    } else {
        closeAddDropdown();
    }
});
document.addEventListener("click", function () { //Allow the user to tap off.
    closeAddDropdown();
});

var touchControlsReset = elements.getGPId("touchControlsReset");
touchControlsReset.addEventListener("click", function () {
    if (!active) {
        return;
    }
    var promise = dialog.confirm("Are you sure you want to reset? This cannot be undone.");
    promise.then((result) => {
        if (result) {
            loadButtonsData(defaultPreset);
        }
    });
});

var touchControlsSave = elements.getGPId("touchControlsSave");
touchControlsSave.addEventListener("click", function (event) {
    if (!active) {
        return;
    }
    if (event.shiftKey) {
        var data = buttons.map(button => button.save());
        dialog.alert(JSON.stringify(data));
    } else {
        saveButtons();
    }
});

module.exports = {
    startInputProcessor,
    stopInputProcessor
};

/***/ },

/***/ 492
(module) {

module.exports = "body {\n  background: #000000;\n  font-family: PixelFont, Arial, sans-serif;\n  letter-spacing: 1px;\n  margin: 0;\n  padding: 0;\n  height: 100dvh;\n  width: 100dvw;\n  overflow-x: auto;\n  overflow-y: auto;\n}\n\n.sep {\n  width: 100%;\n  height: 10px;\n  margin-bottom: 10px;\n  border-bottom-style: solid;\n  border-bottom-width: 2px;\n  border-bottom-color: rgb(0, 110, 255);\n}\n\na {\n  all: unset;\n  color: #00ffff;\n  text-decoration: none;\n}\na:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.srb2BG {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background: url(\"images/legacybg.png\") center/cover no-repeat;\n  pointer-events: none;\n  image-rendering: pixelated;\n  filter: brightness(0.5);\n}\n\n.launcherMain {\n  min-width: 600px;\n  width: calc(100vw - 400px);\n  height: calc(100dvh - 0px);\n  padding: 10px 10px;\n  box-sizing: border-box;\n\n  position: absolute;\n  left: 50%;\n  top: 0px;\n  transform: translate(-50%, 0px);\n\n  background: rgba(0, 0, 0, 0.619);\n  color: #ffffff;\n  border-radius: 1px;\n  overflow: auto;\n}\n\n.button {\n  all: unset;\n  padding: 5px 5px;\n  background: rgba(0, 0, 0, 0.5);\n  color: #ffffff;\n  border-radius: 3px;\n}\n\n.button:hover {\n  background: rgba(117, 117, 117, 0.5);\n  cursor: pointer;\n}\n\n.playButton {\n  font-size: 30px;\n  background: rgba(9, 255, 0, 0.5);\n  width: 100%;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n\n  gap: 10;\n}\n\n.playButton:hover {\n  background: rgba(9, 255, 0, 0.7);\n}\n\n.fsButton {\n  font-size: 30px;\n  background: rgba(255, 157, 0, 0.5);\n  width: 100%;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  gap: 10;\n}\n\n.fsButton:hover {\n  background: rgba(255, 157, 0, 0.7);\n}\n\n.browseButton {\n  font-size: 30px;\n  background: rgba(174, 0, 255, 0.5);\n  width: 100%;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  gap: 10;\n}\n\n.browseButton:hover {\n  background: rgba(174, 0, 255, 0.7);\n}\n\n.switchGameButton {\n  font-size: 30px;\n  background: rgba(0, 191, 255, 0.5);\n  width: 100%;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  gap: 10;\n}\n\n.switchGameButton:hover {\n  background: rgba(0, 191, 255, 0.7);\n}\n\n.gameCanvas {\n  background: black;\n  width: 100dvw;\n  height: 100dvh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  image-rendering: pixelated;\n  object-fit: fill;\n}\n\n.sectionHeader {\n  display: block;\n  font-size: 30px;\n  margin-bottom: 10px;\n}\n\n.loaderMain {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.relayConfig {\n  width: calc(100% - 0px);\n  height: fit-content;\n  max-height: 200px;\n  min-height: 100px;\n  box-sizing: border-box;\n  padding: 2px;\n  color: #ffffff;\n  border-radius: 0px;\n  border-style: solid;\n  border-width: 2px;\n  border-color: rgba(0, 38, 255, 0.747);\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.noRelayText {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n\n  color: rgba(255, 255, 255, 1);\n}\n\n.configuredRelay {\n  width: 100%;\n  min-height: 100px;\n  box-sizing: border-box;\n  color: #ffffff;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 3px;\n  display: flex;\n  flex-direction: column;\n  padding: 5px;\n  flex-shrink: 0;\n  overflow: wrap;\n  text-wrap: wrap;\n}\n\n.configuredRelay[used] {\n  background: rgba(255, 255, 255, 0.4);\n}\n\n.relayName {\n  font-size: 20px;\n  overflow: wrap;\n  text-wrap: wrap;\n}\n\n.relayHost {\n  margin-left: auto;\n  font-size: 10px;\n  font-style: italic;\n  color: rgb(0, 110, 255);\n  user-select: none;\n}\n\n.relayHostClickable:hover {\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n.relayStatus {\n  display: flex;\n  gap: 3px;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n}\n\n.relayStatusText {\n  color: rgb(255, 255, 255);\n  font-size: 10px;\n  text-align: center;\n}\n.relayStatusText[state=\"offline\"] {\n  color: rgb(255, 0, 0);\n}\n.relayStatusText[state=\"online\"] {\n  color: rgb(0, 255, 0);\n}\n\n.relayStatusImg {\n  width: 28px;\n  height: 28px;\n  image-rendering: pixelated;\n}\n\n.relayDescription {\n  font-size: 10px;\n  white-space: pre;\n  padding-left: 5px;\n  overflow: wrap;\n  text-wrap: wrap;\n}\n\n.relayPublicCount {\n  font-size: 14px;\n  white-space: pre;\n  padding-left: 5px;\n  overflow: wrap;\n  text-wrap: wrap;\n}\n\n.relayButtons {\n  margin-top: 2px;\n  display: block;\n}\n\n.relayButtons > .button {\n  margin: 1px 1px;\n}\n\n:root {\n  --popup-dialog-font: Arial, sans-serif;\n  --popup-dialog-background: #fff;\n  --popup-dialog-border-radius: 10px;\n  --popup-dialog-text-color: #000;\n  --popup-dialog-button-background: #5985ff;\n  --popup-dialog-button-hover-background: #4275ff;\n  --popup-dialog-button-text-color: #fff;\n  --popup-dialog-button-radius: 5px;\n  --popup-dialog-input-background: #fff;\n  --popup-dialog-input-border-width: 1.5px;\n  --popup-dialog-input-border-color: #bababa;\n  --popup-dialog-input-text-color: #000;\n  --popup-dialog-message-size: 16px;\n}\n\n.windowDialogContainer {\n  font-family: var(--popup-dialog-font);\n  z-index: 99999999;\n}\n\n.windowDialogBackground {\n  background-color: black;\n  backdrop-filter: blur(2px);\n}\n\n.windowDialogBox {\n  background: var(--popup-dialog-background);\n  border-radius: var(--popup-dialog-border-radius);\n  color: var(--popup-dialog-text-color);\n}\n\n.windowDialogButton {\n  background: var(--popup-dialog-button-background);\n  color: var(--popup-dialog-button-text-color);\n  border-radius: var(--popup-dialog-button-radius);\n  padding: 4px 8px;\n  border: none;\n  cursor: pointer;\n}\n\n.windowDialogButton:hover {\n  background: var(--popup-dialog-button-hover-background);\n}\n\n.windowDialogInput {\n  background: var(--popup-dialog-input-background);\n  border: var(--popup-dialog-input-border-width) solid\n    var(--popup-dialog-input-border-color);\n  color: var(--popup-dialog-input-text-color);\n  outline: none;\n  border-radius: 4px;\n  padding: 4px;\n}\n\n.windowDialogHeader {\n  font-weight: bold;\n  font-size: var(--popup-dialog-message-size);\n}\n\n.logsContainer {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100dvh;\n    background: hsl(0, 0%, 13%);\n    color: #adadad;\n    font-family: monospace;\n    font-size: 14px;\n    overflow: auto;\n    box-sizing: border-box;\n    padding: 2px;\n    z-index: 1500;\n}\n\n.publicNetgameBrowserContainer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100dvh;\n  background: rgba(0,0,0,0.5);\n}\n\n.publicNetgameBrowserDialog {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: calc(100% - 150px);\n  height: calc(100dvh - 150px);\n  min-width: 640px;\n  min-height: 360px;\n  border-radius: 3px;\n  background: rgba(255,255,255,1);\n  display: flex;\n  flex-direction: row;\n}\n\n.publicNetgameBrowserLeft {\n  display: flex;\n  flex-direction: column;\n  min-width: 200px;\n  width: calc(100% - 450px);\n  max-width: 300px;\n  border-right: 2px solid rgba(0,0,0,0.3);\n  box-sizing: border-box;\n  flex-shrink: 0;\n  flex-grow: 0;\n  gap: 3px;\n  overflow: auto;\n}\n\n.publicNetgameItem {\n  width: 100%;\n  box-sizing: border-box;\n  height: fit-content;\n  min-height: 50px;\n  padding: 5px 5px;\n  background: rgba(0,0,0,0.5);\n  color: rgba(255,255,255,1);\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n\n.publicNetgameItem:hover {\n  background: rgba(0,0,0,0.7);\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.publicNetgameItem[viewing] {\n  text-decoration: underline;\n  cursor: unset;\n}\n\n.publicGameSeparator {\n  width: 100%;\n  height: 0px;\n  margin-top: 3px;\n  margin-bottom: 3px;\n  border-bottom-color: black;\n  border-bottom-style: dashed;\n  border-bottom-width: 2px;\n  box-sizing: border-box;\n}\n\n.publicNetgameBrowserRight {\n  display: block;\n  flex-grow: 1;\n  position: relative;\n}\n\n.publicNetgameBrowserCloseButton {\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-size: 30px;\n}\n\n.viewPublicNetgameDetails {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: rgba(0,0,0,0.5);\n  color: rgba(255,255,255,1);\n  padding: 5px 5px;\n  border-radius: 3px;\n}\n\n.publicNetgameDetails {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n  height: 100%;\n  padding: 10px 10px;\n  box-sizing: border-box;\n}\n\n.refreshIcon {\n  width: 32px;\n  height: 32px;\n}\n\n.netgameServerName {\n  font-size: 30px;\n}\n\n.netgameServerURL {\n  font-size: 16px;\n  margin-left: 5px;\n  font-family: arial;\n}\n\n.netgameGameName {\n  font-size: 16px;\n}\n\n.netgameCommunicationType {\n  width: 25px;\n  height: 25px;\n  object-fit: contain;\n  padding: 5px 5px;\n  border-radius: 3px;\n  background: rgba(255,255,255,0.4);\n}\n\n.netgameLoadingListsContainer {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%,-50%);\n  width: fit-content;\n  height: fit-content;\n  box-sizing: border-box;\n  padding: 4px 4px;\n  background: rgba(255,255,255,0.5);\n  color: rgba(0,0,0,1);\n  border-radius: 4px;\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  gap: 8px;\n}\n\n.netgameLoadingListsImg {\n  width: 30px;\n  height: 30px;\n}\n\n\n.dontSellText {\n  color: rgb(196, 0, 0);\n  font-size: 35px;\n}\n\n.displayOption {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n\n.selectOptions {\n  all: unset;\n  display: block;\n  box-sizing: border-box;\n  padding: 4px 4px;\n  color: black;\n  background: rgba(255,255,255,0.7);\n  appearance: auto;\n  border-radius: 5px;\n}\n\n.touchControlPosition[data-position=\"left\"] {\n  position: fixed;\n  left: var(--button-x);\n  bottom: var(--button-y);\n  will-change: left, right, bottom;\n  contain: layout paint; \n  user-select: none;\n  -webkit-user-select: none;\n}\n\n.touchControlPosition[data-position=\"right\"] {\n  position: fixed;\n  right: var(--button-x);\n  bottom: var(--button-y);\n  will-change: left, right, bottom;\n  contain: layout paint; \n  user-select: none;\n  -webkit-user-select: none;\n}\n\n.touchControlBox {\n  background: rgba(255,255,255,1);\n  border-radius: 0px;\n  border-width: 0.5vmin;\n  border-color: rgba(0,0,0,1);\n  border-style: solid;\n  width: 2vmin;\n  height: 2vmin;\n  transform: translate(-50%, 50%);\n}\n.touchControlBox[data-position=\"left\"]  {\n  position: fixed;\n  bottom: var(--button-y);\n  left: calc(calc(var(--button-x) + var(--button-width)));\n}\n\n.touchControlDeleteBox {\n  background: rgb(255, 0, 0);\n  border-radius: 0px;\n  border-width: 0.5vmin;\n  border-color: rgba(0,0,0,1);\n  border-style: solid;\n  width: 2vmin;\n  height: 2vmin;\n  transform: translate(-50%, 50%);\n}\n.touchControlDeleteBox[data-position=\"left\"]  {\n  position: fixed;\n  bottom: calc(var(--button-y));\n  left: var(--button-x);\n}\n\n.touchActionButton {\n  all: unset;\n  position: absolute;\n  width: var(--button-width);\n  height: var(--button-height);\n  background: rgba(255,255,255,0.5);\n  color: rgba(0,0,0,0.6);\n  border-radius: 0.5vmin;\n  cursor: not-allowed;\n  font-size: 4vmin;\n  box-sizing: border-box;\n  padding: 3vmin 3vmin;\n  /* The actual touch events are handled by the JavaScript collision tests */\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n}\n.touchActionButton[data-touching] {\n  background: rgba(255,255,255,0.8);\n}\n\n.blackDialogBG {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100dvh;\n  background: rgba(0,0,0,0.8);\n}\n\n.whiteDialogBox {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: rgba(255,255,255,1);\n  color: rgba(0,0,0,1);\n  padding: 10px 10px;\n  box-sizing: border-box;\n  border-radius: 5px;\n}\n\n.touchControlsDialog {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100dvh;\n}\n.touchControlsDialogTitle {\n  font-size: 7vmin;\n  color: rgba(255,255,255,1);\n}\n\n.touchControlsDialogButton {\n  all: unset;\n  background: rgba(255,255,255,0.8);\n  color: rgba(0,0,0,0.6);\n  border-radius: 0.5vmin;\n  font-size: 4vmin;\n  width: fit-content;\n  height: fit-content;\n  box-sizing: border-box;\n  padding: 1vmin 1vmin;\n}\n\n.touchControlsDialogButton:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.touchControlsDialogRedButton {\n  background: rgba(255,50,0,0.8);\n}\n.touchControlsDialogGreenButton {\n  background: rgba(4, 255, 0, 0.8);\n}\n\n.touchControlDialogEditButtons {\n  position: relative;\n  display: flex;\n  flex-direction: row;\n}\n\n.touchControlsDialogTip {\n  color: rgb(255, 0, 0);\n  font-size: 4vmin;\n  user-select: none;\n  pointer-events: none;\n}\n\n.touchControlsDialogTip2 {\n  color: rgba(255,255,255,1);\n  font-size: 3.5vmin;\n  user-select: none;\n  pointer-events: none;\n}\n\n.touchControlsContainer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  /*width: 100%;\n  height: 100dvh;*/\n  overflow: visible;\n  user-select: none;\n}\n\n.touchControlsAddDropdownContainer {\n  position: relative;\n  width: 0px;\n  height: 0px;\n}\n.touchControlsAddDropdown {\n  text-decoration: unset;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: translate(0, 6vmin);\n  width: 50vmin;\n  max-height: 40vmin;\n  z-index: 99999;\n  background: rgba(255,255,255,0.9);\n  border-radius: 0.5vmin;\n  display: flex;\n  flex-direction: column;\n  gap: 0.2vmin;\n  padding: 0.2vmin 0.2vmin;\n  overflow: auto;\n}\n\n.touchControlsAddDropdown > .option {\n  all: unset;\n  padding: 1vmin 1vmin;\n  background: rgba(0,0,0,0.5);\n  color: rgba(255,255,255,1);\n  border-radius: 0.5vmin;\n  font-size: 3vmin;\n}\n.touchControlsAddDropdown > .option:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n.touchControlsEditButtonsSpacing {\n  all: unset;\n  margin-left: 0.5vmin;\n}\n\n.touchControlsContent {\n  position: fixed;\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  text-align: center;\n}\n\n.touchControlsJoystickContainer {\n  display: block;\n  width: var(--button-width);\n  height: var(--button-height);\n  overflow: visible;\n  user-select: none;\n}\n\n.touchControlsJoystick {\n  display: block;\n  width: var(--joystick-size);\n  height: var(--joystick-size);\n  background: rgba(255,255,255,0.3);\n  border-radius: 50%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  overflow: visible;\n  user-select: none;\n}\n\n.touchControlsJoystickCircle {\n  display: block;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 50%;\n  height: 50%;\n  background: rgba(0,0,255,0.4);\n  border-radius: 50%;\n  overflow: visible;\n  user-select: none;\n}\n\n.touchControlsJoystickCircle[data-touching] {\n  background: rgba(0,0,255,0.7);\n}\n\n.touchControlsInput {\n  all: unset;\n  position: fixed;\n  top: -100px;\n  left: -100px;\n  background: rgba(0,0,0,0);\n  color: rgba(0,0,0,0);\n  width: 1px;\n  height: 10px;\n  opacity: 0;\n  user-select: none;\n}\n\n.loadProgressMain {\n  min-width: 200px;\n  width: calc(100% - 30px);\n  height: 25px;\n  border-style: solid;\n  border-width: 2px;\n  border-color: rgb(255,255,255);\n  padding: 2px 2px;\n  box-sizing: border-box;\n  position: relative;\n}\n\n.loadProgressCurrentText {\n  color: rgba(91, 151, 253, 0.8);\n  font-style: italic;\n  font-size: 14px;\n  position: absolute;\n  top: 50%;\n  margin-left: 2px;\n  transform: translate(0%, -50%);\n  text-wrap: unset;\n  word-wrap: unset;\n  overflow-wrap: unset;\n}\n\n.loadProgressCurrent {\n  width: 100%;\n  height: 100%;\n  background: rgb(255,255,255);\n}";

/***/ },

/***/ 5187
() {

/* (ignored) */

/***/ },

/***/ 7919
() {

/* (ignored) */

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn) => {
/******/ 			if(chunkIds) {
/******/ 				deferred.push([chunkIds, fn]);
/******/ 				return;
/******/ 			}
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if (__webpack_require__.O.j(chunkIds[j])) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		if(Array.isArray(definition)) {
/******/ 			var i = 0;
/******/ 			while(i < definition.length) {
/******/ 				var key = definition[i++];
/******/ 				var binding = definition[i++];
/******/ 				var descriptor = binding === 0 ? { enumerable: true, value: definition[i++] } : { enumerable: true, get: binding };
/******/ 				if(!__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, descriptor);
/******/ 			}
/******/ 		} else {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			155: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = self["webpackChunksrb2_legacy_web"] = self["webpackChunksrb2_legacy_web"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, [804], () => (__webpack_require__(8769)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;