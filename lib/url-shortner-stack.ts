import * as cdk from 'aws-cdk-lib';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import path = require('path');
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class UrlShortnerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    // The code that defines your stack goes here

    //Create role
    //Create DDB Table
    //Add Global Secondary Index to it
    //Create Lambda functions for ShortUrl and GetUrl
    //Create API Gateway and attach to Lambda functions


    const ddbTable = new ddb.Table(this, 'URL-Shortner', {
      tableName: 'URL-Shortner',
      partitionKey: { name: 'shortId', type: ddb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: ddb.BillingMode.PROVISIONED
    })

    ddbTable.addGlobalSecondaryIndex({
      indexName: 'ownerIndex',
      partitionKey: { name: 'owner', type: ddb.AttributeType.STRING },
      projectionType: ddb.ProjectionType.ALL
    })

    const shortUrlFn = new lambda.Function(this, 'URLShortner-Create', {
      functionName: 'URLShortner-Create',
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.processRequestPost',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src')),
    });

    const getUrlFn = new lambda.Function(this, 'URLShortner-Get', {
      functionName: 'URLShortner-Get',
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.processRequest',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src'))
    })

    const api = new apigateway.RestApi(this, 'URLShortner-Api', {
      restApiName: 'URLShortner-Api',
      description: 'URL Shortner API',
      deployOptions: {
        stageName: 'dev'
      }
    })

    const createFnIntegration = new apigateway.LambdaIntegration(shortUrlFn);
    const getFnIntegration = new apigateway.LambdaIntegration(getUrlFn);

    api.root.addMethod('GET', getFnIntegration)
    api.root.addMethod('POST', createFnIntegration)

    ddbTable.grantReadData(getUrlFn);
    ddbTable.grantReadWriteData(shortUrlFn);

  }
}
