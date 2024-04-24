

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
POST localhost:1234/user/create_user

name: User
password: 123456789
email: test@test.com

{
    "_id": "662942db4adaab2a15844ae7",
    "name": "User",
    "email": "test@test.com"
}

```
