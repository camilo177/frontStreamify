import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject } from '@angular/core/testing';
import { User } from './user';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
