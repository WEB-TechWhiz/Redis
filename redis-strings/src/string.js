import express from "express";
import Redis from "ioredis";

const app = express();
const PORT = 3000;
const redis = new Redis();

app.use(express.json());



// Redis operations
redis.set("user:4", "RAHUL");
redis.get("user:4", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// POST route: safely access req.body now
app.post("/createUsers", async (req, res) => {
  const { id ,name, email, age } = req.body;
  if (!id || !name || !email || !age) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }
  console.log(id,name, email, age);
  res.json({ success: true, message: "User created successfully!" });
    
   const userId = `user:${id}`;
   const userData = { name, email, age };
//    const expireTime = 10;

   await redis.set(userId, JSON.stringify(userData));
   console.log(`User saved to Redis with key ${userId}`, userData,);

});

app.get('/Users/:id', async (req, res) => {
  const userId = `user:${req.params.id}`;
  try {
    const data = await redis.get(userId);
    if (!data) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user: JSON.parse(data) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
