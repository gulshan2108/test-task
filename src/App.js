import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {useState,useEffect} from 'react'
import SingIn from './components/signin';
import SignUp from './components/signup';
import DashBoard from './components/dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [state,setState]=useState({isAuth:true})

  useEffect(()=>{
    isAuth()
  },[])

  const isAuth = () => {
		if(localStorage.getItem("AuthToken"))
    {
        setState({...state,
				isAuth: true
        })
        }
    else{
			  if(window.location.pathname!=='/'){
				window.location = '/';
			}
		}
	}

  const PrivateRoute=({component: Component, authed, ...rest})=>{
  return <Route
      {...rest}
      component={() =>
        authed===true ? (
            <Component />
      ) : (
            <Redirect to="/" />
          )
    }
    />
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SingIn}/>
          <Route exact path ="/signup" component={SignUp}/>
          <PrivateRoute authed={state.isAuth} path='/dashboard' component={DashBoard}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
