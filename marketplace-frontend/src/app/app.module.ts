import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MarketHeaderModule} from './shared/components/market-header/market-header.module';
import {MarketFooterModule} from './shared/components/market-footer/market-footer.module';
import {HttpLoaderFactory} from './shared/utils/http-loader-factory';

const COMPONENTS_MODULES = [
    MarketFooterModule,
    MarketHeaderModule,
];

const TOAST_TIMEOUT = 5000;
const TOAST_POSITION = 'toast-top-right';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            timeOut: TOAST_TIMEOUT,
            positionClass: TOAST_POSITION,
            preventDuplicates: true,
            progressBar: true,
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
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
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    ],
})
export class AppModule {
}
