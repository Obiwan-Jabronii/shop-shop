import {
    UPDATE_CATEGORIES,
    UPDATE_PRODUCTS,
    UPDATE_CURRENT_CATEGORY
} from "./actions";
import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch (action.type) {
        //if action type value of 'UPDATED_PRODUCTS', return a new state object with an updated products array 
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };

        //if action type value of 'UPDATE_CATEGORIES', return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        
        //if action type value of 'UPDATE_CURRENT_CATEGORY', return a new state object with an updated current category
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };

        //if it's none of these actions, do not update state at all and keep things the same
        default: 
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
};