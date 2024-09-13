"use client";

import { BeatLoader } from "react-spinners";
import CardWrapper from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { newVerification } from "@/actions/verify-email";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Token not found");
      return;
    }
    //NOTE: always use serverActions in transition in client comps
    startTransition(() => {
      newVerification(token!)
        .then((data) => {
          if (data && "success" in data) {
            setSuccess(data.success as string);
          } else {
            setError(data.error);
          }
        })
        .catch((e) => setError(`Something went wrong`));
    });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, []);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success as string} />
        {!success && <FormError message={error as string} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
