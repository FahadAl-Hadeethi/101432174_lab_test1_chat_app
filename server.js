require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const path = require('path');

const authRoutes = require('./routes/auth'); 
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/room-selection', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'room-selection.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO setup for chat rooms
io.on('connection', (socket) => {
    console.log('A user connected.');
    let username;

    
    socket.on('joinRoom', ({ room, user }) => {
        username = user;  
        socket.join(room);
        console.log(`${username} joined room: ${room}`);

        // Load previous messages from MongoDB and send to the client
        Message.find({ room })
            .sort({ date_sent: 1 })
            .then(messages => {
                socket.emit('previousMessages', messages);
            })
            .catch(err => console.error('Error retrieving messages:', err));

        io.to(room).emit('message', { user: 'admin', message: `${username} has joined the chat!` });
    });

    socket.on('leaveRoom', (data) => {
        socket.leave(data.room);
        console.log(`${data.user} left room: ${data.room}`);
        io.to(data.room).emit('message', { user: 'admin', message: `${data.user} has left the chat.` });
    });

    socket.on('message', ({ room, user, message }) => {
        const newMessage = new Message({ from_user: user, room, message });
        newMessage.save()
            .then(() => {
                io.to(room).emit('message', { user, message });
            })
            .catch(err => console.error('Error saving message:', err));
    });

    
    socket.on('typing', (data) => {
        if (data.user !== '') {
            socket.to(data.room).emit('typing', data);
        } else {
            socket.to(data.room).emit('typing', { user: '' });
        }
    });

    socket.on('disconnect', () => {
        console.log(`${username} disconnected.`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
