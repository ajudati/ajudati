import * as koa from 'koa';
import * as serve from 'koa-static';
import * as mongoose from 'mongoose';
var app:koa     = new koa();

// Connecting to our database (MongoLab from Heroku) or just local
var uristringDev:string  = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/ajudati_dev';
var uristringProd:string = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/ajudati_prod';
var uristringTest:string = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/ajudati_test';
mongoose.connect(uristringDev);
var port:number = process.env.PORT || 8000;

app.use(serve('.'));

app.listen(port);
console.log(`AjudaTI executando na porta ${port}`);