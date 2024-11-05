import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import firebaseServices from '../firebase/appConfig';
import { useNavigate } from 'react-router-dom';

const { db } = firebaseServices;

export default function RegisterProduct() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    //creando una constante para redirigir a una ruta
    const navigate = useNavigate();

    console.log(watch('name'));

    //metodo para guardar un producto
    const saveProduct = async (data) => {
        console.log("Se ha guardado");
        alert("Registro guardado");
        console.log(data); // { name: cebolla, description: cebollas moradas }
        
        try {
            await addDoc(collection(db, "products"), {
                name: data.name,
                description: data.description
            });
        } catch (error) {
            console.error("Error al registrar el producto", error);
        }
        
        navigate("/productos");
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Registro de Productos</h2>
            <form onSubmit={handleSubmit(saveProduct)} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="" style={styles.label}>Ingresar Producto</label>
                    <input type="text" {...register('name')} style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="" style={styles.label}>Descripción</label>
                    <input type="text" {...register('description')} style={styles.input} />
                </div>
                
                <div style={styles.buttonGroup}>
                    <button type='submit' style={styles.button}>Guardar Producto</button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    },
    title: {
        textAlign: 'center',
        color: '#fffff',
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
        color: 'black'
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    buttonGroup: {
        textAlign: 'center',
        marginTop: '20px'
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
