 import express, { json } from "express"
 import Redis from "ioredis"
 const app=express();
 const PORT=5000 ;
 const redis = new Redis();
 app.use(express.json());

//  redis operations
async function addUser(UserData) {
    await redis.rpush("user", JSON.stringify(UserData))
    
}
// function to get all the user
async function getAlluser(){
    const users=await redis.lrange("user",0,-1);
    return users.map((U)=>JSON.parse(U));
}

// for creating user
app.post('/CreateUsers',async(req ,res)=>{
    const {id,name,email,age}=req.body
    console.log(id,name,email,age);
    await addUser({id,name,email,age});
    res.json({ success: true, message: "User added to Redis List" });
})

app.get("/Users",async(_, res)=>{
    const users=await getAlluser();  
    res.json({success:true,users});
})

// for deleting (pop) the user from the list

app.delete("/deletUser/:side",async(req , res)=>{
          const {side}=req.params;
          let user;
          if(side==="left"){
            user = await redis.lpop("users");
          }else if (side==="right"){
            user = await redis.rpop("users");
          }else{
             return res.status(400).json({ success: false, message: "Invalid side (use left or right)" });
          }
           if (!user) {
    return res.json({ success: false, message: "No users in list" });
  }

  res.json({ success: true, popped: JSON.parse(user) });
})

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
})
