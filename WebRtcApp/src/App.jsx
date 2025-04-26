import {useState} from 'react'
import {BrowserRouter as Router, 
        Routes,
        Route
}
from 'react-router-dom';
import {Provider as MapProvider} from '../src/context/MapSliceContext';
import {Provider as AuthProvider} from '../src/context/AuthContext';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';
function App() {

  return (

      <MapProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path ="/" element ={<LoginPage />}></Route>
              <Route path ="/Map" element={<MapPage />}></Route>
            </Routes>
          </Router>
        </AuthProvider>
        
      </MapProvider>
      
    
  )
}

export default App
