const { toast } = require("react-toastify");

const toastify = (store: any) => (next: any) => (action: any) => {
  if (action.type === "error") {
    toast.error(action.payload.message);
  }
  return next(action);
};
export default toastify;
