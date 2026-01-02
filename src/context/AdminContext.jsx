import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

const initialMenuItems = [
  {
    id: '1',
    name: 'kaju biryani',
    description: 'Fresh Atlantic salmon with herb butter and seasonal vegetables',
    price: 200,
    category: 'main',
    image: 'https://images.pexels.com/photos/5410401/pexels-photo-5410401.jpeg',
    available: true,
  },
  {
    id: '2',
    name: 'veg bariyani',
    description: 'Aromatic basmati rice with mixed vegetables and spices',
    price: 180,
    category: 'main',
    image: 'https://images.pexels.com/photos/9609848/pexels-photo-9609848.jpeg',
    available: true,  
  },
  {
    id: '3',
    name: 'Pasta',
    description: 'Crisp romaine lettuce with house-made caesar dressing and croutons',
    price: 149,
    category: 'starter',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    available: true,
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 159,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    available: true,
  },
  {
    id: '5',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce',
    price: 199,
    category: 'main',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg',
    available: true,
  },
  {
    id: '6',
    name: 'Samosa',
    description: 'Fresh tuna with avocado, sesame, and spicy mayo',
    price: 399,
    category: 'starter',
    image: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg',
    available: true,
  },
  {
    id: '7',
    name: 'Puran Poli',
    description: 'Fresh mozzarella, tomatoes, basil, and balsamic glaze',
    price: 200,
    category: 'starter',
    image: 'https://media.istockphoto.com/id/899140850/photo/puran-poli-puranpoli-holige-obbattu-indian-sweet-flatbread-selective-focus.jpg?s=612x612&w=0&k=20&c=dLkIdRrhFCSLGPooyMQks65PDzi_S-y9naemqPNRNaE=', 
    available: true,
  },
  {
    id: '8',
    name: 'Pannner ',
    description: 'Tangy lemon tart with a buttery crust and whipped cream',
    price: 150,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    available: true,
  },
  {
    id: '9',
    name: 'veg burger',
    description: 'A delicious vegetarian burger with fresh vegetables and a special sauce',
    price: 120,
    category: 'main',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    available: true,
  },
];

export function AdminProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);

  const adminLogin = async (username, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (username === 'admin' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  const addMenuItem = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id, updates) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const updateReservationStatus = (id, status) => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const addReservation = (reservation) => {
    const newReservation = {
      ...reservation,
      id: Date.now().toString(),
      status: 'pending',
    };
    setReservations(prev => [...prev, newReservation]);
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
      orderTime: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        menuItems,
        reservations,
        orders,
        adminLogin,
        adminLogout,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateReservationStatus,
        updateOrderStatus,
        addReservation,
        addOrder,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
