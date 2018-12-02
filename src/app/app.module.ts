import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { EndpointFactory } from './services/endpoint-factory.service';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { PsaReportComponent } from './psa-report/psa-report.component';
import { ConfigurationService } from './services/configuration.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';

@NgModule({
  imports: [
    BrowserModule,
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
    NotFoundComponent
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
