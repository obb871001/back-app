import { useNavigate, useLocation } from "react-router";

export function usePreviousPagePath(previousIndex) {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const pathSegments = pathname.split("/");
  if (pathSegments.length === 2) {
    return "/";
  }
  if (
    pathSegments.some(
      (item) => item.includes("memberdetail") || item.includes("reportdetail")
    )
  ) {
    return pathSegments.slice(0, -2).join("/");
  }
  if (previousIndex) {
    return pathSegments.slice(0, -previousIndex).join("/");
  }
  const newPathSegments = pathSegments.slice(0, -1);
  const newPath = newPathSegments.join("/");

  return newPath;
}
