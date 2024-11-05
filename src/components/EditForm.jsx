import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import firebaseServices from '../firebase/appConfig';
import { useForm } from 'react-hook-form';

const { db } = firebaseServices;

export default function EditForm() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProductById = async () => {
            const productDoc = await getDoc(doc(db, "products", id));
            if (productDoc.exists()) {
                const productData = productDoc.data();
                setValue('name', productData.name);
                setValue('description', productData.description);
            } else {
                console.log("No existe el producto");
            }
        };
        getProductById();
    }, [id, setValue]);

    const editProduct = async (data) => {
        try {
            await updateDoc(doc(db, "products", id), {
                name: data.name,
                description: data.description
            });
            navigate("/productos");
        } catch (error) {
            console.error('Error al actualizar el producto', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Editar Producto</h2>
            <form onSubmit={handleSubmit(editProduct)} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="name" style={styles.label}>Ingresar Producto</label>
                    <input type="text" {...register('name')} style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="description" style={styles.label}>Descripción</label>
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
