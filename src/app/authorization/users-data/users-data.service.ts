import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import {LOCAL_API_URL, PLAYERS_API_URL} from '../../constants/index';
import { User } from 'src/app/types/user.type';


@Injectable({
  providedIn: 'root'
})
export class UsersData {

    usersData: Array<User> = [];
    usersData$ = new AsyncSubject<Array<User>>();
    isLoaded = false;   
    constructor(private http: HttpClient) {
        this.http = http;
        http.get(`${LOCAL_API_URL}/users_data`).subscribe(data=>{
            this.usersData = data as Array<User>;
            this.usersData$.next(data as Array<User>);
            this.usersData$.complete();
      //data = JSON.parse(JSON.parse(JSON.stringify(data))[0]['list']);
        })
  }
  
    public getList(): AsyncSubject<Array<User>>{
        return this.usersData$;
    }

    public addUser(name: string, password: string){
        this.usersData.push({name: name, password: password, id: this.usersData.length + 1})
        this.http.post(`${LOCAL_API_URL}/users_data`, {name: name, password: password}).subscribe()
    }

  
  
}
