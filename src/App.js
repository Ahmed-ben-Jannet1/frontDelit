import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Nav";
import SignIn from "./pages/auth/SignIn";
import Landing from "./pages/Landing";
import SignUp from "./pages/auth/SignUp";
import MyList from "./pages/list/MyList";
import Profile from "./pages/Profile";
import Alert from "./pages/authError/Alert";
import PrivateRoutes from "./utils/PrivateRoute";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { PROFILE } from "./utils/queries";

function App() {
  const [authen, setAuthen] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [loadUserData] = useLazyQuery(PROFILE, {
    onCompleted: () => {
      setAuthen(true);
    },
    onError: (error) => {
      console.log(error);
      setAuthen(false);
    },
  });

  useEffect(() => {
    if (isAuth) {
      loadUserData();
    }
  }, [isAuth, loadUserData]);

  return (
    <div className="App">
      <Navbar />
      <Alert />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signIn" element={<SignIn />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route
          exact
          path="/list"
          element={
            <PrivateRoutes isLoggedIn={authen}>
              <MyList />
            </PrivateRoutes>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <PrivateRoutes isLoggedIn={authen}>
              <Profile />
            </PrivateRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
