import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

export class ChatGuard implements CanActivate{
	canActivate(route: ActivatedRouteSnapshot):boolean{
		return true;
	}
}