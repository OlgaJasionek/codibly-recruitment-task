import { Close } from "@mui/icons-material";
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ReactNode } from "react";

import styles from "./InformationDialog.module.scss";

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

const Dialog = ({ open, title, children, onClose }: Props) => {
  return (
    <>
      <MuiDialog open={open} fullWidth onClose={onClose}>
        <div className={styles.header}>
          <DialogTitle id='dialog-title'>{title}</DialogTitle>
          <DialogActions>
            <IconButton color='inherit' onClick={onClose}>
              <Close />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent>{children}</DialogContent>
      </MuiDialog>
    </>
  );
};

export default Dialog;
