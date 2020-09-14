import {parse} from 'query-string';

export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}

export const limit = 10;

export const getPaginator = search => {
  const {page} = parse(search);
  const currentPage = page ? Number(page) : 1;
  const offset = currentPage * 10 - limit;
  return {currentPage, offset}
}