/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/


import Home from "views/Home.jsx";
import View from "views/View.jsx";
import Flight from "views/Flight.jsx";
import Detail from "views/Detail.jsx";
import Confirm from "views/Confirm.jsx";
import AddFlight from "views/AddFlight.jsx";

import UserPage from "views/User.jsx";
import Schedule from "views/Schedule.jsx";
import AddSchedule from "views/AddSchedule.jsx"
import Passenger from "views/Passenger.jsx";
import Report from "views/Report.jsx";
import ViewBook from "views/ViewBook.jsx";
import Edit from "views/Edit.jsx";

var routes = [

  {
    path: "/home",
    name: "Home",
    icon: "fa fa-home",
    component: Home,
    layout: "/user"
  },
  {
    path: "/viewbook",
    name: "View Book",
    icon: "fas fa-plane-departure",
    component: ViewBook,
    layout: "/user"
  }
];

var user_routes = [
  {
    path: "/view",
    name: "View",
    icon: "nc-icon nc-bank",
    component: View,
    layout: "/user"
  },
  {
    path: "/detail",
    name: "Detail",
    icon: "nc-icon nc-bank",
    component: Detail,
    layout: "/user"
  },
  {
      path: "/confirm",
      name: "Confirm",
      icon: "nc-icon nc-bank",
      component: Confirm,
      layout: "/user"
    },
    {
        path: "/edit",
        name: "Edit",
        icon: "nc-icon nc-bank",
        component: Edit,
        layout: "/user"
      }  
];

var admin_routes = [
  {
    path: "/flight",
    name: "Flight",
    icon: "fa fa-plane",
    component: Flight,
    layout: "/admin"
  },
  {
    path: "/schedule",
    name: "Schedule",
    icon: "fas fa-clock",
    component: Schedule,
    layout: "/admin"
  },
  {
    path: "/passenger",
    name: "Passenger",
    icon: "fas fa-users",
    component: Passenger,
    layout: "/admin"
  },
  {
    path: "/report",
    name: "Report",
    icon: "fas fa-poll",
    component: Report,
    layout: "/admin"
  }
];

var admin_inner_routes = [
  {
    path: "/addschedule",
    name: "AddSchedule",
    icon: "fas fa-clock",
    component: AddSchedule,
    layout: "/admin"
  },{
    path: "/addflight",
    name: "AddFlight",
    icon: "fas fa-clock",
    component: AddFlight,
    layout: "/admin"
  }
];

export default routes;
export {user_routes,admin_routes,admin_inner_routes};

