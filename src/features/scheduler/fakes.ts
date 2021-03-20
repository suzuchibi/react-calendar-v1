import { getTime, getYear, getMonth, getDate } from 'date-fns';
const date = new Date();

export const fakes = [
  {
    id: '1',
    title: 'タイトル1',
    coment: 'コメント１',
    start: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 1, 10, 20)
    ),
    end: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 1, 11, 0)
    ),
  },
  {
    id: '2',
    title: 'タイトル2',
    coment: 'コメント２',
    start: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 1, 11, 0)
    ),
    end: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 1, 12, 0)
    ),
  },
  {
    id: '3',
    title: 'タイトル3',
    coment: 'コメント３',
    start: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 2, 13, 0)
    ),
    end: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 2, 15, 0)
    ),
  },
  {
    id: '4',
    title: 'タイトル4',
    coment: 'コメント４',
    start: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 1, 13, 30)
    ),
    end: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 1, 15, 30)
    ),
  },
  {
    id: '5',
    title: 'タイトル5',
    coment: 'コメント５',
    start: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 1, 18, 30)
    ),
    end: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 1, 19, 30)
    ),
  },
  {
    id: '6',
    title: 'タイトル6',
    coment: 'コメント６',
    start: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 2, 16, 0)
    ),
    end: getTime(
      new Date(getYear(date), getMonth(date), getDate(date) + 2, 18, 0)
    ),
  },
];
