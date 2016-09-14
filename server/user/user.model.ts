import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../../client/shared/index';
var Schema = mongoose.Schema;

var db = mongoose.connection;
var UserSchema = new Schema({
  name:    {type:String, required:true},
  email:   {type:String, required:true},
  password:{type:String, required:true}
});

type UserType = IUser & mongoose.Document;
var _model = mongoose.model<UserType>('User', UserSchema);

export class UserModel {

  /**
   * @brief      returns whether a given email is registered
   *
   * @param      email  The email
   *
   * @return     { description_of_the_return_value }
   */
  static emailExisting(email:string):Promise<boolean>{
    return new Promise<boolean>((resolve,reject)=>{
      _model.findOne({'email':email},(err:any, user:UserType)=>{
        err? reject(err):resolve(user !== null);
      });
    });
  }

  static register(user:IUser):Promise<UserType>{
    console.log(user);
    return new Promise<UserType>((resolve,reject) => {
      bcrypt.genSalt(10, function(err:any, salt:string){
        if(err) reject(err);
        bcrypt.hash(user.password, salt, function(err, hash){
          if(err) reject(err);
          var newUser = new _model({name:user.name, email:user.email});
          newUser.password = hash;
          newUser.save((err, registeredUser:UserType) => {
            if(err) reject(err);
            else    resolve(registeredUser);
          });
        });
      })
    });
  }
}
