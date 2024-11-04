import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import firebaseServices from '../../firebase/appConfig'
import Swal from 'sweetalert2';
const { db, auth_user } = firebaseServices;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  const loginForm = (data) => {
    signInWithEmailAndPassword(auth_user, data.email, data.password).then((userCredentiales) => {
        const user = userCredentiales.user
        console.log(user)
    }).catch((error) => {
        console.error(error.message)
        Swal.fire({
          title: "Credenciales Invalidas",
          text: "Revisa tu informacion",
          icon: "warning"
        });
    })
  }

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleSubmit(loginForm)}>
        <div>
          <label htmlFor="">Correo Electrónico</label>
          <input type="email" placeholder='Ingrese su Correo' {...register('email', { required: true })} />
          {errors.email && <span>Campo Obligatorio</span>}
        </div>

        <div>
          <label htmlFor="">Contraseña</label>
          <input type="password" placeholder='Ingresar Contraseña' {...register('password', { required: true })} />
          {errors.password && <span>Campo Obligatorio</span>}
        </div>

        <button type='submit'>Iniciar Sesión</button>
      </form>
    </div>
  )
}

//56 minuto del video