import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit{
  enteredTitle = "";
  enteredTag="";
  enteredContent = "";
  numberofreads=0;

  //creating a constructor to inject our PostsService dependency
  constructor(public postsService: PostsService) {}


  ngOnInit()
  {
    setTimeout(() => {
        alert("You can create your awesome new posts here!");
    },500);
  }


  onAddPost(form: NgForm) {
    //don't do anything if the form is invalid
    if (form.invalid) {
      return;
    }

    //add a post with the specified values
    this.postsService.addPost(form.value.title, form.value.tag, form.value.content);
    
    //reset form each time after submitting
    form.resetForm();
  }
}
