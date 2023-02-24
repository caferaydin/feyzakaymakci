export interface TokenModel{
    token:string;
    expiration:string;

    
}

export function tokenGetter() {
    return localStorage.getItem('auth_token');
    }