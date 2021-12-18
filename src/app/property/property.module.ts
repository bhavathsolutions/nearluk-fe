import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './property-routing.module';
import { ContactAgentComponent } from './contact-agent/contact-agent.component';
import { BiddingComponent } from './bidding/bidding.component';
import { PropertysComponent } from './propertys/propertys.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { CompareComponent } from './compare/compare.component';
import { AgmCoreModule } from '@agm/core';
import { KeyFilterModule } from 'primeng/keyfilter';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { UpdatepropertyComponent } from './updateproperty/updateproperty.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GetareabycityComponent } from './getareabycity/getareabycity.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ViewpropertyComponent } from './viewproperty/viewproperty.component';
import { CalendarModule } from 'primeng/calendar';
import { MytransactionsComponent } from './mytransactions/mytransactions.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [MytransactionsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    NgxSpinnerModule
  ],
  
})
export class PropertyModule { }
