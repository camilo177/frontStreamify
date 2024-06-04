import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from '../info.service';
import { Info } from '../info';

@Component({
  selector: 'app-update-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  infoForm!: FormGroup;
  fileName: string = '';
  infoId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private infoService: InfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      poster: [null],
      genre: ['', [Validators.required, Validators.minLength(3)]],
      duration: ['', Validators.required],
      director: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      cast: ['', [Validators.required, Validators.minLength(3)]],
      release: ['', Validators.required],
      trailer: ['', [Validators.required, Validators.minLength(5)]],
      platform: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.route.params.subscribe(params => {
      this.infoId = params['id'];
      this.loadInfo(this.infoId);
    });
  }

  loadInfo(id: number) {
    this.infoService.getInfo(id).subscribe((info: Info) => {
      this.infoForm.patchValue({
        title: info.title,
        description: info.description,
        genre: info.genre,
        duration: info.duration,
        director: info.director,
        country: info.country,
        cast: info.cast,
        release: info.release,
        trailer: info.trailer,
        platform: info.platform,
      });
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

  updateInfo(): void {
    const formData = new FormData();
    Object.keys(this.infoForm.controls).forEach(key => {
      const controlValue = this.infoForm.get(key)?.value;
      formData.append(key, controlValue);
    });

    this.infoService.updateInfo(this.infoId, formData).subscribe(
      (infoUpdated) => {
        alert('Info updated successfully');
        this.router.navigate(['/']); // Navigate back to the list or another view
      },
      (error) => {
        console.error('Error updating info:', error);
        alert('Error updating info');
      }
    );
  }
}
