import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent {

  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date,
    rating: 0
  }
  sucessMessage: string = "";

  constructor(private roomServive: RoomsService) { }

  AddRoom(roomsFrom: NgForm) {
    this.roomServive.addRoom(this.room).subscribe((data) => {
      this.sucessMessage = 'Room Added With Sucess';
      roomsFrom.reset({
        roomType: '',
        amenities: '',
        price: 0,
        photos: '',
        checkinTime: new Date(),
        checkoutTime: new Date,
        rating: 0
      });
    }
    )
  }
}
