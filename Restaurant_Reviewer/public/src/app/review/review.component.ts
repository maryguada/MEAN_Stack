import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  restaurantId;

  review = {
    "name": " ",
    "content" : " ",
    "rating": " ",
  };

  constructor(private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.restaurantId=params['id']
      console.log("Task ID from URL: ", this.restaurantId)
  });
  }
  onSubmit(){
    this._httpService.createReview(this.restaurantId, this.review).subscribe( data => {
      console.log(data)
      this._router.navigate(['/show/'+this.restaurantId]);
    })

  }
}
