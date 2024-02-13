import React, { } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserAuthContextProvider } from './Context/UserAuthContext';
import { Toaster } from 'react-hot-toast';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import ListOfUsers from './pages/list/ListOfUsers'
import ViewUser from './pages/unit/ViewUser'
import ListOfEvents from './pages/events/ListOfEvents';
import ListOfStores from './pages/stores/ListOfStores';
import ViewProducts from './components/ViewProducts';
import SubscribedUsersList from './pages/subscribedUsers/SubscribedUsersList';
import NotifyUsers from './pages/notifyUsers/NotifyUsers';
import AllProducts from './pages/products/AllProducts';
import EditProduct from './components/EditProduct';
import UpdateEvent from './components/UpdateEvent';
import ListOfChats from './pages/chatList/ListOfChats';
import ViewChat from './components/chat/ViewChat';
import ListOfPosts from './pages/ListOfPosts/ListOfPosts';
import AppRoutes from './services/AppRoutes';
import './App.css';
import HelpAndFeedback from './pages/HelpAndFeedback/HelpAndFeedback';
import DeleteAccount from './pages/login/DeleteAccount';

function App() {
  return (
    <div className="App">
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <UserAuthContextProvider>
          <Switch>
            {/* <Route component={UnitSearch} path="/unitsearch" ></Route> */}
            {/* <Route component={List} path="/list" ></Route> */}
            {/* <Route component={UnitCreate} path="/add" ></Route> */}
            {/* <Route component={UnitUpdate} path="/update" ></Route> */}
            {/* <Route component={AddNewUnit} path="/addunit" ></Route> */}
            <Route component={ViewUser} path={AppRoutes.viewUser} ></Route>
            <Route component={ViewProducts} path={AppRoutes.viewProducts} ></Route>
            <Route component={ListOfUsers} path={AppRoutes.listUsers} ></Route>
            <Route component={ListOfEvents} path={AppRoutes.listEvents} ></Route>
            <Route component={ListOfStores} path={AppRoutes.listStores} ></Route>
            <Route component={AllProducts} path={AppRoutes.allProducts} ></Route>
            <Route component={SubscribedUsersList} path={AppRoutes.listSubsPay} ></Route>
            <Route component={NotifyUsers} path={AppRoutes.notifyUsers} ></Route>
            <Route component={EditProduct} path={AppRoutes.updateProduct} ></Route>
            <Route component={UpdateEvent} path={AppRoutes.updateEvent} ></Route>
            <Route component={ListOfChats} path={AppRoutes.listChats} ></Route>
            <Route component={ListOfPosts} path={AppRoutes.listPosts} ></Route>
            <Route component={HelpAndFeedback} path={AppRoutes.helpAndFeedback} ></Route>
            <Route component={ViewChat} path={AppRoutes.viewChat} ></Route>
            <Route component={Home} path={AppRoutes.home} ></Route>
            <Route component={DeleteAccount} path={AppRoutes.deleteAccount} ></Route>
            <Route component={Login} path={AppRoutes.login} ></Route>
          </Switch>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
