import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostTrendingListComponent } from "./posts/post-trendinglist/post-trendinglist.component";
import { PostPersonalizedListComponent } from "./posts/post-personalizedlist/post-personalizedlist.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";

//defining routes for each view
const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'trending', component: PostTrendingListComponent },
  { path: 'personalized', component: PostPersonalizedListComponent },
  { path: 'create', component: PostCreateComponent }
];


//registering the router service with routes
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
