import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpSentEvent } from "@angular/common/http";
import { HttpHeaderResponse } from "@angular/common/http";
import { HttpProgressEvent } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { HttpUserEvent } from "@angular/common/http";
import { TokenService } from "../token/token.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor { // tem que importar
    
    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent 
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
       
            if(this.tokenService.hasToken()) { // se estiver loggado->
                const token = this.tokenService.getToken();
                req = req.clone({ 
                    setHeaders: {
                        'x-access-token': token
                    }
                }); // tem que por no providers do coremodule
            }
            return next.handle(req);
    }
}