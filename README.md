

If you want to run this project on local maching you should create folder with name `config` in root of project and inside of it create json file with name `default.json` and 

create property MYPRIVATEKEY with you name
the second one MONGODB_URI link to you db

```
{
    "MYPRIVATEKEY": "[YOUR PRIVATE KEY]",
     "MONGODB_URI" : "[YOUR URL TO MONGODB]"
}
```

if you want to run with `heroku local` create file `.env` in root directory and setting up like this:

```
MYPRIVATEKEY=[YOUR PRIVATE KEY]
MONGODB_URI=[YOUR URL TO MONGODB]

```

after this run command 

```
heroku local
```

### Requests 

```
POST localhost:1234/user/create

name: User
password: 123456
email: test@test.com

{
    "_id": "662942db4adaab2a15844ae7",
    "name": "User",
    "email": "test@test.com"
}

```

```
POST localhost:1234/user/login

email:test@test.com
password:123456

{
    token: "abcd1234"
}

```

```
GET localhost:1234/user/

[
    {
        "_id": "662bfaba258847c10ca960d6",
        "name": "User"
    },
    {
        "_id": "662bfb955f7cf137dcbb08f6",
        "name": "User"
    },
]

```

```
GET localhost:1234/user/662bfaba258847c10ca960d6

{
    "_id": "662bfaba258847c10ca960d6",
    "name": "User",
    "email": "test234234@test.com"
}

```
