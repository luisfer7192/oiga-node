# Oiga test NodeJs

## Installation

```
$ npm install
$ npm start
```

To use unit test you can run `npm run test`

Endpoints
- user
- category
- products
- orders


Roles:
- 'ADMIN_ROLE'
- 'USER_ROLE'


First you have to create the new users
If you want to create a `ADMIN_ROLE` you should add it with `role`.
If you want a user you don't need to use role (is not required)

`localhost:3000/user`

Response:
```
{
    "ok": true,
    "user": {
        "role": "ADMIN_ROLE",
        "estado": true,
        "google": false,
        "_id": "5b8ac89b5c89293790216243",
        "name": "Luis Fernando",
        "email": "luisfer7192@hotmail.com",
        "__v": 0
    }
}
```


If you want to have a token to access to the others api. you have to pass the email and the password. and it will create a token for 30 days

`localhost:3000/login`

Response:
```
{
    "ok": true,
    "user": {
        "role": "ADMIN_ROLE",
        "estado": true,
        "google": false,
        "_id": "5b8ac89b5c89293790216243",
        "name": "Luis Fernando",
        "email": "luisfer7192@hotmail.com",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZXN0YWRvIjp0cnVlLCJnb29nbGUiOmZhbHNlLCJfaWQiOiI1YjhhYzg5YjVjODkyOTM3OTAyMTYyNDMiLCJuYW1lIjoiTHVpcyBGZXJuYW5kbyIsImVtYWlsIjoibHVpc2ZlcjcxOTJAaG90bWFpbC5jb20iLCJfX3YiOjB9LCJpYXQiOjE1MzU4MjQxNDEsImV4cCI6MTUzNTgyNjczM30._oN9bp-TMhnSPixW-tZ6bWuOJgICdmXxj0szhbEJ8kk"
}
```

You have to use the token in headers to access to the differents Endpoints

If you want to have the list of the user, you have to be logged as a admin.
`localhost:3000/user`

and you will see all the users.

Response:
```
{
    "ok": true,
    "users": [
        {
            "role": "ADMIN_ROLE",
            "google": false,
            "_id": "5b8ac89b5c89293790216243",
            "name": "Luis Fernando",
            "email": "luisfer7192@hotmail.com"
        }
    ],
    "count": 0
}
```


if you want to get all the categories you can use
GET `localhost:3000/category`

Response:
```
{
    "ok": true,
    "categories": [
        {
            "_id": "5b8adac571da0d46002fcc65",
            "description": "Electrodomesticos",
            "user": {
                "_id": "5b8ac89b5c89293790216243",
                "name": "Luis Fernando",
                "email": "luisfer7192@hotmail.com"
            },
            "__v": 0
        }
    ]
}
```

if you want to create a category you can use

POST `localhost:3000/category`

you should pass a description

Response:
```
{
    "ok": true,
    "category": {
        "_id": "5b8adac571da0d46002fcc65",
        "description": "Electrodomesticos",
        "user": "5b8ac89b5c89293790216243",
        "__v": 0
    }
}
```

if you want to create a product

POST `localhost:3000/products`

Response:
```
{
    "ok": true,
    "products": [
        {
            "available": true,
            "_id": "5b8ade0a940f6747681b6c03",
            "user": {
                "_id": "5b8ac89b5c89293790216243",
                "name": "Luis Fernando",
                "email": "luisfer7192@hotmail.com"
            },
            "name": "Plancha",
            "price": 50000,
            "description": "Plancha de ropa",
            "category": {
                "_id": "5b8adac571da0d46002fcc65",
                "description": "Electrodomesticos"
            },
            "__v": 0
        },
        {
            "available": true,
            "_id": "5b8aeed55e89c62b4c43163a",
            "user": {
                "_id": "5b8ac89b5c89293790216243",
                "name": "Luis Fernando",
                "email": "luisfer7192@hotmail.com"
            },
            "name": "Licuadora",
            "price": 120000,
            "description": "licuadora multiusos",
            "category": {
                "_id": "5b8adac571da0d46002fcc65",
                "description": "Electrodomesticos"
            },
            "__v": 0
        }
    ]
}
```


