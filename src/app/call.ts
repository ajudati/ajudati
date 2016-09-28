export interface ICall {
  $key?:string;
  title: string;
  description: string;
  owner: string;
  helper: string;
  finished: boolean;
  finishedOn: number;
  createdOn: number;
  viewed: boolean;
}

export class Call implements ICall{
  title: string;
  description: string;
  owner: string;
  helper: string;
  finished: boolean;
  finishedOn: number;
  createdOn: number;
  viewed: boolean;
  constructor(title:string = '', description:string = '', owner:string = ''){
    this.title       = title;
    this.description = description;
    this.owner       = owner;
    this.finished    = false;
    this.finishedOn  = firebase.database['ServerValue']['TIMESTAMP'];
    this.createdOn   = firebase.database['ServerValue']['TIMESTAMP'];
    this.viewed      = false;
  }
}