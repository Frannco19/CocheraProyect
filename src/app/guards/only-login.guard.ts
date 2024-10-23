import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';
import { inject } from '@angular/core';


export const onlyLoginGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  if (dataAuthService.user?.username) return true;
  const url = router.parseUrl('/login');
  return new RedirectCommand(url);
};
