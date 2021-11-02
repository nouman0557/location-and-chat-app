import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-tracking',
  templateUrl: './location-tracking.component.html',
  styleUrls: ['./location-tracking.component.scss']
})
export class LocationTrackingComponent implements OnInit {

  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    // zoomControl: false,
    // scrollwheel: false,
    // disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  constructor() { }

  ngOnInit() {
    this.recLocation()
  }

  socket: any
  isTracking = false
  currentLat = 0
  currentLong = 0
  marker: any
  map: any
  zoom = 16
  custLat = 0
  custLng = 0

  getUserLocation() {
    // get Users current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.zoom = 16;
        this.sendLocation()
        console.log("position --->", position)
      });
    } else {
      console.log("User not allowed")
    }
  }

  getCustomeLocation() {
    if (this.custLat != 0 && this.custLng != 0) {
      this.currentLat = this.custLat
      this.currentLong = this.custLng
      this.center = {
        lat: this.custLat,
        lng: this.custLng,
      }
      this.sendLocation()
    }

  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position: any) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
    this.sendLocation()

  }


  sendLocation() {
    const location = {
      lat: this.currentLat,
      lng: this.currentLong
    };
    this.socket.emit('ping', location);
  }

  recLocation() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('new-location', (data: any) => {
      // console.log('User relocate-->', data)
    });
  }

}
