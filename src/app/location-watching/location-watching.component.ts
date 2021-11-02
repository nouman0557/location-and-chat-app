import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-location-watching',
  templateUrl: './location-watching.component.html',
  styleUrls: ['./location-watching.component.scss']
})
export class LocationWatchingComponent implements OnInit {

  constructor() { }

  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    // zoomControl: false,
    // scrollwheel: false,
    // disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  socket: any
  isTracking = false
  currentLat = 0
  currentLong = 0
  marker: any
  map: any
  zoom = 16
  // userRelocate = false
  ngOnInit(): void {
    this.recLocation()
  }

  recLocation() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('new-location', (data: any) => {
      // this.userRelocate = true
      this.currentLat = data.lat;
      this.currentLong = data.lng;
      this.center = {
        lat: data.lat,
        lng: data.lng,
      }
      console.log('User relocate watching component-->', data)
    });
  }
}
