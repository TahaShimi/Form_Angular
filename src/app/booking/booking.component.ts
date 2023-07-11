import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidators } from './validators/custom-validators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }
  constructor(private configService: ConfigService, private fb: FormBuilder, private bookingService: BookingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group({
      roomId: new FormControl({value: roomId, disabled: true}, {validators: [Validators.required]}),
      guestEmail: ['', { updateOn: 'blur', validators: [Validators.required, Validators.email] }],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn: 'blur' }],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidators.ValidateName, CustomValidators.ValidateSpecialChar('*')]],
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        City: ['', [Validators.required]],
        State: ['', [Validators.required]],
        Country: [''],
        ZipCode: [''],
      }),
      guests: this.fb.array([
        this.addGuestControl()
      ]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] })
    }, { updateOn: 'blur', validators: [CustomValidators.ValidateDate] })
    this.getBookingData();
    /* this.bookingForm.valueChanges.subscribe((data) => {
      this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {})
    }) */

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data))
  }

  addBooking() {
    console.log(this.bookingForm.value);
    /* this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {
      console.log(data);
    }) */
    this.bookingForm.reset({
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: '',
      },
      guests: [],
      tnc: false
    })
  }

  addGuest() {
    this.guests.push(
      this.addGuestControl()
    )
  }

  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail: 'test@gamil.com',
      checkinDate: new Date('10-FEB-2023'),
      checkoutDate: new Date('20-FEB-2023'),
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: '',
      },
      guests: [],
      tnc: false
    })
  }
  addGuestControl() {
    return this.fb.group({ guestName: ['', [Validators.required]], age: new FormControl('') })
  }

  addPassport() {
    this.bookingForm.addControl('Passport', new FormControl(''))
  }

  deletePassport() {
    this.bookingForm.removeControl('Passport')
  }

  removeGuest(i: number) {
    this.guests.removeAt(i)
  }
}
