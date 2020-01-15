import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { JourneyComponent } from './journey/journey.component';
import { OurworkComponent } from './ourwork/ourwork.component';
import { GalleryComponent } from './gallery/gallery.component';
import { VisitusComponent } from './visitus/visitus.component';
import { DonateComponent } from './donate/donate.component';
import { ContactusComponent } from './contactus/contactus.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    JourneyComponent,
    OurworkComponent,
    GalleryComponent,
    VisitusComponent,
    DonateComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  bootstrap: []
})
export class DashboardModule { }
