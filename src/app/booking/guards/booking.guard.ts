import { Injectable } from "@angular/core";
import { BookingComponent } from "../booking.component";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class BookingGuard {

  constructor(private _snackBar: MatSnackBar){}
  canDeactivate(
    component: BookingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState : RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ){
    if (component.bookingForm.pristine) {
      return component.bookingForm.pristine;
    }else {
      debugger
      this._snackBar.open('You have unsaved changes!', 'DISCARD');
      return false;
    }
  }
}

