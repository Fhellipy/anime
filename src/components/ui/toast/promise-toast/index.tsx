import toast from "react-hot-toast";
import { Renderable, Toast } from "../types";

interface PromiseToastMessages {
  loading: Renderable;
  success: Renderable;
  error: Renderable;
}

export function promiseToast(
  promise: Promise<unknown>,
  messages: PromiseToastMessages,
  options?: Partial<Toast>,
) {
  return toast.promise(
    promise,
    {
      loading: <LoadingStage message={messages.loading} />,
      success: <SuccessStage message={messages.success} />,
      error: <ErrorStage message={messages.error} />,
    },
    options,
  );
}

function LoadingStage({ message }: { message: Renderable }) {
  return (
    <div>
      <strong>{message}</strong>
    </div>
  );
}

function ErrorStage({ message }: { message: Renderable }) {
  return (
    <div>
      <strong>{message}</strong>
    </div>
  );
}

function SuccessStage({ message }: { message: Renderable }) {
  return (
    <div>
      <strong>{message}</strong>
    </div>
  );
}
