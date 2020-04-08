'use strict';

const Service = require('egg').Service;
const tencentcloud = require('tencentcloud-sdk-nodejs');
const SmsClient = tencentcloud.sms.v20190711.Client;
const models = tencentcloud.sms.v20190711.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential("AKIDJpbGnF3JpUzDNRqEwspZFpLI4sbDoU04", "DLVb0IPK4cyBPRI1Yt3hBUt9DE7pMjug");
let httpProfile = new HttpProfile();
httpProfile.endpoint = "sms.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new SmsClient(cred, "ap-guangzhou", clientProfile);

let req = new models.SendSmsRequest();

let params = '{"PhoneNumberSet":["+8613135957735"],"TemplateID":"549531","Sign":"凡人前端传","TemplateParamSet":["000000","2"],"SmsSdkAppid":"1400329339"}'
req.from_json_string(params);

class PhoneService extends Service {
  async index() {
    client.SendSms(req, function(errMsg, response) {

        if (errMsg) {
            console.log(errMsg);
            return;
        }
    
        console.log(response.to_json_string());
    });
  }
}

module.exports = PhoneService;
