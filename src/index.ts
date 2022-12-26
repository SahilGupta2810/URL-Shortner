import UrlShortnerGet from "./handler/URLShortnerGet";
import UrlShortnerCreate from "./handler/URLShortnerCreate"; 

const getController = new UrlShortnerGet();

const postController = new UrlShortnerCreate();

export const processRequest: any = getController.processRequest;
export const processRequestPost: any = postController.processRequest;