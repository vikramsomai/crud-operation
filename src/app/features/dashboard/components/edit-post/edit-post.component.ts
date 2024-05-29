import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../../../core/auth/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostStoreService } from '../../../../core/auth/services/post-store.service';
import { PostModel } from '../../../../core/model/post.model';
@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
  @ViewChild('title') title!:ElementRef
  @ViewChild('body') body!:ElementRef
  postDataArray:PostModel[]=[]
  constructor(
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private post:PostService,
    private postStore:PostStoreService,
    private _snackBar:MatSnackBar
  ) {
        
    }
    ngOnInit(): void {
          this.postStore.isPostStore.subscribe({
                next:(res)=>{
                    this.postDataArray=res
                }
          })
    }

    postEditForm=new FormGroup({
      title:new FormControl(''),
      body:new FormControl('')
    })
    updatePost(id:number){
      if(this.title.nativeElement.value==''){

      }
      let obj={
        title:this.title.nativeElement.value,
        body:this.body.nativeElement.value
      }
      this.post.updatePostData(id,obj).subscribe({
        next:(res)=>{
          console.log("success",res)
          this._snackBar.open("Updated successfully", 'ok', {
            horizontalPosition: 'end',
            verticalPosition:'top',
            duration:5000
          });
        },
        error:(err)=>{
          console.log("error",err)
        }
      })
      this.postDataArray.map((res)=>{
        if(res.id==id){
          res.title=this.title.nativeElement.value
          res.body=this.body.nativeElement.value
        }
      })
      this.postStore.setPostData(this.postDataArray)

      this.dialogRef.close()
    }
    cancel(){
      this.dialogRef.close()
    }
}
