import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import firebaseServices from '../firebase/appConfig';
import Home from '../components/Home';
import ListProducts from '../components/ListProducts';
import RegisterProduct from '../components/RegisterProduct';
import EditForm from '../components/EditForm';
import Login from '../components/Login';

const { auth_user } = firebaseServices;

export default function Menu() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth_user, (userFirebase) => {
            if (userFirebase) {
                console.log(userFirebase);
                setUser(userFirebase);
            } else {
                setUser(null);
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth_user]);

    return (
        <BrowserRouter>
            {/* Solo mostrar la navegación si el usuario está autenticado */}
            {user && (
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/productos">Productos</Link>
                            </li>
                            <li>
                                <Link to="/registro">Registro</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            )}

            <Routes>
                <Route path='/' element={user ? <HomeSession user={user} /> : <Login />} />
                <Route path='/productos' element={user ? <ListProducts /> : <Login />} />
                <Route path='/registro' element={user ? <RegisterProduct /> : <Login />} />
                <Route path='/prueba' element={user ? <RegisterProduct /> : <Login />} />
                <Route path='/editar/:id' element={user ? <EditForm /> : <Login />} />
            </Routes>
        </BrowserRouter>
    );
}

function HomeSession({ user }) {
    return (
        <div>
            <h1>Bienvenido a la Aplicación</h1>
            <p>Has iniciado sesión como: {user.email}</p>
        </div>
    );
}
