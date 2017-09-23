import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-frame-app',
  templateUrl: './frame-app.component.html'
})
export class FrameAppComponent{
	
		@Input() url:string;

    constructor(public sanitizer: DomSanitizer){}
    
		
}
