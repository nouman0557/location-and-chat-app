import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CommonService } from "./common.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private commonService: CommonService) { }

    canActivate() {
        if (this.isAuthenticated) {
            return true;
        }
        this.commonService.showError("To access this you need to login.", "Unauthorized Request")
        this.router.navigateByUrl("/account")
        return false;
    }

    get isAuthenticated() {
        if (localStorage.getItem("token") != null && localStorage.getItem('user') != null) {
            return true
        } else {
            return false;
        }
    }

}