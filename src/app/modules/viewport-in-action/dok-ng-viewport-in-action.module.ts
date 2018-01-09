import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewportInActionDirective} from './directives/viewport-in-action.directive';
import {ViewportInActionService} from './services/viewport-in-action.service';
import {ViewportInActionConfig} from './classes/viewport-in-action-config';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ViewportInActionDirective,
    ],
    exports: [
        ViewportInActionDirective,
    ],
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
