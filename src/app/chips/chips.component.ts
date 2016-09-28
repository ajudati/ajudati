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
    this.tags = ['oi','sdlkfj'];
    this.inputFocused = false;
  }
  onKeyPress(key:string, length:number){
    if(key===',' || key===';'){
      this.tags.push(this.model.currentTag);
      this.model.currentTag = "";
      this.onTouchedCallback();
      return false;
    }else if(key === 'Backspace'){
      if(this.model.currentTag === ''){
        this.tags.pop();
        this.onTouchedCallback();
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
  closeTag(tag){
    this.tags = this.tags.filter(item => item !== tag);
    this.onChangeCallback(this.tags);
  }
  ngOnInit(){
    this.inputFocused = false;
  }
  writeValue(value: any) {
    if (value !== this.tags) {
      this.tags = value;
    }
  }

  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }
  onInputBlur(){
    this.inputFocused = false;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
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
}
