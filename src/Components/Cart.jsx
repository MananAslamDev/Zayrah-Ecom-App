import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../Redux/actions/CartActions.js";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
      toast.info("Item removed from cart", { toastId: `remove-${id}` });
    } else {
      dispatch(updateQuantity(id, quantity));
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
  const handleCheckout = () => {
    toast.error("Checkout not implemented yet!", {
      toastId: "checkout-error",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        <span className="border-b-4 border-[#4b0d0d] pb-1">Your</span>{" "}
        <span>Cart</span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center p-10">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.title.slice(0, 20)}...
                  </h2>
                  <p className="text-gray-500 text-sm">
                    ${item.price} x {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="bg-[#4b0d0d] text-white px-2 py-1 rounded hover:bg-[#502c2c]"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-12 text-center border rounded"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="bg-[#4b0d0d] text-white px-2 py-1 rounded hover:bg-[#502c2c]"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[#4b0d0d] font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id, item.title)}
                    className="bg-[#4b0d0d] text-white px-6 py-2 rounded mt-4 hover:bg-[#502c2c]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 text-right">
            <h2 className="text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={handleCheckout}
              className="bg-[#4b0d0d] text-white px-6 py-2 rounded mt-4 hover:bg-[#502c2c]"
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