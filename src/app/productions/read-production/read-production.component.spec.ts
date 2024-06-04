import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ReadProductionComponent } from './read-production.component';
import { ProductionsService } from '../productions.service';
import { Production } from '../productions';

describe('ReadProductionComponent', () => {
  let component: ReadProductionComponent;
  let fixture: ComponentFixture<ReadProductionComponent>;
  let productionServiceSpy: jasmine.SpyObj<ProductionsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const spyProductionService = jasmine.createSpyObj('ProductionService', ['obtenerProductions']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [ReadProductionComponent],
      providers: [
        { provide: spyProductionService, useValue: spyProductionService },
        { provide: Router, useValue: spyRouter },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadProductionComponent);
    component = fixture.componentInstance;
    productionServiceSpy = TestBed.inject(ProductionService) as jasmine.SpyObj<ProductionService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    productionServiceSpy.obtenerProductions.and.returnValue(of([
      new Production(1, 'Production 1', null ),
      new Production(2, 'Production 2', undefined ),
    ]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerProductions on ngOnInit', () => {
    component.ngOnInit();
    expect(productionServiceSpy.obtenerProductions).toHaveBeenCalled();
  });

  it('should populate productions on obtenerProductions', () => {
    component.obtenerProductions();
    expect(component.productions.length).toBe(2);
  });

  it('should navigate to edit route on onEditarNavigate', () => {
    const id = 1;
    component.onEditarNavigate(id);
    expect(routerSpy.navigate).toHaveBeenCalledWith([`update-info/${id}`]);
  });
});
