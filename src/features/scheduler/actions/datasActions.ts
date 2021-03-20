import { nanoid } from 'nanoid';
import { getTime } from 'date-fns';
import { DATAS_ADDED, DATAS_UPDATED, DATAS_REMOVED } from '../types';

type Types = {
  id: String;
  title: String;
  date: string;
  start: string;
  end: string;
  memo: String;
  delete?: Boolean;
};

export const postAdded = (payload: Types) => {
  const [y, m, d] = payload.date.split('-');
  const [sH, sM] = payload.start.split(':');
  const [eH, eM] = payload.end.split(':');
  const startTime = getTime(
    new Date(Number(y), Number(m) - 1, Number(d), Number(sH), Number(sM))
  );
  const endTime = getTime(
    new Date(Number(y), Number(m) - 1, Number(d), Number(eH), Number(eM))
  );
  return {
    type: DATAS_ADDED,
    payload: {
      id: nanoid(),
      title: payload.title,
      coment: payload.memo,
      start: startTime,
      end: endTime,
    },
  };
};

export const postUpdated = (payload: Types) => {
  const [y, m, d] = payload.date.split('-');
  const [sH, sM] = payload.start.split(':');
  const [eH, eM] = payload.end.split(':');
  const startTime = getTime(
    new Date(Number(y), Number(m) - 1, Number(d), Number(sH), Number(sM))
  );
  const endTime = getTime(
    new Date(Number(y), Number(m) - 1, Number(d), Number(eH), Number(eM))
  );
  return {
    type: DATAS_UPDATED,
    payload: {
      id: payload.id,
      title: payload.title,
      coment: payload.memo,
      start: startTime,
      end: endTime,
    },
  };
};

export const postRemoved = (payload: String) => ({
  type: DATAS_REMOVED,
  payload,
});
