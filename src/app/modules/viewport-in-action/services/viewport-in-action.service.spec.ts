import {TestBed, inject} from '@angular/core/testing';

import {ViewportInActionService} from './viewport-in-action.service';

describe('ViewportInActionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ViewportInActionService]
        });
    });

    it('should be created', inject([ViewportInActionService], (service: ViewportInActionService) => {
        expect(service).toBeTruthy();
    }));
});
