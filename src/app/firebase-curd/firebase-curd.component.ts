import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { FormControl, FormGroup } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { FireBaseDataService } from '../services/firebase-data.service';

@Component({
  selector: 'app-firebase-curd',
  templateUrl: './firebase-curd.component.html',
  styleUrls: ['./firebase-curd.component.scss']
})
export class FirebaseCurdComponent implements OnInit {

  ngOnInit(): void {
  }

  // dataSource: any;
  // id: any;
  // name: any;
  // personalInfo: any;
  // editObj: any;
  // editFlag = false;

  // @ViewChild('btnShow')
  // btnShow!: ElementRef;
  // @ViewChild('btnClose')
  // btnClose!: ElementRef;

  // secondForm = new FormGroup({ valueToGet: new FormControl('') })
  // constructor(
  //   // private store: AngularFirestore,
  //   private toastr: ToastrService,
  //   private UserService: FireBaseDataService) { }

  // ngOnInit() {
  //   this.getAllUsers();
  // }

  // getAllUsers() {
  //   this.UserService.getAllUsers().snapshotChanges().subscribe((res: any) => {
  //     console.log('Hi this is record from Firebase-->', res)
  //     this.dataSource = res.map((item: any) => {
  //       return Object.assign({ id: item.payload.doc.id }, item.payload.doc.data());
  //     });
  //   })
  // }

  // add() {
  //   this.editFlag = false;
  //   let User = { name: this.name, personalInfo: this.personalInfo }
  //   if (User.name === undefined || User.name === null) {
  //     this.toastr.error('Name is required', 'Error');
  //   } else if (User.personalInfo === undefined || User.personalInfo === null) {
  //     this.toastr.error('Personal Info is required', 'Error');
  //   }
  //   // this.UserService.addUser(User, this.editObj).then(res => {
  //   //   this.toastr.success('User Added', 'Success!');
  //   // });
  //   this.closeDialog();
  // }

  // edit(id: string) {
  //   this.editFlag = true;
  //   // this.store.collection('Users').doc(id).get().subscribe((response) => {
  //   //   this.editObj = Object.assign({ id: response.id }, response.data());
  //   //   this.name = this.editObj.name;
  //   //   this.personalInfo = this.editObj.personalInfo;
  //   //   this.openDialog();
  //   // })
  // }

  // delete(id: string) {
  //   this.UserService.delete(id).then((res: any) => {
  //     this.toastr.success('User deleted', 'Success!');
  //   }).catch((e: any) => {
  //     console.log(e);
  //   })
  // }

  // clearEdit() {
  //   this.editObj = null;
  //   this.name = "";
  //   this.personalInfo = "";
  // }

  // openDialog() {
  //   this.btnShow.nativeElement.click();
  // }

  // closeDialog() {
  //   this.btnClose.nativeElement.click();
  // }

}
