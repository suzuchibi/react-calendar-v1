import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/reducer';
import { Datas } from '../scheduler/types';
import classNames from 'classnames';
import ErrorMsg from './ErrorMsg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import teal from '@material-ui/core/colors/teal';
import {
  add,
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
} from 'date-fns';
import validator, { config as setting, DatasTypesValidator } from './validator';

// Actions
import { handleDuplicate } from './actions';
import { handleDrawer } from '../side/isDrawerReducer';
import { handleIsActive } from '../modal/actions';
import {
  postAdded,
  postUpdated,
  postRemoved,
} from '../scheduler/actions/datasActions';
import { handleFullScreenDialog } from '../dialog/fullScreen/reducer';

/**
 * CSS Styling
 * @return {Object}
 */
const useStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
      padding: '8px',
    },
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 8px 0',
  },
  reset: {
    margin: 0,
    padding: 0,
  },
  marginRight: {
    marginRight: '16px',
  },
  marginBottom: {
    marginBottom: '24px',
  },
  formFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
  formTitle: {
    color: '#666',
    fontSize: '12px',
  },
  formTimeFlex: {
    display: 'flex',
  },
  formTextAreaTitle: {
    color: '#666',
    fontSize: '12px',
    marginBottom: '6px',
  },
  formTextArea: {
    width: '100%',
    fontSize: '14px',
    borderColor: '#aaa',
    letterSpacing: '0.8px',
    margin: '0 0 16px 0',
    padding: 0,
  },
  formCheckBox: {
    marginRight: '4px',
    padding: 0,
  },
  errorText: {
    fontSize: '12px',
    margin: 0,
    padding: 0,
  },
  deleteText: {
    paddingTop: '6px',
    fontSize: '12px',
  },
  buttonArea: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButton: {
    color: '#fff',
    background: teal[500],
    '&:hover': {
      background: teal[600],
    },
    marginRight: '16px',
  },
}));

/**
 * Select Datas By Id
 * @param {Array} datas
 * @param {String} id
 */
const selectDatasById = (datas: Datas, id: String) =>
  datas.find((f) => f.id === id);

/**
 * Init Defaults Setting to ADD
 * @param {number} timeStamp
 * @return {Object}
 */
const initAddDefaults = (timeStamp: number) => {
  const current = getHours(new Date());
  const defaults = {
    start: setting.defaultTime.start,
    end: setting.defaultTime.end,
  };
  /**
   * @return {Number}
   */
  const startTime = () => {
    if (current < defaults.start || defaults.end < current)
      return defaults.start;
    return Number(current);
  };
  /**
   * @return {String}
   */
  const dateTime = () => {
    const dates = {
      year: getYear(timeStamp),
      month: ('00' + (getMonth(timeStamp) + 1)).slice(-2),
      date: ('00' + getDate(timeStamp)).slice(-2),
    };
    if (defaults.end < current) {
      const added = add(timeStamp, { days: 1 });
      dates.year = getYear(added);
      dates.month = ('00' + (getMonth(added) + 1)).slice(-2);
      dates.date = ('00' + getDate(added)).slice(-2);
    }
    return `${dates.year}-${dates.month}-${dates.date}`;
  };
  return {
    id: '0',
    title: '',
    date: dateTime(),
    start: `${('00' + startTime()).slice(-2)}:00`,
    end: `${('00' + (startTime() + 1)).slice(-2)}:00`,
    memo: '',
    delete: false,
  };
};

/**
 * Init Defaults Setting to Edit
 * @param {String} id
 * @param {Array} fetch
 * @return {Object}
 */
const initEditDefaults = (id: String, fetch: Datas) => {
  const parse = selectDatasById(fetch, id);
  if (parse) {
    const start = parse.start;
    const end = parse.end;
    const y = getYear(start);
    const m = getMonth(start) + 1;
    const d = getDate(start);
    const sH = getHours(start);
    const sM = getMinutes(start);
    const eH = getHours(end);
    const eM = getMinutes(end);
    return {
      id: id,
      title: parse.title,
      date: `${y}-${('00' + m).slice(-2)}-${('00' + d).slice(-2)}`,
      start: `${('00' + sH).slice(-2)}:${('00' + sM).slice(-2)}`,
      end: `${('00' + eH).slice(-2)}:${('00' + eM).slice(-2)}`,
      memo: parse.coment,
      delete: false,
    };
  }
};

/**
 * Init Defaults Setting Controller
 * @param {String} id
 * @param {number} timeStamp
 * @param {Array} fetch
 * @return {Function}
 */
const initDefaults = (id: String, timeStamp: number, fetch: Datas) => {
  switch (id) {
    case '0':
      return initAddDefaults(timeStamp);
    default:
      return initEditDefaults(id, fetch);
  }
};

/**
 * Init Required
 * @param {Object} forms
 * @return {Object}
 */
const initRequired = (forms: DatasTypesValidator) => {
  return {
    title: forms.title,
    start: forms.start,
    end: forms.end,
  };
};

/**
 * Render
 */
