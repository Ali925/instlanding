import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import {JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { FrameAppComponent } from './frame-app/frame-app.component';

import { InstagramService } from './instagram.service';

@NgModule({
  declarations: [
    AppComponent,
		FrameAppComponent
  ],
  imports: [
    BrowserModule,
		HttpModule,
		JsonpModule
  ],
  providers: [InstagramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
