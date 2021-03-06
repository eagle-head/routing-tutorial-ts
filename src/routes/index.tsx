import { FC, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { IRoute, IRoutes } from "./interfaces";

const Login = lazy(() =>
  import("../components/Login").then(({ Login }) => ({ default: Login }))
);

const RouteWithSubRoutes = (route: IRoute) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...route} {...props} />}
    />
  );
};

const RenderRoutes: FC<IRoutes> = ({ routes = [] }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};

const ROUTES: IRoute[] = [
  { path: "/", key: "ROOT", exact: true, component: () => <Login /> },
  {
    path: "/app",
    key: "APP",
    exact: false,
    component: (props) => {
      if (!localStorage.getItem("user")) {
        alert("You need to log in to access app routes");
        return <Redirect to={"/"} />;
      }

      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];

export { RenderRoutes };
export default ROUTES;
