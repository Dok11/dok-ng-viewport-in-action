import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class ViewportInActionService {
    private dispatch$     = new Subject<boolean>();
    private enableStatus$ = new BehaviorSubject<boolean>(true);
    private window:       Window;


    constructor() {
        this.window = window;
    }


    /**
     * @return Observable with force recalculate events
     */
    public getDispatchEvent(): Observable<boolean> {
        return this.dispatch$.asObservable();
    }


    /**
     * @return State of service enable or disable
     */
    public getEnableStatus(): Observable<boolean> {
        return this.enableStatus$.asObservable();
    }


    /**
     * Method for service enable or disable
     */
    public setEnableStatus(status: boolean): void {
        this.enableStatus$.next(status);
    }


    /**
     * Runs recalculate
     */
    public forceDispatch(): void {
        this.dispatch$.next(true);
    }


    /**
     * Rerun animations into html-container
     *
     * @param {HTMLElement} container - HTML-element with element wich need rerun animate
     * @param {string} className - Class name for selector
     * @param {number} timeout  - Timeout for start new animation
     */
    public resetAnimationInContainer(
        container: HTMLElement,
        className: string,
        timeout: number = 300,
    ): void {
        this.setEnableStatus(false);

        const slideItems = container.querySelectorAll('.' + className);

        for (let i = 0; i < slideItems.length; i++) {
            slideItems[i].classList.remove(className);
        }

        setTimeout(() => {
            this.setEnableStatus(true);
            this.forceDispatch();
        }, timeout);
    }


    /**
     * Method detect when element into viewport
     *
     * @param {HTMLElement} element - Link to HTML-element
     * @param {number} padding - Padding for detection delay
     * @param {boolean} checkBottomEdge - Check bottom edge of element
     * @return {boolean} Is element in the viewport
     */
    public checkIsInViewport(
        element: HTMLElement,
        padding: number = 0,
        checkBottomEdge: boolean = false,
    ): boolean {
        /** Distance from viewport top to top edge of element */
        const top: number = element.getBoundingClientRect().top;

        /** Distance from viewport top to bottom edge of element */
        const bottom: number = top + element.getBoundingClientRect().height;

        /** Element height */
        const elementHeight: number = element.clientHeight;

        /** Is element exists */
        const elementExists = elementHeight > 0;

        /** Is element higher than bottom edge of viewport */
        const elementUpFromViewportBottom = top < this.window.innerHeight + padding;

        /** Is element highter than top edge of viewport */
        const elementUpFromViewportTop = bottom < 0;

        /** If need check bottom edge than check or return false (simulate) */
        const checkedWithBottom = (checkBottomEdge) ? elementUpFromViewportTop : false;

        return (elementExists && elementUpFromViewportBottom && !checkedWithBottom);
    }

}
