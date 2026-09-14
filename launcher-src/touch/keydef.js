//////////////////////////////////////////////////////////////

var KeyNum = {
	//Purely custom key numbers, not used by the C logic, but are added to keep the UI for them consistent with the rest of the controls:
	UI_SHOW_KEYBOARD: 1000,
	UI_JOYSTICK: 1001,

	///////////////////////////////////////////
	//Source: g_input.h

    gc_null: 0, // a key/button mapped to gc_null has no effect
	gc_aimforward: 1,
	gc_aimbackward: 2,
	gc_turnleft: 3,
	gc_turnright: 4,
	gc_accelerate: 5,
	gc_drift: 6,
	gc_brake: 7,
	gc_fire: 8,
	gc_lookback: 9,
	gc_camreset: 10,
	gc_camtoggle: 11,
	gc_spectate: 12,
	gc_lookup: 13,
	gc_lookdown: 14,
	gc_centerview: 15,
	gc_talkkey: 16,
	gc_teamkey: 17,
	gc_scores: 18,
	gc_console: 19,
	gc_pause: 20,
	gc_systemmenu: 21,
	gc_screenshot: 22,
	gc_recordgif: 23,
	gc_viewpoint: 24,
	gc_custom1: 25, // Lua scriptable
	gc_custom2: 26, // Lua scriptable
	gc_custom3: 27, // Lua scriptable
	num_gamecontrols: 28,
};

//////////////////////////////////////////////////////////////

var KeyName = {
	//Purely custom key names, not used by C logic, but are added to keep the UI for them consistent with the rest of the controls:
	UI_SHOW_KEYBOARD: "Toggle touch keyboard",
	UI_JOYSTICK: "Virtual joystick",

	///////////////////////////////////////////
	//Source: m_menu.c

    gc_accelerate: "Accelerate",
	gc_turnleft: "Turn Left",
	gc_turnright: "Turn Right",
	gc_drift: "Drift",
	gc_brake: "Brake",
	gc_fire: "Use/Throw Item",
	gc_aimforward: "Aim Forward",
	gc_aimbackward: "Aim Backward",
	gc_lookback: "Look Backward",
	gc_talkkey: "Chat",
	gc_scores: "Show Rankings",
	gc_viewpoint: "Change Viewpoint",
	gc_camreset: "Reset Camera",
	gc_camtoggle: "Toggle First-Person",
	gc_pause: "Pause",
	gc_screenshot: "Screenshot",
	gc_recordgif: "Toggle GIF Recording",
	gc_systemmenu: "Open/Close Menu (ESC)",
	gc_console: "Developer Console",
	gc_spectate: "Become Spectator",
	gc_lookup: "Look Up",
	gc_lookdown: "Look Down",
	gc_centerview: "Center View",
	gc_custom1: "Custom Action 1",
	gc_custom2: "Custom Action 2",
	gc_custom3: "Custom Action 3",
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