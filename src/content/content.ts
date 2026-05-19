const username = "FANYUAN";
const password = "2025Fy@*";
const isUnisco = location.href.includes("unisco.com.cn")
const isLogin = location.href.includes("/#/login")
const isManifestEntry = location.href.includes("/#/exportDocuments/manifestEntry")
const manifestEntryUrl = 'https://www.unisco.com.cn/#/exportDocuments/manifestEntry'
// let data = {
//   id: 150,
//   userId: null,
//   ebNo: 'FYJK000020-150',
//   type: false,
//   self: false,
//   spell: false,
//   startPort: 599,
//   uploadPort: 3108,
//   purposePort: 3108,
//   shipCompany: 9,
//   sailingTime: '2023-11-17',
//   putType: 0,
//   declare: '',
//   interior: false,
//   trailer: false,
//   trailerTime: null,
//   custom: false,
//   entrustNub: '',
//   ladingCount: 0,
//   ladingNub: '',
//   blNo: '1345',
//   blNoTsl: '11111',
//   putCode: '',
//   freightTerms: false,
//   transportTerms: '',
//   appointNub: '',
//   matchTaime: '',
//   shipName: 'KTY 2411S',
//   voyage: 'RNV2',
//   portVoyage: '',
//   bindingNotice: '',
//   startPortTime: '',
//   stopPortTime: '',
//   inPortCode: '',
//   overTime: '',
//   stopPassTime: '',
//   main: true,
//   tdRemark: null,
//   shipAgency: 'COSCO',
//   leak: 0,
//   canPut: 0,
//   startPortalias: null,
//   purposePortalias: null,
//   uploadPortalias: null,
//   trailerAddress: '',
//   tetd: '',
//   vgmendTime: '',
//   addspell: null,
//   qy: 0,
//   dcstatus: 0,
//   tdstatus: 0,
//   cdstatus: 0,
//   vdstatus: 0,
//   cdreceipt: null,
//   ebId: 0,
//   receiptRemark: null,
//   endPortPierId: null,
//   xhxxStatus: 0,
//   mentionCon: null,
//   managelcl: false,
//   outside: 2,
//   icn: null,
//   warehouseName: null,
//   realityLeavePortTime: null,
//   realityClosePortTime: null,
//   exportBoxStartTime: null,
//   isf5: '0',
//   emptyId: null,
//   acidNumber: null,
//   vatNumber: null,
//   egyptAcidNumber: null,
//   createTime: '2023-11-16T09:00:07.000Z',
//   updateTime: '2024-03-04T05:43:09.000Z',
//   routeId: null,
//   containner_vgms: [
//     {
//       cType: 40,
//       boxNub: 'TEST1111233',
//       weight: '0.000',
//       volume: '0.000',
//       sealNUb: '',
//       amount: 10,
//       hostMark: true,
//       method: false
//     }
//   ],
//   sea_order_bind: { routeId: 0, routeCode: 'SKT' },
//   sea_order_contacts: [
//     {
//       id: 181523,
//       oid: 150,
//       cabinId: 0,
//       lclid: 0,
//       type: 2,
//       master: 'SAME AS CONSIGNEE',
//       address: '',
//       firmCode: null,
//       country: null,
//       phone: null,
//       aeo: null,
//       spName: null,
//       spType: null,
//       spContact: null,
//       qy: 0,
//       createTime: '2023-11-16T09:00:07.000Z',
//       updateTime: '2024-03-04T05:43:09.000Z'
//     },
//     {
//       id: 181522,
//       oid: 150,
//       cabinId: 0,
//       lclid: 0,
//       type: true,
//       master: 'ASAHI AUTO SPARE PARTS L.L.C',
//       address: 'SHOP NO 18, NAIF 7 STATES BLDG, \n' +
//         'BEHIND KHANSAHEB PARKING, DIERA \n' +
//         'DUBAI,UNITED ARAB EMIRATES',
//       firmCode: null,
//       country: null,
//       phone: null,
//       aeo: null,
//       spName: null,
//       spType: null,
//       spContact: null,
//       qy: 0,
//       createTime: '2023-11-16T09:00:07.000Z',
//       updateTime: '2024-03-04T05:43:09.000Z'
//     },
//     {
//       id: 181521,
//       oid: 150,
//       cabinId: 0,
//       lclid: 0,
//       type: false,
//       master: 'YANCHENG RELY IMPORT & EXPORT \nCORP., LTD.',
//       address: 'RM.401 TOWER #16,ZHONG YIN HAIHUA \n' +
//         'PLAZA NO.59,JIANJUN\n' +
//         'RD.,YANCHENG,CHINA',
//       firmCode: null,
//       country: null,
//       phone: null,
//       aeo: null,
//       spName: null,
//       spType: null,
//       spContact: null,
//       qy: 0,
//       createTime: '2023-11-16T09:00:07.000Z',
//       updateTime: '2024-03-04T05:43:09.000Z'
//     }
//   ],
//   goods: [
//     {
//       id: 306,
//       oid: 150,
//       cabinId: 0,
//       lclid: 0,
//       shantou: null,
//       name: 'TEST!!!',
//       description: '你好',
//       cargoType: false,
//       amount: '10',
//       unit: 'BAGS',
//       weight: '2000.000',
//       volume: '1111.000',
//       hscode: '160413',
//       dangerClass: null,
//       unNub: null,
//       dangerCode: null,
//       dangerPoint: '0',
//       packType: null,
//       packDesc: null,
//       packWeight: null,
//       packSize: null,
//       grossWeight: null,
//       quarantineCode: null,
//       quarantineName: null,
//       sign: null,
//       qy: 0,
//       conid: null,
//       createTime: '2023-11-16T09:00:07.000Z',
//       updateTime: '2024-03-04T05:43:09.000Z'
//     }
//   ],
//   startPortData: { id: 599, name: '上海', nameEn: 'SHANGHAI', code: 'CNSHA' },
//   purposePortData: { id: 3108, name: '新加坡', nameEn: 'HO CHI MINH CITY', code: 'VNSGN' },
//   uploadPortsea: { id: 3108, name: '新加坡', nameEn: 'HO CHI MINH CITY', code: 'VNSGN' },
//   carrier: {
//     id: 9,
//     code: 'COSCO',
//     name: '中远',
//     nameEn: 'COSCO',
//     scacCode: 'COSU'
//   }
// }

