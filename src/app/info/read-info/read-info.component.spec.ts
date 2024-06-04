import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadInfoComponent } from './read-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfoService } from '../info.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Info } from '../info';
import { Router } from '@angular/router';

describe('ReadInfoComponent', () => {
  let component: ReadInfoComponent;
  let fixture: ComponentFixture<ReadInfoComponent>;
  let infoService: InfoService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ReadInfoComponent],
      providers: [InfoService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadInfoComponent);
    component = fixture.componentInstance;
    infoService = TestBed.inject(InfoService);
    router = TestBed.inject(Router);

    // Mock the obtenerInfo method to avoid actual HTTP requests
    spyOn(infoService, 'obtenerInfo').and.returnValue(of([
      { id: 1, title: 'Movie 1', description: 'Description 1', poster: null, genre: 'Genre 1', duration: '2h', director: 'Director 1', country: 'Country 1', cast: 'Cast 1', release: '2001-02-20', trailer: 'http://trailer1.com', platform: 'Platform 1' },
      { id: 2, title: 'Movie 2', description: 'Description 2', poster: null, genre: 'Genre 2', duration: '2h', director: 'Director 2', country: 'Country 2', cast: 'Cast 2', release: '2001-02-20', trailer: 'http://trailer2.com', platform: 'Platform 2' }
    ] as Info[]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of movies', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(2);
  });

  it('should call onEditarNavigate when Editar button is clicked', () => {
    spyOn(component, 'onEditarNavigate');
    const button = fixture.nativeElement.querySelector('.btn-primary');
    button.click();
    expect(component.onEditarNavigate).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 1,
      title: 'Movie 1'
    }));
  });

  it('should call onEliminarNavigate when Eliminar button is clicked', () => {
    spyOn(component, 'onEliminarNavigate');
    const button = fixture.nativeElement.querySelector('.btn-danger');
    button.click();
    expect(component.onEliminarNavigate).toHaveBeenCalledWith(1);
  });

  it('should navigate to updateInfo with state', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const item = { id: 1, title: 'Movie 1', description: 'Description 1', poster: null, genre: 'Genre 1', duration: '2h', director: 'Director 1', country: 'Country 1', cast: 'Cast 1', release: '2001-02-20', trailer: 'http://trailer1.com', platform: 'Platform 1' };
    component.onEditarNavigate(item);
    expect(navigateSpy).toHaveBeenCalledWith(['/updateInfo'], { state: { info: item } });
  });
});
