import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MarketHeaderModule} from './components/market-header/market-header.module';
import {MarketFooterModule} from './components/market-footer/market-footer.module';
import {HttpLoaderFactory} from './utils';
import {MissingTranslationService} from './services';

const COMPONENTS_MODULES = [
    MarketFooterModule,
    MarketHeaderModule,
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
    ],
})
export class AppModule {
}
