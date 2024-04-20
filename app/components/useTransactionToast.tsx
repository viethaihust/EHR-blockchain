import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";
import { BaseError } from "wagmi";

export function useTransactionToast(
  isConfirming: any,
  isConfirmed: any,
  successMessage: any,
  error: any
) {
  const toastRef = useRef<Id | null>(null);

  useEffect(() => {
    if (isConfirming) {
      toastRef.current = toast.loading("Waiting for confirmation...");
    } else if (isConfirmed) {
      if (toastRef.current) {
        toast.update(toastRef.current, {
          render: successMessage,
          type: "success",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      }
    }
    if (error) {
      toast.error(
        "Error: " + (error as BaseError).shortMessage || error.message,
      );
    }
  }, [isConfirming, isConfirmed, error, successMessage]);
}
