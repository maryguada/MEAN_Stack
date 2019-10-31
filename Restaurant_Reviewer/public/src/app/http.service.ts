import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllRestaurants(){
    return this._http.get('/restaurants')
  }

  createNewRestaurant(restaurant){
    return this._http.post("/restaurant/new", restaurant)
  }

  deleteOneRestaurant(id){
    return this._http.delete(`/restaurants/${id}`)
  }

  showOneRestaurant(id){
    return this._http.get(`/restaurant/${id}`)
  }

  editOneRestaurant(restaurant){
    return this._http.put(`/restaurants/${restaurant._id}`, restaurant)
  }

  createReview(restaurantId, review){
    return this._http.post(`/rest/${restaurantId}/review`, review)
  }
}
