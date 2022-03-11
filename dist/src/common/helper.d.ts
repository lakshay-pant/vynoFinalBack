export declare class HelperService {
    base64ImageUpload(imgBase64: any): {
        status: string;
        message: string;
        path?: undefined;
    } | {
        status: boolean;
        path: string;
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        path?: undefined;
    };
    documentUpload(data: any): any[] | {
        status: string;
        message: any;
    };
    removeUnderscoreFromcolumn(data: any): any;
    getReverseGeocodingData(lat: any, lng: any): any;
    pushNotifications(fcm_token: any, title_msg: any, msg: any): void;
}
