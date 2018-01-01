import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DokNgViewportInActionModule} from "./modules/viewport-in-action/dok-ng-viewport-in-action.module";
import {ViewportInActionService} from "./modules/viewport-in-action/services/viewport-in-action.service";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        DokNgViewportInActionModule,
    ],
    providers: [ViewportInActionService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
