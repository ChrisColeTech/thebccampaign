import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false; // Add this line

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubMenu(isSubMenuOpen: boolean) {
    this.isSubMenuOpen = isSubMenuOpen;
  }

}
