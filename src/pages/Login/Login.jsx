import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStore } from '../../context/Store';
const URL = "https://fakestoreapi.com/auth/login";

const Login = () => {
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate();
    const { setUser } = useStore();

    const handleLogin = async () => {
        if (!username.current.value.trim().length ||
            !password.current.value.trim().length) {
            return toast.warning("Iltimos barcha maydonni to'ldiring.");
        }
        const data = {
            username: username.current.value,
            password: password.current.value
        }
        // name: mor_2314
        // pass: 83r5^_
        try {
            const response = await axios.post(URL, data);
            localStorage.setItem("token", response.data.token);
            setUser(prev => ({ ...prev, isLoggedIn: true }));
            toast.success("Login successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.response.data);
        }
    }
    return (
        <div>
            <form className='bg-light w-25 mx-auto p-5 mt-5 rounded'>
                <input ref={username} type="email" className="form-control mb-3" />
                <input ref={password} type="password" className="form-control mb-3" />
                <button type='button' onClick={handleLogin} className='btn btn-success'>Log in</button>
            </form>
        </div>
    )
}

export default Login