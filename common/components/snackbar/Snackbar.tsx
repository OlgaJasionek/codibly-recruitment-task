import { Alert, AlertColor, Snackbar as MuiSnackbar } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  text: string;
  color: AlertColor;
};

const Snackbar = ({ open, handleClose, text, color }: Props) => {
  return (
    <>
      <MuiSnackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={color} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </MuiSnackbar>
    </>
  );
};
export default Snackbar;
