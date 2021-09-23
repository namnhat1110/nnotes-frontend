import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotesPage from "./pages/NotePage/NotesPage";
import NoteDetailPage from "./pages/NoteDetailPage/NoteDetailPage";
import CreatePage from "./pages/CreatePage/CreatePage"
import EmailForm from "./components/SendEmail/EmailForm";
import './App.css'


function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} exact path="/" component={HomePage} />
        <PublicRoute restricted={true} exact path="/login" component={LoginPage} />
        <PublicRoute restricted={true} exact path="/register" component={RegisterPage} />
        <PublicRoute restricted={false} exact path="/email" component={EmailForm} />
        <PrivateRoute exact path="/notes" component={NotesPage} />
        <PrivateRoute exact path="/notes/create/:id" component={CreatePage} />
        <PrivateRoute exact path="/notes/:id" component={NoteDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
