import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '../../services/translate.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

    blogs: any[];
    processBlog: boolean = true;
    subscription: Subscription;

    userId: number = 0;

    newPost = false;
    form: FormGroup;
    processing = false;

    constructor(private blogService: BlogService, public dataService: DataService, private formBuilder: FormBuilder, public translate: TranslateService) {
        this.subscription = this.dataService.sharedData$.subscribe(data => {
            if (data !== 'Empty') {
                this.userId = data.id;
            }
        });

        this.createNewBlogForm();
    }

    ngOnInit() {
        this.getBlogs();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    getBlogs() {
        this.blogs = [];
        this.processBlog = true;
        this.blogService.getBlogs().subscribe(
            (data) => {
                if (data.opr) {
                    this.blogs = data.value;
                } else {
                    console.log('error', data.msg);
                }
                this.processBlog = false;
            },
            err => {
                console.log('error', err.text());
                this.processBlog = false;
            }
        );
    }

    createNewBlogForm() {
        this.form = this.formBuilder.group({
            title_az: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(5)
            ])],
            title_en: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(5)

            ])],
            body_az: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(500),
                Validators.minLength(5)
            ])],
            body_en: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(500),
                Validators.minLength(5)
            ])]
        });
    }


    enableFormNewBlogForm() {
        this.form.get('title_az').enable();
        this.form.get('title_en').enable();
        this.form.get('body_az').enable();
        this.form.get('body_en').enable();
    }


    disableFormNewBlogForm() {
        this.form.get('title_az').disable();
        this.form.get('title_en').disable();
        this.form.get('body_az').disable();
        this.form.get('body_en').disable();
    }

    newBlogForm() {
        this.newPost = true;
    }

    onBlogSubmit() {
        this.processing = true;
        this.disableFormNewBlogForm();


        const blog = {
            title_az: this.form.get('title_az').value,
            title_en: this.form.get('title_en').value,
            body_az: this.form.get('body_az').value,
            body_en: this.form.get('body_en').value,
            userId: this.userId
        };


        this.blogService.newBlog(blog).subscribe(
            (data) => {
                if (data.opr) {

                    this.getBlogs();
                    this.newPost = false;
                    this.processing = false;
                    this.form.reset();
                    this.enableFormNewBlogForm();
                } else {
                    console.log(data.msg);
                    this.processing = false;
                    this.enableFormNewBlogForm();
                }
            },
            err => {
                console.log(err.text());
                this.processing = false;
                this.enableFormNewBlogForm();
            }
        );
    }


    goBack() {
        window.location.reload();
    }
}
