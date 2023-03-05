//setting a kue in config..note:kue is basically a group of similar jobs like a group of emails can put into one series..
const kue=require('kue');
const queue= kue.createQueue();
module.exports=queue;