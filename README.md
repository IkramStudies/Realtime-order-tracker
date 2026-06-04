Real Time Order Tracker
A high performance, event driven system designed to track database changes and propagate updates to connected clients in real time without the need for client side polling.

Project Overview
The system solves the problem of real time data synchronization by utilizing MongoDB Change Streams. Instead of the client constantly requesting updates, the server maintains a persistent connection to the database's Oplog (operation log). When an insert, update, or delete occurs, the change is captured and immediately pushed to all connected clients via WebSockets.

Architecture & Why This Approach?
Event Driven Design: By utilizing MongoDB Change Streams, the system is reactive. It consumes minimal resources compared to traditional HTTP polling, which is inefficient and does not scale well.

Modularity: The project is separated into distinct services:

config/db.js: Handles database connection and Change Stream monitoring.

services/socketService.js: Manages WebSocket connectivity.

src/index.js: Orchestrates the communication between the database and the client.

Scalability: This architecture is designed for growth. For high traffic applications, this pattern can be extended by introducing a Redis Pub/Sub layer to distribute events across multiple server instances.

Prerequisites
Node.js installed.

MongoDB installed and running as a Replica Set (required for Change Streams).

How to Run
Clone the repository:

Bash
git clone https://github.com/IkramStudies/Realtime-order-tracker.git
cd Realtime-order-tracker
Install dependencies:

Bash
npm install
Configure Environment:
Create a .env file in the root directory and add your connection string (ensure ?replicaSet=rs0 is appended):

Code snippet
MONGO_URI=mongodb://127.0.0.1:27017/realtime-order-tracker?replicaSet=rs0
Launch the application:

Bash
node src/index.js
View the App:
Open your browser to http://localhost:3000.

Test Real-Time Updates:
Open MongoDB Compass, select the realtime-order-tracker database, and insert a new document into the orders collection. The change will reflect instantly in the browser without a page refresh.
