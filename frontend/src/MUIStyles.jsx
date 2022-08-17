export const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "260px",
  bgcolor: "background.paper",
  border: "1px solid #181818",
  boxShadow: 24,
  p: 3,
  borderRadius: "20px",
};

export const LabelStyle = {
  color: "#2e2e2e",
  fontFamily: "Josefin Sans",
  fontSize: "25px",
};

export const TextFieldStyle = {
  backgroundColor: "#fffffe",
  width: "100%",
  input: { color: "#2e2e2e" },
  fontFamily: "Roboto",
};

export const ButtonStyle = {
  backgroundColor: "#4fc4cf",
  color: "#181818",
  border: "1px solid #181818",
  "&:hover": {
    backgroundColor: "#4fc4cf",
  },
};

export const EditButton = {
    backgroundColor: "#fbdd74",
    color: "#181818",
    border: "1px solid #181818",
    "&:hover": {
      backgroundColor: "#fbdd74",
    },
  };

export const ButtonStyleCancel = {
  backgroundColor: "#994ff3",
  color: "#181818",
  border: "1px solid #181818",
  "&:hover": {
    backgroundColor: "#994ff3",
  },
  fontFamily: "Roboto",
};


export const FabKnown = {
    backgroundColor: '#fbdd74',
    margin: '10px',
    "&:hover": {
        backgroundColor: "#fbdd74",
      },
}

export const FabHard = {
    backgroundColor: '#994ff3',
    margin: '10px',
    "&:hover": {
        backgroundColor: "#994ff3",
      },
}