import { AuthenticationService } from '../_services';
import { catchError, finalize, of } from 'rxjs';

export function appInitializer(authenticationService: AuthenticationService) {
  // return () => authenticationService.refreshToken()
  //   .pipe(
  //     catchError(() => of())
  //   );
}
