/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserCurrentChordSheetService } from './user-current-chord-sheet.service';

describe('Service: UserCurrentChordSheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCurrentChordSheetService]
    });
  });

  it('should ...', inject([UserCurrentChordSheetService], (service: UserCurrentChordSheetService) => {
    expect(service).toBeTruthy();
  }));
});
