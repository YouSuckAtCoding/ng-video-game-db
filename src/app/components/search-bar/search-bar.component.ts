import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  constructor(private router: Router){}

  onSubmit(form: NgForm){
      this.router.navigate(['search',form.value.search]);
  }
}
