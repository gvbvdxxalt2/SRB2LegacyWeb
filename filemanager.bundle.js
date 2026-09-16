/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7826
(module, __unused_webpack_exports, __webpack_require__) {

var IMAGES = __webpack_require__(5857);

module.exports = [
  {
    element: "style",
    textContent: __webpack_require__(8922),
  },
  ...__webpack_require__(3694),
  {
    element: "style",
    textContent: "[hidden] { display: none; }",
  },
  {
    element: "div",
    className: "srb2BG"
  },
  {
    element: "img",
    className: "srb2Logo",
    src: "images/legacylogo.png"
  },
  {
    element: "div",
    className: "loadingScreen",
    gid: "loadingScreen",
    textContent: "File system is loading...",
  },
  {
    element: "div",
    className: "fileManagerMenuBar",
    children: [
      {
        element: "a",
        className: "fileManagerMenuButton",
        children: [
          {
            element: "div",
            className: "fileManagerImageContainer",
            children: [
              {
                element: "img",
                src: IMAGES.UP,
              }
            ]
          },
          {
            element: "span",
            textContent: "Return to game",
          }
        ],
        href: "/"
      },
      {
        element: "input",
        type: "text",
        gid: "filePathInput",
        className: "fileManagerPathBar",
      }
    ],
  },
  {
    element: "div",
    className: "fileList",
    gid: "fileListContainer",
  },
  {
    element: "div",
    className: "clickDropdownMenu",
    gid: "clickDropdownMenu",
  },
];


/***/ },

/***/ 5857
(module) {

module.exports = {
    UP: "images/M_FBACK.png",
    CONFIG: "images/M_FCFG.png",
    FOLDER: "images/M_FFLDR.png",
    LUA: "images/M_FLUA.png",
    X: "images/M_FNOPE.png",
    PK3: "images/M_FPK3.png",
    SAVE: "images/M_FSAVE.png",
    SOC: "images/M_FSOC.png",
    SEARCH: "images/M_FSRCH.png",
    TXT: "images/M_FTXT.png",
    QUESTION: "images/M_FUNKN.png",
    WAD: "images/M_FWAD.png",
};

/***/ },

/***/ 2167
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

if (!window["Module"]) {
  window["Module"] = {};
}

var elements = __webpack_require__(5100);
elements.appendElementsFromJSON(document.body, __webpack_require__(7826));
var { loadFilesystem } = __webpack_require__(3687);
var { joinPaths, getFileName, getFileExtension, doesMatchPaths } = __webpack_require__(892);
var fileSizeModule = __webpack_require__(9776);
var dialog = __webpack_require__(5925);
if (window["Module"]) {
  var Module = window["Module"];
}
var jszip = __webpack_require__(1710);
var loadingScreen = elements.getGPId("loadingScreen");
var didDisplayDataLossNotice = false;

var FS = null;
var filePathInput = elements.getGPId("filePathInput");
var fileListContainer = elements.getGPId("fileListContainer");
var clickDropdownMenu = elements.getGPId("clickDropdownMenu");
var currentPath = "/addons/userdata";
var multiSelectList = {};

var unsafePaths = [
  //Hide these from the user and block access to opening them.
  "/dev/",
  "/home/",
  "/proc/",
  "/tmp/",
  "/addons/.srb2_21/", //We already have one directory thats used for main access so there's no reason to have two identical directories.
];

var filePathClipboard = null;

var IMAGES = __webpack_require__(5857);

var FILE_ICON_TYPES = {
  wad: IMAGES.WAD,
  pk3: IMAGES.PK3,
  ssg: IMAGES.SAVE,
  dat: IMAGES.SAVE,
  lua: IMAGES.LUA,
  soc: IMAGES.SOC,
  txt: IMAGES.TXT,
  cfg: IMAGES.CONFIG,
};

