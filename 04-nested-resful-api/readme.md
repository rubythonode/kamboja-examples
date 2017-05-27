## KambojaJS Nested Restful API 

This example demonstrate how to create a Nested Restful API with MongoDB database. 

List of route that we will create is:

Customer API

```
GET    /customers/<id>
GET    /customers?offset=0&limit=50
POST   /customers
PUT    /customers/<id>
PATCH  /customers/<id>
DELETE /customers/<id>
```

Customer's Pet API

```
GET    /customers/<customer-id>/pets/<id>
GET    /customers/<customer-id>/pets?offset=0&limit=50
POST   /customers/<customer-id>/pets
PUT    /customers/<customer-id>/pets/<id>
PATCH  /customers/<customer-id>/pets/<id>
DELETE /customers/<customer-id>/pets/<id>
```

Requirements: 
* A working NodeJs installation
* Command line/Terminal app
* VSCode or any TypeScript editor
* TypeScript 2.3 installed globally by: `npm install typescript -g`
* Local MongoDB installation

```
$ git clone git@github.com:kambojajs/kamboja-examples.git
$ cd 04-nested-restful-api
$ npm install
$ tsc && node bin
```