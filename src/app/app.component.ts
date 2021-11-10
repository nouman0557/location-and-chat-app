import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataSource: any;
  name = ''
  personalInfo = ''
  @ViewChild('btnShow') btnShow!: ElementRef;
  @ViewChild('btnClose') btnClose!: ElementRef;

  constructor(
    public _router: Router,
    private store: AngularFirestore
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.store.collection('userInfo').snapshotChanges().subscribe((response: any) => {
      console.log('reponse ', response);
    })
  }


  openDialog() {
    this.btnShow.nativeElement.click();
  }
  closeDialog() {
    this.btnClose.nativeElement.click();
  }
  editObj: any;
  edit(id: string) {
    this.store.collection('userInfo').doc(id).get().subscribe((response) => {
      this.editObj = Object.assign({ id: response.id }, response.data());
      this.name = this.editObj.name;
      this.personalInfo = this.editObj.personalInfo;
      this.openDialog();
    })
  }

  add() {
    if (this.editObj) {
      this.store.collection('userInfo').doc(this.editObj.id).update({ name: this.name, personalInfo: this.personalInfo });
    } else {
      this.store.collection('userInfo').add({ name: this.name, personalInfo: this.personalInfo });
    }
    this.closeDialog();
  }
  clearEdit() {
    this.editObj = null;
    this.name = "";
    this.personalInfo = "";
  }
  delete(id: string) {
    this.store.collection('list').doc(id).delete();
  }
}