clickDropdownMenu.hidden = true;
async function syncFs() {
  return new Promise((resolve, reject) => {
    FS.syncfs(false, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
function getPathIsDirectory(fullPath) {
  return FS.isDir(FS.stat(fullPath).mode);
}
function fsRename(_oldPath,_newPath) {
  FS.rename(_oldPath,_newPath);

  var oldPath = joinPaths("/",_oldPath); //This just makes sure our path name isn't accidentally different.
  var newPath = joinPaths("/",_newPath);

  //We also need to change the clipboard if we have it.
  if (filePathClipboard) {
    if (filePathClipboard[oldPath]) {
      filePathClipboard[oldPath] = false;
      filePathClipboard[newPath] = true;
    }
  }

  if (multiSelectList[oldPath]) {
    multiSelectList[oldPath] = false;
    multiSelectList[newPath] = true;
  }
}

var dragFile = null;
var dragFileTarget = null;

async function handleMoveDrag(dragFile, dragFileTarget) {
  var isMulti = Object.keys(multiSelectList).length > 0;
  var multiFiles = Object.keys(multiSelectList);
  if (!dragFile || !dragFileTarget) {
    return;
  }
  try{
    loadingScreen.hidden = false;
    if (isMulti) {
      for (var file of multiFiles) {
        loadingScreen.textContent = `Moving ${getFileName(file)} to ${getFileName(file)}...`;
        fsRename(file, joinPaths(dragFileTarget.fullPath, getFileName(file)));
        await syncFs();
      }
    } else {
      loadingScreen.textContent = `Moving ${dragFile.fileName} to ${dragFileTarget.fileName}...`;
      fsRename(dragFile.fullPath, joinPaths(dragFileTarget.fullPath, dragFile.fileName));
      await syncFs();
    }
    loadingScreen.hidden = true;
    refreshFileList();
  }catch(e){
    loadingScreen.hidden = true;
    dialog.alert(`Error with moving file: ${e}`);
    return;
  }
}

function getFileItemEventHandlers(fullPath,fileName,stat,isDir) {
  function ondragstart(event) {
    dragFile = {
      elm: this,
      fullPath,fileName,stat,isDir
    };
  }
  function ondragend(event) {
    handleMoveDrag(dragFile, dragFileTarget);
    dragFile = null;
    dragFileTarget = null;
  }
  if (!isDir) {
    return {
      ondragstart,
      ondragend
    };
  }

  return {
    ondragstart,
    ondragend,
    ondrop: function (event) {
      this.removeAttribute("dragover");
      event.preventDefault();
    },
    ondragover: function (event) {
      if (!dragFile) {
        return;
      }
      if (fullPath == dragFile.fullPath) {
        return;
      }
      if (multiSelectList[fullPath]) { //Prevent trying to move into self.
        return;
      }
      event.preventDefault();
      this.setAttribute("dragover", "");
      dragFileTarget = {
        elm: this,
        fullPath,fileName,stat,isDir
      };
    },
    ondragleave: function (event) {
      this.removeAttribute("dragover");
      dragFileTarget = null;
    }
  };
}

var filesCurrentlyDisplayed = [];
var _previousWorkingPath = null;

function refreshFileList(keepSelectList = false) {

  if (doesMatchPaths(currentPath, unsafePaths) && _previousWorkingPath) {
    dialog.alert(`Can't view "${currentPath}".`);
    currentPath = _previousWorkingPath;
    //return refreshFileList(keepSelectList);
  }

  if (!keepSelectList) {
    multiSelectList = {};
  }
  filesCurrentlyDisplayed = [];
  clickDropdownMenu.hidden = true;
  currentPath = joinPaths("/",currentPath); //This just makes sure the path is properly formatted.
  //window.alert(`Current Path: ${currentPath}`);
  var files = FS.readdir(currentPath).slice(2);
  if (currentPath !== "/") {
    var fullPath = joinPaths(currentPath, "..");
    var fileName = getFileName(fullPath);
    //window.alert(`Current Path: ${currentPath} Full Path: ${fullPath} FileName: ${fileName}`);
    var stat = FS.stat(fullPath);
  }
  elements.setInnerJSON(
    fileListContainer,
    [
      {
        element: "div",
        className: "fileListItem",
        hidden: currentPath == "/",
        ...(currentPath !== "/" ? getFileItemEventHandlers(fullPath,fileName,stat,true) : {}),
        children: [
          {
            element: "img",
            src: IMAGES.UP,
            className: "fileManagerImage",
          },
          {
            element: "span",
            textContent: "UP...",
          },
        ],
        onclick: function (e) {
          e.stopPropagation();
          if (currentPath != "/") {
            currentPath = "/" + joinPaths(currentPath, "..");
            refreshFileList();
          }
        },
      },
    ]
      .concat(
        files
          .sort((fileName, fileName2) => (""+fileName2).charCodeAt(0) - (""+fileName).charCodeAt(0))
          .sort((fileName) => {
            return getPathIsDirectory(joinPaths(currentPath, fileName))
              ? -1
              : 1;
          })
          .map((fileName) => {
            var fullPath = joinPaths(currentPath, fileName);
            var isUnsafePath = doesMatchPaths(fullPath, unsafePaths);

            if (isUnsafePath) {
              return {element:"div",hidden:true};
            }
            
            var isDir = getPathIsDirectory(fullPath);
            var stat = FS.stat(fullPath);
            filesCurrentlyDisplayed.push(fullPath);
            return {
              element: "div",
              className: "fileListItem",
              GPWhenCreated: function (elm) {
                elm.setAttribute("_path", fullPath);
              },
              ...getFileItemEventHandlers(fullPath,fileName,stat,isDir),
              draggable: true,
              children: [
                {
                  element: "div",
                  children: [
                    {
                        element: "img",
                        src: isDir ? IMAGES.FOLDER : (
                          FILE_ICON_TYPES[getFileExtension(fileName)] ||
                          "images/file.svg"
                        )
                    }
                  ],
                  className: "fileManagerImageContainer",
                  GPWhenCreated: function (elm) {
                    if (multiSelectList[fullPath]) {
                      elm.setAttribute("multiselected","");
                    }
                  },
                  onclick: function (event) {
                    if (multiSelectList[fullPath]) {
                      delete multiSelectList[fullPath];
                      refreshFileList(true);
                    } else {
                      multiSelectList[fullPath] = true;
                      refreshFileList(true);
                    }
                    event.stopPropagation();
                  }
                },
                {
                  element: "span",
                  textContent: isDir ? fileName + "/" : fileName,
                },
                {
                  element: "div",
                  style: {marginRight: "auto"}
                },
                {
                  element: "span",
                  className: "fileListItemSize",
                  textContent: fileSizeModule.filesize(+stat.size || 0),
                  hidden: isDir,
                }
              ],
              oncontextmenu: function (e) {
                e.preventDefault();
                clickDropdownMenu.style.opacity = 0;
                setTimeout(() => {
                  clickDropdownMenu.style.opacity = 1;
                  showFileDropdownMenu(e, fullPath, isDir, fileName);
                }, 1);
                return false;
              },
              onclick: function (e) {
                if (e.ctrlKey) {
                  if (multiSelectList[fullPath]) {
                    delete multiSelectList[fullPath];
                  } else {
                    multiSelectList[fullPath] = true;
                  }
                  refreshFileList(true);
                  e.stopPropagation();
                  return;
                }
                if (isDir) {
                  e.stopPropagation();
                  var previous = currentPath;
                  try {
                    currentPath = "/" + joinPaths(currentPath, fileName);
                    refreshFileList();
                  } catch (e) {
                    currentPath = previous;
                    refreshFileList();
                  }
                } else {
                  e.preventDefault();
                  e.stopPropagation();
                  setTimeout(() => {
                    showFileDropdownMenu(e, fullPath, isDir, fileName);
                  }, 1);
                  return false;
                }
              },
            };
          }),
      )
      .concat([
        {
          element: "div",
          className: "bottomFileMarker",
        },
      ]),
  );
  filePathInput.value = currentPath;
  _previousWorkingPath = currentPath;
}

window.addEventListener("drop", (e) => {
  //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
  if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
    e.preventDefault();
  }
});

fileListContainer.addEventListener("drop", function (e) {
  if (e.dataTransfer.files.length > 0) {
    uploadFiles(e.dataTransfer.files);
    e.preventDefault();
  }
});

fileListContainer.addEventListener("dragover", function (e) {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
  }
});

function selectAll(noUnselect) {
  var alreadySelectedCount = 0;
  for (var file of filesCurrentlyDisplayed) {
    if (multiSelectList[file]) {
      alreadySelectedCount += 1;
    }
    multiSelectList[file] = true;
  }
  if (alreadySelectedCount == filesCurrentlyDisplayed.length && !noUnselect) {
    for (var file of filesCurrentlyDisplayed) { //Unselect everything if everything is selected.
      delete multiSelectList[file];
    }
  }
  refreshFileList(true); //True means preserve multi select list.
}

function unselectAll() {
  for (var file of filesCurrentlyDisplayed) {
    delete multiSelectList[file];
  }
  refreshFileList(true);
}

document.addEventListener("keydown", function (e) {
  var isInputActive = document.activeElement && document.activeElement.tagName == "INPUT";
  if (e.ctrlKey && e.key.toLowerCase() == "a" && !isInputActive) {
    e.preventDefault();
    selectAll();
  }
  if (e.ctrlKey && e.key.toLowerCase() == "c" && !isInputActive) {
    e.preventDefault();
    copyFilesToClipboard();
  }
  if (e.ctrlKey && e.key.toLowerCase() == "v" && !isInputActive) {
    e.preventDefault();
    pasteFilesToDest(currentPath);
  }
  if (e.ctrlKey && e.key.toLowerCase() == "m" && !isInputActive) {
    e.preventDefault();
    moveFilesToDest(currentPath);
  }
});
window.addEventListener("click", function () {
  clickDropdownMenu.hidden = true;
});
fileListContainer.addEventListener("scroll", function () {
  clickDropdownMenu.hidden = true;
});

async function uploadFiles(files) {
  if (!files.length) {
                return;
            }

            loadingScreen.hidden = false;
            loadingScreen.textContent = "Preparing files...";

            // Show notice once
            if (!didDisplayDataLossNotice) {
                didDisplayDataLossNotice = true;
                dialog.alert(
                    "NOTICE!\n"+
                    "When adding lots of files (usually above 1.5GB) your save data and other files may become corrupt.\n"+
                    "This is a bug I can't fix myself due to restrictions on web browsers!\n"+
                    "If you have any important save data, you can zip files by right clicking a folder and clicking \"Download (Save to zip)\"."
                );
            }

            let currentIndex = 0;

            function processNextFile() {
                if (currentIndex >= files.length) {
                    // All files written to memory, now do ONE single syncfs call!
                    loadingScreen.textContent = "Saving changes to disk...";
                    
                    syncFs().then(() => {
                        loadingScreen.hidden = true;
                        refreshFileList();
                        console.log("All files uploaded and synced successfully.");
                    }).catch((err) => {
                        loadingScreen.hidden = true;
                        console.error("Sync error after batch upload:", err);
                        alert("Error saving files to persistent storage. Storage might be full.");
                    });
                    return;
                }

                var file = files[currentIndex];
                var fullPath = joinPaths(currentPath, file.name);
                loadingScreen.textContent = `Uploading "${file.name}" (${currentIndex + 1}/${files.length})...`;

                var reader = new FileReader();
                reader.onload = function () {
                    var arrayBuffer = reader.result;
                    if (!arrayBuffer || arrayBuffer.byteLength === 0) return;

                    var uint8Array = new Uint8Array(arrayBuffer.slice(0));

                    // Ensure parent folders exist so IDBFS metadata doesn't desync
                    var lastSlash = fullPath.lastIndexOf('/');
                    if (lastSlash !== -1) {
                        FS.mkdirTree(fullPath.substring(0, lastSlash));
                    }

                    FS.writeFile(fullPath, uint8Array);
                    currentIndex++;
                    processNextFile();
                };
                reader.readAsArrayBuffer(file);
            }

            processNextFile();
}

function showDropdownMenu(e) {
  clickDropdownMenu.style.top = e.clientY + "px";
  clickDropdownMenu.style.left = e.clientX + "px";
  clickDropdownMenu.hidden = false;
  elements.setInnerJSON(clickDropdownMenu, [
    {
      element: "div",
      className: "dropdownItem",
      children: [
          {
            element: "span",
            textContent: `Toggle Select All (CTRL+A)`,
          }
        ],
      onclick: function () {
        selectAll();
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      hidden: filePathClipboard ? (Object.keys(filePathClipboard).length < 1) : true,
      children: [
          {
            element: "span",
            textContent: `Paste from clipboard (CTRL+V)`,
          }
        ],
      onclick: function () {
        pasteFilesToDest(currentPath);
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      hidden: filePathClipboard ? (Object.keys(filePathClipboard).length < 1) : true,
      children: [
          {
            element: "span",
            textContent: `Move files from clipboard (CTRL+V)`,
          }
        ],
      onclick: function () {
        moveFilesToDest(currentPath);
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      children: [
          {
            element: "div",
            className: "fileManagerImageContainer2",
            children: [
              {
                element: "img",
                src: IMAGES.UP
              }
            ]
          },
          {
            element: "span",
            textContent: `Refresh`,
          }
        ],
      onclick: function () {
        FS.syncfs(false, (err) => {
          refreshFileList();
        });
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      children: [
          {
            element: "div",
            className: "fileManagerImageContainer2",
            children: [
              {
                element: "img",
                src: IMAGES.FOLDER
              }
            ]
          },
          {
            element: "span",
            textContent: `New folder`,
          }
        ],
      onclick: function () {
        dialog
          .prompt("Enter a name for the new folder:", "New Folder")
          .then(async (folderName) => {
            if (folderName) {
              loadingScreen.hidden = false;
              loadingScreen.textContent =
                'Creating folder "' + folderName + '"...';
              try {
                var fullPath = joinPaths(currentPath, folderName);
                FS.mkdir(fullPath);
                refreshFileList();
                await syncFs();
              } catch (e) {
                dialog.alert("Failed to create folder: " + e);
              }
              loadingScreen.hidden = true;
            }
          });
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      children: [
          {
            element: "div",
            className: "fileManagerImageContainer2",
            children: [
              {
                element: "img",
                src: "images/upload.svg"
              }
            ]
          },
          {
            element: "span",
            textContent: `Upload file(s)`,
          }
        ],
      onclick: function () {
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.multiple = true;
        fileInput.onchange = function () {
            var files = fileInput.files;
            uploadFiles(files);
        };
        fileInput.click();
      },
    },
  ]);
}

function showFileDropdownMenu(e, fullPath, isDir, fileName) {
  var isMulti = Object.keys(multiSelectList).length > 0;
  var multiFiles = Object.keys(multiSelectList);
  clickDropdownMenu.style.top = e.clientY + "px";
  clickDropdownMenu.style.left = e.clientX + "px";
  clickDropdownMenu.hidden = false;

  ////////////////

  if (isMulti) {
    elements.setInnerJSON(clickDropdownMenu, [
      {
        element: "div",
        className: "dropdownItem",
        children: [
          {
            element: "div",
            className: "fileManagerImageContainer2",
            children: [
              {
                element: "img",
                src: IMAGES.X
              }
            ]
          },
          {
            element: "span",
            textContent: `Delete ${multiFiles.length} files`,
          }
        ],
        onclick: function () {
          dialog
            .confirm('Are you sure you want to delete the selected files?')
            .then(async (confirmed) => {
              if (confirmed) {
                loadingScreen.hidden = false;
                for (var file of multiFiles) {
                  var fileName = getFileName(file);
                  var stat = FS.stat(file);
                  var isDir = getPathIsDirectory(file);
                  loadingScreen.textContent = 'Deleting "' + fileName + '"...';
                  try {
                    if (isDir) {
                      function removeDirContents(path) {
                        var items = FS.readdir(path).slice(2);
                        for (var i = 0; i < items.length; i++) {
                          var itemPath = joinPaths(path, items[i]);
                          var stat = FS.stat(itemPath);
                          try{
                            if (FS.isDir(stat.mode)) {
                              removeDirContents(itemPath);
                              FS.rmdir(itemPath);
                            } else {
                              FS.unlink(itemPath);
                            }
                          }catch(e){}
                        }
                      }
                      removeDirContents(file);
                      FS.rmdir(file);
                    } else {
                      FS.unlink(file);
                    }
                    refreshFileList();
                    await syncFs();
                  } catch (e) {
                    console.error(file,e);
                    dialog.alert("Failed to delete file/folder: " + e);
                  }
                }
                loadingScreen.hidden = true;
              }
              
            });
        },
      },
      {
        element: "div",
        className: "dropdownItem",
        children: [
          {
            element: "span",
            textContent: `Copy ${multiFiles.length} files to clipboard (CTRL+C)`,
          }
        ],
        onclick: function () {
          copyFilesToClipboard();
        },
      },
    ]);
    return;
  }

  /////////////////

  elements.setInnerJSON(clickDropdownMenu, [
    {
      element: "div",
      className: "dropdownItem",
      children: [
        {
          element: "div",
          className: "fileManagerImageContainer2",
          children: [
            {
              element: "img",
              src: IMAGES.X
            }
          ]
        },
        {
          element: "span",
          textContent: "Delete",
        }
      ],
      onclick: function () {
        dialog
          .confirm('Are you sure you want to delete "' + fileName + '"?')
          .then(async (confirmed) => {
            if (confirmed) {
              loadingScreen.hidden = false;
              loadingScreen.textContent = 'Deleting "' + fileName + '"...';
              try {
                if (isDir) {
                  function removeDirContents(path) {
                    var items = FS.readdir(path).slice(2);
                    for (var i = 0; i < items.length; i++) {
                      var itemPath = joinPaths(path, items[i]);
                      var stat = FS.stat(itemPath);
                      if (FS.isDir(stat.mode)) {
                        removeDirContents(itemPath);
                        FS.rmdir(itemPath);
                      } else {
                        FS.unlink(itemPath);
                      }
                    }
                  }
                  removeDirContents(fullPath);
                  FS.rmdir(fullPath);
                } else {
                  FS.unlink(fullPath);
                }
                refreshFileList();
                await syncFs();
              } catch (e) {
                dialog.alert("Failed to delete file/folder: " + e);
              }
              loadingScreen.hidden = true;
            }
          });
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      children: [
        {
          element: "div",
          className: "fileManagerImageContainer2",
          children: [
            {
              element: "img",
              src: "images/upload.svg"
            }
          ]
        },
        {
          element: "span",
          textContent: "Replace file",
        }
      ],
      hidden: isDir,
      onclick: function () {
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.onchange = function () {
          var file = fileInput.files[0];
          if (!file) {
            return;
          }
          loadingScreen.hidden = false;
          loadingScreen.textContent =
            'Uploading "' + fileName + '" and replacing file...';
          var reader = new FileReader();
          reader.onload = async function () {
            try {
              var arrayBuffer = reader.result;
              var uint8Array = new Uint8Array(arrayBuffer);
              FS.writeFile(fullPath, uint8Array);
              refreshFileList();
              await syncFs();
            } catch (e) {
              dialog.alert("Failed to replace file: " + e);
            }
            loadingScreen.hidden = true;
          };
          reader.readAsArrayBuffer(file);
        };
        fileInput.click();
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      children: [
        {
          element: "div",
          className: "fileManagerImageContainer2",
          children: [
            {
              element: "img",
              src: "images/rename.svg"
            }
          ]
        },
        {
          element: "span",
          textContent: "Rename",
        }
      ],
      hidden: isDir,
      onclick: function () {
        dialog
          .prompt('Enter a new name for "' + fileName + '":', fileName)
          .then(async (newName) => {
            if (newName && newName != fileName) {
              loadingScreen.hidden = false;
              try {
                loadingScreen.textContent =
                  'Renaming "' + fileName + '" to "' + newName + '"...';
                var newFullPath = joinPaths(currentPath, newName);
                fsRename(fullPath, newFullPath);
                refreshFileList();
                await syncFs();
              } catch (e) {
                dialog.alert("Failed to rename file: " + e);
              }
              loadingScreen.hidden = true;
            }
          });
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      children: [
        {
          element: "span",
          textContent: `Copy file to clipboard`,
        }
      ],
      onclick: function () {
        copyFileToClipboard(joinPaths(fullPath));
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      children: [
        {
          element: "div",
          className: "fileManagerImageContainer2",
          children: [
            {
              element: "img",
              src: "images/download.svg"
            }
          ]
        },
        {
          element: "span",
          textContent: "Download",
        }
      ],
      hidden: isDir,
      onclick: function () {
        loadingScreen.hidden = false;
        loadingScreen.textContent =
          'Preparing download for "' + fileName + '"...';
        try {
          var fileData = FS.readFile(fullPath);
          var blob = new Blob([fileData], { type: "application/octet-stream" });
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = fileName;
          document.body.append(a);
          a.click();
          a.remove();
        } catch (e) {
          dialog.alert("Failed to download file: " + e);
        }
        loadingScreen.hidden = true;
      },
    },
    {
      element: "div",
      className: "dropdownItem",
      hidden: !isDir,
      children: [
        {
          element: "div",
          className: "fileManagerImageContainer2",
          children: [
            {
              element: "img",
              src: "images/zip.svg"
            }
          ]
        },
        {
          element: "span",
          textContent: "Download (Save to zip)",
        }
      ],
      onclick: function () {
        try {
          loadingScreen.hidden = false;
          loadingScreen.textContent =
            'Preparing download for "' + fileName + '"...';
          var zip = new jszip();
          function addFolderToZip(zipFolder, path) {
            var items = FS.readdir(path).slice(2);
            for (var i = 0; i < items.length; i++) {
              var itemPath = joinPaths(path, items[i]);
              var stat = FS.stat(itemPath);
              if (FS.isDir(stat.mode)) {
                var newZipFolder = zipFolder.folder(items[i]);
                addFolderToZip(newZipFolder, itemPath);
              } else {
                console.log(itemPath);
                var fileData = FS.readFile(itemPath);
                console.log(fileData);
                zipFolder.file(items[i], fileData);
              }
            }
          }
          addFolderToZip(zip.folder(fileName), fullPath);
          zip.generateAsync({ type: "blob" }).then(function (content) {
            var a = document.createElement("a");
            a.href = URL.createObjectURL(content);
            a.download = fileName + ".zip";
            document.body.append(a);
            a.click();
            a.remove();
            loadingScreen.hidden = true;
          });
        } catch (e) {
          dialog.alert("Failed to download folder: " + e);
          loadingScreen.hidden = true;
        }
      },
    },
  ]);
}

fileListContainer.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  showDropdownMenu(e);
  return false;
});

fileListContainer.addEventListener("click", function (e) {
  if (clickDropdownMenu.hidden) {
    e.preventDefault();
    showDropdownMenu(e);
    e.stopPropagation();
  }
});

filePathInput.addEventListener("change", function () {
  var newPath = filePathInput.value;
  try {
    var stat = FS.stat(newPath);
    if (FS.isDir(stat.mode)) {
      currentPath = newPath;
      refreshFileList();
    } else {
      filePathInput.value = currentPath;
      dialog.alert("File path wasn't found or had an error");
    }
  } catch (e) {
    filePathInput.value = currentPath;
    dialog.alert("File path wasn't found or had an error");
  }
});

function copyFileToClipboard(filepath) {
  filePathClipboard = {};
  filePathClipboard[filepath] = true;
}

function copyFilesToClipboard() {
  if (Object.keys(multiSelectList).length < 1) { //Don't reset or try to copy if we don't even have any files selected.
    return;
  }
  filePathClipboard = {}; //the clipboard gets reset instead of holding previous data.
  for (var file of Object.keys(multiSelectList)) {
    filePathClipboard[file] = true;
  }
}

function copyFilesInFolder(source, dest) {
  function copy(path) {
    var files = FS.readdir(joinPaths(source, path)).slice(2);
    for (var fileName of files) {
      var sourcePath = joinPaths(source, path, fileName);
      var targetPath = joinPaths(dest, path, fileName);
      if (getPathIsDirectory(sourcePath)) {
        try{FS.mkdir(targetPath);}catch(e){}
        copy(joinPaths(path,fileName));
      } else {
        try{
          var data = FS.readFile(sourcePath);        
          FS.writeFile(targetPath, data);
        }catch(e){}
      }
    }
  }

  copy(".");
}

async function pasteFilesToDest(dest) {
  loadingScreen.hidden = false;
  loadingScreen.textContent = "Copying "+Object.keys(filePathClipboard).length+" files...";
  for (var targetFile of Object.keys(filePathClipboard)) {
    try{
      var name = getFileName(targetFile);
      if (getPathIsDirectory(targetFile)) {
        try{FS.mkdir(joinPaths(dest,name));}catch(e){}
        copyFilesInFolder(targetFile, joinPaths(dest,name));
      } else {
        var data = FS.readFile(targetFile);        
        FS.writeFile(joinPaths(dest,name), data);
      }
    }catch(e){
      console.error(e);
      //window.alert(e);
    }
  }
  await syncFs();
  loadingScreen.hidden = true;
  refreshFileList();
}

async function moveFilesToDest(dest) {
  loadingScreen.hidden = false;
  loadingScreen.textContent = "Moving "+Object.keys(filePathClipboard).length+" files...";
  for (var targetFile of Object.keys(filePathClipboard)) {
    try{
      var name = getFileName(targetFile);
      fsRename(targetFile, joinPaths(dest,name));
    }catch(e){
      console.error(e);
      //window.alert(e);
    }
  }
  await syncFs();
  loadingScreen.hidden = true;
  refreshFileList();
}

(async function () {
  try {
    // 1. Wait for everything to be created and synced
    await loadFilesystem();
    loadingScreen.hidden = true;

    // 2. Set the global FS reference from the Module
    FS = Module.FS;

    // 3. Set the starting path for your file manager
    // We use /addons/userdata because that's the symlink we created
    currentPath = "/addons/userdata";

    // 4. Small delay to ensure Emscripten's internal C structures are ready
    setTimeout(() => {
      try {
        refreshFileList();
        console.log("File list loaded successfully at " + currentPath);
        dialog.alert("Welcome to the file manager!\nRight click on empty space to create folders and upload files.\nRight click on files/folders for more options.\nHere is where you can add addons to your SRB2 Legacy Web experience, just like you would with a normal SRB2 Legacy installation!");
      } catch (e) {
        console.error("Refresh failed:", e);
        // Fallback to root if the symlink is being stubborn
        currentPath = "/";
        refreshFileList();
        dialog.alert("Navigation failed. Resetting to root directory.");
      }
    }, 100);
  } catch (e) {
    console.error("FS Load Error:", e);
    loadingScreen.hidden = true;
    // window.location.reload(); // Optional: only reload if it's a fatal error
  }
})();

const RUNNING_CHECK_NAME = "srb2web_running_check";
var previousRunCheck = localStorage.getItem(RUNNING_CHECK_NAME);

var checkInterval = setInterval(() => {
  var current = localStorage.getItem(RUNNING_CHECK_NAME);
  if (current !== previousRunCheck) {
    previousRunCheck = current;
    clearInterval(checkInterval);
    (async function () {
      await dialog.alert(
        "Another instance of SRB2 Legacy Web is running. \n" +
          "Please close other instances and press OK to reload.",
      );
      window.location.reload();
    })();
  }
}, 100);


/***/ },

/***/ 3687
(module, __unused_webpack_exports, __webpack_require__) {

const dialog = __webpack_require__(5925);

var Module = window["Module"] || {};

function loadScript() {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.src = "srb2legacy.js";
    script.onload = resolve;
    script.onerror = reject;
    document.body.append(script);
  });
}

var FS = null;

function isErrno44(err) {
  return !!err && Number(err.errno) === 44;
}

function safeSymlink(targetPath, linkPath) {
  try {
    if (!FS.analyzePath(linkPath).exists) {
      FS.symlink(targetPath, linkPath);
    }
  } catch (err) {
    // If another flow already created the link, we can safely continue.
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

async function loadFilesystem() {
  Module.noInitialRun = true;
  Module.canvas = document.createElement("canvas");

  await loadScript();
  FS = Module.FS;

  // Ensure Module.HEAP8 exists temporarily so write checks don't throw ReferenceError
  if (typeof HEAP8 === 'undefined' && typeof Module !== 'undefined') {
      if (Module.wasmMemory && Module.wasmMemory.buffer) {
          window.HEAP8 = new Int8Array(Module.wasmMemory.buffer);
          Module.HEAP8 = window.HEAP8;
      } else {
          // Fallback stub if wasmMemory isn't bound yet (prevents buffer comparison crash)
          window.HEAP8 = { buffer: new ArrayBuffer(0) };
          Module.HEAP8 = window.HEAP8;
      }
  }

  ensureUserDataTree();
  FS.mount(IDBFS, {}, "/home/web_user");

  // 2. Sync from IndexedDB to MEMFS
  await new Promise((resolve,reject) => {
    FS.syncfs(true, (err) => {
      if (err) {
        if (isErrno44(err)) {
          // Missing path during hydration can happen after interrupted game startup.
          // Recreate expected paths and continue instead of wiping IndexedDB.
          console.warn("Recoverable SyncFS hydration error:", err);
          try {
            ensureUserDataTree();
            resolve();
            return;
          } catch (recoverErr) {
            console.error("Recovery after SyncFS errno 44 failed:", recoverErr);
          }
        }
        reject();
        console.error("Sync Error:", err);
        (async function() {
          var error = ""+err;
          try{
            error = JSON.stringify(err);
          }catch(e){}
          await dialog.alert(
            "The data seems corrupted!\n"+
            "You have probably exceeded your web browsers storage limit.\n"+
            "If you continue your data will be erased to store new data on top of.\n"+
            error
          );

          const deleteReq = window.indexedDB.deleteDatabase("/home/web_user");

          deleteReq.onsuccess = function () {
              console.log("Corrupted database wiped successfully.");
              window.location.reload();
            };
            deleteReq.onupgradeneeded = () => {
              window.location.reload();
            };

            deleteReq.onerror = async function (dbErr) {
                console.error("Failed to delete the corrupted IndexedDB database.", dbErr);
                await dialog.alert("Unable to automatically erase IndexedDB database. Reload to try again.");
                window.location.reload();
              };

              setTimeout(() => {
                window.location.reload();
              },1000);
        })();
        return;
      }

      // --- SETUP START (Inside callback to ensure persistence awareness) ---

      ensureUserDataTree();

      // --- SETUP END ---
      resolve();
    });
  });

  console.log("Filesystem ready. Default path: /addons/userdata");
}

module.exports = { loadFilesystem };


/***/ },

/***/ 892
(module) {

var rootDot = ".";
var upDirDot = "..";
var pathSplit = "/";

function _getPathArray(_p) {
  var p = ""+_p;

  var split = p.split(pathSplit);
  split = split.filter((part) => !!part);
  split = split.filter((part) => part.trim() !== rootDot);

  return split;
}

function _makePath(array) {
  var path = array.join(pathSplit);
  if (array.length < 1) {
    return pathSplit;
  } else {
    return pathSplit + path;
  }
}

function joinPaths(...paths) {
  var result = [];
  for (var path of paths) {
    var parts = _getPathArray(path);
    for (var part of parts) {
      if (part == upDirDot) {
        if (result.length > 0) {
          result.length = result.length - 1;
        }
      } else {
        result.push(part);
      }
    }
  }

  var totalPath = _makePath(result);

  return totalPath;
}

function getFileName(path) {
  return _getPathArray(joinPaths(path)).pop() || "";
}

function getFileExtension(path) {
  var name = getFileName(path);

  if (name.indexOf(".") == -1) {
    return null;
  }

  var extension = name.split(".").pop();
  extension = extension.toLowerCase();
  extension = extension.trim();

  return extension;
}

function doesMatchPaths(path,pathArray) {
  var patharr = _getPathArray(joinPaths(path));

  for (var path2 of pathArray) {
    var path2arr = _getPathArray(joinPaths(path2));
    var match = 0;
    var i = 0;
    while (i < path2arr.length) {
      if (patharr[i] == path2arr[i]) {
        match += 1;
      }
      i += 1;
    }
    if (match == path2arr.length) {
      return true;
    }
  }

  return false;
}

module.exports = {
  joinPaths,
  getFileName,
  getFileExtension,
  doesMatchPaths
};


/***/ },

/***/ 8922
(module) {

module.exports = "body {\n    background: #030065;\n    font-family: PixelFont, Arial, sans-serif;\n    margin: 0;\n    padding: 0;\n    /* Use dynamic viewport height for iOS Safari compatibility */\n    height: 100dvh;\n    width: 100dvw;\n    overflow-x: auto;\n    overflow-y: auto;\n}\n\n.srb2BG {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background: url(\"images/legacybg.png\") center/cover no-repeat;\n  pointer-events: none;\n  image-rendering: pixelated;\n  filter: brightness(0.5);\n  opacity: 0.3;\n}\n\n.srb2Logo {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: calc(100% - 200px);\n  height: calc(100% - 200px);\n  transform: translate(-50%, -50%);\n  object-fit: contain;\n  pointer-events: none;\n  image-rendering: pixelated;\n  filter: brightness(0.5);\n  opacity: 0.3;\n}\n\n.fileManagerMenuButton {\n  all: unset;\n  height: 100%;\n  background: #000b9e;\n  color: rgba(255,255,255);\n  display: flex;\n  align-items: center;\n  font-size: 18px;\n  flex-shrink: 0;\n  flex-grow: 0;\n  user-select: none;\n  border-radius: 4px;\n  box-sizing: border-box;\n  padding: 10px 10px;\n  gap: 2px;\n}\n.fileManagerMenuButton:hover {\n  background: #000dc4;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.fileManagerMenuBar {\n    position: fixed;\n    top: 0px;\n    left: 0px;\n    width: 100%;\n    height: 40px;\n    background: #000b9e;\n    color: #ffffff;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n    z-index: 1000;\n    overflow: auto;\n}\n\n.fileManagerPathBar {\n  all: unset;\n  color: #ffffff;\n  height: 100%;\n  flex-grow: 1;\n  font-size: 18px;\n  padding: 10px 10px;\n  box-sizing: border-box;\n}\n\n.loadingScreen {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.8);\n    color: #ffffff;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    z-index: 2000;\n    text-align: center;\n    font-size: 20px;\n    font-weight: bold;\n}\n\n.fileList {\n    position: fixed;\n    top: 40px;\n    left: 0px;\n    width: calc(100% - 0px);\n    height: calc(100% - 40px);\n    display: flex;\n    flex-direction: column;\n    overflow: auto;\n    gap: 2px;\n}\n.fileListItem {\n    padding: 10px;\n    border-style: solid;\n    border-width: 2px;\n    border-color: rgba(0,0,0,0);\n    border-bottom-color: #030065;\n    cursor: pointer;\n    color: #ffffff;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 20px;\n}\n.fileListItem[dragover] {\n  border-color: #00ff00;\n}\n.fileListItemSize {\n  color: rgba(255,255,255,0.5);\n  font-size: 14px;\n}\n\n.fileListItem:hover {\n    text-decoration: underline;\n    background-color: rgba(255,255,255,0.2);\n}\n\n.clickDropdownMenu {\n    position: fixed;\n    top: 0;\n    left: 0;\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n    background: #00299a;\n    border-radius: 3px;\n    box-sizing: border-box;\n}\n\n.dropdownItem {\n    padding: 10px;\n    border-bottom: 1px solid #00549d;\n    cursor: pointer;\n    color: #ffffff;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    border-radius: 3px;\n    box-sizing: border-box;\n    width: 100%;\n}\n\n.dropdownItem:hover {\n    text-decoration: underline;\n    background-color: #005eff;\n}\n\n:root {\n  --popup-dialog-font: Arial, sans-serif;\n  --popup-dialog-background: #fff;\n  --popup-dialog-border-radius: 10px;\n  --popup-dialog-text-color: #000;\n  --popup-dialog-button-background: #5985ff;\n  --popup-dialog-button-hover-background: #4275ff;\n  --popup-dialog-button-text-color: #fff;\n  --popup-dialog-button-radius: 5px;\n  --popup-dialog-input-background: #fff;\n  --popup-dialog-input-border-width: 1.5px;\n  --popup-dialog-input-border-color: #bababa;\n  --popup-dialog-input-text-color: #000;\n  --popup-dialog-message-size: 16px;\n}\n\n.windowDialogContainer {\n  font-family: var(--popup-dialog-font);\n}\n\n.windowDialogBackground {\n  background-color: black;\n  backdrop-filter: blur(2px);\n}\n\n.windowDialogBox {\n  background: var(--popup-dialog-background);\n  border-radius: var(--popup-dialog-border-radius);\n  color: var(--popup-dialog-text-color);\n}\n\n.windowDialogButton {\n  background: var(--popup-dialog-button-background);\n  color: var(--popup-dialog-button-text-color);\n  border-radius: var(--popup-dialog-button-radius);\n  padding: 4px 8px;\n  border: none;\n  cursor: pointer;\n}\n\n.windowDialogButton:hover {\n  background: var(--popup-dialog-button-hover-background);\n}\n\n.windowDialogInput {\n  background: var(--popup-dialog-input-background);\n  border: var(--popup-dialog-input-border-width) solid\n    var(--popup-dialog-input-border-color);\n  color: var(--popup-dialog-input-text-color);\n  outline: none;\n  border-radius: 4px;\n  padding: 4px;\n}\n\n.windowDialogHeader {\n  font-weight: bold;\n  font-size: var(--popup-dialog-message-size);\n}\n\n.bottomFileMarker {\n    height: calc(100% - 40px);\n    width: 100%;\n    flex-shrink: 0;\n}\n\n.fileManagerImageContainer {\n  width: 32px;\n  height: 32px;\n  padding: 3px 3px;\n  background: rgba(0,0,0,0);\n  border-radius: 3px;\n  transition: 0.5s;\n}\n\n.fileManagerImageContainer[multiselected] {\n  background: rgba(255,255,255,0.5);\n}\n\n.fileManagerImageContainer > img {\n  image-rendering: pixelated;\n  object-fit: contain;\n  user-select: none;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\n.fileManagerImageContainer[multiselected] > img {\n  transform: scale(1.2);\n  transform-origin: center;\n}\n\n.fileManagerImageContainer2 {\n  width: 16px;\n  height: 16px;\n}\n\n.fileManagerImageContainer2 > img {\n  image-rendering: pixelated;\n  object-fit: contain;\n  user-select: none;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\n";

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
/******/ 			734: 0
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, [804], () => (__webpack_require__(2167)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;