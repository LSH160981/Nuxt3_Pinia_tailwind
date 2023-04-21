import { defineEventHandler, getQuery } from 'h3';

const ccc_get = defineEventHandler((event) => {
  const query = getQuery(event);
  return {
    state: 200,
    query
  };
});

export { ccc_get as default };
