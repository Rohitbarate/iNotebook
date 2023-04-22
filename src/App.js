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
import { getNotes } from "./components/noteApi";

function App(props) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setUser(user);
      async function fetchNotes() {
        setLoading(true);
        const data = await getNotes(user);
        console.log(data);
        if (data.notes) {
          setNotes(data.notes);
        }
        setLoading(false);
      }
      fetchNotes();
    }
  }, [notes]);

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
            <Home
              user={user}
              message={message}
              setMessage={setMessage}
              setNotes={setNotes}
              notes={notes}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <About
              user={user}
              setUser={setUser}
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
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
