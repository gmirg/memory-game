// const randomIds = (total: number) => {
//   const ids = [];
//   const max = 827;
//   const min = 1;
//   for (let i = 1; i < total + 1; i++) {
//     const random = Math.floor(Math.random() * (max - min + 1) + min);
//     ids.push(random);
//   }
//   return ids;
// };

export const randomIds = (length: number, count: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * count));
};
