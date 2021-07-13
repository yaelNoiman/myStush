import React, { Component } from 'react';
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import { Redirect, Route, Switch } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import BizSignup from "./components/bizsSignup";
import CreatePost from './components/createPost';
import ProtectedRoute from './components/common/protectedRoute';
// import cardService from "../services/cardsService";
import MyPosts from './components/myPosts';
import EditPost from './components/editPost';



class App extends Component {
  state = { 
    user:null,
   }

   componentDidMount() {
     const user = userService.getCurrentUser();
     this.setState({user})
   }
  render() { 
    const {user}= this.state;

    return ( <div className="d-flex flex-column min-vh-100">
    <ToastContainer/>
     <header>
       <Navbar user={user} />
     </header>
     <main className="container-fluid flex-fill">
       <Switch>
         {/* 3 ways to routing  */}
         <ProtectedRoute path="/my-posts" component={Home}/>
         <ProtectedRoute
         path = "/createPost"
         component={CreatePost}
         biz={true}
         />
          <ProtectedRoute
         path = "/edit/:id"
         component={EditPost}
         biz={true}
         />
         <Route path="/create-post" component={CreatePost}/>
         <Route path="/signup" component={Signup}/>
         <Route path="/signin" component={Signin}/>
         <Route path="/biz-signup" component={BizSignup}/>
         <Route path="/logout" component={Logout}/>
         <Route path="/about" component={About}/>
         <Route path="/" component={Home} exact/>
         <Redirect to="/"/>
         <Route exact path="/">
           <Home />
         </Route>
       </Switch>
     </main>

     <footer>
       <Footer />
     </footer>
   </div> );
  }
}
 
export default App;
