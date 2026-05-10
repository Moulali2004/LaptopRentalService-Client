import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  trustBadges = [
    'No long-term commitment',
    'Same-day delivery available',
    'Fully refundable deposit',
  ];

  heroStats = [
    { value: '500', suffix: '+',    label: 'Laptops available' },
    { value: '₹99', suffix: '/day', label: 'Starting from'     },
    { value: '4',   suffix: 'hrs',  label: 'Express delivery'  },
  ];

 categories = [
    {
      slug:          'student',
      name:          'Student',
      desc:          'Lightweight, affordable laptops for exams, projects and internships.',
      startingPrice: '₹99/day',
      color:         '#2563EB',
      bg:            '#EFF6FF',
      iconPath:      'M24 4L4 16l20 12 20-12L24 4zM4 28l20 12 20-12M4 22l20 12 20-12',
    },
    {
      slug:          'business',
      name:          'Business',
      desc:          'Professional machines for corporate onboarding, events and travel.',
      startingPrice: '₹149/day',
      color:         '#16A34A',
      bg:            '#F0FDF4',
      iconPath:      'M8 16h32v22a2 2 0 01-2 2H10a2 2 0 01-2-2V16zM16 16v-4a4 4 0 014-4h8a4 4 0 014 4v4M4 16h40',
    },
    {
      slug:          'gamers/creators',
      name:          'Gamers / Creators',
      desc:          'High-end GPUs and fast refresh displays for gaming and video editing.',
      startingPrice: '₹299/day',
      color:         '#7C3AED',
      bg:            '#F5F3FF',
      iconPath:      'M6 18h36a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V20a2 2 0 012-2zM16 26v-4M14 24h4M30 25h.01M34 25h.01',
    },
    {
      slug:          'freelancers/developers',
      name:          'Freelancers / Devs',
      desc:          'Power-packed machines for coding, design and demanding workflows.',
      startingPrice: '₹199/day',
      color:         '#D97706',
      bg:            '#FFFBEB',
      iconPath:      'M14 18l-6 6 6 6M34 18l6 6-6 6M26 12l-4 24',
    },
  ];
  howSteps = [
    {
      number:   '01',
      title:    'Browse & choose',
      desc:     'Filter by specs, category, price or duration. Pick exactly what your project demands.',
      iconPath: 'M4 10h40v28a2 2 0 01-2 2H6a2 2 0 01-2-2V10zM4 10l6-6h28l6 6M16 24h16M16 30h10',
    },
    {
      number:   '02',
      title:    'Book & pay',
      desc:     'Choose your rental dates, add optional accessories and pay securely via UPI, card or net banking.',
      iconPath: 'M8 8h32a2 2 0 012 2v28a2 2 0 01-2 2H8a2 2 0 01-2-2V10a2 2 0 012-2zM6 18h36M16 28h6M16 34h4M28 28l4 6 8-10',
    },
    {
      number:   '03',
      title:    'Get it delivered',
      desc:     'We deliver to your door — standard next-day or express same-day. Return when your rental ends.',
      iconPath: 'M4 20h28v18a2 2 0 01-2 2H6a2 2 0 01-2-2V20zM32 28h8l4 6v6h-12V28zM10 20v-6a6 6 0 0112 0v6M16 32v4',
    },
  ];
}
