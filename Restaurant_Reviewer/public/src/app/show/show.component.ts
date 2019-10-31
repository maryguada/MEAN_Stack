import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  restaurant:any; 

  constructor(private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.getRestaurant(params['id']);
  });

  this.restaurant = {
    'restaurant': '',
    'cuisine': '', 

  }
  }

  getRestaurant(id){
    this._httpService.showOneRestaurant(id).subscribe(data => {
      console.log(data)
      this.restaurant = data['restaurant']
    })
  }

}
