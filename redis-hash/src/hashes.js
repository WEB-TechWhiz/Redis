 import express from "express"
 import Redis from "ioredis"
 const app = express();
 const PORT=3003
 const redis = new Redis();

 app.use(express.json());

 app.post("/createdUser", async(req, res)=>{
    const {id,name,email,age}= req.body;
    console.log(id,name,email,age)
     await redis.hset(`user${id}`,{
         name,email,age
    });
    res.json({success:true,message:`user${id}stored in redis hash`})
 })

 app.get("/getUser/:id",async(req ,res)=>{
    const {id}=req.params;
    const user=await redis.hgetall(`user${id}`)
    console.log(`user${id}`)
    if(!user || Object.keys(user).length===0){
     return res.json({ success: false, message: "User not found" });
    }
      res.json({ success: true, user });
 })

    app.put("/update-user/:id", async (req, res) => {
 try {
     const { id } = req.params;
     const { field, value } = req.body;
   
     await redis.hset(`user:${id}`, field, value);
   
     res.json({ success: true, message: `User ${id} updated: ${field} = ${value}` });
 } catch (error) {
    console.log(error)
 }
});

 app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
})


