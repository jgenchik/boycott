import express, { Request, Response } from "express";
import { send } from "process";
const https = require('https');
const querystring = require('querystring');

const axios = require('axios').default;


export const UpcItemDbRouter = express.Router();

UpcItemDbRouter.get("/", async (req: Request, res: Response) => {

    const upc = req.query.upc;

    if(!upc) {
        res.status(400).send({error: 'UPC is required'});
    }

    try {

        const response = await axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`);

        console.log('response.status', response.status);
        console.log('response.data', response.data);

        res.status(response.status).send(response.data);

        // return {
        //     statusCode: response.status,
        //     payload: response.data
        // };

    } catch (error: any) {
        console.error(error);
        return new Error(error);
    }

});


