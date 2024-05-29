import { Component, effect } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../../core/auth/services/post.service';
import { PostModel } from '../../../../core/model/post.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';
import { PostStoreService } from '../../../../core/auth/services/post-store.service';
@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  postData:PostModel={userId:0,id:0,title:'',body:''}
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  PostDataArray:PostModel[]=[]
  constructor(private post:PostService,private _snackBar:MatSnackBar,private dialog:DialogRef,
    private postStore:PostStoreService
  ){ 
      postStore.isPostStore.subscribe({
        next:(res)=>{
          this.PostDataArray=res
        }
      })
  }
  postForm=new FormGroup({
    title:new FormControl('',[Validators.required]),
    body:new FormControl('',[Validators.required])
  })
  addPost(){
      
      if(this.postForm.valid){
      this.postData=this.postForm.value as PostModel
      this.postData=Object.assign({id:this.PostDataArray.length+1},this.postData)
      this.PostDataArray.push(this.postData)
      this.post.setPostData(this.postData).subscribe({
        next:(success)=>{
          this.postStore.setPostData(this.PostDataArray)
          this._snackBar.open("Successfully inserted", 'ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration:5000
          });
        },
        error:(err)=>{
          console.log("error",err)
        }
      }) 
      this.dialog.close()
    }
  }
  cancel(){
      this.dialog.close()
  }
}
