export const USERNAME_VALIDATOR: string = '^(?=[a-zA-Z0-9._]{8,14}$)(?!.*[_.]{2})[^_.].*[^_.]$';
export const PASSWORD_VALIDATOR: string = '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$';
export const FIRST_NAME_VALIDATOR: string = '[a-zA-Z-]*';
export const FIRST_NAME_LENGTH: number = 20;

export const AGE_MIN_LENGTH: number = 2;
export const AGE_MAX_LENGTH: number = 3;
export const AGE_VALIDATOR: number = 100;

export const PASSWORD_MIN_LENGTH: number = 8;
export const PASSWORD_MAX_LENGTH: number = 16;
