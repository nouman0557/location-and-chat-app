import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private commonService: CommonService, private cd: ChangeDetectorRef,) { }
  user: any

  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.commonService.setUser(user);
      this.user = user
      console.log('Current User at header-->', user)
    }

    this.commonService.userData.subscribe((user) => {
      console.log('Current User at header-->', user)
      this.user = user
      this.cd.detectChanges();
    });

  }

}
