import React, { useEffect, useState } from "react";

type Error = {
  status: number;
  statusText: string;
};

export const useFetch = <Type extends {}>(
  input: RequestInfo,
  init?: RequestInit,
  dependencies?: []
): { data: Type | null; pending: boolean; error: Error | null } => {
  const [data, setData] = useState<Type | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setPending(true);
    fetch(input, init)
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        setPending(false);
      })
      .catch((error) => setError(error));
  }, [dependencies]);

  return {
    data,
    pending,
    error,
  };
};
