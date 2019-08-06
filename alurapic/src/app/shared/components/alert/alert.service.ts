import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AlertType, Alert } from "./alert";
import { Router, NavigationStart } from "@angular/router";

@Injectable({ providedIn: 'root'})
export class AlertService {

    alertSubject: Subject<Alert> = new Subject<Alert>();//tanto emitir como ouvir o valor
    keepAfterRouteChange = false;

    constructor(router: Router) { // este servico sabe dizer se houve navegacao ou nao entao
                            // tem que se inscrever nele

        router.events.subscribe(event => {
            if(event instanceof NavigationStart) {// se é instancia de navstart entao é uma nova navegacao
                if(this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear(); // vai passar um obs nulo entao nada sera exibido
                }
            }
        });
    }

    success(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange); 
    }

    warning(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert() { 
        return this.alertSubject.asObservable();
    }

    clear() {
        this.alertSubject.next(null); // passando null, nada sera exibido
    }
}

