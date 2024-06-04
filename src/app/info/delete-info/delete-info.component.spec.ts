import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from '../info.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delete-info',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './delete-info.component.html',
  styleUrls: ['./delete-info.component.css']
})
export class DeleteInfoComponent implements OnInit {
  infoId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InfoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.infoId = params['id'];
      this.deleteInfo(this.infoId);
    });
  }

  deleteInfo(id: number) {
    if (confirm('Are you sure you want to delete this production?')) {
      this.infoService.deleteInfo(id).subscribe(() => {
        alert('Production deleted successfully');
        this.router.navigate(['/']); // Navigate back to the list or another view
      }, error => {
        console.error('Error deleting production:', error);
        alert('Error deleting production');
      });
    } else {
      this.router.navigate(['/']); // Navigate back if deletion is cancelled
    }
  }
}
