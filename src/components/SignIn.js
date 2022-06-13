import {React, useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {auth} from './firebase-config';
import { Link, Navigate} from 'react-router-dom';
import { motion } from 'framer-motion';

const SignIn = () => {

 

    const[logInEmail, setLogInEmail] = useState('');
    const[logInPass, setLogInPass] = useState('');

    const [user, setUser] = useState({});
    
    const[error, setError] = useState('');

    const[success, setSuccess] = useState('');

    let err = '';

    useEffect(()=>{
        auth.onAuthStateChanged(
            async(currentUser) => {
                if(user){
                    setUser(currentUser);
                }
            }
        )
    },[user]
    )
   

   



    const login = async ()=>{
        setError('');
        try{
            const user = await signInWithEmailAndPassword(auth, logInEmail, logInPass);
            console.log(user)
        }
        catch(error){ console.log(error.message)
        setError(error.message)
    }
       
    };
    

    const logout = async ()=>{

        await signOut(auth);
        
    }



   

  
    return (
        
        <div>
        {auth.currentUser? <div className = "alreadySignedIn"> <p> you are already signed in, click <Navigate to="/Main"> here </Navigate> to go back</p> </div>  :
        <motion.div initial={{opacity:0}} animate={{opacity:1}}  exit={{opacity:0}} transition={{duration:1}} className='authContainer1'>    
        
             <motion.h1 initial={{scale:2}} animate={{scale:1}} transition={{duration:1}}  className='signUp'> Sign In</motion.h1> 
        
            <input className='user' type = "text" name ="user" placeholder='Username'  onChange={(e)=>{setLogInEmail(e.target.value)}} />   
      
            <input className='pass' type = "text" name ="pass" placeholder='Password'  onChange={(e)=>{setLogInPass(e.target.value)}}  /> 

            <Link to="/authenticate"  >  <button className='submit' type='submit' onClick={login} > Sign In</button> </Link>
            {/* <button className='submit' type='submit' onClick={login} > Sign In</button> */}
      
            
            <p className='error-info'>{error}</p>
            
            </motion.div>
            
            
            
            }
    
    <div className='signUpPrompt'> <h1 className='signUpPrompt'> Don't have an account? Click <Link to="/SignUp"><button className="signUpPrompt"> here </button> </Link>  to sign up!</h1> </div>
        </div>

    
       
      )
  
}

export default SignIn