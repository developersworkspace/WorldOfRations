/// <reference path="./../typings/index.d.ts"/>
import { Request, Response } from "express";

var express = require('express');
var router = express.Router();

router.get('/', function (req: Request, res: Response, next: Function) {

});

module.exports = router;
