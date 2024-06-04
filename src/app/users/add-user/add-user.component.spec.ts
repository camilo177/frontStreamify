import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUserComponent } from './add-user.component';
import { UserService } from '../user.service';
import { User } from '../user';
import { of, throwError } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [AddUserComponent],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm.get('username')).toBeTruthy();
    expect(component.userForm.get('password')).toBeTruthy();
  });

  it('should create a user successfully', () => {
    const user: User = { username: 'testuser', password: 'testpassword' };
    spyOn(userService, 'crearUsuario').and.returnValue(of(user));
    spyOn(window, 'alert');

    component.userForm.setValue({ username: 'testuser', password: 'testpassword' });
    component.crearUsuario();

    expect(userService.crearUsuario).toHaveBeenCalledWith(user);
    expect(window.alert).toHaveBeenCalledWith('Usuario creado con éxito');
  });

  it('should handle error when creating a user', () => {
    spyOn(userService, 'crearUsuario').and.returnValue(throwError({ status: 500 }));
    spyOn(console, 'error');

    component.userForm.setValue({ username: 'testuser', password: 'testpassword' });
    component.crearUsuario();

    expect(userService.crearUsuario).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error al crear usuario', { status: 500 });
  });
});
