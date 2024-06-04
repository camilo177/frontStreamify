import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-create-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Include CommonModule here
  templateUrl: './create-info.component.html',
  styleUrls: ['./create-info.component.css']
})
export class CreateInfoComponent implements OnInit {
  infoForm!: FormGroup;
  fileName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private infoService: InfoService
  ) {}

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      poster: ['', Validators.required],
      genre: ['', [Validators.required, Validators.minLength(3)]],
      duration: ['', Validators.required],
      director: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      cast: ['', [Validators.required, Validators.minLength(3)]],
      release: ['', Validators.required],
      trailer: ['', [Validators.required, Validators.minLength(5)]],
      platform: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.infoForm.patchValue({ poster: file });
    }
  }

  createInfo(): void {
    const formData = new FormData();
    Object.keys(this.infoForm.controls).forEach(key => {
      const controlValue = this.infoForm.get(key)?.value;
      formData.append(key, controlValue);
    });

    this.infoService.createInfo(formData).subscribe(
      (infoCreated) => {
        alert('Info created successfully');
        this.infoForm.reset();
        this.fileName = '';
      },
      (error) => {
        console.error('Error creating info:', error);
        alert('Error creating info');
      }
    );
  }
}
