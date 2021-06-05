import { Fragment, Suspense } from "react";
import { Link, useHistory } from "react-router-dom";

import ROUTES, { RenderRoutes } from "./routes";
import { IRoute } from "./routes/interfaces";

function App() {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("user");
    history.push("/");
  }

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "stretch" }}>
      <div style={{ flex: 0.3, backgroundColor: "#ccc" }}>
        {displayRouteMenu(ROUTES)}
        <button onClick={logout}>Log Out</button>
      </div>
      <div style={{ flex: 1, backgroundColor: "#aaa" }}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <RenderRoutes routes={ROUTES} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;

function displayRouteMenu(routes: IRoute[]) {
  /**
   * Render a single route as a list item link to the config's pathname
   */
  function singleRoute(route: IRoute) {
    return (
      <li key={route.key}>
        <Link to={route.path}>
          {route.key} ({route.path})
        </Link>
      </li>
    );
  }

  // loop through the array of routes and generate an unordered list
  return (
    <ul>
      {routes.map((route) => {
        // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
        if (route.routes) {
          return (
            <Fragment key={route.key}>
              {singleRoute(route)}
              {displayRouteMenu(route.routes)}
            </Fragment>
          );
        }

        // no nested routes, so just render a single route
        return singleRoute(route);
      })}
    </ul>
  );
}
