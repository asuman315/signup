import React from 'react';
import Login from './Components/Login';
import './index.css';

function App() {
  const id = new Date().getTime().toString();
  return (
    <section className="app">
        <Login />
    </section>
  );
}

export default App;
