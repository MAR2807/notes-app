import {React, useState, useEffect} from 'react'
import { signOut } from 'firebase/auth';
import {db,auth} from './firebase-config'
import { Link,Navigate} from 'react-router-dom';

import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, onSnapshot, getDocs, doc, where, addDoc, deleteDoc} from 'firebase/firestore'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const Main = () => {
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState({});
  const[messages, setMessages] = useState([]);

  const[sendingMSG, setSendingMsg] = useState([]);

 // const user1 = auth.currentUser.uid;
 useEffect(()=>{
  auth.onAuthStateChanged(
      async(currentUser) => {
          if(user!= null){
              setUser(currentUser);
              setUserID(auth.currentUser.uid)
              
              const q =  query(collection(db,'messages'), limit(50) , orderBy('createdAt'), where("uid", "in", [auth.currentUser.uid])) //where("uid", "in", [auth.currentUser.uid])
              onSnapshot(q, (snapshot)=>{
                let info =[]
                snapshot.docs.forEach((doc)=>{
                  info.push({...doc.data(), id:doc.id})
                  setMessages(info);
                
                })
              })
              console.log(userID);
              await getDocs(q);
    
            

          }
      }
  )
},[user]
)
 
  
  











    

    const logout = async ()=>{

        await signOut(auth);
        
        
        
    }

 async function sendMSG(e){
   e.preventDefault();
   const {uid} = auth.currentUser
   var regExp = /[a-zA-Z]/g;
     
    if(regExp.test(sendingMSG)){
      await addDoc(collection(db,'messages'),{
        message: sendingMSG,
        uid:uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
   
   setSendingMsg('');

    }
    else{
      alert("You must enter atleast one letter")
    }
 

}

const  deleteMSG = async (id) => {
  const userDoc = doc(db,"messages", id);
  await deleteDoc(userDoc)
    
    

console.log(id)
}





   

  return (

    

  
            <div className = "authContainer223">
            
          
            <div  > 
              {auth.currentUser? 
              <div> 

              
                <div className='signOutButton'> <Link to="/SignIn" > <button className='signOutButton' type='submit' onClick={logout} > sign out</button> </Link> </div> 
             

                 <div className='user-info-1'> 
                 <div className = "mt2" > 
                
                { messages.map(({id, message}) =>(
                    <div key={id}>
                         
                      <div key={id} className='buttonDisplay'>
                        
                       
                       <div key={id} className='buttonContainer'> 
                          <div  className="deleteButton">  
                            <button value = {id} onClick={() => deleteMSG(id)} className="deleteButton"> delete </button> 
                            <p className='buttonmsg1'>{message}</p> 
                          </div>

                         </div>

                      </div>

                    </div>
                         
                        
                    

                 

                  
                
                ))}
                </div>

    

                
                      
                      <div className='title'> <h1> Notes1: </h1> </div>
                    <div className="users_info"> 
                          <p className='info-head'> User info: </p>
                          <p className='email'> {auth.currentUser?.email} </p> 

                     </div>

                  

                      
                    
                    

                    <div className='msgInput'>

                      <form onSubmit={sendMSG}>

                      
                      <input className ='msgInput' type ='text' placeholder='enter message here' value = {sendingMSG} maxLength="80" onChange={e => setSendingMsg(e.target.value)}/> 
                      <button className='msgInput'> Send </button>

                      </form>

                    </div>
                  

                   </div>


              </div> : 
              <div className='authContainer'>
                
                 <motion.h1 initial={{opacity:0}} animate={{opacity:1}}  exit={{opacity:0}}> There was an error signing in, click <Navigate to="/SignIn">here</Navigate> to go back</motion.h1> 
               
                </div>}
               
              
     
             
              
               


              </div>
             
            </div>

            
  
  )
}