function setNativeValue(
    element: HTMLInputElement,
    value: string
) {
    const setter =
        Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value"
        )?.set;

    setter?.call(element, value);

    element.dispatchEvent(
        new Event("input", {
            bubbles: true
        })
    );

    element.dispatchEvent(
        new Event("change", {
            bubbles: true
        })
    );
}

function login() {

    const userDom =
        document.querySelector(
            '.el-input__inner[placeholder="登录账号/手机"]'
        ) as HTMLInputElement | null;

    const passwordDom =
        document.querySelector(
            '.el-input__inner[placeholder="密码"]'
        ) as HTMLInputElement | null;

    const loginBtn =
        document.querySelector(
            ".login-btn"
        ) as HTMLButtonElement | null;

    if (
        !userDom ||
        !passwordDom ||
        !loginBtn
    ) {
        return;
    }

    setNativeValue(
        userDom,
        username
    );

    setNativeValue(
        passwordDom,
        password
    );

    console.log(
        "Username and password filled"
    );

    setTimeout(() => {

        loginBtn.click();

        console.log(
            "Login button clicked"
        );

        waitCaptchaSolved();

    }, 500);
}

function waitCaptchaSolved() {

    const timer = setInterval(() => {
        const captcha = document.querySelector(".verifybox");

        const solved = !captcha;

        if (solved) {
            clearInterval(
                timer
            );
            console.log(
                "Captcha solved"
            );
            waitRedirect();
        }
    }, 1000);

}

function waitRedirect() {

    const oldUrl =
        location.href;

    console.log(oldUrl)

    const timer = setInterval(()=>{
        clearInterval(
            timer
        );
        console.log(
            "Redirected to home page"
        );
        redirectToManifestEntry();
    }, 1000);
}

function redirectToManifestEntry() {
    
    if(location.href.includes("/#/exportDocuments/manifestEntry"))
        return;

    location.href = manifestEntryUrl;
}

function waitManifestReady(){
    const timer = setInterval(()=>{
        const btns =
        document.querySelectorAll('.el-button.el-button--primary.el-button--default') as NodeListOf<HTMLElement>;
        if(btns.length >= 3) {
            clearInterval(
                timer
            );
            btns[2]?.click();
            importDataOrderToManifest();
        }
    },500);

}
function importDataOrderToManifest() {
    const timer = setInterval(() => {
        clearInterval(timer);
        const button = document.querySelectorAll('.el-button.el-button--primary.el-button--default') as NodeListOf<HTMLElement>;
        if(button.length >= 2) {
            clearInterval(timer);
            button[1]?.click();
            console.log(
                "Start to import data order to manifest"
            );
        }
    }, 1000);
}

chrome.runtime.onMessage.addListener((message) => {
    switch(message.action) {
        case "LOGIN":
            login();
            break;
        case "MANIFEST_ENTRY":
            redirectToManifestEntry();
            break;
        // case "IMPORT_DATA_ORDER_TO_MANIFEST":
        //     importDataOrderToManifest();
        //     break;
    }
});

if(isUnisco && isLogin) {
    login();
}
if(isUnisco && !isLogin) {
    redirectToManifestEntry();
}
if(isUnisco && isManifestEntry) {
    waitManifestReady();
}