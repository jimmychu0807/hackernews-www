import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
const Links = lazy(() => import("../components/Links"));
const Search = lazy(() => import("../components/Search"));
const LoginSignup = lazy(() => import("../components/LoginSignup"));

export default function Routing(props) {
  return(
    <Switch>
      <Route exact path="/" render={ props =>
        <MainLayout><Links {...props} linksOrder="byCreatedAt-desc"/></MainLayout>
      }/>
      <Route path="/top-vote" render={ props =>
        <MainLayout><Links {...props} linksOrder="byVotesCount-desc"/></MainLayout>
      }/>
      <Route path="/search" render={ props =>
        <MainLayout><Search/></MainLayout>
      }/>
      <Route path="/login" render={ props =>
        <MainLayout><LoginSignup {...props} displayType="login"/></MainLayout>
      }/>
      <Route path="/signup" render={ props =>
        <MainLayout><LoginSignup {...props} displayType="signup"/></MainLayout>
      }/>
    </Switch>
  )
}
