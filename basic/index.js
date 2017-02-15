"use strict";
var kamboja_express_1 = require("kamboja-express");
var kamboja_1 = require("kamboja");
require("reflect-metadata");
var kamboja = new kamboja_1.Kamboja(new kamboja_express_1.ExpressEngine());
kamboja.init().listen(5000);
