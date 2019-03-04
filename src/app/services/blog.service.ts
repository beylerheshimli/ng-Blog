import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';


@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private http: HttpClient, private config: AppConfig) {
    }

    getBlogs() {
        return this.http.get<any>(`${this.config.apiUrl}/getBlogs.php`);
    }

    newBlog(data: any) {
        return this.http.post<any>(`${this.config.apiUrl}/addPost.php`, data);
    }

    updateBlog(data: any) {
        return this.http.post<any>(`${this.config.apiUrl}/updatePost.php`, data);
    }

    deleteBlog(id: number) {
        return this.http.post<any>(`${this.config.apiUrl}/deletePost.php`, {id: id});
    }

    getPost(id: number) {
        return this.http.get<any>(`${this.config.apiUrl}/getPost.php?id=${id}`);
    }
}
