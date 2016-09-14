import { InMemoryDbService } from 'angular2-in-memory-web-api';

import { User } from './user/index'; 

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users:User[] = [
      {_id: 1, name: 'Anderson Tavares', email: 'nocturne.pe@gmail.com',       password: 'anderson'},
      {_id: 2, name: 'Yara Gouffon'    , email: 'yaragouffon@gmail.com',       password: 'yaragouffon'},
      {_id: 3, name: 'Alex Brunckhorst', email: 'alex.ed@brunck.com.br',       password: 'alexbrunck'},
      {_id: 4, name: 'Fred Ferreira'   , email: 'fredericolf@gmail.com',       password: 'frederico'},
      {_id: 5, name: 'Leticia Mendonça', email: 'leticiaspmendonca@gmail.com', password: 'leticiamendonca'},
      {_id: 6, name: 'Alberto Battat'  , email: 'albertobattat@gmail.com',     password: 'albertobattat'}
    ];
    return {users};
  }
}