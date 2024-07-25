// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import AddNote from "./components/Notes/AddNote";
import EditNote from "./components/Notes/EditNote";
import NotesList from "./components/Notes/NotesList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route element={<Layout user={user} />}>
          <Route path="/" element={<NotesList user={user} />} />
          <Route path="/create" element={<AddNote user={user} />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
