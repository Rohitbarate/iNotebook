import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/HomeScreen/Home";
import Login from "./components/loginScreen/Login";
import Register from "./components/registerScreen/Register";
import About from "./components/AboutScreen/About";
import NoteState from "./context/notes/NoteState";
import MessageBox from "./components/messageBox/MessageBox";
import { useEffect, useState } from "react";

function App(props) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setUser(user);

    }
  }, [user]);

  setTimeout(() => {
    setMessage(null);
  }, 2000);

  return (
    <NoteState>
      <Navbar user={user} setUser={setUser} setMessage={setMessage} />
      {message ? <MessageBox message={message} /> : ""}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home user={user} message={message} setMessage={setMessage} />
          }
        />
        <Route
          path="/profile"
          element={<About user={user} setUser={setUser} message={message} setMessage={setMessage} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setUser={setUser}
              user={user}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/register"
          element={<Register message={message} setMessage={setMessage} />}
        />
      </Routes>
    </NoteState>
  );
}

export default App;
