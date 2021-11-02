import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user.type';
import { UsersData } from '../users-data/users-data.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  name:string = '';
  password: string = '';
  passwordRepate: string = '';
  listOfUsers: Array<User> = [];

  constructor(private _userData: UsersData, private router: Router) { }

  ngOnInit(): void {
    this._userData.getList().subscribe(data => {
      this.listOfUsers = data;
      
    });
    
  }

  singIn(): void{
    if(!this.name) {
      window.alert("Введите имя пользователя")
      return;
    }
    if(!this.password){
      window.alert("Введите пароль")
      return;
    }
    if(this.password !== this.passwordRepate){
      window.alert("Введенные пароли не совпадают");
      return;
    }

    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(this.listOfUsers[i].name === this.name){
        window.alert("Имя пользователя занято")
        return;
      }
    }
    this._userData.addUser(this.name, this.password);
    this.router.navigate(['/login']);
  }

}
