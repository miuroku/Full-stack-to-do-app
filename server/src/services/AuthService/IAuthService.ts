// TO-DO: Можно описать тут общий интерфейс для всех вилов Айтентификации
//          Типо это было бы удобнее чтобы при использовании жтого заимпорченного
//          Обьекта не вызывать его статические методы как 
//          '(isAuth as any).Login(...)'
//          Все виды просто будут реализовывать этот интерфейс и заодно
//          в файле 'AuthService' можно будет явно прописать тип переменной


export interface IDataInsideJWT {
    _id: string,
    name: string,
    email: string
}

export interface IUserMinimal {
    name: string,
    email: string
}

export interface IDataSuccessReturned {
    user: IUserMinimal,
    accessToken: string,
    refreshToken: string,
}

export interface IDataInsideRefreshJwt {
    _id: string,
    name: string,
    email: string,
    iat: number,
    exp: number
}

