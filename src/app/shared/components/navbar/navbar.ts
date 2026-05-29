import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { AuthRoutingModule } from "../../../features/auth/auth-routing-module";
import { Auth } from '../../../core/services/auth';
import { User } from '../../../models/auth.models';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    AuthRoutingModule, 
    FormsModule,
    ButtonModule,
    BadgeModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  user?: User | null;
  private sub?: Subscription;

  isScrolled: boolean = false;
  searchQuery: string = '';
  mobileSearchOpen: boolean = false;
  userMenuOpen: boolean = false;

  constructor(
    public authService: Auth, 
    private router: Router,
    private elRef: ElementRef) {}

  ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  logoutUser() {
    this.authService.logout();
  }


    // ── Scroll listener — adds shadow to navbar on scroll ──
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 8;
  }

  // ── Close user dropdown when clicking outside ──────────
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.userMenuOpen    = false;
      this.mobileSearchOpen = false;
    }
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) return;
    this.router.navigate(['/browse'], { queryParams: { search: this.searchQuery.trim() } });
    this.mobileSearchOpen = false;
  }
  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }
 
  toggleMobileSearch(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
  }
}
