import { ElementRef, Renderer, Directive, Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';

export const MD_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChipsComponent),
  multi: true
};
const noop = () => {};

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit, ControlValueAccessor {

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private inputFocused:boolean;
  tags: string[];
  width:number;
  model = {currentTag:""};

  @Input() placeholder:string = '';

  constructor(){
    this.tags = [];
    this.inputFocused = false;
  }

  closeTag(tag){
    this.tags = this.tags.filter(item => item !== tag);
    this.onChangeCallback(this.tags);
  }
  ngOnInit(){
    this.inputFocused = false;
  }
  //get accessor
  get value(): any {
      return this.tags;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.tags) {
      this.tags = v;
      this.onChangeCallback(v);
    }
  }

  /*-----------------------------------------------------------------
  From ControlValueAccessor interface
  -----------------------------------------------------------------*/
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

  writeValue(value: any) {
    if (value !== this.tags) {
      this.tags = value;
    }
  }

  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }


  /*-----------------------------------------------------------------
  Handler for input events
  -----------------------------------------------------------------*/
  onInputBlur(){
    this.inputFocused = false;
  }
  onKeyDown(key:string, length:number, position:number){
    if(key===',' || key===';' || key === 'Enter'){
      this.model.currentTag.slice(0,position);
      this.tags.push(this.model.currentTag.slice(0,position));
      this.model.currentTag = this.model.currentTag.slice(position);
      this.onTouchedCallback();
      this.onChangeCallback(this.tags);
      return false;
    }else if(key === 'Backspace'){
      if(this.model.currentTag === '' || position == 0){
        this.tags.pop();
        this.onTouchedCallback();
        this.onChangeCallback(this.tags);
        return false;
      }
      // TODO: remove tag if currentTag is not empty and cursor is at beginning
    }
    this.width = ((length + 1) * 11);
    return true;
  }
  onKeyUp(length:number){    
  }

  onClick(){
    this.inputFocused = true;
  }
}
