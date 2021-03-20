import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// Actions
import { handleDuplicate } from './actions';

const useStyles = makeStyles((theme: Theme) => ({
  errorMsg: {
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert variant="filled" {...props} />;
}

export default function ErrorMsg() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const close = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(handleDuplicate(false));
  };
  return (
    <div className={classes.errorMsg}>
      <Alert severity="error" onClose={close}>
        既に登録されている時間帯です。
      </Alert>
    </div>
  );
}
