import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/types/user.type';
import { UsersData } from '../users-data/users-data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  name:string = '';
  password: string = '';
  listOfUsers: Array<User> = [];

  constructor(private _userData: UsersData) { }

  ngOnInit(): void {
    this._userData.getList().subscribe(data => {
      this.listOfUsers = data;
      
    });
  }

  public logIn(): void{
    if(!this.name){
      window.alert('Введите имя');
      return;
    }
    if(!this.password){
      window.alert('Введите пароль');
      return;
    }
    for(let i = 0; i < this.listOfUsers.length; i++){
      if(this.listOfUsers[i].name === this.name){
        if(this.listOfUsers[i].password === this.password){
          console.log('Вы успешно вошли');
          localStorage.setItem('auth', '' +this.listOfUsers[i].id);
          return;
          // ToDo: сделать локал стораже
        }
        else{
          window.alert('Данные введены не корректно')
          return
        }
      }
    }
    window.alert('Данные введены не корректно')

  }

}
