import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalFeed from './pages/globalFeed';
import Article from './pages/article';
import Authenticition from './pages/authenticition';
import TagFeed from './pages/tagFeed';
import YourFeed from './pages/yourFeed';
import CreateArticle from './pages/createArticle';
import EditArticle from './pages/editArticle';
import Settings from './pages/settings';
import UserProfile from './pages/userProfile';


export default () => {
  return (
    <Switch>
      <Route path='/' component={GlobalFeed} exact/>
      <Route path='/profiles/:slug' component={UserProfile}/>
      <Route path='/profiles/:slug/favorites' component={UserProfile}/>
      <Route path='/register' component={Authenticition}/>
      <Route path='/settings' component={Settings}/>
      <Route path='/login' component={Authenticition}/>
      <Route path='/feed' component={YourFeed}/>
      <Route path='/tags/:slug' component={TagFeed}/>
      <Route path='/articles/new' component={CreateArticle}/>
      <Route path='/articles/:slug/edit' component={EditArticle}/>
      <Route path='/articles/:slug' component={Article}/>
    </Switch>
  );
};