import { settingsOutline, homeOutline, logInOutline, personOutline } from "ionicons/icons";

// TO DO: add all routes here
export const AllRoutePaths = {
  // ADMIN
  DASH_ADMIN: "/admin",

  // BASIC
  SIGN_IN: "/sign_in",
  SIGN_UP: "/sign_up",
  PASSWORD_FORGET: "/forgot",
  PASSWORD_RESET: "/reset",

  // USER
  DASH_USER: "/dashboard",

  // DEFAULT
  HOME: "/"
};

export interface LocationState {
  from: {
    pathname: string;
  };
}

export const menuItems = [{ title: "Home", icon: homeOutline, path: AllRoutePaths.HOME }];

export const AdminMenu = [{ title: "Admin", icon: settingsOutline, path: AllRoutePaths.DASH_ADMIN }];
