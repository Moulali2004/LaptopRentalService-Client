import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Laptop } from '../../core/services/laptop';
import { ActiveLaptop } from '../../models/laptop.models';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Laptopcard } from '../../shared/components/laptopcard/laptopcard';
import { ActivatedRoute } from '@angular/router';
import { LaptopResponse } from '../../models/laptop.models';

@Component({
  selector: 'app-laptopbrowsing',
  standalone: true,
  imports: [CommonModule, RouterModule, CheckboxModule, Laptopcard, FormsModule],
  templateUrl: './laptopbrowsing.html',
  styleUrls: ['./laptopbrowsing.scss',]
})
export class Laptopbrowsing implements OnInit {

  activeLaptops: any[] = [];
  filteredLaptops: ActiveLaptop[] = [];

  constructor(
    private laptopService: Laptop,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  isLoading = true;
 
  // ── Filter state ──────────────────────────────────────
  selectedCategory = '';
  selectedRam      = '';
  selectedOs       = '';
  availableOnly    = false;
  sortBy           = 'price_asc';
  priceRange       = [0, 1000];
  maxPrice         = 1000;
  minPrice         = 0;
  searchedBrand    = '';
 
  // ── Filter options ────────────────────────────────────
  categoryOptions = [
    { slug: 'student',                name: 'Student',           color: '#2563EB' },
    { slug: 'business',               name: 'Business',          color: '#16A34A' },
    { slug: 'gamers/creators',        name: 'Gamers / Creators', color: '#7C3AED' },
    { slug: 'freelancers/developers', name: 'Freelancers / Devs',color: '#D97706' },
  ];
 
  ramOptions = ['4GB', '8GB', '16GB', '32GB', '64GB'];
 
  osOptions = ['Windows 11', 'Windows 10', 'macOS', 'Ubuntu', 'Chrome OS'];
 
  mobileFilterOpen = false;
 
  // ── Computed ──────────────────────────────────────────
  get activeFilterCount(): number {
    let count = 0;
    if (this.selectedCategory)       count++;
    if (this.selectedRam)            count++;
    if (this.selectedOs)             count++;
    if (this.availableOnly)          count++;
    if (this.priceRange[1] < this.maxPrice) count++;
    if(this.searchedBrand)           count++;
    return count;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get('category') || '';
      this.searchedBrand    = params.get('search') || '';

      if(this.selectedCategory || this.searchedBrand) {
        this.applyFilters();
      }
    })
    this.loadLaptops();
  }

  loadLaptops(): void {
    this.isLoading = true;

    this.laptopService.getActiveLaptops().subscribe({
      next: (res: LaptopResponse) => {
        this.activeLaptops = [...res.activeLaptops];
        this.maxPrice = Math.max(...this.activeLaptops.map(l => l.pricePerDay));
        this.minPrice = Math.min(...this.activeLaptops.map(l => l.pricePerDay));

        this.priceRange = [this.minPrice, this.maxPrice];
        this.applyFilters();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    let result = [...this.activeLaptops];
 
    if (this.selectedCategory) {
      result = result.filter(l => l.category === this.selectedCategory);
    }
 
    if (this.selectedRam) {
      result = result.filter(l => l.specs.ram === this.selectedRam);
    }
 
    if (this.selectedOs) {
      result = result.filter(l => l.operatingSystem === this.selectedOs);
    }
 
    if (this.availableOnly) {
      result = result.filter(l => l.availableUnits > 0);
    }

    if(this.searchedBrand) {
      result = result.filter(l => l.brand.toLowerCase().includes(this.searchedBrand.toLowerCase()));
    }
 
    result = result.filter(l => l.pricePerDay <= this.priceRange[1]);
 
    // Sort
    switch (this.sortBy) {
      case 'price_asc':  result.sort((a, b) => a.pricePerDay - b.pricePerDay);   break;
      case 'price_desc': result.sort((a, b) => b.pricePerDay - a.pricePerDay);   break;
      case 'rating':     result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
      case 'newest':     break; // keep original order from API
    }
 
    this.filteredLaptops = result;
  }

  clearAllFilters(): void {
    this.searchedBrand    = '';
    this.selectedCategory = '';
    this.selectedRam      = '';
    this.selectedOs       = '';
    this.availableOnly    = false;
    this.priceRange       = [this.minPrice, this.maxPrice];
    this.applyFilters();
  }
}
