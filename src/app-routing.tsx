import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './App';

const routes = [
  {
    path: "/",
    component: App
  },
  {
    path: "/login",
    component: App
  },
  {
    path: "/survey-submit",
    component: App
  },
  {
    path: "/surveys",
    component: App
  }
];

export default function AppRouting() {
  return (
    <Router>
      {routes.map((route, i) => (
        <Route path={route.path}>
          <route.component />
        </Route>
      ))}
    </Router>
  );
}


