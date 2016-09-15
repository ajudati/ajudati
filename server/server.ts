import * as koa          from 'koa';
import * as serve        from 'koa-static';
import * as Router       from 'koa-router';
import * as jwt          from 'koa-jwt';
import * as bodyparser   from 'koa-bodyparser';
import * as mongoose     from 'mongoose';
import * as fs           from 'fs';

import { UserModel }     from './user/index';
import { IUser }         from '../client/shared/index';
import { readFileThunk } from './file';


var app:koa              = new koa();
var router:Router        = new Router();
var port:number          = process.env.PORT || 8000;
var publicKey:string     = process.env.PUBLIC_KEY  || fs.readFileSync('id_rsa.pub');
var privateKey:string    = process.env.PRIVATE_KEY || fs.readFileSync('id_rsa');

/*-----------------------------------------
  DATABASE
  ------------------------------------------*/
// Connecting to our database (MongoLab from Heroku) or just local
var uristringDev:string  = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/ajudati_dev';
var uristringProd:string = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/ajudati_prod';
var uristringTest:string = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/ajudati_test';

mongoose.connect(uristringDev, function(err){
  if(err) throw err;
});

/*-----------------------------------------
  STATIC FILES
  ------------------------------------------*/
app.use(serve('.'));
app.use(bodyparser());

/*-----------------------------------------
  REST API
  ------------------------------------------*/
// Return true if given email is already registered.
// Used for validation.
router.get('/api/user/existing/:email', function *(){
  yield UserModel.emailExisting(this.params.email)
    .then((existing:boolean)=>{this.body=existing;})
    .catch(err=>{throw err;});
});

// Registering a user
router.post('/api/user',function *(){
  var user:IUser = this.request.body;
  yield UserModel.register(user)
    .then (user => {this.body = true;})
    .catch(err  => {throw err;       });
});

// Login
router.post('/api/login', function*(){
  var credentials = this.request.body;
  yield UserModel.login(credentials.id, credentials.password).then(isMatch=>{
    this.status = 200;
    this.body = {};
    if(isMatch){
      var token   = jwt.sign({id:credentials.id}, privateKey, {algorithm: 'RS256'});
      this.body.token = token;
    }
  });
});

/*-----------------------------------------
  RESPONSIVE API
  ------------------------------------------*/
function* index(){
  this.body = yield readFileThunk(__dirname + '/../index.html');
}
router.get('/'         , index)
      .get('/start'    , index)
      .get('/login'    , index)
      .get('/register' , index)
      .get('/dashboard', index);

/*-----------------------------------------
  STARTING SERVER
  ------------------------------------------*/
app.use(router.routes());
app.listen(port);
console.log(`AjudaTI executando na porta ${port}`);