import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnChanges {
  @Input() rooms: RoomList[] = [];
  @Input() title: string = "";
  @Input() price: number | null = 0;
  @Output() selectedRoom = new EventEmitter<RoomList>();



  applyFilterTypes: any;

  currentFilter: any;

  filterValue: Array<any>;

  popupPosition: any;

  showFilterRow!: boolean;

  showHeaderFilter!: boolean;

  
  constructor(){
    this.popupPosition = {
      of: window, at: 'top', my: 'top', offset: { y: 10 },
    };
    this.filterValue = [];
  }
  
  

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.rooms);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
