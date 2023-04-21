import { defineEventHandler } from 'h3';

const _age_ = defineEventHandler((event) => {
  let age = event.context.params.age;
  console.log(age);
  return {
    state: "ok",
    age
  };
});

export { _age_ as default };
