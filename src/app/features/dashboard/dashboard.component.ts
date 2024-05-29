import { Component, ViewChild } from '@angular/core';
import { PostService } from '../../core/auth/services/post.service';
import { PostModel } from '../../core/model/post.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { JsonPipe } from '@angular/common';
import { UserModel } from '../../core/model/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { UserAuthService } from '../../core/auth/services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostStoreService } from '../../core/auth/services/post-store.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [RouterOutlet, MatTableModule, JsonPipe, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule, MatSortModule, MatPaginatorModule]
})

export class DashboardComponent {
  PostData: PostModel[] = []
  filterValue = ''
  isLoading = false
  currentUser: UserModel = { username: '', email: '', password: '', role: '' }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'title', 'body', 'Edit', 'Delete'];
  displayedColumns2: string[] = ['id', 'title', 'body'];

  dataSource = new MatTableDataSource<PostModel>(this.PostData);
  constructor(private posts: PostService,
    private dialog: MatDialog,
    private user: UserAuthService,
    private _snackBar: MatSnackBar,
    private route: Router,
    private postStore: PostStoreService) {

  }

  ngOnInit(): void {
    this.user.isCurentUser.subscribe({
      next: (res) => {
        this.currentUser = res
      }
    })
    // if(localStorage.getItem("post-data")===null){
    //   console.log("active")
    //   this.posts.getPostData().subscribe((product)=>{
    //     this.PostData.push(...product)
    //     this.postStore.setPostData(this.PostData) 
    //   })
    // }
    // else{
    // this.PostData=this.postStore.getPostData()
    // this.postStore.isPostStore.subscribe((res)=>{
    //     this.PostData=res
    //     this.postStore.setPostData(this.PostData)
    //       this.dataSource = new MatTableDataSource(this.PostData)
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;

    // })
    // }
    this.posts.getPostData().subscribe((res) => {
      console.log("get post data", res)
      if (localStorage.getItem("post-data") == null) {
        this.postStore.setPostData(res)
        this.PostData = res
      }
      else {
        this.PostData = this.postStore.getPostData()
        this.postStore.isPostStore.subscribe((res) => {
          this.PostData = res
          this.PostData = JSON.parse(localStorage.getItem("post-data") as string)
          this.postStore.setPostData(this.PostData)
          this.dataSource = new MatTableDataSource(this.PostData)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    })
  }


  editPost(element: PostModel) {
    this.dialog.open(EditPostComponent, { data: element })
  }
  deletePost(id: number) {
    let obj = this.PostData.filter(value => value.id != id)

    this.postStore.setPostData(obj)

    this.posts.deletePost(id).subscribe({
      next: (res) => {

        this._snackBar.open("Deleted successfully", 'ok', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      error: (err) => {
        console.log("error", err)
      }
    })
  }
  searchFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = this.filterValue.toLowerCase().trim()
  }
  addPostDialog() {
    // this.route.navigateByUrl('add-post')
    const dialogRef = this.dialog.open(AddPostComponent)
    dialogRef.afterClosed().subscribe((res) => {
      // this.route.navigateByUrl('/dashboard')
    })
  }
}
