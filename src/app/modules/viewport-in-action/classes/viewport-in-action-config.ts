export class ViewportInActionConfig {
	/** Distance from bottom edge to viewport when need setup classes */
	distance?: number;

	/** Debug in the console */
	debug?: boolean;

	/** Function which will be run when classes setups */
	customFn?(): any;
}
