import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

import{ GlobalConstants } from '../../app.personalized-tag';


@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  
  //creating an array of our Post model type
  posts: Post[] = [];
  private postsSub: Subscription;

  //creating a constructor to inject our PostsService dependency
  constructor(public postsService: PostsService) {}

  //using lifecycle hook
  //setTimeout for multistage download
  ngOnInit() {
    setTimeout(() => {
      this.postsService.getPosts();
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
    },1000);

    setTimeout(() => {
      alert("Happy Reading!! :)");
    },2000);
    
  }

  onGetPost(postId: string) {
    console.log("like called");
    this.postsService.getPost(postId);
  }

  //to update number of likes
  
  onUpdatePost(post: Post){
    console.log("update called");
    post.numberofreads=post.numberofreads.valueOf() + 1;
    this.postsService.updatePost(post.id, post.title, post.tag, post.content, post.numberofreads);

    
  }



  //to save the genre of the post clicked on, to add it to personalized
  //(in the GlobalConstants class)
  onOpenForRead(tag: string) {
    GlobalConstants.genre =  tag;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
