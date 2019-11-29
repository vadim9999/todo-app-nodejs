

If you want to run this project on local maching you shoud create json file with name default and 

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