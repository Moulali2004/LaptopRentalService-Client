import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

  currentYear   = new Date().getFullYear();
  newsletterEmail = '';
  subscribed    = false;

  socials = [
    {
      label:    'Twitter / X',
      href:     'https://twitter.com/laptoprentpro',
      iconPath: 'M11.026 8.994L17.5 2h-1.546l-5.633 6.353L5.75 2H1l6.793 9.638L1 18.5h1.546l5.941-6.703 4.763 6.703H18l-6.974-9.506zM9.19 10.93l-.69-.956L3.08 3.11h2.365l4.424 6.146.688.957 5.754 7.992H13.94L9.19 10.93z',
    },
    {
      label:    'LinkedIn',
      href:     'https://linkedin.com/company/laptoprentpro',
      iconPath: 'M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z',
    },
    {
      label:    'Instagram',
      href:     'https://instagram.com/laptoprentpro',
      iconPath: 'M10 2.163c2.61 0 2.922.01 3.95.057 2.675.122 3.923 1.387 4.045 4.045.047 1.028.057 1.34.057 3.95 0 2.61-.01 2.922-.057 3.95-.122 2.657-1.368 3.923-4.045 4.045-1.028.047-1.337.057-3.95.057-2.61 0-2.922-.01-3.95-.057-2.68-.122-3.923-1.39-4.045-4.045C2.01 12.922 2 12.61 2 10c0-2.61.01-2.922.057-3.95.122-2.66 1.368-3.923 4.045-4.045C7.078 2.173 7.39 2.163 10 2.163zm0-2.163c-2.656 0-2.99.011-4.032.059C2.498.27.271 2.495.059 5.968.01 7.01 0 7.344 0 10c0 2.656.011 2.99.059 4.032.213 3.471 2.437 5.698 5.909 5.91C7.01 19.99 7.344 20 10 20c2.656 0 2.99-.011 4.032-.059 3.47-.212 5.698-2.437 5.91-5.909C19.99 12.99 20 12.656 20 10c0-2.656-.011-2.99-.059-4.032-.21-3.468-2.437-5.698-5.909-5.91C12.99.011 12.656 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z',
    },
  ];

  exploreLinks = [
    { label: 'Browse Laptops',   path: '/laptops'         },
    { label: 'How It Works',     path: '/how-it-works'    },
    { label: 'Pricing',          path: '/pricing'         },
    { label: 'My Rentals',       path: '/dashboard'       },
    { label: 'Track Order',      path: '/dashboard'       },
  ];
 
  categoryLinks = [
    { label: 'Student Laptops',         slug: 'student'                },
    { label: 'Business Laptops',        slug: 'business'               },
    { label: 'Gaming & Creator',        slug: 'gamers/creators'        },
    { label: 'Dev & Freelancer',        slug: 'freelancers/developers' },
  ];
 
  companyLinks = [
    { label: 'About Us',       path: '/about'   },
    { label: 'Careers',        path: '/careers' },
    { label: 'Blog',           path: '/blog'    },
    { label: 'Contact',        path: '/contact' },
    { label: 'Partner With Us',path: '/partner' },
  ];
 
  paymentBadges = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking'];
 
  // ── Newsletter ────────────────────────────────────────
  subscribeNewsletter(): void {
    if (!this.newsletterEmail.trim()) return;
    // Wire up to your email service here
    console.log('Newsletter subscription:', this.newsletterEmail);
    this.subscribed = true;
    this.newsletterEmail = '';
    setTimeout(() => { this.subscribed = false; }, 4000);
  }
}
