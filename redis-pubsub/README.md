 +---------+       publish       +---------+ 
|  Client |  -----------------> | Channel |  
+---------+                     +---------+  
     ^                               |
     | (subscribe)                   |
     +-------------------------------+
                 Other Clients

```http 
Redis Pub(Publisher)Chanel
http://localhost:8002/send
{
    "success": true,
    "message": "Message sent!"
}
{
  "user": "Rohit",
  "text": "Hello from Pub/Sub!"
}
Redis sub(Subscribe)Chanel 
http://localhost:8002/messages
{
    "chat": []
}