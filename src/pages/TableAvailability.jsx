import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Adjust if your backend runs elsewhere

const TableAvailability = () => {
  const [tables, setTables] = useState([]);

  // Fetch tables from backend
  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  useEffect(() => {
    fetchTables();

    // Listen for real-time updates
    socket.on('tableUpdated', (updatedTable) => {
      setTables((prevTables) =>
        prevTables.map((table) =>
          table._id === updatedTable._id ? updatedTable : table
        )
      );
    });

    return () => {
      socket.off('tableUpdated');
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Live Table Availability</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tables.map((table) => (
          <div
            key={table._id}
            className={`rounded p-4 shadow text-center ${
              table.status === 'available' ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <p className="text-lg font-semibold">Table {table.number}</p>
            <p
              className={`font-medium ${
                table.status === 'available' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {table.status.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableAvailability;
