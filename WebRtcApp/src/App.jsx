import {useState} from 'react'
import {BrowserRouter as Router, 
        Routes,
        Route
}
from 'react-router-dom';
import {Provider as MapProvider} from '../src/context/MapSliceContext';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
function App() {

  return (
      <MapProvider>
        <Router>
          <Routes>
            <Route path ="/" element ={<LoginPage />}></Route>
            <Route path ="/Map" element={<MapPage />}></Route>
          </Routes>
        </Router>
      </MapProvider>
      
    
  )
}

export default App
