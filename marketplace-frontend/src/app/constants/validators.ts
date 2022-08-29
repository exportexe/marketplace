export const USERNAME_VALIDATOR = `^(?=[a-zA-Z0-9._]{8,16}$)(?!.*[_.]{2})[^_.].*[^_.]$`;

export const PASSWORD_VALIDATOR = `^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$`;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 16;

export const FIRST_NAME_VALIDATOR = `[a-zA-Z-]*`;
export const FIRST_NAME_LENGTH = 20;
