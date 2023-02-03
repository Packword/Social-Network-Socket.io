import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {NewsComponent} from "./news/news.component";
import {FriendsComponent} from "./friends/friends.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NewCompComponent} from "./new-comp/new-comp.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: "full"},
  {path: 'registration', component: RegistrationComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'news', component: NewsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: "new-comp", component: NewCompComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
