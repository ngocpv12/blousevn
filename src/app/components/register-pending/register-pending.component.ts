import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SessionService } from 'src/app/Services/session.service';

@Component({
  selector: 'app-register-pending',
  templateUrl: './register-pending.component.html',
  styleUrls: ['./register-pending.component.css']
})
export class RegisterPendingComponent implements OnInit {
  message;
  constructor(private route: ActivatedRoute, private session: SessionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let message = params.get('message');
      this.message = message;

    });
  }

}
