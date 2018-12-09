import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { EndpointFactory } from './services/endpoint-factory.service';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { PsaReportComponent } from './components/psa-report/psa-report.component';
import { ConfigurationService } from './services/configuration.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { EmployeeSummaryComponent } from './components/employee-summary/employee-summary.component';
import { EmployeeSummaryHeaderComponent } from './components/employee-summary-header/employee-summary-header.component';

@NgModule({
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useClass: TranslateLanguageLoader
      }
  }),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    PsaReportComponent,
    NotFoundComponent,
    EmployeeSummaryComponent,
    EmployeeSummaryHeaderComponent
  ],
  providers: [
    ConfigurationService,
    AuthService,
    LocalStoreManager,
    AppTranslationService,
    EndpointFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
