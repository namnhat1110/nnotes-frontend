import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotesPage from "./pages/NotePage/NotesPage";
import CollabPage from "./pages/CollabPage/CollabPage";
import NoteDetailPage from "./pages/NoteDetailPage/NoteDetailPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import Toastify from "./components/Toastify/Toastify";
import { ClipLoader } from "react-spinners";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import authActions from "./redux/actions/auth.action";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated === undefined ? (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        </div>
      ) : (
        <Router>
          <Toastify />
          <Switch>
            <PublicRoute
              restricted={true}
              exact
              path="/"
              component={HomePage}
            />
            <PublicRoute
              restricted={true}
              exact
              path="/login"
              component={LoginPage}
            />
            <PublicRoute
              restricted={true}
              exact
              path="/register"
              component={RegisterPage}
            />
            <PrivateRoute exact path="/notes" component={NotesPage} />
            <PrivateRoute exact path="/notes-collab" component={CollabPage} />
            <PrivateRoute
              exact
              path="/notes/create/:id"
              component={CreatePage}
            />
            <PrivateRoute exact path="/notes/:id" component={NoteDetailPage} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
