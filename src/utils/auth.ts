import Cookies from 'js-cookie';

const Tokenkey: string = 'user-token';

export function getToken(): string{
    return Cookies.get(Tokenkey);
}

export function setToken(token: string): void{
    Cookies.set(Tokenkey, token, { expires: 1 });
}

export function removeToken(): void{
    Cookies.remove(Tokenkey);
}