import { defineEventHandler } from 'h3';

const aaa = defineEventHandler((event) => {
  let arr = [{ age: 15 }, { name: "lisi" }];
  let response_data = JSON.stringify(arr);
  event.node.res.end(response_data);
});

export { aaa as default };
