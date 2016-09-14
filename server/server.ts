import * as koa          from 'koa';
import * as serve        from 'koa-static';
import * as Router       from 'koa-router';
import * as bodyparser   from 'koa-bodyparser';
import * as mongoose     from 'mongoose';

import { UserModel }     from './user/index';
import { IUser }         from '../client/shared/index';
import { readFileThunk } from './file';


var app:koa              = new koa();
var router:Router        = new Router();
var port:number          = process.env.PORT || 8000;

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