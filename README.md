# Angular module for working with viewport

## Demo

See here: https://stackblitz.com/github/Dok11/dok-ng-viewport-in-action

## Installation

Load module and save in the package.json  
`npm i dok-ng-viewport-in-action`

Import module into module of your app like this:
```ts
@NgModule({
    imports: [DokNgViewportInActionModule.forRoot()],
})
```

And use in the template of component:
```html
<div dokNgViewportInAction classes="slide-in_on"></div>
```

## Contain of module

### Attributive directive `dokNgViewportInAction`

Purpose: use for set any css classes for html-element or run any function by entering element into viewport.  
Possible options:
- `classes` - Class names which will be setup for element when it will in the viewport;
- `initTimeout` - Timeout for initialization;
- `strictTimeout` - Timeout for class setup;
- `imgToLoad` - Array of images with attribute `[data-src]` which loading must be first;
- `distance` - Distance from bottom edge to viewport when need setup classes;
- `viewportInActionDebug` - Debug in the console;
- `viewportInActionFn` - Function which will be run when classes setups.

### Useful service ViewportInActionService

Public methods:
- `getDispatchEvent()` - Returns observable with force recalculate events;
- `getEnableStatus()` - Returns state of service enable or disable (true/false);
- `setEnableStatus()` - Method for service enable or disable;
- `forceDispatch()` - Runs check setup classes;
- `resetAnimationInContainer()` - Rerun animations into html-container;
- `checkIsInViewport()` - Method detect when element in the viewport.

## More examples

### Usage module configuration

You can use default options for directive by `forRoot` like this:
```ts
// AoT requires an exported function for factories
export function ViewportInActionCustomFn() {
	console.log('>>> custom function for entry element into viewport');
}

@NgModule({
    imports: [
        BrowserModule,
        DokNgViewportInActionModule.forRoot({
            distance: 100,
            debug: true,
            customFn: ViewportInActionCustomFn,
        }),
    ],
})
```

Any argument of options are not required but in example you can see all of these.
