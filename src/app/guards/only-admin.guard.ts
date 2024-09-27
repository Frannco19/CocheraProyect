import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';
import { inject } from '@angular/core';
import { routes } from '../app.routes';

export const adminGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router)
  if(dataAuthService.user?.esAdmin) return true;
  const url = router.parseUrl("/state-garage");
  return new RedirectCommand(url);
};
