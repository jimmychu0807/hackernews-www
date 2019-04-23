import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const MainLayout = lazy(() => import("./Layout"));
const Links = lazy(() => import("./Links"));
const LoginSignup = lazy(() => import("./LoginSignup"));
const UserProfileEdit = lazy(() => import("./UserProfileEdit"));
const UserProfileShow = lazy(() => import("./UserProfileShow"));
const NoMatch = lazy(() => import("./NoMatch"));

const defaultLinksOrder = "byCreatedAt-desc"

const Routing = props =>
  <Switch>
    <Route exact path="/" render={ props =>
      <MainLayout><Links {...props} linksOrder={ defaultLinksOrder }/></MainLayout>
    }/>
    <Route exact path="/top-vote" render={ props =>
      <MainLayout><Links {...props} linksOrder="byVotesCount-desc"/></MainLayout>
    }/>
    <Route exact path="/login" render={ props =>
      <MainLayout><LoginSignup {...props} displayType="login"/></MainLayout>
    }/>
    <Route exact path="/signup" render={ props =>
      <MainLayout><LoginSignup {...props} displayType="signup"/></MainLayout>
    }/>
    <Route exact path="/profile/edit" render={ props =>
      <MainLayout><UserProfileEdit {...props} /></MainLayout>
    }/>
    <Route exact path="/profile/:userID" render={ props =>
      <MainLayout><UserProfileShow {...props} /></MainLayout>
    }/>
    <Route render = { props =>
      <MainLayout><NoMatch /></MainLayout>
    }/>
  </Switch>

export { Routing as default, defaultLinksOrder };
