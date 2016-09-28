import { Injectable  } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import { IProfile, Profile } from './profile';

/**
 * @brief      Class for profile service.
 */
@Injectable()
export class ProfileService {
  constructor(private af:AngularFire) { }

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
}
