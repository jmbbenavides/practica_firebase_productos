import React, { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import firebaseServices from '../firebase/appConfig';
const { db, auth_user } = firebaseServices;
import Login from './sessions/Login'

export default function HomeSession() {
    const[user, setUser] = useState()

    onAuthStateChanged(auth_user,(userFirebase)=>{
        if(userFirebase){
            console.log(userFirebase)
            setUser(userFirebase)
        }else{
            setUser(null)
        }
    })
  return (
    <div>
      {
        user ?
        <>
        <h1>Bienvenido a la Apliacacion</h1>
        <p>Has iniciado seccion</p>
        </>
        : <Login/>
      }
    </div>
  )
}
