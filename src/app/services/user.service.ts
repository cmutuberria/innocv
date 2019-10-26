import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URI_API = 'https://hello-world.innocv.com/api/User'; 

  constructor(private http: HttpClient) { }
  
  listAll() {
    return this.http.get<User[]>(this.URI_API);
  }
  getOne(_id: string) {
    return this.http.get<User>(`${this.URI_API}/${_id}`);

  }
  create(user: User) {
    return this.http.post(this.URI_API, user);
  }
  update(user: User) {
    return this.http.put(this.URI_API, user);
  }
  delete(_id: number) {
    return this.http.delete(this.URI_API + `/${_id}`);
  }
}
