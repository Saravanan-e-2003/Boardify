import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/BoardPage';
import SignUp from './components/Sign-up';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </Router>
  );
}

export default App;