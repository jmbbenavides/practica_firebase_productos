import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import firebaseServices from '../firebase/appConfig';
import Swal from 'sweetalert2';

const { db, auth_user } = firebaseServices;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  const loginForm = (data) => {
    signInWithEmailAndPassword(auth_user, data.email, data.password)
      .then((userCredentiales) => {
        const user = userCredentiales.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          title: "Credenciales Inválidas",
          text: "Revisa tu información",
          icon: "warning",
          backdrop: 'rgba(255, 0, 0, 0.7)', // Fondo rojo semitransparente
          customClass: {
            popup: 'custom-swal-popup'
          },
        });
      });
  };


  const style = document.createElement('style');
style.innerHTML = `
  .custom-swal-popup {
    color: #ffffff; /* Color del texto */
  }
`;
document.head.appendChild(style);
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Inicio de Sesión</h1>
      <form onSubmit={handleSubmit(loginForm)} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Correo Electrónico</label>
          <input
            type="email"
            placeholder="Ingrese su Correo"
            {...register('email', { required: true })}
            style={styles.input}
          />
          {errors.email && <span style={styles.errorText}>Campo Obligatorio</span>}
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresar Contraseña"
            {...register('password', { required: true })}
            style={styles.input}
          />
          {errors.password && <span style={styles.errorText}>Campo Obligatorio</span>}
        </div>

        <button type="submit" style={styles.button}>Iniciar Sesión</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  title: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    color: '#ffffff'
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  errorText: {
    color: '#black',
    fontSize: '12px',
    marginTop: '5px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer'
  }
};
