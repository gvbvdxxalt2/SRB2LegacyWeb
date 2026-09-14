module.exports = [
  ...require("./pixel3-font.js"),
  {
    element: "style",
    textContent: require("./styles.css"),
  },
  {
    element: "style",
    textContent: "[hidden] { display: none !important; }",
  },
];
