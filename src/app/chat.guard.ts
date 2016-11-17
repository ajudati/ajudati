import { Injectable }          from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ChatGuard implements CanActivate{
	canActivate(route: ActivatedRouteSnapshot):boolean{
		return true;
	}
}