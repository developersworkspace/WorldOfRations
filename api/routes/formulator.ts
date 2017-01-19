/// <reference path="./../typings/index.d.ts"/>
import { Express, Request, Response } from "express";

let express = require('express');
let router = express.Router();

router.post('/formulate', function (req: Request, res: Response, next: Function) {
   res.json({
       cost: 3910,
       feasible: true
   });
});

export = router;
