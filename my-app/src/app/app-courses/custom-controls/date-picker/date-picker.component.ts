import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor, Validator {
  @Input()
  currentValue = this.formatDateToString(new Date());
  isValid = true;

  onChange = (_: any) => {};

  emitChanges() {
    this.onChange(this.currentValue);
  }

  valuechange(data) {
    console.log(this.currentValue);
    this.emitChanges();
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (
      (control.value && control.value.length != 10) ||
      !this.isValidDate(control.value)
    ) {
      this.isValid = false;
      return { 'courseDetail.date': true }; // return object if the validation is not passed.
    }
    this.isValid = true;
    return null; // return null if validation is passed.
  }

  writeValue(obj: any): void {
    if (obj != null) {
      this.currentValue = this.formatDateToString(obj);
      this.emitChanges();
    }
    console.log('writeValue implemented.');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    console.log('onChange implemented.');
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState implemented.');
  }

  withoutTime(date) {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

    // Parse the date parts to integers
    var parts = dateString.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    var today = new Date();
    var passedDate = new Date(year, month - 1, day);
    // Check the ranges of month and year
    if (
      year > 3000 ||
      month > 12 ||
      this.withoutTime(passedDate) < this.withoutTime(today)
    )
      return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  formatDateToString(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }
}
