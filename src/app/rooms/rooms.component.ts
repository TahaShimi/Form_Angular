import { Component, QueryList, Self, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [RoomsService]
})
export class RoomsComponent {

  roomList: RoomList[] = [];
  selectedRoom!: RoomList;
  title = 'Rooms List';

  totalBytes = 0;

  subscription !: Subscription;

  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();
  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err) => {
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);
  roomsCount$ = this.roomService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  stream = new Observable(observer => {
    observer.next('user1'); 
    observer.next('user2');
    observer.next('user3');
    observer.next('user4');
    observer.complete(); 
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(@SkipSelf() private roomService: RoomsService, private configService: ConfigService) { }

  
  ngOnInit(): void {
    this.roomService.getPhotos().subscribe((event) => {
      switch (event.type){
        case HttpEventType.Sent : {
          console.log('Sent Success');
          break;
        }
        case HttpEventType.DownloadProgress : {
          this.totalBytes += event.loaded;
          break
        }
        case HttpEventType.ResponseHeader : {
          console.log('response Success');
          break;
        }
        case HttpEventType.Response : {
          console.log(event.body);
        }
      }
    })
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    });
    this.stream.subscribe((data) => console.log(data)); 
    this.roomService.getRooms$.subscribe(rooms => {
      this.roomList = rooms;
    });
  }

  ngAfterViewInit() {
    this.headerComponent.title = "Rooms View";

    this.headerChildrenComponent.last.title = 'Last Title';
  }
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
    this.title = this.title;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Normallll',
      price: 200,
      amenities: 'Nor',
      checkinTime: new Date('30 Jan 2023')
    };
    //this.roomList.push(room);

   this.roomService.addRoom(room).subscribe((data) => {
    this.roomList = data;
   })
  }
  editRoom(){
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Normal',
      price: 600,
      amenities: 'Nor',
      checkinTime: new Date('30 Jan 2023')
    };
    this.roomService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom(){
    this.roomService.delete('3').subscribe((data) => {
      this.roomList = data;
    })
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
