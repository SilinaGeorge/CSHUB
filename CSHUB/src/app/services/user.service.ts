import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetSpaceLeft, SpaceLeft } from '../store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = "https://localhost:4200/user";

  constructor(private http: HttpClient) { }

  
  GetSpaceLeft(spaceLeftData: GetSpaceLeft) {
  
    return this.http.get<SpaceLeft>(`${this.URL}/space/${spaceLeftData.id}`);
  };
}
