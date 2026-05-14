import { Component } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-mainlayout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.scss',
})
export class Mainlayout {}
