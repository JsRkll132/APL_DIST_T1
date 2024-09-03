import { HttpClient, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let httpClient :HttpClient = new HttpClient(Object());
  const token = new UserServiceService(httpClient).userToken;

  if (token) {
    const authorizedReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    return next(authorizedReq);
  }

  return next(req);
};
