//to run this confirmation dialog set useState of open dialog "const [openDialog, setOpenDialog] = useState(false);""
//when click on the button that pop up the dialog change the state to true "setOpenDialog(true);"
//onClost just change the state to false "onClose={() => setOpenDialog(false)}"
//onConfirm provide an handleConfirmDialog function that will do what you want to do onConfirm={() =>handleConfirmDialog(selectedCategoryId)}

/* <ConfirmationDialog
open={openDialog}
onClose={() => setOpenDialog(false)}
onConfirm={() =>
  handleConfirmDialog(selectedCategoryId)
}
text={
  'This action will delete all the Menu Items under this category. Are you sure you want to proceed with this action?'
}
/> */

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import './ConfirmationDialog.css';

const ConfirmationDialog = ({ open, onClose, onConfirm, text }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onConfirm} color='primary' autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
