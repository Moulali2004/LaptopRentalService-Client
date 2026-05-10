import { Component } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../../shared/components/footer/footer";

@Component({
  selector: 'app-mainlayout',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.scss',
})
export class Mainlayout {}
