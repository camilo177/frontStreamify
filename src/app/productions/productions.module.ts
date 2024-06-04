import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadProductionComponent } from './read-production/read-production.component';
import { RouterModule } from '@angular/router';  // Ensure RouterModule is imported if you are using router functionalities

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule  // Import RouterModule if needed
  ]
})
export class ProductionsModule { }
