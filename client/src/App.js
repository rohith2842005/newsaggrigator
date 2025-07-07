import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";

import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Account } from "./pages/account/Account";
import { Create } from "./components/create/Create";
import EditArticle from "./components/edit/EditArticle";
import { DetailsPages } from "./pages/details/DetailsPages";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import { Regsiter } from "./pages/login/Regsiter";

import Tech from "./pages/News/Tech";
import Stocks from "./pages/News/Stocks";
import Cyber from "./pages/News/Cyber";
import Sports from "./pages/News/Sports";
import Politics from "./pages/News/Politics";

import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";

const AppContent = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const publicPaths = ["/login", "/sign-up", "/register"];
  const isPublicPage = publicPaths.includes(location.pathname);

  return (
    <>
      {!isPublicPage && isLoggedIn && <Header />}
      <Switch>
        {/* Public Routes */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/register" component={Regsiter} />

        {/* Protected Routes */}
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/about" component={About} />
        <ProtectedRoute exact path="/account" component={Account} />
        <ProtectedRoute exact path="/create" component={Create} />
        <ProtectedRoute exact path="/edit/:id" component={EditArticle} />
        <ProtectedRoute exact path="/details/:id" component={DetailsPages} />
        <ProtectedRoute exact path="/Stock" component={Stocks} />
        <ProtectedRoute exact path="/Tech" component={Tech} />
        <ProtectedRoute exact path="/Cyber" component={Cyber} />
        <ProtectedRoute exact path="/Sports" component={Sports} />
        <ProtectedRoute exact path="/Politics" component={Politics} />
      </Switch>
      {!isPublicPage && isLoggedIn && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;


// import React from "react"
// import { Footer } from "./components/footer/Footer"
// import { Header } from "./components/header/Header"
// import { Home } from "./pages/home/Home"

// import { Regsiter } from "./pages/login/Regsiter"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import { DetailsPages } from "./pages/details/DetailsPages"
// import { Account } from "./pages/account/Account"
// import { Create } from "./components/create/Create"
// import EditArticle from "./components/edit/EditArticle";


// import Tech from "./pages/News/Tech"
// import Stocks from "./pages/News/Stocks"
// import Cyber from "./pages/News/Cyber"
// import Sports from "./pages/News/Sports"
// import Politics from "./pages/News/Politics"

// import Login from "./pages/login/Login"
// import SignUp from "./pages/login/SignUp"

// // import EmailRestAPI from "./pages/contact/EmailRestAPI"
// import { About } from "./pages/about/About"
// const App = () => {
//   return (
//     <>
//       <Router>
//         <Header />
//         <Switch>
//           <Route exact path='/' component={Home} />
//           <Route exact path='/login' component={Login} />
//           <Route exact path='/sign-up' component={SignUp}/>
//           <Route exact path='/sign-in' component={Login}/>
//           <Route exact path='/register' component={Regsiter} />
//           <Route exact path='/details/:id' component={DetailsPages} />
//           <Route exact path='/about' component={About}/>
//           {/* <Route exact path='/contact' component={EmailRestAPI}/> */}
//           <Route exact path='/account' component={Account} />
//           <Route exact path='/create' component={Create} />
//           <Route exact path='/edit/:id' component={EditArticle} />
//           <Route exact path='/Stock' component={Stocks} />
//           <Route exact path='/Tech' component={Tech} />
//           <Route exact path='/Cyber' component={Cyber} />
//           <Route exact path='/Sports' component={Sports} />
//           <Route exact path='/Politics' component={Politics} />
//         </Switch>
//         <Footer />
//       </Router>
//     </>
//   )
// }
// export default App
