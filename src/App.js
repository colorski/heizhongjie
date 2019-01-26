import React, { PureComponent } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css'
import store from './store'
import { Provider } from 'react-redux'

import Header from './components/Header'
import TopNav from './components/TopNav'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ScrollTop from './components/ScrollTop';
import Desclaimer from './components/Desclaimer';
import Detail from './components/Detail'
import Roast from './components/Roast'
import Vote from './components/Vote'
import NoMatch from './components/NoMatch'
import Test from './components/Test'

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <div className="rt">
              <TopNav />
              <Login />
              <Register />
              <Desclaimer />
              <ScrollTop />
              <Switch>
                <Route path="/" exact component={ Home }></Route>
                <Route path="/detail/:id/:title" component={ Detail }></Route>
                <Route path="/roast" component={ Roast }></Route>
                <Route path="/vote" component={ Vote }></Route>
                <Route path="/test" component={ Test } />
                <Route path="/noMatch" component={ NoMatch } />
                
                <Redirect to="/noMatch" />
              </Switch>
            </div>
            {/* <Icon type="appreciate_fill_light" title="click me!" onClick={()=>alert('good! thank u!')} /> */}
            
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
