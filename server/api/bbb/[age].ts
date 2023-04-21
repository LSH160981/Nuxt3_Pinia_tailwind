export default defineEventHandler((event) => {
  let age = event.context.params.age;
  console.log(age);
  return {
    state: "ok",
    age,
  };
});
