import { Component, Input } from '@angular/core';
import { Laptop } from '../../../core/services/laptop';
import { ActiveLaptop } from '../../../models/laptop.models';
import { CarouselModule  } from 'primeng/carousel'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laptopcard',
  standalone: true,
  imports: [CarouselModule, RouterModule, CommonModule],
  templateUrl: './laptopcard.html',
  styleUrls: ['./laptopcard.scss'],
})
export class Laptopcard {
  @Input() laptop!: ActiveLaptop;
  constructor() {}
}
