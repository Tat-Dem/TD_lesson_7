interface IUser {
    isAuthorized(): boolean;
    mobileIDAuthorization?: boolean;
    activateEParakstsForLatvia?: boolean;
}
export class Contract {
    title: string;
    signed: boolean;
    constructor(title: string) {
        this.title = title;
        this.signed = false;
    }
    sign(user: IUser): void {
        if (user.isAuthorized()) {
            this.signed = true;
        } else {
            throw new Error("User is not authorized to sign the contract.")
        }
    }
}