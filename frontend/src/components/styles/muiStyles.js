const textFieldSx = {
  mx: "auto",
  flexGrow: 1,
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#243548",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#243548",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-root:hover": {
    "& fieldset": {
      borderColor: "#243548",
      borderWidth: "1.5px",
    },
  },
  "& .MuiInputBase-formControl": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "#606060",
  },
  "& .MuiOutlinedInput-root:focus-within": {
    "& fieldset": {
      borderColor: "#4378b5",
      borderWidth: "1.5px",
    },
  },
  ".MuiSelect-icon": {
    color: "white",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#243548",
  },
  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused": {
    "& fieldset": {
      borderColor: "#243548",
    },
  },
};

export { textFieldSx };
