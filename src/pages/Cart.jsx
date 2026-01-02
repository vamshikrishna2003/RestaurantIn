import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';

export default function Cart() {
  const { state, dispatch } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { addOrder } = useAdmin();
  const navigate = useNavigate();

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Create order
    addOrder({
      customerName: user?.name || '',
      customerEmail: user?.email || '',
      items: state.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: state.total,
    });

    // Clear cart
    dispatch({ type: 'CLEAR_CART' });

    // Show success message
    alert('Order placed successfully! You will receive a confirmation email shortly.');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {state.itemCount} {state.itemCount === 1 ? 'Item' : 'Items'} in your cart
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {state.items.map((item) => (
              <div key={item.id} className="px-6 py-6 flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <p className="text-primary-600 font-semibold mt-2">
                    ₹{item.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })} each
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>

                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-primary-600">
                ₹{state.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="flex-1 text-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>

              <button
                onClick={handleCheckout}
                className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
              >
                {isAuthenticated ? 'Place Order' : 'Login to Order'}
              </button>
            </div>

            {!isAuthenticated && (
              <p className="text-sm text-gray-600 text-center mt-4">
                You need to <Link to="/login" className="text-primary-600 hover:underline">sign in</Link> to place an order
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
