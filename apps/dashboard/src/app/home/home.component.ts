import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
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
    this.loadMap()
  }

  loadMap() {
    const mapProp = {
      center: new google.maps.LatLng(40.712775, -74.005973),
      zoom: 18,
    };
    
    this.options = new google.maps.Map(
      document.getElementById('googleMap') as HTMLElement,
      mapProp
    );
  }

  goToLogin() {
    this.route.navigate(['login'])
  }
}
