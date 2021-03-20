import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/reducer';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import Form from '../form/Form';
import BackGround from './BackGround';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

/**
 * CSS Styling
 * @param {Object} theme
 * @return {Object}
 */
const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '380px',
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    '&:focus': {
      outline: 'none',
    },
  },
}));

/**
 * Render
 * @param {*} props
 */
function ModalWindow() {
  const classes = useStyles();
  const isOpen = useSelector((state: RootState) => state.modal.isActive);

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      BackdropComponent={BackGround}
      BackdropProps={{
        timeout: 1500,
      }}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <Form />
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalWindow;
