import { DatePipe, formatDate } from '@angular/common';
import { AfterViewInit, Component, forwardRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDatepicker, NgbDatepickerConfig, NgbPopover, NgbPopoverConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { Functions } from 'src/app/utils/functions';
import { DateTimeModel } from './date-time.model';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeComponent),
      multi: true
    }
  ]
})
export class DateTimeComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @Input() dateString: string;
  @Input() inputDatetimeFormat = 'yyyy/MM/dd hh:mm a';
  @Input() hourStep = 1;
  @Input() minuteStep = 1;
  @Input() secondStep = 30;
  @Input() seconds = true;
  @Input() disabled = false;
  @Input() maxDate: Date = null;
  @Input() minDate: Date = null;

  private showTimePickerToggle = false;
  private datetime: DateTimeModel = new DateTimeModel();
  private time: DateTimeModel = new DateTimeModel();
  private firstTimeAssign = true;

  @ViewChild(NgbDatepicker) private dp: NgbDatepicker;
  @ViewChild(NgbPopover) private popover: NgbPopover;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  public ngControl: NgControl;

  constructor(
    private config: NgbPopoverConfig, 
    private inj: Injector, 
    private configCalendar: NgbDatepickerConfig, 
    private functions: Functions
  ) {
    this.config.autoClose = 'outside';
    this.config.placement = 'auto';
  }
  ngOnInit(): void {
    if(this.maxDate != null) {
      this.configCalendar.maxDate = {year: this.maxDate.getFullYear(), month: this.maxDate.getMonth() + 1, day: this.maxDate.getDate()};
    }
    // if(this.minDate != null) {
    //   this.configCalendar.minDate = {year: this.minDate.getFullYear(), month: this.minDate.getMonth() + 1, day: this.minDate.getDate()};
    // }
    this.ngControl = this.inj.get(NgControl);
  }
  ngAfterViewInit(): void {
    this.popover.hidden.subscribe($event => {
      this.showTimePickerToggle = false;
    });
  }
  writeValue(newModel: string) {
    if(newModel) {
      this.datetime = Object.assign(this.datetime, DateTimeModel.fromLocalString(newModel));
      this.dateString = newModel;
      this.setDateStringModel();
    }else{
      this.datetime = new DateTimeModel();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  toggleDateTimeState($event) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    if($event != null){
      $event.stopPropagation();
    }
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onInputChange($event: any) {
    const value = $event.target.value;
    const dt = DateTimeModel.fromLocalString(value);
    if(dt) {
      this.datetime = dt;
      this.setDateStringModel();
    } else if (value.trim() === '') {
      this.datetime = new DateTimeModel();
      this.dateString = '';
      this.onChange(this.dateString);
    } else {
      this.onChange(value);
    }
  }
  onDateChange($event: any) {
    if($event.year){
      $event = `${$event.year}/${$event.month}/${$event.day}`
    }
    const date = DateTimeModel.fromLocalString($event);
    if(!date) {
      this.dateString = this.dateString;
      return;
    }
    if(!this.datetime) {
      this.datetime = date;
    }
    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;
    this.setDateStringModel();
    this.toggleDateTimeState(null);
  }
  onTimeChange(event: NgbTimeStruct) {
    if(event != null){
      this.datetime.hour = event.hour;
      this.datetime.minute = event.minute;
      this.datetime.second = event.second;
      this.setDateStringModel();
    }
  }
  setDateStringModel() {
    if(this.datetime != null && this.datetime.year != undefined) {
      let time = this.datetime.hour ? `T${this.functions.inTwoDigits(this.datetime.hour)}:${this.functions.inTwoDigits(this.datetime.minute)}:00.000` : `T${this.time.hour ? this.functions.inTwoDigits(this.time.hour): '10'}:${this.time.minute ? this.functions.inTwoDigits(this.time.minute): '00'}:00.000`;
      this.dateString = formatDate(new Date(`${this.datetime.year}-${this.functions.inTwoDigits(this.datetime.month)}-${this.functions.inTwoDigits(this.datetime.day)}${time}`), 'yyyy/MM/dd hh:mm a', 'es-CO');
      if(!this.firstTimeAssign) {
        this.onChange(this.dateString);
      } else {
        if(this.dateString !== null) {
          this.firstTimeAssign = false;
        }
      }
    }
  }
  inputBlur($event) {
    this.onTouched();
  }

}
