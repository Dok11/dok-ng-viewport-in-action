import {ModuleWithProviders, NgModule} from '@angular/core';
import {ViewportInActionDirective} from './directives/viewport-in-action.directive';
import {ViewportInActionService} from './services/viewport-in-action.service';
import {ViewportInActionConfig} from './classes/viewport-in-action-config';


@NgModule({
    declarations: [
        ViewportInActionDirective,
    ],
    exports: [
        ViewportInActionDirective,
    ],
	providers: [
		ViewportInActionService,
	]
})
export class DokNgViewportInActionModule {
	public static forRoot(config: ViewportInActionConfig): ModuleWithProviders {
		return {
			ngModule: DokNgViewportInActionModule,
			providers: [
				{ provide: ViewportInActionConfig, useValue: config },
				ViewportInActionService
			],
		};
	}
}