function Form() {
  const classes = useStyles();
  const message = { ...setting.errorResetMessage };
  const md = useMediaQuery('(max-width:960px)');
  // Redux State
  const id = useSelector((state: RootState) => state.form.id);
  const isDrawer = useSelector((state: RootState) => state.drawer);
  const mode = useSelector((state: RootState) => state.modal.mode);
  const fetch = useSelector((state: RootState) => state.datas);
  const selected = useSelector((state: RootState) => state.schedule.selected);
  const defaults = Object.assign({}, initDefaults(id, selected, fetch));
  const isScreen = useSelector((state: RootState) => state.screen);
  const isDupError = useSelector((state: RootState) => state.form.isDuplicate);
  // Local State
  const [forms, setForms] = useState(defaults);
  const [required, setRequired] = useState(initRequired(forms));
  const [errors, setErrors] = useState(message);
  // const [isDuplicateError, setIsDuplicate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // Actions
  const title = (m: String) => (m === '0' ? 'Add' : 'Edit');
  const label = (m: String) => (m === '0' ? 'add' : 'update');
  const dispatch = useDispatch();
  const close = () => {
    if (!isScreen) {
      dispatch(handleIsActive(false));
    } else {
      dispatch(handleFullScreenDialog(false));
    }
    dispatch(handleDuplicate(false));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    const ignore = setting.ignore.find((v) => name === v);
    setForms({ ...forms, [name]: value });
    if (!ignore) {
      setRequired({ ...required, [name]: value });
      setErrors({
        ...errors,
        [name]: validator.start(name, value),
      });
    }
  };

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.checked;
    setForms({ ...forms, [name]: value });
  };

  const isButtonDisabled = () => {
    const isReq = Object.values(required).filter((v) => v === '').length === 0;
    const isError = Object.values(errors).filter((v) => v !== '').length === 0;
    return isReq && isError && !disabled;
  };

  const duplicateChecker = () => {
    return validator.duplicateCheck(fetch, forms.date, forms.start, forms.end);
  };

  const submitButton = () => {
    setDisabled(true);
    const post = Object.assign({}, forms);
    if (isButtonDisabled()) {
      // Duplicate Checke
      if (id === '0' && duplicateChecker()) {
        dispatch(handleDuplicate(true));
        setDisabled(false);
        return;
      }
      switch (id) {
        case '0':
          dispatch(postAdded(post));
          break;
        default:
          post.delete === undefined || post.delete === false
            ? dispatch(postUpdated(post))
            : dispatch(postRemoved(id));
          break;
      }
      if (md && !isDrawer) dispatch(handleDrawer(true));
      close();
      // dispatch(openSuccess());
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (validator.overCheck(forms.start, forms.end)) {
      const hour = forms.start.split(':')[0];
      const time = `${hour}:59`;
      setForms({ ...forms, end: time });
      setRequired({ ...required, end: time });
    }
  }, [forms, required]);

  return (
    <form autoComplete="off" className={classes.root}>
      <div className={classes.titleBox}>
        <CreateIcon style={{ fontSize: 16, margin: '0 4px 0 0' }} />
        <Typography variant="subtitle2">{title(mode)} Form</Typography>
      </div>
      <TextField
        fullWidth
        label="タイトル"
        placeholder="タイトルを入力"
        size="small"
        name="title"
        className={classes.marginBottom}
        helperText={errors.title}
        error={validator.isError(errors.title)}
        value={forms.title}
        onChange={handleChange}
      />
      <dl className={classNames([classes.reset])}>
        {/* Date */}
        <div className={classes.formFlex}>
          <dt className={classNames([classes.formTitle, classes.reset])}>
            年/月/日
          </dt>
          <dd className={classNames([classes.marginBottom, classes.reset])}>
            <TextField
              type="date"
              name="date"
              value={forms.date}
              onChange={handleChange}
            />
          </dd>
        </div>
        {/* Start */}
        <div className={classes.formFlex}>
          <dt className={classNames([classes.formTitle, classes.reset])}>
            開始〜終了 時間
          </dt>
          <dd className={classNames([classes.marginBottom, classes.reset])}>
            <TextField
              type="time"
              name="start"
              helperText={errors.start}
              error={validator.isError(errors.start)}
              value={forms.start}
              onChange={handleChange}
            />
            <span className={classes.marginRight}>〜</span>
            <TextField
              type="time"
              name="end"
              helperText={errors.end}
              error={validator.isError(errors.end)}
              value={forms.end}
              onChange={handleChange}
            />
          </dd>
        </div>
        {/* Coment */}
        <div className={classNames([classes.formFlex])}>
          <dt
            className={classNames([classes.formTextAreaTitle, classes.reset])}
          >
            メモ
          </dt>
          <dd className={classes.reset}>
            <TextField
              className={classes.formTextArea}
              inputProps={{ style: { fontSize: 14, lineHeight: 1.3 } }}
              size="small"
              name="memo"
              multiline
              variant="outlined"
              rows={4}
              value={forms.memo}
              onChange={handleChange}
            />
          </dd>
        </div>
        {/* Delete Check */}
        {mode !== '0' ? (
          <div className={classNames([classes.marginBottom])}>
            <Checkbox
              size="small"
              classes={{ root: classes.formCheckBox }}
              name="delete"
              checked={forms.delete}
              onChange={handleCheckBox}
            />
            <span className={classes.deleteText}>データを削除する</span>
          </div>
        ) : (
          ''
        )}
        {/* Duplicate Error */}
        {mode === '0' && isDupError ? <ErrorMsg /> : ''}
        <div className={classes.buttonArea}>
          <Button
            aria-label={label(mode)}
            variant="contained"
            className={classNames([classes.okButton])}
            disableElevation
            disabled={!isButtonDisabled()}
            onClick={submitButton}
          >
            OK
          </Button>
          {isScreen !== true ? (
            <Button
              size="small"
              aria-label="cancel"
              variant="outlined"
              disableElevation
              onClick={close}
            >
              Cancel
            </Button>
          ) : (
            ''
          )}
        </div>
      </dl>
    </form>
  );
}

export default Form;
