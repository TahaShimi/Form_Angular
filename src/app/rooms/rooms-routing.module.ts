import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { roomGuard } from './guards/room.guard';
import { loginGuard } from '../guards/login.guard';

const routes: Routes = [
  {
    path: '', component: RoomsComponent,
    canActivateChild: [roomGuard],
  },
  {path: 'add', component: RoomsAddComponent, canActivate: [loginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
