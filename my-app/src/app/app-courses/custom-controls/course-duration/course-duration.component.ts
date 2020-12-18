import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDurationComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDurationComponent),
      multi: true,
    },
  ],
})
export class CourseDurationComponent
  implements ControlValueAccessor, Validator {
  @Input()
  currentValue = 110;
  isValid = true;

  onChange = (_: any) => {};

  emitChanges() {
    this.onChange(this.currentValue);
  }

  valuechange(data) {
    this.emitChanges();
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (this.isNumeric(control.value)) {
      this.isValid = false;
      return { 'courseDetail.length': true }; // return object if the validation is not passed.
    }
    this.isValid = true;
    return null; // return null if validation is passed.
  }

  isNumeric(str) {
    return !str || isNaN(+str); //ensure strings of whitespace fail
  }

  writeValue(obj: any): void {
    if (obj != null) {
      this.currentValue = obj;
      this.emitChanges();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }
}
