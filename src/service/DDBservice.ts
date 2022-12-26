import * as aws from "aws-sdk";


export default class DDBservice {
    ddb: aws.DynamoDB ;
    ddbClient: aws.DynamoDB.DocumentClient;
    ddbTableName: string;

    constructor() {
        this.ddb = new aws.DynamoDB();
        this.ddbClient = new aws.DynamoDB.DocumentClient();
    }

    async saveDDB(shortId: string, longURL: string , owner: string) {
        
        try {
            let params = {
                TableName: 'URL-Shortner',
                Item: {
                    shortId: shortId,
                    longURL: longURL,
                    owner: owner
                }
            };
            //console.info(`Final payload is ${final}`)
            await this.ddbClient.put(params).promise().then(data => {
                console.log("Data saved to DDB");
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async getDDB(shortURL: any) {
        let key = {
            shortId: shortURL
        }
        try {
            let params = {
                TableName: 'URL-Shortner',
                Key: key
            };
            await this.ddbClient.get(params).promise().then(data => {
                console.log("Data retrieved from DDB", JSON.stringify(data));
                return data;
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}