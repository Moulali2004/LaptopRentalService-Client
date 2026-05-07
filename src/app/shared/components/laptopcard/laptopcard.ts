import { Component } from '@angular/core';
import { Laptop } from '../../../core/services/laptop';
import { ActiveLaptop } from '../../../models/laptop.models';
import { CarouselModule  } from 'primeng/carousel'
import { AuthRoutingModule } from "../../../features/auth/auth-routing-module";

@Component({
  selector: 'app-laptopcard',
  imports: [CarouselModule, AuthRoutingModule],
  templateUrl: './laptopcard.html',
  styleUrl: './laptopcard.scss',
})
export class Laptopcard {

  public activeLaptops?: ActiveLaptop | null;
  constructor(private lap: Laptop) {}
  laptop?: ActiveLaptop | null;

  //Shouldn't call here
  // ngOnInit() {
  //   this.lap.getActiveLaptops().subscribe({
  //     next: (res: ActiveLaptop) => {
  //       this.activeLaptops = res;
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }
}
