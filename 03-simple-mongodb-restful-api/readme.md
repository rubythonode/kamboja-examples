## KambojaJS Simple Restful API 

This example demonstrate how to create a simple Restful API with MongoDB database. This example also showing how to use validation. [Kamboja Mongoose Helper](https://github.com/kambojajs/kamboja-mongoose) used to generate mongoose schema from model.

## What you will find on this example

1. Use KambojaJS [`ApiController`](http://kambojajs.com/reference/api-controller) to create Restful API using convention over configuration
2. Use `@val.type()` for adding [model validation](http://kambojajs.com/reference/validation) to an action parameter 
3. Use [middleware](http://kambojajs.com/reference/middleware) to create custom error that return json result
4. Use [mongoose helper](https://github.com/kambojajs/kamboja-mongoose) automatically generate mongoose schema from model.

## List of route that we will create is:

Customer API

```
GET    /customers/<id>
GET    /customers?offset=0&limit=50
POST   /customers
PUT    /customers/<id>
PATCH  /customers/<id>
DELETE /customers/<id>
```


Requirements: 
* A working NodeJs installation
* Command line/Terminal app
* VSCode or any TypeScript editor
* TypeScript 2.3 installed globally by: `npm install typescript -g`
* Local MongoDB installation

```
$ git clone git@github.com:kambojajs/kamboja-examples.git
$ cd 03-simple-mongodb-restful-api
$ npm install
$ tsc && node bin
```
