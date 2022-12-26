import { Context } from "vm";
import ddbService from "../service/DDBservice";

export default class UrlShortnerCreate {
    ddbService: ddbService;

    constructor() {
        this.ddbService = new ddbService();
    }

    public processRequest = async (event: any) => {
        console.info(`Payload recieved from API Gateway is ${JSON.stringify(event)}`)
        try {
            const ddbservice = new ddbService();
            const {shortURL , longURL , owner } = event
            console.info(`shortURL is ${shortURL} and longURL is ${longURL}`);
            await ddbservice.saveDDB(shortURL, longURL, owner);
        }
        catch (err) {
            console.error(`Error occured while processing the request ${err}`);
        }
    }
}


        

    



