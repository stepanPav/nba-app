import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, Subject} from "rxjs";
import { UsersData } from "../authorization/users-data/users-data.service";
@Injectable()
export class LoginGuard implements CanActivate{
    isCurrentPage = false;
    isLogged: boolean | null = null;
    constructor(private _userData: UsersData){}
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        if(route.routeConfig?.path === 'login' || route.routeConfig?.path === 'login'){
            this.isCurrentPage = true;
        }
        else{
            this.isCurrentPage = false;
        }
        if(this.isLogged !== null){
            return this.isLogged !== this.isCurrentPage;
        }
        let res = new Subject<boolean>();
        this._userData.getList().subscribe(data => {
            for(let i = 0; i < data.length; i++){
                if(("" + data[i].id) === localStorage.getItem('auth')){
                    console.log('wtf')
                    this.isLogged = (true !== this.isCurrentPage);
                    res.next(this.isLogged);
                    return
                }
            }
            this.isLogged = (false !== this.isCurrentPage) ;
            return res.next(this.isLogged);
        })
        
        return res;
    }
}