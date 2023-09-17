import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import Home from './pages/home/Home'
import UnitSearch from './components/UnitSearch'
import UnitCreate from './pages/unit/UnitCreate'
import UnitUpdate from './pages/unit/UnitUpdate'
import Login from './pages/login/Login'
import Signup from './pages/login/Signup'
import AddNewUnit from './pages/unit/AddUnit'
import List from './pages/list/List'
import UnitsList from './pages/list/ListUnit'
import ViewUnit from './pages/unit/ViewUnit'
import { UserAuthContextProvider } from './Context/UserAuthContext';
import ListOfEvents from './pages/events/ListOfEvents';
import ListOfStores from './pages/stores/ListOfStores';
import ViewProducts from './components/ViewProducts';
import SubscribedUsersList from './pages/subscribedUsers/SubscribedUsersList';
import NotifyUsers from './pages/notifyUsers/NotifyUsers';

function App() {
  const [unitId, setUnitId] = useState("");
  return (
    <div className="App">
      <Router>
        <UserAuthContextProvider>
          <Switch>
            <Route component={UnitSearch} path="/unitsearch" ></Route>
            <Route component={ViewUnit} path="/viewunit" ></Route>
            <Route component={ViewProducts} path="/viewproducts" ></Route>
            <Route component={UnitsList} path="/unitslist" ></Route>
            <Route component={ListOfEvents} path="/listevents" ></Route>
            <Route component={ListOfStores} path="/liststores" ></Route>
            <Route component={SubscribedUsersList} path="/listubspay" ></Route>
            <Route component={NotifyUsers} path="/notifyUsers" ></Route>
            <Route component={List} path="/list" ></Route>
            <Route component={UnitCreate} path="/add" ></Route>
            <Route component={UnitUpdate} path="/update" ></Route>
            <Route component={Home} path="/home" ></Route>
            <Route component={AddNewUnit} path="/addunit" ></Route>
            <Route component={Login} path="/" ></Route>
          </Switch>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
