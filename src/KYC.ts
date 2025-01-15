import{UserLatvia} from "./UserLatvia";
import {UserEstonia} from "./UserEstonia";
import {Contract} from "./Contract";

export class KYC{
    static activateMobileIDForEstonia(user: UserEstonia): void{
        //если юзеру 16 лет
        if (user.age>=16){
            user.mobileIDAuthorization = true;
        }else {
            throw new Error("User is too young")
        }
    }
    static activateEParakstsForLatvia(user: UserLatvia): void{
        //если юзеру больше 16 лет
        if (user.age>=18){
            user.activateEParakstsForLatvia = true;
        } else{
            throw  new Error("User is too young")
        }
    }
    static signContractWithMobileID(user: UserEstonia, contract: Contract): void{
        if (user.age < 18) {
            throw new Error("User is too young to sign the contract.");
        }
        if (user.mobileIDAuthorization){
            contract.signed = true;
        } else{
            throw new Error("Mobile ID is not activated for this user.");
        }
    }
    static signContractWithEParaksts(user: UserLatvia, contract: Contract): void{
        if (user.age < 16) {
            throw new Error("User is too young to sign the contract.");
        }
        if (user.activateEParakstsForLatvia){
            contract.signed = true;
        } else{
            throw new Error("e-Paraksts is not activated for this user.");
        }
    }
}
