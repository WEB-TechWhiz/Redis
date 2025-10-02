
## API Reference

#### Get all items

```http
``` POST
Redis CreatedUser
http://localhost:3000/createUsers
```

{
    "id":35,
    "name": "varun",
    "email": "rahan@example.com",
    "age": 26
} 

#### Get item

```http
http://localhost:3000/Users/35```

{
    "success": true,
    "user": {
        "name": "suhani kumari",
        "email": "rahan@example.com",
        "age": 26
    }of item to fetch |

```http
``` POST
Redis List CreatedUser
http://localhost:5000/CreateUsers
```

{
    "id":1,
    "name":"rohit kumar",
    "email": "kurrohit300@gmail.com",
    "age":26
}


```http
 Redis List getUser
http://localhost:3000/Users/35```

 "success": true,
    "users": [
        {
            "id": 1,
            "name": "rohit kumar",
            "email": "kurrohit300@gmail.com",
            "age": 26
        },

        ```http
       Redis List Pop 
       http://localhost:5000/deletUser/right
        {
    "success": false,
    "message": "No users in list"
}
    
    ```http
    Redis Hashes createdUser
    http://localhost:3003/createdUser
    {
    "success": true,
    "message": "user3stored in redis hash"
}
    {
    "id":3,
    "name":"rohit kumar",
    "email":"kurrohit300@gmail.com",
    "age":26
}

```http
Redis Hashes getUser
http://localhost:3003/getUser/3
{
    "success": true,
    "user": {
        "name": "rohit kumar",
        "email": "kurrohit300@gmail.com",
        "age": "26"
    }
}
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
