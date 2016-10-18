export interface IProfile {
  $key?:       string;
  description: string;
  skills:      string[];
  calls:       string[];
}

export class Profile implements IProfile{
  description: string;
  skills:      string[];
  calls:       string[];
  constructor(description:string = '', skills:string[]=[], calls:string[]=[]){
    this.description = description;
    this.skills      = skills;
    this.calls       = calls;
  }
}