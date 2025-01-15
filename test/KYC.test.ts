import {UserEstonia} from "../src/UserEstonia";
import {UserLatvia} from "../src/UserLatvia";
import {KYC} from "../src/KYC";
import {Contract} from "../src/Contract";

describe("KYC tests",()=>{
    let oldEstonianUser: UserEstonia;
    let youngEstoniaUser: UserEstonia;
    let oldLatvianUser: UserLatvia;
    let youngLatvianUser: UserLatvia;
    beforeEach(() => {
        oldEstonianUser = new UserEstonia("Fjodor","Pupkin", 25);
        youngEstoniaUser = new UserEstonia("Fjodor","Pupkin", 15);
        oldLatvianUser = new UserLatvia("Katja","Blin", 20);
        youngLatvianUser = new UserLatvia("Katja","Blin", 17);
    });
    test("ESTONIA: mobileIDAuthorization default value is false", ()=>{
        expect(oldEstonianUser.mobileIDAuthorization).toBe(false);
    });
    test("LATVIA: activateEParakstsForLatvia default value is false", ()=>{
       expect(oldLatvianUser.activateEParakstsForLatvia).toBe(false);
    });
    // 2 and 3 cl
    test("ESTONIA: activateMobileIDForEstonia works",()=>{
        KYC.activateMobileIDForEstonia(oldEstonianUser);
        expect(oldEstonianUser.mobileIDAuthorization).not.toBeUndefined();
        expect(oldEstonianUser.mobileIDAuthorization).toBeTruthy();

    });
    test("LATVIA: activateEParakstsForLatvia works",()=>{
        KYC.activateEParakstsForLatvia(oldLatvianUser);
        expect(oldLatvianUser.activateEParakstsForLatvia).not.toBeUndefined();
        expect(oldLatvianUser.activateEParakstsForLatvia).toBeTruthy();
    });
    // 4 cl
    test("ESTONIA: activateMobileIDForEstonia throw error",()=>{
        expect(()=>{
            KYC.activateMobileIDForEstonia(youngEstoniaUser);
        }).toThrow("User is too young");
    });
    test("LATVIA: activateEParakstsForLatvia throw error",()=>{
        expect(()=>{
            KYC.activateEParakstsForLatvia(youngLatvianUser);
        }).toThrow("User is too young");
    });
    describe("signContractWithMobileID",()=>{
        it("should throw an error if user is too young",()=>{
            const user = new UserEstonia("Harry","Potter",15);
            const contract = new Contract("Test contract");
            expect(() =>{
                KYC.signContractWithMobileID(user, contract)
            }).toThrow("User is too young to sign the contract.")
        });
        it("should throw an error if Mobile ID is not activated",()=>{
            const user = new UserEstonia("Harry","Potter",18);
            const contract = new Contract("Test contract");
            expect(() =>{
                KYC.signContractWithMobileID(user, contract)
            }).toThrow("Mobile ID is not activated for this user.")
        });
        it("should sign the contract if user is old enough and Mobile ID is activated",()=>{
            const user = new UserEstonia("Harry","Potter",18);
            const contract = new Contract("Test contract");
            KYC.activateMobileIDForEstonia(user);
            KYC.signContractWithMobileID(user, contract);
            expect(contract.signed).toBe(true);
        });
    });
    describe("signContractWithEParaksts",()=> {
        it("should throw an error if user is too young",()=>{
            const user = new UserLatvia("Harry","Poer",15);
            const contract = new Contract("Test contract");
            expect(() =>{
                KYC.signContractWithEParaksts(user, contract)
            }).toThrow("User is too young to sign the contract.")
        });
        it("should throw an error if e-Paraksts is not activated",()=>{
            const user = new UserLatvia("Harry","Poer",16);
            user.activateEParakstsForLatvia = false;
            const contract = new Contract("Test contract");
            expect(() =>{
                KYC.signContractWithEParaksts(user, contract)
            }).toThrow("e-Paraksts is not activated for this user.")
        });
        it("should sign the contract successfully",()=>{
            const user = new UserLatvia("Harry","Poer",18);
            user.activateEParakstsForLatvia = true;
            const contract = new Contract("Test contract");
            KYC.signContractWithEParaksts(user, contract);
            expect(contract.signed).toBe(true);
        });
    });
});
