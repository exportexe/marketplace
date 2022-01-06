import {MonoTypeOperatorFunction} from 'rxjs';
import {filter} from 'rxjs/operators';

export function filterBoolean<T>(): MonoTypeOperatorFunction<T> {
    return filter(Boolean);
}
