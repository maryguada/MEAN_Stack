import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  restaurant:any;
  err:any; 

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.getRestaurant(params['id']);
    })

    this.restaurant ={
      'restaurant' : '', 
      'cuisine' : '',
    }
  
    this.err = {
      'restaurant' : '', 
      'cuisine' : '',
  }
  }
  getRestaurant(id){
    this._httpService.showOneRestaurant(id).subscribe( data => {
      console.log(data)
      this.restaurant = data ['restaurant']
    })
  }

  editRestaurant(){
    this._httpService.editOneRestaurant(this.restaurant).subscribe( data => {
      console.log(data)
      if(data["message"] === "Error"){
        if(data['error']['errors']['restaurant']){
          this.err['restaurant'] = data['error']['errors']['restaurant']['message'];
        }
        if(data['error']['errors']['cuisine']){
          this.err['cuisine'] = data['error']['errors']['cuisine']['message'];
        }
      }else{
        this._router.navigate(['restaurants/home']);
      }
    })
  }
}