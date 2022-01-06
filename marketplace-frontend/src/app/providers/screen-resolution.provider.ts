import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {InjectionToken, Provider} from '@angular/core';
import {map, Observable, tap} from 'rxjs';

import {ScreenSize} from '../enums';
import {getCurrentScreenSize, logState, ScreenSizeProvider, screenSizes} from '../utils';

export type ScreenResolutionPayload = {
    currentResolution: ScreenSize;
    screenSize: typeof ScreenSize;
};

export const SCREEN_RESOLUTION: InjectionToken<Observable<ScreenResolutionPayload>>
    = new InjectionToken<Observable<ScreenResolutionPayload>>('Screen resolution provider');

export const SCREEN_RESOLUTION_PROVIDER: Provider[] = [
    {
        provide: SCREEN_RESOLUTION,
        useFactory: screenResolutionFactory,
        deps: [BreakpointObserver],
    },
];

function screenResolutionFactory(breakpointObserver: BreakpointObserver): Observable<ScreenResolutionPayload> {
    return breakpointObserver
        .observe(screenSizes)
        .pipe(
            map((state: BreakpointState) => {
                return {
                    currentResolution: getCurrentScreenSize(state.breakpoints),
                    screenSize: new ScreenSizeProvider().screenSize,
                };
            }),
            tap((state: ScreenResolutionPayload) => logState(state.currentResolution)),
        );
}
