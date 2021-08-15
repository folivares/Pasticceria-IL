import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-bo-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})

export class BackofficeComponent implements OnInit {

  currentAuthUser: any;

  constructor(
    private authService: AuthenticationService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.currentAuthUser = this.authService.getCurrentAuthUser();
    this.titleService.setTitle('Pasticceria IL - BO - Lista dolci');
  }

}
