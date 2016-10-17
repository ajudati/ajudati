import { Injectable  } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import { IProfile, Profile } from './profile';
import { AuthService } from './auth.service';

/**
 * @brief      Class for profile service.
 */
@Injectable()
export class ProfileService {
  constructor(private af:AngularFire, private as:AuthService) { }

  /**
   * @brief      Creates a profile.
   *
   * @param      uid      The uid
   * @param      profile  The profile
   *
   * @return     { description_of_the_return_value }
   */
  async createProfile(uid:string, profile:Profile){
    await this.af.database.object(`profiles/${uid}`).set(profile);
  }

  /**
   * @brief      Updates a profile
   *
   * @param      profile  The profile
   * @param      changes  The changes
   *
   * @return     { description_of_the_return_value }
   */
  async updateProfile(profile:IProfile, changes:any):Promise<void>{
    await this.af.database.object(`profiles/${profile.$key}`).update(changes);
  }

  getProfile(uid: string):FirebaseObjectObservable<any>{
    return this.af.database.object(`profiles/${uid}`);
  }

  async updatePicture(uid:string, image:File){
    let name = image.name.split('.');
    name[0] = uid;

    var storageRef = firebase.storage().ref();
    await storageRef.child(`images/${uid}`).put(image,{contentType: image.type});
  }
  getPicture(uid:string):firebase.Promise<any>{
    let storageRef = firebase.storage().ref();
    return storageRef.child(`images/${uid}`).getDownloadURL().catch(()=>{});
  }
  getProfiles():FirebaseListObservable<any>{
    return this.af.database.list('profiles');
  }

  searchSkills(queries:string[]):FirebaseObjectObservable<any>{
    let queryObj:any;
    if(queries)
    {
      for(var i=0; i<queries.length; i++) queries[i] = queries[i].toLowerCase();
      queryObj = {
        "terms": {
          "skills": queries
        }
      };
    }
    else
      queryObj = {"match_all": {}};

    let key:any = this.af.database.list('search/request')
      .push({index:'firebase',type:'profile',body:{
        "query":{
          "bool":{
            "must_not":{"match":{"_id":this.as.id}},
            "must":queryObj
          }
        }
      }}).key;
    return this.af.database.object(`search/response/${key}`);
  }
}
