import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom"

import './index.css';
import App from './App';
import Home from './component/Home';
import Cart from './component/Cart/Cart';
import Test from './component/Test';
import reportWebVitals from './reportWebVitals';
import PersonList from './component/PersonList';
import Blog from './component/Blog/Blog';
import DetailBlog from './component/Blog/DetailBlog';
import Index from './component/Member/Index';
import Account from './component/Account/Index'
import DetailProduct from './component/DetailProduct';

ReactDOM.render(
  <div>
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/cart' component={Cart} />
          <Route path='/test' component={Test} />
          <Route path='/personlist' component={PersonList} />
          <Route path='/blog/list' component={Blog} />
          <Route path='/blog/detail/:id' component={DetailBlog} />
          <Route path='/detail/:id' component={DetailProduct} />
          <Route path='/login' component={Index} />
          <Route component={Account} />
        </Switch>
      </App>
    </Router>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
