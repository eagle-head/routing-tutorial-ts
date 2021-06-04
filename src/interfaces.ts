import { ReactElement } from "react";

export interface IRoutes {
  routes?: IRoute[];
}

export interface IRoute extends IRoutes {
  key: string;
  path: string;
  exact: boolean;
  component: (props: IRoute) => ReactElement<IRoute>;
}
