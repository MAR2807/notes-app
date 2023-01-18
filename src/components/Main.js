import {React, useState, useEffect} from 'react'
import { signOut } from 'firebase/auth';
import {db,auth} from './firebase-config';
import { Link,Navigate} from 'react-router-dom';

import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, onSnapshot, getDocs, doc, where, addDoc, deleteDoc, updateDoc} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import del from './images/delete.jpg';
import 'firebase/compat/firestore';


export const Main = () => {
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState({});
  const[messages, setMessages] = useState([]);
  const[sendingMSG, setSendingMsg] = useState([]);
  const[updatedMSG, setUpdatedMsg] = useState([]);
  const[modalStatus, setModalStatus] = useState(false);
  const[modalId, setModalId] = useState([]);
  const[overlayStatus, setOverlayStatus] = useState(true);
  
  
  
 
  


 useEffect(()=>{


  auth.onAuthStateChanged(
      async(currentUser) => {
          if(user!= null){
              setUser(currentUser);
              setUserID(auth.currentUser.uid)
          
              
              const q =  query(collection(db,'messages'), limit(50) , orderBy('createdAt'), where("uid", "in", [auth.currentUser.uid])) 
              onSnapshot(q, (snapshot)=>{
                let info =[];
                setMessages(info);
                
                snapshot.docs.forEach((doc)=>{
                  info.push({...doc.data(), id:doc.id})
                    
                      setMessages(info);
                   
                    
                    
                
                })
               
              })
              
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
  
 console.log("send modal status" + " " + modalStatus);
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


const toggleModal = (modalStatus,id) => {


  var show = document.getElementById('modal-1');
  
  
 
  setModalId(id);
  toggleOverlay(overlayStatus);
 
 
if(modalStatus === true){
  console.log(" if");
  show.style.display='none';
 
  setModalStatus(false);
  toggleOverlay(overlayStatus);

}
else if (modalStatus === false){
 console.log("else if");
  show.style.display='block';
  setModalStatus(true);
  console.log(modalStatus);
  toggleOverlay(overlayStatus);
  
}
console.log(modalStatus);




}

const toggleOverlay = (overlayStatus) => {
  var overlay = document.getElementById('overlay');

  if(overlayStatus == false){
  


    overlay.style.display='none';
    setOverlayStatus(true);
  
  }
  else{
    overlay.style.display='block';
    
    setOverlayStatus(false);

    
  }


}

const updateMSG = async (id, updatedMSG)=>{
  toggleModal(modalStatus);
  toggleOverlay(overlayStatus);
  

  if(updatedMSG === ""){
    deleteMSG(id);
    
  }
  else{
    const userDoc = doc(db,"messages",id)
    await updateDoc(userDoc,{
      message: updatedMSG,
  
  })
  }






}

const  deleteMSG = async (id) => {
  const userDoc = doc(db,"messages", id);
  await deleteDoc(userDoc)
  

}























   

  return (

    
    

    
  
            <div className = "authContainer223">
            
          
            <div  > 
              {auth.currentUser? 
              <div> 

              
                
             

                 <div className='user-info-1'> 
                       <div className="users_info"> 
      
                        <div className='signOutBTN'> 
                        <h2> NOTES </h2>
                        <Link style={{ textDecoration: 'none' }} to="/SignIn" > <button class="button-30" role="button" type='submit' onClick={logout} >sign out </button> </Link> 
                        
                        </div> 

                        </div>   
                 <div className = "mt2" >
         

                
                {messages.map(({id, message}) =>(
                    <div key={id}>
                         
                      <div key={id} className='buttonDisplay'>

                      
                     

                       <div key={id} className='buttonContainer'> 
                          <div  className="deleteButton">  
                          
                            <button value = {id} onClick={() => deleteMSG(id)} className="button-30"> <img className='delIcon' src={del}/> </button> 
                            
                            <p className='msg'>{message} </p> 
                          </div>

                         </div>
                        <div className='editBTN'><button className='button-30' role="button" onClick={() => toggleModal(modalStatus,id)}> <p className='msgInput'>edit</p> </button> </div> 
                      </div>
                      
                     
                    <div id='modal-1' >  
                    
                       <input className ='msgInput'  id="update" type ='text'  placeholder='enter edit message here' value = {updatedMSG} maxLength="80" onChange={e => setUpdatedMsg(e.target.value)}/> 
              
                       <div className='updateBTN'> <button className='button-30' id="update2" onClick={() => {updateMSG(modalId, updatedMSG)}}> <p className='msgInput'>update</p> </button> </div>
                       
                       
                        
                     
                      
                    </div> 
                    

                     

                    </div>
                         
                
                )) }

                
                </div>

    

                
                <div id='overlay' onClick={() => toggleModal(modalStatus,modalId)}>  </div>
                     


                  

                      
                    
                    

                      <div className='msgInput'>

                          <form onSubmit={sendMSG}>

                              <input className ='msgInput' type ='text' placeholder='enter message here' value = {sendingMSG} maxLength="80" onChange={e => setSendingMsg(e.target.value)}/> 
                              
                              <div className='send'> <button className='button-30'> <p className='msgInput'>Send</p> </button></div>

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
