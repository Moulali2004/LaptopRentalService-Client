import { Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { Laptop } from '../../core/services/laptop';
import { ActiveLaptop, LaptopDetailsResponse } from '../../models/laptop.models';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule }         from '@angular/forms';
// import { SlugifyPipe }         from '../../shared/pipes/slugify.pipe'; // adjust path
import { CommonModule }        from '@angular/common';

interface AddOn {
  id:          string;
  name:        string;
  desc:        string;
  pricePerDay: number;
  iconPath:    string;
}
 
interface Review {
  id:      string;
  name:    string;
  date:    string;
  rating:  number;
  comment: string;
}


@Component({
  selector: 'app-laptop-detail',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './laptop-detail.html',
  styleUrl: './laptop-detail.scss',
})
export class LaptopDetail implements OnInit {

  laptopId?: string;
  laptop?: ActiveLaptop;
  activeImage  = '';
  wishlisted   = false;

  durationOptions = [
    { label: '1 Day',   value: 1   },
    { label: '3 Days',  value: 3   },
    { label: '1 Week',  value: 7   },
    { label: '2 Weeks', value: 14  },
    { label: '1 Month', value: 30  },
  ];
  selectedDuration = 3;
  rentalDays       = 3;

  addons: AddOn[] = [
    {
      id: 'bag', name: 'Laptop Bag',
      desc: 'Protective carry bag included',
      pricePerDay: 50,
      iconPath: 'M6 2h8l2 4H4L6 2zM4 6h12v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z',
    },
    {
      id: 'mouse', name: 'Wireless Mouse',
      desc: 'Ergonomic wireless mouse',
      pricePerDay: 20,
      iconPath: 'M12 3a6 6 0 016 6v4a6 6 0 01-12 0V9a6 6 0 016-6zM12 3v6M6 9h12',
    },
    {
      id: 'insurance', name: 'Damage Insurance',
      desc: 'Covers accidental damage up to ₹10,000',
      pricePerDay: 100,
      iconPath: 'M12 2l7 4v6c0 5-3.5 9.7-7 11-3.5-1.3-7-6-7-11V6l7-4z',
    },
    {
      id: 'support', name: 'Priority Support',
      desc: 'Dedicated helpline during rental',
      pricePerDay: 150,
      iconPath: 'M3 5a2 2 0 012-2h2.5a1 1 0 011 .75l.75 3a1 1 0 01-.26.97l-1.1 1.1a11 11 0 004.29 4.29l1.1-1.1a1 1 0 01.97-.26l3 .75A1 1 0 0118 14.5V17a2 2 0 01-2 2h-1C7.16 19 3 14.84 3 8V5z',
    },
  ];
  selectedAddons = new Set<string>();

  // ── Delivery ──────────────────────────────────────────
  deliveryType: 'standard' | 'express' = 'standard';
 
  // ── Totals ────────────────────────────────────────────
  baseTotal   = 0;
  addonsTotal = 0;
  grandTotal  = 0;
 
  // ── Reviews ───────────────────────────────────────────
  reviews: Review[] = [
    { id: '1', name: 'Arjun Mehta',    date: 'May 2025',   rating: 5, comment: 'Absolutely seamless experience. The laptop arrived on time, was in perfect condition, and the return process was hassle-free. Will rent again!' },
    { id: '2', name: 'Priya Sharma',   date: 'April 2025', rating: 4, comment: 'Great machine for my internship project. Battery life was excellent. Minor issue with delivery timing but support sorted it quickly.' },
    { id: '3', name: 'Rohan Kulkarni', date: 'March 2025', rating: 5, comment: 'Used it for a gaming tournament. RTX performance was flawless. Damage insurance gave me peace of mind throughout.' },
  ];
 
  get ratingBars() {
    return [5,4,3,2,1].map(stars => {
      const count = this.reviews.filter(r => r.rating === stars).length;
      return { stars, count, percent: this.reviews.length ? (count / this.reviews.length) * 100 : 0 };
    });
  }
 
