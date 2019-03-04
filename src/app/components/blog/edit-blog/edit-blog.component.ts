import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogService} from '../../../services/blog.service';

@Component({
    selector: 'app-edit-blog',
    templateUrl: './edit-blog.component.html',
    styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
    message;
    messageClass;
    blog;
    processing = false;
    currentUrl;
    loading = true;

    constructor(
        private activatedRoute: ActivatedRoute,
        private blogService: BlogService,
        private router: Router) {
    }

    ngOnInit() {
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.blogService.getPost(this.currentUrl.id).subscribe(
            (data) => {
                console.log(data);
                if (data.opr) {
                    this.blog = data.value;
                    this.loading = false;
                } else {
                    this.messageClass = 'alert alert-danger';
                    this.message = data.msg;
                }

            },
            err => {
                this.messageClass = 'alert alert-danger';
                this.message = err.text();
                this.loading = false;
            }
        );
    }

    updateBlogSubmit() {
        this.processing = true;
        this.blogService.updateBlog(this.blog).subscribe(
            (data) => {
                if (data.opr) {
                    this.messageClass = 'alert alert-success';
                    this.message = 'Edited';

                    setTimeout(() => {
                        this.router.navigate(['/blog']);
                    }, 2000);
                } else {
                    this.messageClass = 'alert alert-danger';
                    this.message = data.msg;
                    this.processing = false;
                }
            },
            err => {
                this.messageClass = 'alert alert-danger';
                this.message = err.text();
                this.processing = false;
            }
        );
    }

    goBack() {
        this.router.navigate(['/blog']);
    }

    deleteBlog() {

        if (confirm('Do you want delete ?')) {

            this.blogService.deleteBlog(this.currentUrl.id).subscribe(
                (data) => {
                    if (data.opr) {
                        this.messageClass = 'alert alert-success';
                        this.message = 'Deleted';

                        setTimeout(() => {
                            this.router.navigate(['/blog']);
                        }, 1000);
                    } else {
                        this.messageClass = 'alert alert-danger';
                        this.message = data.msg;
                        this.processing = false;
                    }
                },
                err => {
                    this.messageClass = 'alert alert-danger';
                    this.message = err.text();
                    this.processing = false;
                }
            );

        }

    }

}
