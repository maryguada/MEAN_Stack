import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { ReviewComponent } from './review/review.component';


const routes: Routes = [
  { path: 'restaurants/home', component: HomeComponent},
  { path: 'restaurants/new', component: NewComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'show/:id', component: ShowComponent},
  { path: 'review/:id', component: ReviewComponent},


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
