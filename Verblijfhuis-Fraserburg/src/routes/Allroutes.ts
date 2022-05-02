import { settingsOutline, homeOutline, mailOutline } from "ionicons/icons";

// TO DO: add all routes here
export const AllRoutePaths = {
  ADMIN: "/admin",

  SIGN_IN: "/sign_in",
  SIGN_UP: "/sign_up",
  PASSWORD_FORGET: "/forgot",
  PASSWORD_RESET: "/reset",
  ACCOUNT: "/dashboard",

  HOME: "/",
  ABOUT: "/about",
  ROOMS: "/rooms",
  SERVICES: "/services",
  CONTACT: "/contact",
  BOOK: "/bookings"
};

export interface LocationState {
  from: {
    pathname: string;
  };
}

export const menuItems = [
  { title: "Home", icon: homeOutline, path: AllRoutePaths.HOME },
  { title: "About", icon: "", path: AllRoutePaths.ABOUT },
  { title: "Rooms", icon: "", path: AllRoutePaths.ROOMS },
  { title: "Services", icon: "", path: AllRoutePaths.SERVICES },
  { title: "Contact Us", icon: mailOutline, path: AllRoutePaths.CONTACT },
  { title: "Book now", icon: "", path: AllRoutePaths.BOOK },
  { title: "Sign in", icon: "", path: AllRoutePaths.SIGN_IN },
  { title: "", icon: "", path: AllRoutePaths.ACCOUNT }
];

export const AdminMenu = [{ title: "Admin", icon: settingsOutline, path: AllRoutePaths.ADMIN }];