if you want to get all products you can use

GET `localhost:3000/products`

response

```
{
    "ok": true,
    "products": [
        {
            "available": true,
            "_id": "5b8ade0a940f6747681b6c03",
            "user": {
                "_id": "5b8ac89b5c89293790216243",
                "name": "Luis Fernando",
                "email": "luisfer7192@hotmail.com"
            },
            "name": "Plancha",
            "price": 50000,
            "description": "Plancha de ropa",
            "category": {
                "_id": "5b8adac571da0d46002fcc65",
                "description": "Electrodomesticos"
            },
            "__v": 0
        }
    ]
}
```



if you want to create a order you can use

POST `localhost:3000/orders`

Response:
```
{
    "ok": true,
    "order": {
        "status": 1,
        "_id": "5b8bf107d2c1db07f0a3b994",
        "user": "5b8ac89b5c89293790216243",
        "description": "prueba de orden 2",
        "total": 1060000,
        "items": [
            {
                "_id": "5b8bf107d2c1db07f0a3b996",
                "name": "Plancha",
                "price": 50000,
                "qty": 2,
                "product": "5b8ade0a940f6747681b6c03"
            },
            {
                "_id": "5b8bf107d2c1db07f0a3b995",
                "name": "Licuadora",
                "price": 120000,
                "qty": 8,
                "product": "5b8aeed55e89c62b4c43163a"
            }
        ],
        "date": "2018-09-02T14:17:43.183Z",
        "__v": 0
    }
}
```

the raw that i use in postman is (type: JSON(application/json))

```
{
	"description": "prueba de orden",
	"products": [
		{"id": "5b8ade0a940f6747681b6c03", "qty": 2},
		{"id": "5b8aeed55e89c62b4c43163a", "qty": 8}
	]
}
```

if you want to see all the orders you can use

GET `localhost:3000/orders`

```
{
    "ok": true,
    "orders": [
        {
            "status": 1,
            "_id": "5b8bf107d2c1db07f0a3b994",
            "user": {
                "_id": "5b8ac89b5c89293790216243",
                "name": "Luis Fernando",
                "email": "luisfer7192@hotmail.com"
            },
            "description": "prueba de orden 2",
            "total": 1060000,
            "items": [
                {
                    "_id": "5b8bf107d2c1db07f0a3b996",
                    "name": "Plancha",
                    "price": 50000,
                    "qty": 2,
                    "product": "5b8ade0a940f6747681b6c03"
                },
                {
                    "_id": "5b8bf107d2c1db07f0a3b995",
                    "name": "Licuadora",
                    "price": 120000,
                    "qty": 8,
                    "product": "5b8aeed55e89c62b4c43163a"
                }
            ],
            "date": "2018-09-02T14:17:43.183Z",
            "__v": 0
        },
        {
            "status": 1,
            "_id": "5b8bf9d199e3c2159c620002",
            "user": {
                "_id": "5b8ac89b5c89293790216243",
                "name": "Luis Fernando",
                "email": "luisfer7192@hotmail.com"
            },
            "description": "prueba de orden 3",
            "total": 1060000,
            "items": [
                {
                    "_id": "5b8bf9d199e3c2159c620004",
                    "name": "Plancha",
                    "price": 50000,
                    "qty": 2,
                    "product": "5b8ade0a940f6747681b6c03"
                },
                {
                    "_id": "5b8bf9d199e3c2159c620003",
                    "name": "Licuadora",
                    "price": 120000,
                    "qty": 8,
                    "product": "5b8aeed55e89c62b4c43163a"
                }
            ],
            "date": "2018-09-02T14:55:13.195Z",
            "__v": 0
        }
    ]
}
```

to edit a order you can use

PUT `localhost:3000/orders/5b8bf107d2c1db07f0a3b994`

to get a order you can use

GET `localhost:3000/orders/5b8bf107d2c1db07f0a3b994`

to delete a order you can use

DELETE `localhost:3000/orders/5b8bf107d2c1db07f0a3b994`
