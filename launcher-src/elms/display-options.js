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