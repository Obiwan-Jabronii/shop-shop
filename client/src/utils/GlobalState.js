import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';
// create a place to hold our global state data and functionality
const StoreContext = createContext();
// a component of react that we wrap our app in to make state data thats passed into it available to all other components, "Consumer" component is used to grab said data
const { Provider } = StoreContext

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({ 
        products: [],
        categories: [],
        currentCategory: '',
        cart: [],
        cartOpen: false
    });
    //use this to confirm it works
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />
};

const useStoreContext = () => {
    return useContext(StoreContext)
};

export { StoreProvider, useStoreContext };