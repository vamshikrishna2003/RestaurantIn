import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  orderTime: string;
}

interface AdminState {
  isAdminAuthenticated: boolean;
  menuItems: MenuItem[];
  reservations: Reservation[];
  orders: Order[];
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'status'>) => void;
  addOrder: (order: Omit<Order, 'id' | 'status' | 'orderTime'>) => void;
}

const AdminContext = createContext<AdminState | null>(null);

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herb butter and seasonal vegetables',
    price: 200,
    category: 'main',
    image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
    available: true,
  },
  {
    id: '2',
    name: 'Truffle Pasta',
    description: 'Handmade pasta with black truffle, parmesan, and cream sauce',
    price: 149,
    category: 'main',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    available: true,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with house-made caesar dressing and croutons',
    price: 149,
    category: 'starter',
    image: 'https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg',
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
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
    available: true,
  },
  {
    id: '6',
    name: 'Spicy Tuna Tartare',
    description: 'Fresh tuna with avocado, sesame, and spicy mayo',
    price: 399,
    category: 'starter',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    available: true,
  },
  {
    id: '7',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, basil, and balsamic glaze',
    price: 200,
    category: 'starter',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 
    available: true,
  },
  {
    id: '8',
    name: 'Lemon Tart',
    description: 'Tangy lemon tart with a buttery crust and whipped cream',
    price: 150,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    available: true,
  },
  {
    id: '9',
    name: 'veg burger',
    description: 'A delicious vegetarian burger with fresh vegetables and a special sauce',
    price: 120 ,
    category: 'main',
    image: 'https://images.pexels.com /photos/1640777/pexels-photo-1640777.jpeg',
    available: true,
  }
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
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

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(reservation =>
      reservation.id === id ? { ...reservation, status } : reservation
    ));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, status } : order
    ));
  };

  const addReservation = (reservation: Omit<Reservation, 'id' | 'status'>) => {
    const newReservation = {
      ...reservation,
      id: Date.now().toString(),
      status: 'pending' as const,
    };
    setReservations(prev => [...prev, newReservation]);
  };

  const addOrder = (order: Omit<Order, 'id' | 'status' | 'orderTime'>) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      status: 'pending' as const,
      orderTime: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <AdminContext.Provider value={{
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
    }}>
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