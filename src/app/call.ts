import { CallStatus } from './call-status.enum';
export interface ICall {
  $key?:            string;
  title:            string;
  description:      string;
  owner:            string;
  helper:           string;
  status:           CallStatus;
  finishedAt:       number;
  createdAt:        number;
  viewed:           boolean;
  ownerAccepted:    boolean;
  ownerAcceptedAt:  number;
  helperAccepted:   boolean;
  helperAcceptedAt: number;
  images:           string[];
}

export class Call implements ICall{
  title:            string;
  description:      string;
  owner:            string;
  helper:           string;
  status:           CallStatus;
  finishedAt:       number;
  createdAt:        number;
  viewed:           boolean;
  ownerAccepted:    boolean;
  ownerAcceptedAt:  number;
  helperAccepted:   boolean;
  helperAcceptedAt: number;
  images:           string[];
  constructor(title:string = '', description:string = '', owner:string = ''){
    let time:number = firebase.database['ServerValue']['TIMESTAMP'];
    this.title            = title;
    this.description      = description;
    this.owner            = owner;
    this.helper           = null;
    this.status           = CallStatus.New;
    this.finishedAt       = time;
    this.createdAt        = time;
    this.viewed           = false;
    this.ownerAccepted    = false;
    this.helperAccepted   = false;
    this.helperAcceptedAt = time;
    this.ownerAcceptedAt  = time;
    this.images           = [];
  }
}