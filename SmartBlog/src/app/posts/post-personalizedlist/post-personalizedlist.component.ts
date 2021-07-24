import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";


import{ GlobalConstants } from '../../app.personalized-tag';


@Component({
  selector: "app-post-personalizedlist",
  templateUrl: "./post-personalizedlist.component.html",
  styleUrls: ["./post-personalizedlist.component.css"]
})



export class PostPersonalizedListComponent implements OnInit {
  
  
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.postsService.getPersonalizedPosts(GlobalConstants.genre);
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
    },500);


    setTimeout(() => {
      alert("All posts belonging to the genre of the post you last clicked on will appear here!");
    },501);
    
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

