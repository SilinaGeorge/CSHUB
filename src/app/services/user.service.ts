import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetSpaceLeft, SpaceLeft } from '../store/models/user.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.url + "/user";
  

  constructor(private http: HttpClient) { }

  
  GetSpaceLeft(spaceLeftData: GetSpaceLeft) {
  
    return this.http.get<SpaceLeft>(`${this.URL}/space/${spaceLeftData.id}`, { withCredentials: true });
  };
}
