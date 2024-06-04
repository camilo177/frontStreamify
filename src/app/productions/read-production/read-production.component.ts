import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Production } from '../productions';
import { ProductionsService } from '../productions.service';

@Component({
  selector: 'app-read-production',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-production.component.html',
  styleUrls: ['./read-production.component.css']
})
export class ReadProductionComponent implements OnInit {
  productions: Production[] = [];
  private mediaUrl = 'http://127.0.0.1:8000/myApp/media/';  // Base URL for media files

  constructor(private router: Router, private productionService: ProductionsService) {}

  ngOnInit() {
    this.obtenerProductions();
  }

  obtenerProductions() {
    this.productionService.obtenerInfo().subscribe(productions => {
      this.productions = productions.map(production => ({
        ...production,
        poster: this.constructImageUrl(production.poster)
      }));
      console.log(this.productions);
    });
  }

  constructImageUrl(poster: string): string {
    // Remove leading slashes if they exist
    if (poster.startsWith('/media/')) {
      poster = poster.replace('/media/', '');
    }
    return `${this.mediaUrl}${poster}`;
  }

  onMirarNavigate() {
    this.router.navigate(['/leer-info']);
  }

  onCreateNavigate() {
    this.router.navigate(['/crear-info']);
  }
}
