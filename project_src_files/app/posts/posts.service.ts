import { Injectable } from '@angular/core';

//to work with observables
import { Subject } from 'rxjs';

import { Post } from './post.model';


import {HttpClient} from "@angular/common/http";

//frontend has field id, backend returns _id
//to resolve this-
import {map} from "rxjs/operators";


//declares this service as a provider
//(same as adding PostsService as a provider in app.module.ts)
//creates single instance of this service for entire app
@Injectable({providedIn: 'root'})

export class PostsService {
  //creating posts as an instance of Post model
  private posts: Post[] = [];

  private postsUpdated = new Subject<Post[]>();

  
  /*need to reach out to backend,
  fetch the posts,
  store the posts in the above variable posts,
  then fire update listener to inform that there are new posts*/
  
  //inject HttpClient
  constructor(private http: HttpClient){}
  
  //have to send HTTP request through Angular's built-in HTTP Client
  getPosts() {
    //set path to backend for GET
    //Angular HttpClient uses observables, so have to listen using subscribe
    this.http.get<{message: string, posts: any}>("http://localhost:3000/api/posts")
    .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            tag: post.tag,
            content: post.content,
            id: post._id,
            numberofreads: post.numberofreads
          };
        });
    }))
    
    .subscribe((transformedPosts) => {
      this.posts=transformedPosts; 
      //... => creating deep copy of posts array
      this.postsUpdated.next([...this.posts]);
    });

  }


  getTrendingPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts/trending"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            tag: post.tag,
            content: post.content,
            id: post._id,
            numberofreads: post.numberofreads
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }




  getPersonalizedPosts(tag: String) {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts/personalized" + tag
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            tag: post.tag,
            content: post.content,
            id: post._id,
            numberofreads: post.numberofreads
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  getPost(postId: string) {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts" + postId
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            tag: post.tag,
            content: post.content,
            id: post._id,
            numberofreads: post.numberofreads
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }




  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }



  updatePost(id: string, title: string, tag: string, content: string, numberofreads: Number) {
    console.log("updatePost called");
    const post: Post = { id: id, title: title, tag: tag, content: content, numberofreads: numberofreads };
    this.http
      .post<{ message: string, postId: string }>(`http://localhost:3000/api/posts${id}`, post)
      .subscribe(response => console.log(response));
  
  }




  addPost(title: string, tag: string, content: string) {
    //creating a post of Post model out of the info we get in addPost
    const post: Post = {id: null, title: title, tag: tag, content: content, numberofreads:0};

    //store the new post on the server
    this.http.post<{message: string}>("http://localhost:3000/api/posts", post)
    .subscribe(responseData => {
      console.log(responseData.message);
      //push the newly created post into the existing array
      this.posts.push(post);

      this.postsUpdated.next([...this.posts]);
    });

  }
}



