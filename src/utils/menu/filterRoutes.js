export const filterRoutes = (routes) => {
  let filteredRoutes = [];
  routes.forEach((route) => {
    if (route.routes && route.controllSubmenu !== 1) {
      filteredRoutes.push({
        divider: true,
        name: route.name,
        icon: route.icon,
        main: route.main,
        path: route.path,
      });
      filteredRoutes = filteredRoutes.concat(filterRoutes(route.routes));
    } else {
      if (route.name) {
        filteredRoutes.push({
          name: route.name,
          path: route.path.replace("/", ""),
        });
      }
    }
  });
  return filteredRoutes;
};
