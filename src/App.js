
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from 'framer-motion';

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import {React} from 'react'
import { Main } from './components/Main';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import { auth } from './components/firebase-config';




function App() {

  
  return (
  <Router>

{/* element={<Main/>} */}

        <div className='authContainer2'>
              
              <AnimatePresence exitBeforeEnter>
              <Routes >
                <Route exact path = "/" element={<SignIn />}>
                  
                  </Route>
                <Route  exact path = "/Main"  element={ <Main />}>
                 
                </Route>
               
                <Route exact path = "/SignIn" element={ <SignIn/>}> 

              
                </Route>
                <Route exact path = "/SignUp" element={<SignUp />}>
                  
                </Route>

                <Route exact path = "/authenticate" element={auth.currentUser ? <Navigate to ="/Main" /> : <SignIn/> }>
               
                  
                </Route>
                <Route exact path = "/authenticate2" element={auth.currentUser ? <Main /> : <SignUp/> }>
              
                  
                </Route>
              </Routes>
              </AnimatePresence>
         </div>

     
  </Router>
    

  );

  
}

export default App;
