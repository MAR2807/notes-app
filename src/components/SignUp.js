import {React, useState, useEffect} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from './firebase-config'
import { Link} from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {

 
    const[registerEmail, setRegisterEmail] = useState('');
    const[registerPass, setRegisterPass] = useState('');

    
    

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
   

   

    
    const register = async ()=>{
        setError('');
        try{
            await createUserWithEmailAndPassword(auth, registerEmail, registerPass);
            
        }
        catch(error){ console.log(error.message)
            setError(error.message)
        }
       
       
    };
    


   

  
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}}  exit={{opacity:0}} transition={{duration:1}}>
           
        <div initial={{opacity:0}} animate={{opacity:1}}  exit={{opacity:0}} transition={{duration:1}} className='authContainer'> 
        
            <motion.h1  initial={{scale:2}} animate={{scale:1}} transition={{duration:1}} className='signUp'> Sign Up</motion.h1> 
          
             <input className='user' type = "text" name ="user" placeholder='Username' onChange={(e)=>{setRegisterEmail(e.target.value)}} />   
           
             <input className='pass' type = "text" name ="pass" placeholder='Password'  onChange={(e)=>{setRegisterPass(e.target.value)}} />  

             
    
           <Link to ="/SignIn"> <button className='submit' type='submit' onClick={register} > sign up  </button>  </Link>
            <p className='error-info'>{error}</p>
            

           
            
           
            
    
        </div>
        

        <div className='signUpPrompt'> <h1 className='signUpPrompt'> Already have an account? Click <Link to="/SignIn"><button className="signUpPrompt"> here </button> </Link>  to sign in!</h1> </div>

    
        </motion.div>
      )
  
}

export default SignUp