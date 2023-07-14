import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './guards/login.guard';
import { MotelsComponent } from './motels/motels.component';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, title: "Login" },
  { path: 'rooms', loadChildren: ()=> import('./rooms/rooms.module').then(m=>m.RoomsModule), title: "Rooms" , canActivate: [loginGuard]},
  { path: 'employee', loadChildren: ()=> import('./employee/employee.module').then(m=>m.EmployeeModule), canActivate: [loginGuard], title: "Employee"},
  { path: 'booking/:roomid', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) , canActivate: [loginGuard], title: "Booking Room" },
  { path: 'comment', loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule), title: "Comments" },
  { path: 'hotel', loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule) , canActivate: [loginGuard], title: "Hotels"},
  { path: 'motel', component: MotelsComponent, canActivate: [loginGuard], title: "Motels" },
  { path: '**',component: NotfoundComponent, title: "Page Not Found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
