import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private showHeader = new BehaviorSubject(true);//new Subject<any>();
  showHeader$ = this.showHeader.asObservable();

  private showskeleton = new BehaviorSubject(false);//new Subject<any>();
  showskeleton$ = this.showskeleton.asObservable();

  skeletonValue = new BehaviorSubject(false);


  userData = new Subject<any>();

  constructor(private toastr: ToastrService) {

  }

  setUser(user: any) {
    this.userData.next(user);
  }

  setHeaderValue(value: any) {
    this.showHeader.next(value);
  }

  public isObjectEmpty(object: any) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) return false;
    }
    return true;
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title)
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title)
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title)
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title)
  }

  setSekeletonValue(value: boolean) {
    this.showskeleton.next(value)
  }

  loader = false
  setLoader(value: boolean) {
    this.loader = value
  }

  getLoader() {
    return this.loader
  }
  appVersion = ''
  setVersionForFilterList(appVersion: string) {
    this.appVersion = appVersion
  }

  getVersionForFilterList() {
    return this.appVersion
  }

  convertBytesToGb(bytes: any) {
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
    let i = 0
    for (i; bytes > 1024; i++) {
      bytes /= 1024;
    }
    return bytes.toFixed(1) + ' ' + units[i]
  }

}
