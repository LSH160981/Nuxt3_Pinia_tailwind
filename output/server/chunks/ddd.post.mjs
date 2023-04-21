import { defineEventHandler, readBody } from 'h3';

const ddd_post = defineEventHandler(async (event) => {
  event.node.req.headers.token && console.log(event.node.req.headers.token);
  const body = await readBody(event);
  return {
    state: 200,
    body
  };
});

export { ddd_post as default };
