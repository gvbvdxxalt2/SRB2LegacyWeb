var { KeyNum, KeyName } = require("./keydef.js");
var { showKeyboard, hideKeyboard, toggleKeyboard, keyboardIsActive } = require("./keyboard.js");
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
    sendInput("gc_lookup", y > range);
    sendInput("gc_lookdown", y < -range);
    sendInput("gc_turnleft", x < -range);
    sendInput("gc_turnright", x > range);
}

module.exports = {
    sendInput,
    sendJoystick,
    keyboardIsActive
}