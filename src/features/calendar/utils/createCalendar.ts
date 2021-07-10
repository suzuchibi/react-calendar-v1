import { Holidays } from '../types';
import {
  startOfMonth,
  lastDayOfMonth,
  getYear,
  getMonth,
  getDate,
  getDay,
  getTime,
} from 'date-fns';

/**
 * Get TimeStamp
 * @param {number} day
 * @param {number} current
 * @return {number}
 */
const getTimeStamp = (day: number, current: number) => {
  return getTime(new Date(getYear(current), getMonth(current), day));
};

/**
 * isToday Check
 * @param {number} timeStamp
 * @param {number} today
 * @returns {Boolean}
 */
const isTodayCheck = (timeStamp: number, today: number) => {
  return timeStamp === today ? true : false;
};

/**
 * isSelected
 * @param {number} timeStamp
 * @param {number} selected
 * @returns {Boolean}
 */
const isSelectedCheck = (timeStamp: number, selected: number) => {
  return timeStamp === selected ? true : false;
};

/**
 * Load Holiday Name
 * @param {Number} day
 * @param {number} current
 * @param {Array<Object>} holidays
 */
const loadHolidayName = (
  day: Number,
  current: number,
  holidays: Array<Holidays>
) => {
  let flag = false;
  const year = getYear(current);
  const month = getMonth(current) + 1;
  const zeroPad = (e: Number) => ('00' + e).slice(-2);
  const target = `${year}-${zeroPad(month)}-${zeroPad(day)}`;
  holidays.forEach((v) => {
    if (v.date) {
      if (v.date === target) flag = true;
    }
    /*
    if (Object.keys(v).find((f) => f === target) !== undefined) {
      // name = v[target];
      name = true;
    }
    */
  });
  return flag;
};

/**
 * Week Of The Prev Month
 * @param {Number} current
 * @return {Array}
 */
const weekOfThePrevMonth = (current: number) => {
  const array: Array<{ value: Number; type: String }> = [];
  const firstDayOfTheWeek = getDay(startOfMonth(current));
  const prevGetDate = getDate(new Date(getYear(current), getMonth(current), 0));
  for (let i = 0; i < firstDayOfTheWeek; i++) {
    array.push({
      value: prevGetDate - firstDayOfTheWeek + i + 1,
      type: 'gray',
    });
  }
  return array;
};

/**
 * Week Of The Next Month
 * @param {Number} current
 * @param {Number} lastDate
 * @return {Array}
 */
const weekOfTheNextMonth = (current: number) => {
  const array = [];
  const last = lastDayOfMonth(current);
  const nextGetDay = getDay(
    new Date(getYear(current), getMonth(current), getDate(last))
  );
  for (let i = 1; i <= 6 - nextGetDay; i++) {
    array.push({
      value: i,
      type: 'gray',
    });
  }
  return array;
};

/**
 * Create Next Week Flag
 * @param {*} day
 * @return {Boolean}
 */
const createNextWeekFlag = (day: number, current: number) => {
  return getDay(new Date(getYear(current), getMonth(current), day)) === 6
    ? true
    : false;
};

/**
 * Regular
 * @param {*} day
 * @param {*} current
 * @param {*} jHoliday
 * @return {Object}
 */
const regular = (
  day: number,
  current: number,
  jHoliday: Boolean,
  isToday: Boolean,
  isSelected: Boolean,
  timeStamp: number
) => {
  const target = getDay(new Date(getYear(current), getMonth(current), day));
  const type = target === 0 ? 'sunday' : target === 6 ? 'saturday' : 'regular';
  return {
    value: day,
    type: type,
    jHoliday,
    isToday,
    isSelected,
    timeStamp,
    link: `${getYear(current)}-${getMonth(current) + 1}-${day}`,
  };
};

/**
 * Create Calendar
 * @param {number} c
 * @param {Array?} h
 * @return {Array}
 */
const createCalendar = (
  c: number,
  h: Array<Holidays>,
  t: number,
  s: number
) => {
  const current = c;
  const holidays = h;
  const today = t;
  const selected = s;
  const calendar: Array<Array<{}>> = [];
  const lastDate = lastDayOfMonth(current);
  calendar.push([]);
  for (let day = 1; day <= getDate(lastDate); day++) {
    const timeStamp = getTimeStamp(day, current);
    const isToday = isTodayCheck(timeStamp, today);
    const isSelected = isSelectedCheck(timeStamp, selected);
    const length = calendar.length;
    const index = length - 1;
    const jHoliday = loadHolidayName(day, current, holidays);
    // Week Of The Prev Month
    if (day === 1) calendar[index].push(...weekOfThePrevMonth(current));
    // Regular
    calendar[index].push(
      regular(day, current, jHoliday, isToday, isSelected, timeStamp)
    );
    // Week Of The Next Month
    if (day === getDate(lastDate))
      calendar[index].push(...weekOfTheNextMonth(current));
    // Array Add Week
    if (createNextWeekFlag(day, current)) {
      calendar.push([]);
    }
  }
  return calendar;
};

export default createCalendar;
