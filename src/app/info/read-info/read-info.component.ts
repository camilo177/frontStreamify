import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, CommonModule } from '@angular/common';
import { InfoService } from '../info.service';







@Component({
  selector: 'app-read-info',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './read-info.component.html',
  styleUrls: ['./read-info.component.css']
})
export class ReadInfoComponent implements OnInit {
  info: Array<Info> = [];

  constructor(private router: Router, private infoService: InfoService) {}

  ngOnInit() {
    this.obtenerInfo();
  }

  obtenerInfo() {
    this.infoService.obtenerInfo().subscribe(vs => {
      this.info = vs;
      console.log(this.info);
    });
  }

  onEditarNavigate(id: number) {
    this.router.navigate(['/actualizar-info', id]);
  }

  onEliminarNavigate(id: number) {
    if (confirm('Are you sure you want to delete this production?')) {
      this.infoService.deleteInfo(id).subscribe(() => {
        alert('Production deleted successfully');
        this.obtenerInfo(); // Refresh the list
      }, error => {
        console.error('Error deleting production:', error);
        alert('Error deleting production');
      });
    }
  }
}
