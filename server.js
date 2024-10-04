const express = require('express');
const WebSocket = require('ws');
const http = require('http');

// Initialize an Express application
const app = express();

// Serve the static HTML file
app.use(express.static('public'));

// Create an HTTP server and integrate it with WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Handle WebSocket connection
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle messages from the client
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Server received: ${message}`);
            }
        });
    });

    // Handle WebSocket disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Set the server to listen on port 3000 or the environment's port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
