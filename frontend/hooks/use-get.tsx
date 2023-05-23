import { useEffect, useState } from "react";
import { callAPI } from "../api/api";
import { useAuth } from "../context/auth";
import { Text } from "../components/Themed";

export function useGet<T extends { error?: string }>(
  pathname: string,
  initialValue: T
) {
  const [state, setState] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  const token = useAuth()?.userToken;

  useEffect(() => {
    reload();
  }, [pathname, token]);

  function reload() {
    setIsLoading(true);
    callAPI({
      pathname,
      method: "GET",
      token,
    }).then((result) => {
      setIsLoading(false);
      if (result.error) {
      } else {
        setState(result);
      }
    });
  }

  function render(renderChildren: (data: T) => React.ReactElement) {
    if (isLoading) {
      return <Text>Loading ...</Text>;
    }
    if (state.error) {
      return <Text>Error: {String(state.error)}</Text>;
    }
    return renderChildren(state);
  }

  return { state, setState, reload, render, isLoading };
}
