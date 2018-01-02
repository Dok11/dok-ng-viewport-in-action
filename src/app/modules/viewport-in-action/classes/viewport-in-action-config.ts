export class ViewportInActionConfig {
	/** Distance from bottom edge to viewport when need setup classes */
	distance?: number;

	/** Debug in the console */
	viewportInActionDebug?: boolean;

	/** Function which will be run when classes setups */
	viewportInActionFn?(): any;
}
