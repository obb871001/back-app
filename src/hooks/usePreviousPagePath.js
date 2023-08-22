import { useNavigate, useLocation } from "react-router";

export function usePreviousPagePath() {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const pathSegments = pathname.split("/");
  if (pathSegments.length === 2) {
    return "/";
  }
  const newPathSegments = pathSegments.slice(0, -1);
  const newPath = newPathSegments.join("/");

  return newPath;
}
