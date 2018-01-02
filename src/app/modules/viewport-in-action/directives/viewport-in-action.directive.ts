import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ViewportInActionService} from "../services/viewport-in-action.service";
import 'rxjs/add/operator/filter';


@Directive({
	selector: '[dokNgViewportInAction]',
})
export class ViewportInActionDirective implements OnInit {
	/** Class names which will be setup for element when it will in the viewport */
	@Input() private classes: string;

	/** Timeout for initialization */
	@Input() private initTimeout: number;

	/** Timeout for class setup */
	@Input() private strictTimeout: number;

	/** Array of images with attribute [data-src] which loading must be first */
	@Input() private imgToLoad: HTMLImageElement[];

	/** Distance from bottom edge to viewport when need setup classes */
	@Input() private distance: number;

	/** Debug in the console */
	@Input() private viewportInActionDebug: boolean;

	/** Function which will be run when classes setups */
	@Input() private viewportInActionFn: any;

	private hasImgLoadFunctions: boolean;
	private isEnable: boolean;
	private isInViewport: boolean;
	private isViewportInActionFnExecuted: boolean;
	private window: Window;


	constructor(
		private el: ElementRef,
		private viewportInActionService: ViewportInActionService,
	) {
		this.applyServiceConfig();

		this.classes     = '';
		this.initTimeout = 0;
		this.imgToLoad   = [];

		this.hasImgLoadFunctions = false;
		this.isEnable            = true;
		this.isInViewport        = false;
		this.window              = window;
	}


	public ngOnInit(): void {
		setTimeout(() => this.setClasses(), this.initTimeout);

		this.debug('ngOnInit. Start for ', this.el.nativeElement, this);

		this.viewportInActionService
			.getDispatchEvent()
			.filter(result => !!result)
			.subscribe(() => this.setClasses());

		this.viewportInActionService
			.getEnableStatus()
			.subscribe(status => this.isEnable = status);
	}


	private applyServiceConfig(): void {
		if (!this.viewportInActionService.config) { return; }

		const config = this.viewportInActionService.config;

		this.distance              = config.distance || 0;
		this.viewportInActionDebug = config.viewportInActionDebug || false;
		this.viewportInActionFn    = config.viewportInActionFn || null;
	}


	/**
	 * By scroll or resize window will start classes checking
	 */
	@HostListener('window:scroll')
	private onScroll(): void {
		this.setClasses();
	}

	@HostListener('window:resize')
	private onResize(): void {
		this.setClasses();
	}


	public setClasses(): void {
		this.debug('setClasses run');

		if (this.imgToLoad.length) {
			this.debug('setClasses. Img should be loaded');

			// If need waiting loading some images from `this.imgToLoad`
			this.loadImages();

		} else {
			/** Timeout for classes setup */
			const timeout = this.strictTimeout || 0;

			this.debug('setClasses. Class calculate run with timeout ' + timeout);

			setTimeout(() => {
				if (!this.isEnable) {
					return;
				}

				const isInViewport = this.viewportInActionService
					.checkIsInViewport(this.el.nativeElement, this.distance);

				if (isInViewport) {
					this.setClassesOn();
				} else {
					this.setClassesOff();
				}
			}, timeout);
		}
	}


	/**
	 * Method sets classes for element
	 */
	private setClassesOn(): void {
		this.isInViewport = true;

		if (this.classes) {
			this.el.nativeElement.classList.add(this.classes);
		}

		if (this.viewportInActionFn && !this.isViewportInActionFnExecuted) {
			this.viewportInActionFn();
			this.isViewportInActionFnExecuted = true;
		}
	}


	/**
	 * Method removes classes for element. Without viewport checking
	 */
	private setClassesOff(): void {
		this.isInViewport = false;

		if (this.classes) {
			this.el.nativeElement.classList.remove(this.classes);
		}

		if (this.viewportInActionFn && this.isViewportInActionFnExecuted) {
			this.isViewportInActionFnExecuted = false;
		}
	}


	/**
	 * Method setups function for loading images, which will setup setClasses
	 */
	private loadImages(): void {
		if (this.imgToLoad.length && !this.hasImgLoadFunctions) {

			this.imgToLoad.forEach((img, index) => {
				if (img.height) {
					// If image already loaded
					this.imgToLoad.splice(index, 1);
					this.setClasses();

				} else {
					img.onload = () => {
						// When image will be loaded:
						this.imgToLoad.splice(index, 1);
						this.setClasses();
					};
				}
			});

			// Prevent multiple setup of `onload` function
			this.hasImgLoadFunctions = true;
		}
	}


	private debug(text, ...args): void {
		if (this.viewportInActionDebug) {
			console.warn('ViewportInActionDirective debug:', text, ...args);
		}
	}

}
