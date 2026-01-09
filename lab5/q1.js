function withTimeout(promiseFn, timeout = 3000) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Operation timed out after " + timeout + " ms"));
      }, timeout);

      promiseFn(...args)
        .then(result => {
          clearTimeout(timer);
          resolve(result);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };
}

function slowTask() {
  return new Promise(res => setTimeout(() => res("Done"), 5000));
}

const guardedTask = withTimeout(slowTask, 3000);

guardedTask()
  .then(console.log)
  .catch(console.error);
