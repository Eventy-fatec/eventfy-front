import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  public options!: any; 

  public hasUser = false;

  constructor(
    private route: Router
  ){}

  ngOnInit(): void {
  }

  

  goToLogin() {
    this.route.navigate(['login'])
  }
}
