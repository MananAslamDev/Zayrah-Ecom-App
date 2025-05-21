import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Fetch audio products from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://fakestoreapi.in/api/products/category?type=audio');
        const data = await response.json();
        const products = data.products.slice(0, 5); // Take first 5 products

        // Mock orders data using fetched products
        const mockOrders = products.map((product, index) => ({
          id: `100${index + 1}`,
          date: `May ${15 - index}, 2025`,
          items: [product],
          total: product.price,
          status: ['Delivered', 'Shipped', 'Processing', 'Delivered', 'Shipped'][index],
          statusColor: [
            'bg-green-100 text-green-800',
            'bg-yellow-100 text-yellow-800',
            'bg-blue-100 text-blue-800',
            'bg-green-100 text-green-800',
            'bg-yellow-100 text-yellow-800',
          ][index],
        }));

        setOrders(mockOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) return <div className="text-center mt-10 text-gray-600 text-lg">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10 text-lg">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          <span className="border-b-4 border-[#4b0d0d] pb-1">Order History</span>
        </h2>

        {/* Orders List */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {orders.map((order) => (
            <div key={order.id} className="border-b border-gray-200 last:border-b-0">
              {/* Order Summary */}
              <div
                className="flex justify-between items-center px-4 py-5 sm:px-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-sm text-gray-600">Total: <span className="font-bold text-[#4b0d0d]">${order.total.toFixed(2)}</span></p>
                </div>
                <div className="flex-1 text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <div className="ml-4">
                  <svg
                    className={`w-5 h-5 text-[#4b0d0d] transform transition-transform duration-200 ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Order Details (Collapsible) */}
              {expandedOrder === order.id && (
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4">
                        <Link to={`/product/${item.id}`} className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-contain rounded-md border border-gray-200"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link to={`/product/${item.id}`} className="text-sm font-semibold text-[#4b0d0d] hover:text-[#502c2c]">
                            {item.title.length > 50 ? `${item.title.slice(0, 50)}...` : item.title}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/product/${order.items[0].id}`}
                      className="text-sm font-medium text-[#4b0d0d] hover:text-[#502c2c] transition-colors duration-200"
                    >
                      View Product Details
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;