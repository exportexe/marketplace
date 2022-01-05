import {APP_BASE_HREF} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MarketFooterModule} from './component/market-footer/market-footer.module';
import {MarketHeaderModule} from './component/market-header/market-header.module';
import {AuthInterceptor} from './interceptor';
import {MissingTranslationService} from './service';
import {HttpLoaderFactory} from './util';

const COMPONENTS_MODULES = [
    MarketFooterModule,
    MarketHeaderModule,
    MatSidenavModule,
];

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            maxOpened: 5,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            progressBar: true,
            countDuplicates: true,
        }),
        TranslateModule.forRoot({
            defaultLanguage: environment.defaultLocale,
            useDefaultLang: true,
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: MissingTranslationService,
            },
        }),
        ...COMPONENTS_MODULES,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/',
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {appearance: 'outline'},
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
})
export class AppModule {
}
