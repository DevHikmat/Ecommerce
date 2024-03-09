import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/Store'
import "./Navbar.scss";

const Navbar = () => {
    const { user, setUser, cartList } = useStore();
    const [isChange, setIsChange] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(prev => ({ ...prev, isLoggedIn: false }));
    }

    useEffect(() => {
        let timer;
        if (cartList.length > 0) {
            setIsChange(true);
            timer = setTimeout(() => {
                setIsChange(false);
            }, 800);
        }
        return () => clearTimeout(timer);
    }, [cartList.length])
    return (
        <nav className="navbar sticky-top navbar-expand-lg shadow">
            <div className="container">
                <a className="navbar-brand" href="#">Ecommerce App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Electronics</a></li>
                                <li><a className="dropdown-item" href="#">Jawelery</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Men's clothing</a></li>
                                <li><a className="dropdown-item" href="#">Woman's clothing</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                    {
                        user.isLoggedIn === true ?
                            <div>
                                <Link to="/cart">
                                    <box-icon name="cart-alt"></box-icon>
                                    <span>{cartList.length}</span>
                                    {isChange ? <box-icon animation="tada" name="bell"></box-icon> :
                                        <box-icon name="bell"></box-icon>}
                                </Link>
                                <button onClick={handleLogout} className='btn btn-danger'>log out</button>
                            </div>
                            :
                            <Link to="/login" className="btn btn-primary">Log in</Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar