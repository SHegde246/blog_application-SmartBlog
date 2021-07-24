import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";


import{ GlobalConstants } from '../../app.personalized-tag';



@Component({
  selector: "app-post-trendinglist",
  templateUrl: "./post-trendinglist.component.html",
  styleUrls: ["./post-trendinglist.component.css"]
})



export class PostTrendingListComponent implements OnInit{
  
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.postsService.getTrendingPosts();
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
    },500);

    setTimeout(() => {
        alert("All posts with more than three likes are considered to be popular. They'll appear here, in the trending section.");
    },510)
    
  }

  
//to save the genre of the post clicked on, to add it to personalized
  //(in the GlobalConstants class)
  onOpenForRead(tag: string) {
    GlobalConstants.genre =  tag;
  }


  onGetPost(postId: string) {
    this.postsService.getPost(postId);
  }

  //to update number of likes
  onUpdatePost(post: Post){
    console.log("update called");
    post.numberofreads=post.numberofreads.valueOf() + 1;
    this.postsService.updatePost(post.id, post.title, post.tag, post.content, post.numberofreads);
  }


}
