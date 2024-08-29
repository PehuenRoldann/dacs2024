import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {

  public showPassword: boolean = false;

}
