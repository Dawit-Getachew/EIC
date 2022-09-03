const logger = (param: any) => (store: any) => (next: any) => (action: any) => {
  const today = new Date();
  const givenTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  console.log(`Logging(${givenTime}) `, action);
  return next(action);
};

export default logger;
