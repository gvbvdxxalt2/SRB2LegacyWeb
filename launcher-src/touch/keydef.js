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