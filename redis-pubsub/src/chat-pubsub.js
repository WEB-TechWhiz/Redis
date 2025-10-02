 import express from "express"
 import Redis from "ioredis"
 const app=express();
//  const redis=new Redis();
 const PORT=8002;

//  const Pub= await redis.publish()

app.use(express.json());

// Publisher client
const publisher = new Redis();

// Subscriber client
const subscriber = new Redis();

// Store messages temporarily (you can also keep in Redis list)
let messages = [];

// Subscribe to chat channel
subscriber.subscribe("chatroom", (err, count) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  } else {
    console.log(`Subscribed successfully! Listening to ${count} channel(s).`);
  }
});

// When a message comes in
subscriber.on("message", (channel, message) => {
  console.log(`New message from ${channel}: ${message}`);
  messages.push(message); // push to memory
});

// Route: Publish a message
app.post("/send", async (req, res) => {
  const { user, text } = req.body;
  const message = `${user}: ${text}`;
  await publisher.publish("chatroom", message);
  res.json({ success: true, message: "Message sent!" });
});

// Route: Get all messages (like chat history)
app.get("/messages", (req, res) => {
  res.json({ chat: messages });
});













 app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});