import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import firebaseServices from '../firebase/appConfig';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const { db } = firebaseServices;

export default function ListProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        onSnapshot(
            collection(db, "products"),
            (snapshot) => {
                const array_products = snapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
                setProducts(array_products);
            }
        );
    }, []);

    const deleteProduct = async (id) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro de eliminar?",
                text: "¡NO HABRÁ VUELTA ATRÁS!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Borrar!",
                customClass: {
                    popup: 'custom-swal-popup'
                },
            });
    
            if (result.isConfirmed) {
                await deleteDoc(doc(db, "products", id));
                Swal.fire({
                    title: "¡Se eliminó exitosamente!",
                    text: "¡No hay vuelta atrás!",
                    icon: "warning",
                    customClass: {
                        popup: 'custom-swal-popup'
                    },
                });
            }
        } catch (error) {
            console.error("Error al eliminar un producto", error);
        }
    };
    
    // Agregar estilos CSS para el texto blanco
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-swal-popup {
        color: #ffffff; /* Color del texto */
      }
    `;
    document.head.appendChild(style);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Lista de Productos</h2>
            <div style={styles.productsContainer}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} style={styles.productCard}>
                            <h3 style={styles.productName}>{product.name}</h3>
                            <p style={styles.productDescription}>{product.description}</p>
                            <Link to={`/editar/${product.id}`} style={styles.editLink}>Editar</Link>
                            <button onClick={() => deleteProduct(product.id)} style={styles.deleteButton}>Eliminar</button>
                        </div>
                    ))
                ) : (
                    <p style={styles.noProductsText}>No hay productos por el momento</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        textAlign: 'center'
    },
    title: {
        color: '#ffffff',
        marginBottom: '20px'
    },
    productsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
    },
    productCard: {
        width: '250px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        textAlign: 'left'
    },
    productName: {
        fontSize: '18px',
        color: '#ffffff',
        marginBottom: '10px'
    },
    productDescription: {
        fontSize: '14px',
        color: '#black',
        marginBottom: '15px'
    },
    editLink: {
        display: 'inline-block',
        marginRight: '10px',
        color: '#3085d6',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    deleteButton: {
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#d33',
        color: '#fff',
        cursor: 'pointer'
    },
    noProductsText: {
        fontSize: '16px',
        color: '#666'
    }
};
