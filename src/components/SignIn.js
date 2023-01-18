import {React, useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './firebase-config';
import { Link, Navigate} from 'react-router-dom';
import { motion } from 'framer-motion';
import space from './images/space.gif';

const SignIn = () => {

 

    const[logInEmail, setLogInEmail] = useState('');
    const[logInPass, setLogInPass] = useState('');

    const [user, setUser] = useState({});
    
    const[error, setError] = useState('');

   

  

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
            if(error){
                //setError("Invalid Username or Password");
                alert("Invalid Username or Password")
            }
        //setError(error.message)
    }
       
    };
    

    



   

  
    return (

      
       
        < motion.div initial={{opacity:0}} animate={{opacity:1}}  exit={{opacity:0}} transition={{duration:3}}>
              
        {auth.currentUser? <div className = "alreadySignedIn"> <p> you are already signed in, click <Navigate to="/Main"> here </Navigate> to go back</p> </div>  :
          
         <div className='authContainer1'>  
         

            <div className='signInPrompt'> <h1 className='signUpPrompt'> Don't have an account? Click <Link to="/SignUp"><button className="signUpPrompt"> here </button> </Link>  to sign up!</h1> </div>
        
             <motion.h1 initial={{scale:2}} animate={{scale:1}} transition={{duration:1}}  className='signUp'> Sign In</motion.h1> 
             
        
            <input className='user' type = "text" name ="user" placeholder='Username'  onChange={(e)=>{setLogInEmail(e.target.value)}} />   
      
            <input className='pass' type = "text" name ="pass" placeholder='Password'  onChange={(e)=>{setLogInPass(e.target.value)}}  /> 

           <div className='signin'><Link style= {{textDecoration: 'none'}}to="/authenticate"  >  <button className='button-30' type='submit' onClick={login} > Sign In</button> </Link></div> 
            
      
            
           <div className='errormsg'> <p className='error-info'>{error}</p> </div> 
           
            
            </div>
            
           
            
            
            }
    
    <div className='lines'> <div className='title-n'> <h1 className='title-n'> Welcome to Note-ify.</h1> </div></div>

        </motion.div>
        

    
        
      )
  
}


export default SignIn