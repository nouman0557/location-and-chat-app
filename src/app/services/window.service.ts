import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA2clufa-g8U9QWAOJi7C52xZkNuVyaTuE",
  authDomain: "my-project-first-330812.firebaseapp.com",
  projectId: "my-project-first-330812",
  storageBucket: "my-project-first-330812.appspot.com",
  messagingSenderId: "397327658572",
  appId: "1:397327658572:web:262bc72d51ce68cf660ee9",
  measurementId: "G-0TRK4054R4"
};

// initializeApp.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Injectable()
export class WindowService {

  get windowRef() {
    return window
  }

}