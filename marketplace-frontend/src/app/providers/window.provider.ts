import {DOCUMENT} from '@angular/common';
import {inject, InjectionToken} from '@angular/core';

export const WINDOW: InjectionToken<Window> = new InjectionToken<Window>(
    'Global window object',
    {
        factory: () => {
            const {defaultView} = inject(DOCUMENT);

            if (!defaultView) {
                throw new Error('Window is not available');
            }

            return defaultView;
        },
    },
);
