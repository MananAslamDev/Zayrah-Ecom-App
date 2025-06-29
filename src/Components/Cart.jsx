import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../ReduxToolKit/slices/cartSlice";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Ravc5G1DGsNOxeGiPMsi3SX63TBa5ts5scmlAY9JesxswtgR90YnSGVbu25fqXlZEdaasOaoa2MHoyXVEYo2Mft00ti9tDuPo");
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle quantity change - FIXED
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
      toast.info("Item removed from cart", { toastId: `remove-${id}` });
    } else {
      dispatch(updateQuantity({ id, quantity })); // Fixed: pass as object
    }
  };

  // Handle remove item
  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.info(`${title.slice(0, 10)}... removed from cart`, {
      toastId: `remove-${id}`,
    });
  };

  // Handle checkout
  const handleCheckout = async () => {
  try {
    if (cartItems.length === 0) return;

    const res = await fetch("https://zayrah-backend.onrender.com/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    });

    const { id } = await res.json();
    const stripe = await stripePromise;

    const result = await stripe.redirectToCheckout({
      sessionId: id,
    });

    if (result.error) {
      toast.error(result.error.message);
    }
  } catch (err) {
    toast.error("Failed to initiate checkout.");
    console.error(err);
  }
};

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        <span className="border-b-4 border-[#4b0d0d] pb-1">Your</span>{" "}
        <span>Cart</span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center p-6 sm:p-10">
          <p className="text-gray-500 text-base sm:text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="grid gap-4 sm:gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto sm:mx-0"
                />
                <div className="flex-1 w-full">
                  <h2 className="font-semibold text-base sm:text-lg">
                    {item.title.slice(0, 20)}...
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Rs.{item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="bg-[#4b0d0d] text-white px-2 py-1 rounded hover:bg-[#502c2c] text-sm"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        // Only update if it's a valid positive number
                        if (!isNaN(newQuantity) && newQuantity > 0) {
                          handleQuantityChange(item.id, newQuantity);
                        }
                      }}
                      onBlur={(e) => {
                        // If input is empty or invalid on blur, reset to 1
                        const value = parseInt(e.target.value);
                        if (isNaN(value) || value < 1) {
                          handleQuantityChange(item.id, 1);
                        }
                      }}
                      className="w-12 text-center border rounded text-sm"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="bg-[#4b0d0d] text-white px-2 py-1 rounded hover:bg-[#502c2c] text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end w-full sm:w-auto">
                  <span className="text-[#4b0d0d] font-bold text-sm sm:text-base">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id, item.title)}
                    className="bg-[#4b0d0d] text-white px-4 py-1 rounded mt-2 sm:mt-4 hover:bg-[#502c2c] text-sm w-fit sm:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 sm:mt-8 text-right">
            <h2 className="text-xl sm:text-2xl font-bold">
              Total: Rs.{totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={handleCheckout}
              className="bg-[#4b0d0d] text-white px-4 py-2 rounded mt-4 hover:bg-[#502c2c] w-fit sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;