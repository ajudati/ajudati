export interface ICall {
  $key?:string;
  title: string;
  description: string;
  owner: string;
  helper: string;
}

export class Call implements ICall{
  title:string;
  description:string;
  owner:string;
  helper:string;
  constructor(title:string = '', description:string = '', owner:string = ''){
    this.title       = title;
    this.description = description;
    this.owner       = owner;
  }
}