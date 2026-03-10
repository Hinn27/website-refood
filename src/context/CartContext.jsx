import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
    useState,
} from "react";

const CartContext = createContext(null);

const initialState = {
    items: [],
};

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingIndex = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            if (existingIndex >= 0) {
                const newItems = [...state.items];
                newItems[existingIndex] = {
                    ...newItems[existingIndex],
                    quantity: newItems[existingIndex].quantity + 1,
                };
                return { ...state, items: newItems };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    (item) => item._id !== action.payload
                ),
            };
        case "UPDATE_QUANTITY": {
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(
                        (item) => item._id !== action.payload._id
                    ),
                };
            }
            return {
                ...state,
                items: state.items.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        }
        case "CLEAR_CART":
            return { ...state, items: [] };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
    });

    const showSnackbar = useCallback((message) => {
        setSnackbar({ open: true, message });
    }, []);
    const closeSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    const addItem = (item) => {
        dispatch({ type: "ADD_ITEM", payload: item });
        showSnackbar(`Đã thêm "${item.name}" vào giỏ hàng!`);
    };
    const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
    const updateQuantity = (_id, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { _id, quantity } });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    const totalItems = useMemo(
        () => state.items.reduce((sum, item) => sum + item.quantity, 0),
        [state.items]
    );
    const totalPrice = useMemo(
        () =>
            state.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            ),
        [state.items]
    );

    const value = useMemo(
        () => ({
            items: state.items,
            totalItems,
            totalPrice,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            snackbar,
            closeSnackbar,
        }),
        [state.items, totalItems, totalPrice, snackbar, closeSnackbar]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export default CartContext;
