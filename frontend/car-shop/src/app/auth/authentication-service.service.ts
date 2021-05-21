import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient) { }

  login(name: string, password: string){
    return this.http.post("http://localhost:3000/login", { name: name, password: password},
    {withCredentials: true, responseType: 'text', observe: 'response' as 'response'}
    )
  }
}
