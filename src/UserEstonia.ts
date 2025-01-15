interface IUser {
    isAuthorized(): boolean;
    mobileIDAuthorization?: boolean;
    activateEParakstsForLatvia?: boolean;
}
export class UserEstonia  implements IUser{
    name: string;
    surname: string;
    age: number;
    mobileIDAuthorization?: boolean;

    constructor(name: string, surname: string, age: number) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.mobileIDAuthorization = false;
    }
    isAuthorized(): boolean {
        return this.mobileIDAuthorization === true;
    }
}