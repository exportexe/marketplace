import {ScreenSize} from '../enums';
import {SimpleMap} from '../models';

const XSMALL_MEDIA_QUERY: string = '(max-width: 599px)';
const SMALL_MEDIA_QUERY: string = '(min-width: 600px) and (max-width: 959px)';
const MEDIUM_MEDIA_QUERY: string = '(min-width: 960px) and (max-width: 1279px)';
const LARGE_MEDIA_QUERY: string = '(min-width: 1280px)';

export const screenSizes: string[] = [XSMALL_MEDIA_QUERY, SMALL_MEDIA_QUERY, MEDIUM_MEDIA_QUERY, LARGE_MEDIA_QUERY];

export const screenResolutionByCssMediaMap: SimpleMap<ScreenSize> = {
    [XSMALL_MEDIA_QUERY]: ScreenSize.XSmall,
    [SMALL_MEDIA_QUERY]: ScreenSize.Small,
    [MEDIUM_MEDIA_QUERY]: ScreenSize.Medium,
    [LARGE_MEDIA_QUERY]: ScreenSize.Large,
};

export class ScreenSizeProvider {
    public readonly screenSize: typeof ScreenSize = ScreenSize;
}

export function getCurrentScreenSize(breakpoints: SimpleMap<boolean>): ScreenSize {
    return screenResolutionByCssMediaMap[Object.keys(breakpoints).find((mediaQuery: string) => breakpoints[mediaQuery])];
}

export function logState(state: ScreenSize): void {
    console.info(`[ScreenResolutionService] Screen resolution changed: ${state}`);
}
