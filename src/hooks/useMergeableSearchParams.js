import { useSearchParams } from "react-router-dom";

export default function UseMergeableSearchParams() {
  let [searchParams, setSearchParams] = useSearchParams();

  let currentParams = {};
  for (let pair of searchParams.entries()) {
    currentParams[pair[0]] = pair[1];
  }

  let mergeSearchParams = (newParams) => {
    setSearchParams({
      ...currentParams,
      ...newParams,
    });
  };

  return [currentParams, mergeSearchParams];
}
