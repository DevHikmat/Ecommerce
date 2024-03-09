import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../../context/Store';

const URL = "https://fakestoreapi.com/products/";

const ViewProduct = () => {
    const [currentProd, setCurrentProd] = useState(null);
    const { id } = useParams();

    const { cartList, user, handleAddCart, handleIncrementProd, handleDecrementProd, handleRemoveProd } = useStore();

    const getCurrentProduct = async () => {
        try {
            const response = await axios.get(URL + id);
            setCurrentProd(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCurrentProduct();
    }, [id])
    return (
        currentProd ? <div>
            <div className="container">
                <div className="row py-5">
                    <div className="col-12">
                        <button className="btn btn-light px-5">{currentProd.category}</button>
                    </div>
                </div>
                <div className="row py-5">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <img className='img-fluid' src={currentProd.image} alt="product picture" />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 bg-white p-3 rounded">
                        <h3>{currentProd.title}</h3>
                        <p>{currentProd.description}</p>
                        <div className='d-flex gap-5'>
                            <span className="badge bg-warning">{currentProd.price}$</span>
                            {
                                <div className="d-flex align-items-center justify-content-between">
                                    <mark>{currentProd.price}$</mark>
                                    {user.isLoggedIn && cartList.find(item => item.product.id == id) ? <div className="btn-group flex-wrap">
                                        <button onClick={() => handleDecrementProd(currentProd.id)} className='btn btn-light' disabled={cartList.find(item => item.product.id == id).count === 1}>-</button>
                                        <button className='btn btn-light disabled'>{
                                            cartList.find(item => item.product.id == id).count
                                        }</button>
                                        <button onClick={() => handleIncrementProd(currentProd.id)} className='btn btn-light'>+</button>

                                        <button onClick={() => handleRemoveProd(currentProd.id)} className='btn btn-outline-danger'>&times;</button>

                                    </div> : <button onClick={() => handleAddCart(currentProd)} className='btn btn-warning'><box-icon name="cart-alt"></box-icon></button>}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div> : <div>Loading...</div>
    )
}

export default ViewProduct