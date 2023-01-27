import { Toaster as ReactHotToaster } from "react-hot-toast";
import { customToast } from "./custom-toast";
import { errorToast } from "./error-toast";
import { successToast } from "./success-toast";
import { warningToast } from "./warning-toast";
import { promiseToast } from "./promise-toast";

export const toast = {
  custom: customToast,
  error: errorToast,
  loading: customToast,
  plain: customToast,
  warning: warningToast,
  promise: promiseToast,
  success: successToast,
};

export const Toaster = ReactHotToaster;
