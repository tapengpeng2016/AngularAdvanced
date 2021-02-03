import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorComponent),
      multi: true
    }
  ]
})
export class ColorComponent implements ControlValueAccessor {

  private _value = '';
  private changeFn = (val: string) => {};
  private touchedFn = () => {};
  constructor() { }

  get value(): string{
    return this._value;
  }

  set value(val: string){
    this._value = val;
  }

  changeColor(color: string): void{
    this.writeValue(color);
  }

  writeValue(val: string): void {
    this._value = val;
    this.changeFn(val);

  }
  registerOnChange(fn: (val: string) => void): void {
    this.changeFn = fn;
  }
  registerOnTouched(fn: () => void ): void {
    this.touchedFn = fn;
  }



}
