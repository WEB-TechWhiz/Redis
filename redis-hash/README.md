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