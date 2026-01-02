"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <h1>문제가 발생했습니다!</h1>
      <button onClick={() => reset()}>다시시도</button>
    </>
  );
}
