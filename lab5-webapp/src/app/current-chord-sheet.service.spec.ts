/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentChordSheetService } from './current-chord-sheet.service';

describe('Service: CurrentChordSheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentChordSheetService]
    });
  });

  it('should ...', inject([CurrentChordSheetService], (service: CurrentChordSheetService) => {
    expect(service).toBeTruthy();
  }));
});
