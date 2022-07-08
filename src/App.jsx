import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';

function App() {

  const location = useLocation();

  fetch('http://localhost:8080/all')
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  })
  .catch((error) => {
    console.error(error);
  });


  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
