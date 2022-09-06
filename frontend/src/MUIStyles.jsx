import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export const white = "#fffffe";
export const black = "#181818";
export const grey = "#2e2e2e";
export const blue = "#4fc4cf";
export const offwhite = "#f2eef5";
export const purple = "#994ff3";
export const yellow = "#fbdd74";

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

export const ModalStyleWide = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  minWidth: "260px",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: `1px solid ${black}`,
  boxShadow: 24,
  p: 3,
  borderRadius: "20px",
  overflow: "scroll",
};

export const CheckBox = {
  color: blue,
  "&.Mui-checked": {
    color: blue,
  },
};

export const LabelStyle = {
  color: black,
  fontFamily: "Josefin Sans",
  fontSize: "25px",
  ["@media (max-width:450px)"]: {
    // eslint-disable-line no-useless-computed-key
    display: "none",
  },
};

export const SelectStyle = {
  fontSize: "15px",
  padding: 0,
};

export const TextFieldStyle = {
  backgroundColor: offwhite,
  width: "100%",
  input: { color: grey },
  fontFamily: "Roboto",
};

export const FlashcardTextField = {
  backgroundColor: blue,
  width: "100%",
  input: { color: grey },
  fontFamily: "Roboto",
  borderTop: `1px solid ${black}`,

  input: {
    marginX: "10px",
    paddingTop: '13px',
    paddingBottom: '20px',
    textAlign: 'center'
  },
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
