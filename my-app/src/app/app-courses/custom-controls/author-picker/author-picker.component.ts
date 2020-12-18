import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';
import { Author } from '../../models/author';

@Component({
  selector: 'app-author-picker',
  templateUrl: './author-picker.component.html',
  styleUrls: ['./author-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorPickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorPickerComponent),
      multi: true,
    },
  ],
})
export class AuthorPickerComponent implements ControlValueAccessor, Validator {
  isSearchVisible = false;
  isValid = true;
  selectedAuthorsCount = 0;
  @Input()
  internalAuthors: Author[] = [];
  @Input()
  allAuthors: Author[] = [];
  @Input()
  selectedAuthors: Author[] = [];

  showHideSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  createInternalArray() {
    this.internalAuthors = [];
    this.selectedAuthorsCount = 0;
    for (var i = 0; i < this.allAuthors.length; i++) {
      let author = this.allAuthors[i];
      let isSelected = this.checkIsSelected(author.id);
      if (isSelected) {
        this.selectedAuthorsCount = this.selectedAuthorsCount + 1;
      }
      this.internalAuthors.push({
        id: author.id,
        name: author.name,
        selected: isSelected,
      });
    }
  }

  searchIn(txt: string) {
    var searchStr = txt.trim();
    for (var i = 0; i < this.internalAuthors.length; i++) {
      if (!searchStr || searchStr.length == 0) {
        this.internalAuthors[i].isMatched = null;
      } else if (
        searchStr &&
        searchStr.length > 0 &&
        this.internalAuthors[i].name
          .toLowerCase()
          .indexOf(searchStr.toLowerCase()) >= 0
      ) {
        this.internalAuthors[i].isMatched = true;
      } else {
        this.internalAuthors[i].isMatched = false;
      }
    }
  }

  checkIsSelected(id) {
    for (var i = 0; i < this.selectedAuthors.length; i++) {
      if (this.selectedAuthors[i].id == id) {
        return true;
      }
    }
    return false;
  }

  markSelectUnselect($event, id, name, selected) {
    $event.stopPropagation();

    for (var i = 0; i < this.internalAuthors.length; i++) {
      if (this.internalAuthors[i].id == id) {
        this.internalAuthors[i].selected = !selected;
        if (selected) {
          this.selectedAuthorsCount = this.selectedAuthorsCount - 1;
        } else {
          this.selectedAuthorsCount = this.selectedAuthorsCount + 1;
        }
      }
    }
    this.publishChanges();
  }

  publishChanges() {
    var finalAuthors: Author[] = [];
    for (var i = 0; i < this.internalAuthors.length; i++) {
      if (this.internalAuthors[i].selected == true) {
        finalAuthors.push({
          id: this.internalAuthors[i].id,
          name: this.internalAuthors[i].name,
        });
      }
    }
    this.emitChanges(finalAuthors);
  }

  onChange = (_: any) => {};

  emitChanges(finalAuthors) {
    this.onChange(finalAuthors);
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value) {
      if (control.value.length < 1) return { 'courseDetail.authors': true }; // return object if the validation is not passed.
    }
    console.log('check val');
    this.isValid = true;
    return null; // return null if validation is passed.
  }

  writeValue(obj: any): void {
    if (obj != null) {
      this.selectedAuthors = obj;
      // this.emitChanges();
    }
    this.createInternalArray();
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
}
