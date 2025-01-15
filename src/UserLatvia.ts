interface IUser {
    isAuthorized(): boolean;
    mobileIDAuthorization?: boolean;
    activateEParakstsForLatvia?: boolean;
}
export class UserLatvia implements IUser{
    name: string;
    surname: string;
    age: number;
    activateEParakstsForLatvia?: boolean;

    constructor(name: string, surname: string, age: number, ) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.activateEParakstsForLatvia = false;
    }
    isAuthorized(): boolean {
        return this.activateEParakstsForLatvia === true;
    }
}