import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/reducer';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Form from '../../form/Form';

// Actions
import { handleFullScreenDialog } from './reducer';

/**
 * CSS Styling
 * @param {Theme} theme
 */
const useStyles = makeStyles((theme: Theme) => ({
  pager: {
    padding: theme.spacing(2),
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog() {
  const classes = useStyles();
  const isOpen = useSelector((state: RootState) => state.screen);

  const dispatch = useDispatch();
  const close = () => dispatch(handleFullScreenDialog(!isOpen));

  return (
    <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
      <div className={classes.pager}>
        <div className={classes.buttonBox}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<ArrowDownwardIcon />}
            onClick={close}
          >
            close
          </Button>
        </div>
        <Form />
      </div>
    </Dialog>
  );
}

export default FullScreenDialog;
