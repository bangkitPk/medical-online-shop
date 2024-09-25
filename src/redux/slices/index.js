import guestReducer from "./guestSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const rootReducer = {
  //   basket: basketReducer,
  guest: guestReducer,
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  //   profile: profileReducer,
  //   filter: filterReducer,
  //   users: userReducer,
  //   checkout: checkoutReducer,
  //   app: miscReducer
};

export default rootReducer;
