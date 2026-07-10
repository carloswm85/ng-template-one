import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-details/article-details.component';

export const ARTICLES_ROUTES: Routes = [
    { path: '', component: ArticleListComponent },
    { path: ':slug', component: ArticleDetailComponent }
];
