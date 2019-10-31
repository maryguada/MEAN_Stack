import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  restaurant:any; 
  err:any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.restaurant = {
      'restaurant': '',
      'cuisine': '', 

    }
    this.err = {
      'restaurant': '',
      'cuisine': '', 

    }
  }

  createRestaurant(){
    this._httpService.createNewRestaurant(this.restaurant).subscribe( data => {
      console.log(data)
      this.err = {};
      if (data['message'] ==="Error"){
        if (data['error']['errors']['restaurant']){
          this.err['restaurant'] = data['error']['errors']['restaurant']['message']; 
        }
        if (data['error']['errors']['cuisine']){
          this.err['cuisine'] = data['error']['errors']['cuisine']['message']; 
        }
      }else{
      this._router.navigate(['restaurants/home']);
      }
    })
  }
}