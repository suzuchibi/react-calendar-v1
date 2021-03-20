import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/reducer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// Actions
import { changeOpen } from './snackAction';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnacAlert() {
  const isOpen = useSelector((state: RootState) => state.snack.open);
  const msg = useSelector((state: RootState) => state.snack.msg);

  const dispatch = useDispatch();
  const close = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(changeOpen(false));
  };
  return (
    <div>
      <Snackbar open={isOpen} onClose={close}>
        <Alert severity="error" onClose={close}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