  // ── Trust points ──────────────────────────────────────
  trustPoints = [
    { text: 'Free cancellation before approval',  iconPath: 'M7 1a6 6 0 100 12A6 6 0 007 1zm3.536 4.136a.75.75 0 00-1.072-1.05L6.08 8.099 4.47 6.49a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.08-.025l3.796-3.639z' },
    { text: 'Fully refundable security deposit',  iconPath: 'M7 1a6 6 0 100 12A6 6 0 007 1zm3.536 4.136a.75.75 0 00-1.072-1.05L6.08 8.099 4.47 6.49a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.08-.025l3.796-3.639z' },
    { text: 'Secured payments via Razorpay',      iconPath: 'M7 1a6 6 0 100 12A6 6 0 007 1zm3.536 4.136a.75.75 0 00-1.072-1.05L6.08 8.099 4.47 6.49a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.08-.025l3.796-3.639z' },
  ];

  constructor(
    private laptopService: Laptop, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.laptopId = params['id'];
      if(this.laptopId) {
        this.loadLaptop();
      }
    });
  }

  loadLaptop() {
    console.log('Loading laptop details for ID:', this.laptopId);
    this.laptopService.getLaptopById(this.laptopId!).subscribe({
      next: (res: LaptopDetailsResponse) => {
        this.laptop = res.laptop;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching laptop details:', err);
      }
    })
  }

// ── Spec rows built from laptop object ────────────────
  get specRows() {
    if (!this.laptop) return [];
    return [
      { label: 'Brand',            value: this.laptop.brand              },
      { label: 'Processor',        value: this.laptop.specs.processor    },
      { label: 'CPU Model',        value: this.laptop.specs.cpuModel     },
      { label: 'RAM',              value: this.laptop.specs.ram          },
      { label: 'Storage',          value: this.laptop.specs.storage      },
      { label: 'Screen Size',      value: this.laptop.specs.screenSize   },
      { label: 'Operating System', value: this.laptop.operatingSystem    },
      { label: 'Condition',        value: this.getCondition(this.laptop.yearsOfUse) + ' (' + this.laptop.yearsOfUse + ' yr use)' },
      { label: 'Available Units',  value: String(this.laptop.availableUnits) + ' / ' + this.laptop.totalUnits },
    ];
  }
 
  setDuration(days: number): void {
    this.selectedDuration = days;
    this.rentalDays = days;
    this.calcTotal();
  }
 
  toggleAddon(id: string): void {
    this.selectedAddons.has(id)
      ? this.selectedAddons.delete(id)
      : this.selectedAddons.add(id);
    this.calcTotal();
  }
 
  getSelectedAddons(): AddOn[] {
    return this.addons.filter(a => this.selectedAddons.has(a.id));
  }
 
  calcTotal(): void {
    if (!this.laptop) return;
    this.baseTotal   = this.laptop.pricePerDay * this.rentalDays;
    this.addonsTotal = this.getSelectedAddons()
      .reduce((sum, a) => sum + a.pricePerDay * this.rentalDays, 0);
    const delivery   = this.deliveryType === 'express' ? 250 : 100;
    this.grandTotal  = this.baseTotal + this.addonsTotal + delivery + this.laptop.securityDeposit;
  }
 
  toggleWishlist(): void { this.wishlisted = !this.wishlisted; }
 
  proceedToBooking(): void {
    if (!this.laptop) return;
    this.router.navigate(['/booking'], {
      queryParams: {
        laptopId:  this.laptop._id,
        days:      this.rentalDays,
        delivery:  this.deliveryType,
        addons:    Array.from(this.selectedAddons).join(','),
      }
    });
  }
 
  getCondition(years: number): string {
    if (years <= 1) return 'New';
    if (years <= 3) return 'Good';
    return 'Fair';
  }

}
