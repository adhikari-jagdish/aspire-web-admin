export const NumbersOnlyValidator = (event) => {
  const nonNumerics = [
    "e",
    "E",
    "+",
    "-",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "{",
    "[",
    "]",
    "}",
    ":",
    ";",
    ".",
    "?",
    ",",
    "/",
    "|",
  ];
  if (nonNumerics.includes(event)) {
    event.preventDefault();
  }
};


export const TextOnlyValidator = (event) => {
  if(/[0-9]/.test(event.key)){
    event.preventDefault();
  }
}