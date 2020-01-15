import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../dashboard/home/home.component';
import { ContactusComponent } from '../dashboard/contactus/contactus.component';
import { DonateComponent } from '../dashboard/donate/donate.component';
import { GalleryComponent } from '../dashboard/gallery/gallery.component';
import { JourneyComponent } from '../dashboard/journey/journey.component';
import { OurworkComponent } from '../dashboard/ourwork/ourwork.component';
import { VisitusComponent } from '../dashboard/visitus/visitus.component';


const routes: Routes = [
    { path: '', component:LayoutComponent,
    children:[
      { path: 'home', component: HomeComponent}, 
      { path: 'contactus', component: ContactusComponent},
      { path: 'donate', component: DonateComponent},
      { path: 'gallery', component: GalleryComponent},
      { path: 'journey', component: JourneyComponent},
      { path: 'ourwork', component: OurworkComponent},
      { path: 'visitus', component: VisitusComponent},
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
