import guestReducer from "./guestSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import orderReducer from "./orderSlice";

const rootReducer = {
  guest: guestReducer,
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  category: categoryReducer,
  order: orderReducer,
};

export default rootReducer;
