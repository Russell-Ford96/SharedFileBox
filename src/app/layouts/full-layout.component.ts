import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  constructor(
      private authService: AuthService,
      private router: Router
  ) {}


  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  goToProfile() {
      this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {}
}
