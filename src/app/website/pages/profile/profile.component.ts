import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:User|null  =null;
  constructor(private svcAuth: AuthService) { }

  ngOnInit(): void {
    this.svcAuth.User$.subscribe(res=>{ //como al loguear obtengo el perfil aqui ya no hace falta hacer la peticion a la api sino lo recupero del store global
      this.user = res;
    })
  }

}
