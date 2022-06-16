import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator,ValidationErrors,NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './service/user.service';

@Directive({
  selector: '[uniqueEmail]',
  providers:[{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirectiveDirective,multi:true}]
})
export class UniqueEmailValidatorDirectiveDirective implements AsyncValidator{

  constructor(private userService:UserService) { }
 validate(c:AbstractControl):Promise<ValidationErrors | null> |Observable<ValidationErrors | null>{
   return this.userService.getUserByKey(c.value).pipe(
     map(users=>{
       return users ? {'uniqueEmail' : true}:null;
     })
   );
 }
}
