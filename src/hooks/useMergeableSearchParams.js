import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function UseMergeableSearchParams() {
  let [searchParams, setSearchParams] = useSearchParams();

  const currentParams = useMemo(() => {
    let params = {};
    for (let pair of searchParams.entries()) {
      if (pair[1]) {
        params[pair[0]] = pair[1];
      }
    }
    return params;
  }, [searchParams]);

  const mergeSearchParams = useCallback(
    (newParams) => {
      let combinedParams = {
        ...currentParams,
        ...newParams,
      };

      for (let key in combinedParams) {
        if (
          combinedParams[key] === "" ||
          combinedParams[key] === "" ||
          combinedParams[key] === null
        ) {
          delete combinedParams[key];
        }
      }

      setSearchParams(combinedParams);
    },
    [currentParams, setSearchParams]
  );

  return [currentParams, mergeSearchParams];
}
