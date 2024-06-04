import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateInfoComponent } from './create-info.component';
import { InfoService } from '../info.service';
import { of } from 'rxjs';

describe('CreateInfoComponent', () => {
  let component: CreateInfoComponent;
  let fixture: ComponentFixture<CreateInfoComponent>;
  let infoService: InfoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [CreateInfoComponent],
      providers: [InfoService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInfoComponent);
    component = fixture.componentInstance;
    infoService = TestBed.inject(InfoService);

    spyOn(infoService, 'createInfo').and.returnValue(of({} as any));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.infoForm).toBeDefined();
    expect(component.infoForm.controls['title']).toBeDefined();
    expect(component.infoForm.controls['description']).toBeDefined();
    //Only those forms of control (Don´t know how to do it with image)
  });

  it('should display required validation errors', () => {
    const titleControl = component.infoForm.controls['title'];
    titleControl.setValue('');
    titleControl.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.alert-danger')?.textContent).toContain('Campo requerido');
  });

  it('should call createInfo method on form submission', () => {
    component.infoForm.controls['title'].setValue('Test Title');
    component.infoForm.controls['description'].setValue('Test Description');
    // Set other form controls as needed

    component.createInfo();
    expect(infoService.createInfo).toHaveBeenCalled();
  });
});
