const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

// Make io accessible in routes
app.set('io', io);


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));
//app.use('/images', express.static('images'));



// Routes
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');
//const userRoutes = require("./routes/UserRoutes");

//const tableRoutes = require('./routes/tableRoutes');

app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/ordersRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
//app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/tables', require("./routes/tableRoutes"));
// app.use((err, req, res, next)) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
    
// }




app.get('/', (req, res) => {
    res.send('Restaurant Backend is Running...');
});

// MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

//const Portfolio = require('./routes/portfolioRoutes');
//app.use('/api/portfolio', Portfolio);


// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});