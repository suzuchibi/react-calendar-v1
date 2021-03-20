import Config from '../../config/app.json';
import { getTime } from 'date-fns';

// Types
import { DataItems, Datas } from '../scheduler/types';

/**
 * DatasTypesValidator
 */
export interface DatasTypesValidator {
  title?: String;
  start?: String;
  end?: String;
  name?: String;
  delete?: Boolean;
}

/**
 * config
 */
export const config = {
  errorResetMessage: {
    title: '',
    start: '',
    end: '',
  },
  ignore: ['memo', 'date', 'delete'],
  defaultTime: {
    start: Config.startOrder,
    end: Config.lastOrder,
  },
};

/**
 * Validate Title
 * @param {String} value
 * @return {String}
 */
const titleValidate = (value: String) => {
  if (!value) return 'タイトルは必須です。';
  return '';
};

/**
 * Validate Text
 * @param {String} value
 * @return {String}
 */
const textValidate = (value: String) => {
  if (!value) return 'テキストは必須です。';
  return '';
};

/**
 * Validate Start Time
 * @param {String} value
 * @return {String}
 */
const startValidate = (value: String) => {
  const sHour = value.split(':')[0];
  if (Number(sHour) < Config.startOrder) return '時間範囲外です。';
  if (Config.lastOrder < Number(sHour)) return '時間範囲外です。';
  return '';
};

/**
 * Validate End Time
 * @param {String} value
 * @return {String}
 */
const endValidate = (value: String) => {
  const [eHour, eMinute] = value.split(':');
  if (Number(eHour) < Config.startOrder) return '時間範囲外です。';
  if (Config.lastOrder < Number(eHour) && 0 < Number(eMinute))
    return '時間範囲外です。';
  return '';
};

/**
 * Class Validator
 */
class validator {
  /**
   * Validate Start
   * @param {String} name
   * @param {String} value
   * @return {String}
   */
  static start(name: String, value: String) {
    switch (name) {
      case 'title':
        return titleValidate(value);
      case 'text':
        return textValidate(value);
      case 'start':
        return startValidate(value);
      case 'end':
        return endValidate(value);
      default:
        break;
    }
  }

  /**
   * Start And End Times Over Check
   * @param {String} start
   * @param {String} end
   */
  static overCheck(start: String, end: String) {
    const [sHour, sMinute] = start.split(':');
    const [eHour, eMinute] = end.split(':');
    return Number(eHour) < Number(sHour)
      ? true
      : Number(sHour) === Number(eHour) && Number(sMinute) === Number(eMinute)
      ? true
      : false;
  }

  /**
   * Duplicate Check 重複チェック
   * @param {Array} fetch
   * @param {string} date
   * @param {string} start
   * @param {string} end
   * @return {Boolean}
   */
  static duplicateCheck(
    fetch: Datas,
    date: string,
    start: string,
    end: string
  ) {
    const [y, m, d] = date.split('-');
    const [sH, sM] = start.split(':');
    const [eH, eM] = end.split(':');
    const startTime = getTime(
      new Date(Number(y), Number(m) - 1, Number(d), Number(sH), Number(sM))
    );
    const endTime = getTime(
      new Date(Number(y), Number(m) - 1, Number(d), Number(eH), Number(eM))
    );
    const find = fetch.find(
      (f: DataItems) =>
        (f.start <= startTime && startTime < f.end) ||
        (f.start < endTime && endTime <= f.end) ||
        (startTime <= f.start && f.end <= endTime)
    );
    return find === undefined ? false : true;
  }

  /**
   * IsError Check
   * @param {String} value
   * @return {Boolean}
   */
  static isError(value: String) {
    return value ? true : false;
  }
}

export default validator;
