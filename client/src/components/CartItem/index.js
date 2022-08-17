import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

const CartItem = ({ item }) => {
    const [, dispatch] = useStoreContext();
    //user removes from cart using trash icon
    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
    };
    //if user alters quantity manually in cart
    const onChange = (event) => {
        const value = event.target.value;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
        }
    };
    return (
        <div className='flex-row'>
            <div>
                <img
                src={`/images/${item.image}`}
                alt=''
                />
            </div>
            <div>
                <div>{item.name}, ${item.price}</div>
                <div>
                    <span>Qty:</span>
                    <input
                    type='number'
                    placeholder='1'
                    value={item.purchaseQuantity}
                    onChange={onChange}
                    />
                    <span
                    role='img'
                    aria-label='trash'
                    onClick={() => removeFromCart(item)}
                    >🗑️</span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;