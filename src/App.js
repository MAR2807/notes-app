
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from 'framer-motion';
import Auth from './components/SignUp';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import {React, useState, useEffect} from 'react'
import { Main } from './components/Main';
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { auth } from './components/firebase-config';




function App() {
  const [user, setUser] = useState({});
   const [userSignedIn] = useState(false);
  
  return (
  <Router>

{/* element={<Main/>} */}

        <div className='authContainer2'>
              
              <AnimatePresence exitBeforeEnter>
              <Routes >
                <Route exact path = "/" element={<Navigate to="/SignIn" />}>
                  
                  </Route>
                <Route  exact path = "/Main"  element={ <Main />}>
                 
                </Route>
                {/* <Route exact path = "/SignIn" element={auth.currentUser? <Navigate to = "/Main" /> : <Navigate to="/SignIn"/>}> */}
                <Route exact path = "/SignIn" element={ <SignIn/>}> 

                {/* <Route exact path = "/SignIn" element={<SignIn />}>  */}
                </Route>
                <Route exact path = "/SignUp" element={<SignUp />}>
                  
                </Route>

                <Route exact path = "/authenticate" element={auth.currentUser ? <Navigate to ="/Main" /> : <SignIn/> }>
                {/* <Navigate to="/SignIn"/> */}
                  
                </Route>
              </Routes>
              </AnimatePresence>
         </div>

     
  </Router>
    

  );

  
}

export default App;