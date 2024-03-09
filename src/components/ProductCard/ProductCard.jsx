import React, { memo } from 'react'
import "./ProductCard.scss";
import { useStore } from '../../context/Store';
import { Link } from 'react-router-dom';

const ProductCard = ({ prod }) => {
    const { user, cartList, handleAddCart, handleIncrementProd, handleDecrementProd, handleRemoveProd } = useStore();
    const { id } = prod;
    return (
        <div className="prod-item" key={prod.id}>
            <div className="card">
                <img src={prod.image} alt="product" className="card-img-top" />
                <div className="card-body">
                    <Link className='' to={`/product/${id}`}>
                        <h4>{prod.title}</h4>
                        <p>{prod.description}</p>
                    </Link>
                    <div className="d-flex align-items-center justify-content-between">
                        <mark>{prod.price}$</mark>
                        {user.isLoggedIn && cartList.find(item => item.product.id == id) ? <div className="btn-group">
                            <button onClick={() => handleDecrementProd(id)} className='btn btn-light' disabled={cartList.find(item => item.product.id == id).count === 1}>-</button>
                            <button className='btn btn-light disabled'>{
                                cartList.find(item => item.product.id == id).count
                            }</button>
                            <button onClick={() => handleIncrementProd(id)} className='btn btn-light'>+</button>

                            <button onClick={() => handleRemoveProd(id)} className='btn btn-outline-danger'>&times;</button>

                        </div> : <button onClick={() => handleAddCart(prod)} className='btn btn-warning'><box-icon name="cart-alt"></box-icon></button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductCard)