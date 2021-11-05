import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-location-tracking',
  templateUrl: './location-tracking.component.html',
  styleUrls: ['./location-tracking.component.scss']
})
export class LocationTrackingComponent implements OnInit {

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    scrollwheel: false,
    // maxZoom: 5,
    // minZoom: 5,
    // disableDoubleClickZoom: true,
    // zoomControl: false,
  }

  // picUpLocation!: google.maps.LatLngLiteral
  picUpLocation = {
    lat: 0,
    lng: 0
  }
  dropOffLocation = {
    lat: 0,
    lng: 0
  }
  trackingLocation = {
    lat: 0,
    lng: 0
  }

  // picUpMarker = {
  //   position: {
  //     lat: this.picUpLocation.lat,
  //     lng: this.picUpLocation.lng,
  //   },
  //   label: {
  //     color: 'blue',
  //   },
  //   title: 'User pic up location',
  //   options: { animation: google.maps.Animation.DROP },
  // }

  // dropOffMarker = {
  //   position: {
  //     lat: this.dropOffLocation.lat,
  //     lng: this.dropOffLocation.lng,
  //   },
  //   label: {
  //      color: 'green',
  //   },
  //   title: 'User drop off location',
  //   options: { animation: google.maps.Animation.DROP },
  // }

  // trackingMarker = {
  //   position: {
  //     lat: this.trackingLocation.lat,
  //     lng: this.trackingLocation.lng,
  //   },
  //   label: {
  //      color: 'red',
  //   },
  //   title: 'User current location',
  //   options: { animation: google.maps.Animation.DROP },
  // }

  markers: any[] = []
  picUpMarker: any
  dropOffMarker: any
  trackingMarker: any

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.picUpLocation = {
      lat: 0,
      lng: 0
    }
    this.getUserLocation()
    this.recLocation()
  }

  socket: any
  isTracking = false
  zoom = 15

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.picUpLocation.lat = position.coords.latitude;
        this.picUpLocation.lng = position.coords.longitude;
        this.markers[0] = this.addMarker(this.picUpLocation.lat, this.picUpLocation.lng, 'User pic up location', 'picUp')
        console.log("markers array updated -->", this.markers)
        this.sendPicUpLocation()
        console.log("position --->", position)
      });
    } else {
      console.log("User not allowed")
    }
  }

  getdropOffLocationLocation() {
    if (this.dropOffLocation.lat != 0 && this.dropOffLocation.lng != 0) {
      // this.dropOffMarker = 
      this.markers[1] = this.addMarker(this.dropOffLocation.lat, this.dropOffLocation.lng, 'User drop off location', 'dropOff')
      // this.markers[1] = this.dropOffMarker
      // this.addMarker()
      console.log("markers array updated -->", this.markers)
      // this.trackMe()
      this.sendDropOffLocation()
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      // this.commonService.showSuccess("Tracking mode is enable successfully.", "System Tracking You.")
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
    // this.trackingLocation['lat'] = position.coords.latitude;
    // this.trackingLocation['lng'] = position.coords.longitude;
    // this.trackingMarker = this.addMarker(this.trackingLocation.lat, this.trackingLocation.lng, 'User current location')
    this.sendTrackingLocation()

  }

  customeTrackingLocation() {
    if (this.trackingLocation.lat != 0 && this.trackingLocation.lng != 0) {
      // this.trackingMarker = 
      this.markers[2] = this.addMarker(this.trackingLocation.lat, this.trackingLocation.lng, 'User current location', 'tracking')
      // this.markers[2] = this.trackingMarker
      // this.addMarker()
      console.log("markers array updated -->", this.markers)
      console.log("trackingMarker  updated -->", this.trackingLocation)

      this.sendTrackingLocation()
    }
  }

  addMarker(lat: number, lng: number, title: string, type: string) {
    let imgUrl = type == 'picUp' ? 'pic-up.png' : type == 'dropOff' ? 'drop-off.png' : 'tracking.png'
    let marker = {
      position: {
        lat: lat,
        lng: lng,
      },
      label: {
        color: 'red',
      },
      title: title,
      options: {
        animation: type == 'tracking' ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP,
        draggable: false,
        icon: "/assets/images/" + imgUrl,
      },
    }
    return marker
  }

  sendPicUpLocation() {
    const picUpLocation = {
      lat: this.picUpLocation['lat'],
      lng: this.picUpLocation['lng']
    };
    this.socket.emit('picUpLocation', picUpLocation);
  }

  sendDropOffLocation() {
    const dropOffLocation = {
      lat: this.dropOffLocation['lat'],
      lng: this.dropOffLocation['lng']
    };
    this.socket.emit('dropOffLocation', dropOffLocation);
  }

  sendTrackingLocation() {
    const trackingLocation = {
      lat: this.trackingLocation['lat'],
      lng: this.trackingLocation['lng']
    };
    this.socket.emit('trackingLocation', trackingLocation);
  }

  recLocation() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('trackingLocation', (data: any) => {
      console.log('User relocate-->', data)
    });
  }
}
