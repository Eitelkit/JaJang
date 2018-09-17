import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth.service';
import {AppUser} from '../models/app-user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserShoppingCartsService} from '../user-shopping-carts.service';
import {UserShoppingCart} from '../models/user-shopping-cart';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser; // store the user information
  cart$: Observable<UserShoppingCart>; // store the user shopping cart information
  tableId: string; // store the table id information
  modal; // used for login form modal

  isNewUser = true; // used for justify if the user is new or not
  email = ''; // login/signup email
  password = ''; // store password
  errorMessage = ''; // error message
  error: {name: string, message: string} = {name: '', message: ''}; // error message
  resetPassword = false; // whether reset the password or not
  public isCollapsed = false; // used for collapse nav-bar when the screen size changed
  constructor(private auth: AuthService,
              private userCartService: UserShoppingCartsService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.queryParamMap.subscribe( para => {
      this.tableId = para.get('tableKey'); // get the table key from query parameter map
    });
  }
  login() {
    this.auth.login(); // use auth service login function
  }
  signUpWithEmail() {
    this.clearErrorMessage(); // clear the error message
    if (this.validateForm(this.email, this.password)) {
      this.auth.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.modal.close(); // close the popup form
          this.router.navigate(['/verify-email']); // redirect to the verify email page
        })
        .catch(_error => {
          this.error = _error; // catch the error message
          this.router.navigate(['/']); // navigate to the homepage
        });
    }
  }
  clearErrorMessage() {
    this.errorMessage = ''; // clear the error message
    this.error = {name: '', message: ''}; // clear the error message
  }
  changeForm() {
    this.isNewUser = !this.isNewUser; // change the form by changing the isNewUser
  }
  loginWithEmail() {
    this.clearErrorMessage(); // clear the error message
    if (this.validateForm(this.email, this.password)) {
      this.auth.loginWithEmail(this.email, this.password)
        .then(() => {
          this.modal.close(); // close the modal
          this.router.navigate(['/']); // redirect to the homepage
        })
        .catch(_error => {
          this.error = _error;
          this.router.navigate(['/']); // redirect to the homepage
        });
    }
  }
  logout() {
    this.auth.logout(); // AuthService logout function
    this.router.navigate(['/']); // redirect to the homepage
  }
  async ngOnInit() { // initialization
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser); // assign value to appUser
    this.cart$ = await this.userCartService.getUserCart(); // get observable user shopping cart
  }
  validateForm(email: string, password: string) {
    if (email.length === 0) { // if the email is empty
      this.errorMessage = 'Please enter Email!';
      return false;
    }
    if (password.length === 0) { // if the password is empty
      this.errorMessage = 'Please enter Password!';
      return false;
    }
    if (password.length < 6) { // if the length of password is less than 6
      this.errorMessage = 'Password should be at least 6 characters!';
      return false;
    }
    this.errorMessage = ''; // clear the error message
    return true;
  }
  isValidMailFormat(email: string) {
    // const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    // if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
    //   return false;
    // }
    return true;
  }
  sendResetEmail() { // send the reset the email
    this.clearErrorMessage(); // clear the error message
    this.auth.resetPassword(this.email)
      .then(() => this.resetPassword = true) // change the value of resetPassword to change the form
      .catch(_error => { // catch the error message
        this.error = _error; // assign the value to the error
      });
  }
  openVerticallyCentered(content) { // used for popup form
    this.modal = this.modalService.open(content, { centered: true });
  }

}
