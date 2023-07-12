import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './guards/login.guard';
import { MotelsComponent } from './motels/motels.component';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'rooms', loadChildren: ()=> import('./rooms/rooms.module').then(m=>m.RoomsModule)/* , canActivate: [loginGuard] */},
  { path: 'employee', loadChildren: ()=> import('./employee/employee.module').then(m=>m.EmployeeModule), canActivate: [loginGuard]},
  { path: 'booking/:roomid', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) , canActivate: [loginGuard] },
  { path: 'comment', loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule) },
  { path: 'hotel', loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule) , canActivate: [loginGuard]},
  { path: 'motel', component: MotelsComponent, canActivate: [loginGuard] },
  { path: '**',component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
