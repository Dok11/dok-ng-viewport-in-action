import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewportInActionDirective} from './directives/viewport-in-action.directive';

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
    providers: [
    ]
})
export class DokNgViewportInActionModule {
}
