import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MarketHeaderModule} from '../shared/components/market-header/market-header.module';
import {MarketHomeModule} from './pages/market-home/market-home.module';
import {MarketFooterModule} from '../shared/components/market-footer/market-footer.module';
import {HttpLoaderFactory} from '../shared/utils/http-loader-factory';

const componentsModules = [
    MarketFooterModule,
    MarketHeaderModule,
    MarketHomeModule,
];

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ...componentsModules,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
    ],
})
export class AppModule {
}
