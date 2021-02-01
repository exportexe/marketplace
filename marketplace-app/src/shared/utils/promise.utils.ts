export const toPromise = <T>(data: T): Promise<T> => {
    return new Promise<T>((resolve: any) => {
        resolve(data);
    });
};