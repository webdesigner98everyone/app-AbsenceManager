import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Error desconocido';
        if (error.error instanceof ErrorEvent) {
          message = error.error.message;
        } else {
          switch (error.status) {
            case 400: message = 'Solicitud inválida'; break;
            case 404: message = 'Recurso no encontrado'; break;
            case 409: message = 'Conflicto de datos'; break;
            case 500: message = 'Error interno del servidor'; break;
          }
        }
        console.error(`[HTTP Error] ${error.status}: ${message}`);
        return throwError(() => ({ status: error.status, message }));
      })
    );
  }
}
