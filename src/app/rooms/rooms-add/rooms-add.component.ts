import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { Form, FormGroup, NgForm } from '@angular/forms';
import dxForm from 'devextreme/ui/form';
import { from } from 'rxjs';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent {
  roomType: string = '';
  amenities: string = '';
  price: number = 0;
  photo: string = '';
  checkinTime: Date = new Date;
  checkoutTime: Date = new  Date;
  rating: number = 0;
  isValid : boolean = true;

  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date (),
    rating: 0
  }
  sucessMessage: string = "";
  constructor(private roomServive: RoomsService) { 
   }
   ngOnInit(e: Event): void{
    console.log(e);
   }
  AddRoom(e: Event) {
    e.preventDefault();
    console.log(this.room);
    
    console.log(this.checkinTime, this.checkoutTime);
    this.room = {
      roomType: this.roomType,
      amenities: this.amenities,
      price: this.price,
      photos: this.photo,
      checkinTime: this.checkinTime,
      checkoutTime: this.checkoutTime,
      rating: this.rating
    }
    console.log(this.room);
    this.roomServive.addRoom(this.room).subscribe((data) => {
      this.sucessMessage = 'Room Added With Sucess';
    }
    )
  }
}
