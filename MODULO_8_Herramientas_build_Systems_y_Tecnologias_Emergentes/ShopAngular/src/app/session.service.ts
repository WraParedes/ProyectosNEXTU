import { Injectable } from '@angular/core';
import { User } from './model/User'

@Injectable()
export class SessionService {

  user: User = null;

  constructor() { }

}
