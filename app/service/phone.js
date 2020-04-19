'use strict';

const Service = require('egg').Service;
const tencentcloud = require('tencentcloud-sdk-nodejs');
const SmsClient = tencentcloud.sms.v20190711.Client;
const models = tencentcloud.sms.v20190711.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

let cred = new Credential("AKIDqVvBD2Xx2tWSChrwf7IEwLYqrb7y2uxj", "dpoTsi4AzWnpa4MP96m5GDI6YswDDnFQ");
let httpProfile = new HttpProfile();
httpProfile.endpoint = "sms.tencentcloudapi.com";
let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
let client = new SmsClient(cred, "ap-guangzhou", clientProfile);

let req = new models.SendSmsRequest();

class PhoneService extends Service {
  async index(phone) {
    let velidata = Math.floor(Math.random() * (1000000 - 100000) + 100000)
    let params = `{"PhoneNumberSet":["+86${phone}"],"TemplateID":"549531","Sign":"凡人前端传","TemplateParamSet":["${velidata}","2"],"SmsSdkAppid":"1400329339"}`
    req.from_json_string(params);
    client.SendSms(req, function(errMsg, response) {
        if (errMsg) {
            console.log(errMsg);
            return;
        }
    });
    return velidata;
  }
}

module.exports = PhoneService;
