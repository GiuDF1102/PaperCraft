"use strict";
function wait(ms) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function timeout(_req, _res, next) {
  await wait(5000);
  next();
}

export default timeout;
