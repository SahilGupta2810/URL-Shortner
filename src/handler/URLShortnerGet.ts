import { Context } from "vm";
import ddbService from "../service/DDBservice";

export default class UrlShortnerGet {
    ddbService: ddbService;

    constructor() {
        this.ddbService = new ddbService();
    }

    public processRequest = async (event: any) => {
        console.info(`Payload recieved from API Gateway is ${JSON.stringify(event)}`)
        try {
            const ddbservice = new ddbService();
            const {shortURL} = event
            console.log(`shortURL is ${shortURL}`);
            await ddbservice.getDDB(shortURL);
        }
        catch (err) {
            console.error(`Error occured while processing the request ${err}`);
        }
    }
}


        

    



