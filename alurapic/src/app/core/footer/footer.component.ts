import { Component, OnInit } from "@angular/core";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs";
import { User } from "../user/user";

@Component({ // esta em coremodule
    selector: 'ap-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit { 

    user$: Observable<User>;
    constructor(private userService: UserService) { } // injetar pra saber se ele esta loggado

    ngOnInit(): void {
        this.user$ = this.userService.getUser(); // observable
    }
}