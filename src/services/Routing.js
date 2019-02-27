import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
const Links = lazy(() => import("../components/Links"));
const Search = lazy(() => import("../components/Search"));
const LoginSignup = lazy(() => import("../components/LoginSignup"));
const UserProfileEdit = lazy(() => import("../components/UserProfileEdit"));
const UserProfileShow = lazy(() => import("../components/UserProfileShow"));
const NoMatch = lazy(() => import("../components/NoMatch"));

export const defaultLinksOrder = "byCreatedAt-desc"

export default function Routing(props) {
  return(
    <Switch>
      <Route exact path="/" render={ props =>
        <MainLayout><Links {...props} linksOrder={ defaultLinksOrder }/></MainLayout>
      }/>
      <Route exact path="/top-vote" render={ props =>
        <MainLayout><Links {...props} linksOrder="byVotesCount-desc"/></MainLayout>
      }/>
      <Route exact path="/search" render={ props =>
        <MainLayout><Search defaultLinksOrder={ defaultLinksOrder }/></MainLayout>
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
  )
}
