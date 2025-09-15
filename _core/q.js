"use strict";

const { Server } = require("socket.io");
class Queue {
  static handlers = {};

  constructor(q) {
    this.events = new Set();
    this.name = q;
    this.q = Queue.io.of(`/${q}`);
    this.q.on("connection", this.connect.bind(this));
  }

  disconnect(socket) {
    console.log(`Disconnecting ${socket.id} from ${this.name} ...`);
    this.events.forEach((event) => {
      Queue.publish({
        queue: this.name,
        event: "disconnect",
        socketId: socket.id,
      });
      // socket.leave(event);
      // console.log(`Left ${event} in ${this.name} ... ${socket.id}`);
      // console.log(`Connections ins${event}:`, this.connections(event));
    });
  }

  connect(socket) {
    const disconnect = this.disconnect.bind(this, socket);
    socket.on("disconnect", disconnect);
    socket.on("subscribe", (event) => {
      if (this.events.has(event)) {
        socket.join(event);
        Queue.publish({
          queue: this.name,
          event: "connect",
          socketId: socket.id,
        });
        // console.log("Adding", socket.id, "to", event, this.connections(event));
      } else {
        console.log(`Invalid Event ${event}`);
      }
    });
  }

  // Creates a list of events that this queue will monitor, using a socketio room for each event
  monitorEvent(event, callback) {
    this.events.add(event);
    const key = `${this.name}/${event}`;
    callback && (Queue.handlers[key] = callback);
  }

  connections(event) {
    const connections = [];
    this.q.adapter.rooms.has(event) &&
      this.q.adapter.rooms
        .get(event)
        .entries()
        .forEach((entry) => {
          connections.push(entry[0]);
        });

    return connections.length > 0 ? connections : [];
  }

  // Clients will emit "publish" events to this server with a message object containing the queue, event and payload.
  // If we have a handler for the event, we will call it with the payload, and return a new payload.
  // Then, we "trigger" that event name with the new payload to all subscribers of that event.
  static publish(message) {
    const { queue, event, data } = message;
    const key = `${queue}/${event}`;
    const payload = Queue.handlers[key] ? Queue.handlers[key](data) : data;
    // console.log(`Publishing to ${queue} -> ${event}`, payload);
    Queue.io.of(queue).to(event).emit("trigger", payload);
  }

  static start(server = null) {
    if (server) {
      Queue.io = new Server(server, { cors: { origin: "*" } });
      console.log(`Q server embedded`);
    } else {
      const PORT = process.env.PORT || process.env.port || 3333;
      Queue.io = new Server(PORT);
      console.log(`Q server up on ${PORT}`);
    }
    Queue.io.on("connection", (socket) => {
      console.log("connected", socket.id);
      socket.on("publish", Queue.publish);
    });
  }
}

module.exports = Queue;
