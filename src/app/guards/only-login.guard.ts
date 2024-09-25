import { CanActivateFn } from '@angular/router';

export const onlyLoginGuard: CanActivateFn = (route, state) => {
  return true;
};
