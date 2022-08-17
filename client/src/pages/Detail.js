import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS, REMOVE_FROM_CART, ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import Cart from '../components/Cart';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct ] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products, cart } = state;

  const addToCart = () => {
    //find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
      //if there is a match, call UPDATE with a new purchase quantity
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 
        });
      } else{
        dispatch({
          type: ADD_TO_CART,
          product: { ...currentProduct, purchaseQuantity: 1}
        });
      }
  
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });
  };


  useEffect(() => {
    //checks the global state to ensure there are products in it, then finds the product that has id matching the one found in useParams. If there isnt any it checks if there is data to add to the global state from the useQuery, if there is then it updates the global state to reflect that 
    if(products.length) {
      setCurrentProduct(products.find(product => product._id === id ));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button 
            disabled={!cart.find(p => p._id === currentProduct._id)}
            onClick={removeFromCart}>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
