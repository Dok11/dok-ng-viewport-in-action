import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DokNgViewportInActionModule} from './modules/viewport-in-action/dok-ng-viewport-in-action.module';

// AoT requires an exported function for factories
export function ViewportInActionCustomFn() {
	console.log('>>> custom function for entry element into viewport');
}


@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		DokNgViewportInActionModule.forRoot({
			distance: 100,
			debug: true,
			customFn: ViewportInActionCustomFn,
		}),
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
