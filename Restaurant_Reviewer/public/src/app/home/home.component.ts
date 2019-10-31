import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: any; 

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants(){
    this._httpService.getAllRestaurants().subscribe( data => {
      console.log(data); 
      this.restaurants = data['restaurant']
    })
  }

  deleteRestaurant(id){
    this._httpService.deleteOneRestaurant(id).subscribe(data => {
      console.log(data)
      this.getRestaurants();
    })
  }

}