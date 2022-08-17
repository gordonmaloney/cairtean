import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

let white = "#fffffe";
let black = "#181818";
let grey = "#2e2e2e";
let blue = "#4fc4cf";
let offwhite = "#f2eef5";
let purple = "#994ff3";
let yellow = "#fbdd74";

export const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "260px",
  bgcolor: "background.paper",
  border: `1px solid ${black}`,
  boxShadow: 24,
  p: 3,
  borderRadius: "20px",
};

export const LabelStyle = {
  color: black,
  fontFamily: "Josefin Sans",
  fontSize: "25px",
};

export const TextFieldStyle = {
  backgroundColor: offwhite,
  width: "100%",
  input: { color: grey },
  fontFamily: "Roboto",
};

export const ButtonStyle = {
  backgroundColor: blue,
  color: black,
  border: `1px solid ${black}`,
  "&:hover": {
    backgroundColor: blue,
  },
};

export const EditButton = {
  backgroundColor: yellow,
  color: black,
  border: `1px solid ${black}`,
  "&:hover": {
    backgroundColor: yellow,
  },
};

export const ButtonStyleCancel = {
  backgroundColor: purple,
  color: black,
  border: `1px solid ${black}`,
  "&:hover": {
    backgroundColor: purple,
  },
  fontFamily: "Roboto",
};

export const FabKnown = {
  backgroundColor: yellow,
  margin: "10px",
  "&:hover": {
    backgroundColor: yellow,
  },
  border: `1px solid ${black}`,
};

export const FabHard = {
  backgroundColor: purple,
  margin: "10px",
  "&:hover": {
    backgroundColor: purple,
  },
  border: `1px solid ${black}`,
};

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: blue,
    border: "1px solid black",
    color: black,
  },
});
