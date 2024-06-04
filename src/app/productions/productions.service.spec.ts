import { TestBed } from '@angular/core/testing';
import { ProductionsService } from './productions.service'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject } from '@angular/core/testing';

describe('ProductionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductionsService]
    });
  });

  it('should be created', inject([ProductionsService], (service: ProductionsService) => {
    expect(service).toBeTruthy();
  }));
});

