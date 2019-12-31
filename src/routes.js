/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Airplane from "@material-ui/icons/LocalAirport";
import Bookmark from "@material-ui/icons/Bookmarks";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
import Flight from "views/Flight/flight.js";
// core components/views for RTL layout
import Login from "./views/Login/login.js";
import Bookings from "./views/Bookings/Bookings";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/flight",
    name: "Notifications",
    icon: Notifications,
    component: Flight,
    layout: "/admin"
  }
];

const user_routes = [
  {
    path: "/flight",
    name: "Flights",
    icon: Airplane,
    component: Flight,
    layout: "/user"
  },
  {
    path: "/mybookings",
    name: "My Bookings",
    icon: Bookmark,
    component: Bookings,
    layout: "/user"
  }
];

const access_routes = [
  {
    path: "/login",
    name: "Login",
    icon: Notifications,
    component: Login,
    layout: "/access"
  }
];

export default dashboardRoutes;
export { user_routes, access_routes };
