const username = "FANYUAN"
const password = "2025Fy@*"

function waitUntil(condition: () => boolean, callback: () => void, interval = 3000) {
    const timer = setInterval(() => {
        if (condition()) {
            clearInterval(timer)
            callback()
        }
    }, interval)
}

chrome.storage.local.get(["started"], (result) => {
    if (result.started) {
        boot()
    }
})

function boot() {
    const url = location.href

    console.log("Boot:", url)

    if (!url.includes("unisco.com.cn")) {
        return
    }

    if (url.includes("/#/login")) {
        console.log("Run login")
        login()
        return
    }

    if (url === "https://www.unisco.com.cn/#/exportDocuments/manifestEntry") {
        console.log("Run waitManifestReady")
        waitManifestReady()
        return
    }

    console.log("Redirect to manifest")
    redirectManifest()
}

function login() {
    const user = document.querySelector('[placeholder="登录账号/手机"]') as HTMLInputElement

    const pass = document.querySelector('[placeholder="密码"]') as HTMLInputElement

    const btn = document.querySelector(".login-btn") as HTMLElement

    if (!user || !pass || !btn) {
        setTimeout(login, 1000)

        return
    }

    setNativeValue(user, username)

    setNativeValue(pass, password)

    btn.click()

    waitCaptchaSolved()
}

function waitCaptchaSolved() {
    const timer = setInterval(() => {
        const captcha = document.querySelector(".verifybox")

        const stillLoginPage = location.href.includes("/#/login")

        if (!stillLoginPage) {
            clearInterval(timer)
            redirectManifest()
            return
        }

        if (!captcha) {
            clearInterval(timer)
            waitLoginSuccess()
        }
    }, 1000)
}

function waitLoginSuccess() {
    waitUntil(
        () => !location.href.includes("/#/login"),

        () => {
            console.log("Login success")

            redirectManifest()
        }
    )
}

function redirectManifest() {
    const manifestUrl = "https://www.unisco.com.cn/#/exportDocuments/manifestEntry"

    if (location.href === manifestUrl) {
        waitManifestReady()
        return
    }

    location.href = manifestUrl

    waitUntil(
        () => location.href === manifestUrl,

        () => {
            console.log("Arrived manifest page")

            waitManifestReady()
        }
    )
}

function waitManifestReady() {
    waitUntil(
        () => {
            const btns = document.querySelectorAll(".el-button.el-button--primary") as NodeListOf<HTMLElement>

            return btns.length >= 3
        },

        () => {
            const btns = document.querySelectorAll(".el-button.el-button--primary") as NodeListOf<HTMLElement>

            btns[2]?.click()

            importData()
        }
    )
}

const data = {
    id: 121726,
    userId: 6108,
    ebNo: "FYEB090265-121726",
    type: false,
    self: false,
    spell: false,
    startPort: 599,
    uploadPort: 3108,
    purposePort: 2445,
    shipCompany: 30,
    sailingTime: "2026-05-12",
    putType: 0,
    declare: null,
    interior: false,
    trailer: false,
    trailerTime: null,
    custom: false,
    entrustNub: null,
    ladingCount: 0,
    ladingNub: null,
    blNo: "ONEYSHAGD9804800",
    blNoTsl: "",
    putCode: null,
    freightTerms: false,
    transportTerms: "1",
    appointNub: null,
    matchTaime: "",
    shipName: "SHIMANAMI BAY/0HO3YS",
    voyage: "0292S",
    portVoyage: "0292S",
    bindingNotice: null,
    startPortTime: "",
    stopPortTime: "",
    inPortCode: "MYPEN",
    overTime: "2026-05-19 14:03:51",
    eirOpenDate: null,
    stopPassTime: "",
    main: true,
    tdRemark: null,
    shipAgency: "MA1G5DJT4",
    leak: 1,
    canPut: 0,
    startPortalias: null,
    purposePortalias: null,
    uploadPortalias: null,
    trailerAddress: "",
    tetd: "2026-05-20 12:30:00",
    vgmendTime: "2026-05-19 14:03:51",
    addspell: null,
    qy: 0,
    dcstatus: 0,
    tdstatus: 0,
    cdstatus: 0,
    vdstatus: 0,
    cdreceipt: null,
    ebId: 0,
    receiptRemark: null,
    endPortPierId: null,
    xhxxStatus: 0,
    mentionCon: null,
    managelcl: false,
    outside: 2,
    icn: null,
    warehouseName: null,
    realityLeavePortTime: null,
    realityClosePortTime: null,
    exportBoxStartTime: null,
    isf5: 0,
    emptyId: null,
    acidNumber: null,
    vatNumber: null,
    egyptAcidNumber: null,
    billno: 1,
    schedule: 1,
    pushStatus: 1,
    ghStatus: {
        vgm: false,
        status: false,
        boxState: false,
        customes: true,
        terminal: true,
        closeTime: "2026-05-20T00:30:00",
        vgmWeight: false,
        carrierLock: false,
        carrierClose: false,
    },
    ghType: {
        customs: true,
        stowage: true,
        terminal: true,
        startTime: "2026-05-11T01:00:00",
    },
    operationId: "",
    planLeavePortTime: "2026-05-20",
    isPop: 0,
    popContent: null,
    tdTemplate: 0,
    vgmTemplate: 0,
    cdTemplate: 0,
    dutyNumber: null,
    aiMark: 0,
    customsMark: 2,
    trailerCompany: null,
    hiddenId: null,
    floatingId: null,
    qq: "",
    merge: null,
    statusSendFileQq: 0,
    billNum: 1,
    createTime: "2026-05-18T02:34:59.000Z",
    updateTime: "2026-05-20T08:28:45.000Z",
    routeId: null,
    sea_order_bind: {
        id: 118479,
        insureId: 0,
        sid: 5055,
        kid: 5031,
        kid2: "",
        status: 5,
        fid: 0,
        xid: 0,
        xcid: 0,
        xstatus: 5,
        uid: 6108,
        type: false,
        soid: 121726,
        lclid: 0,
        exportation: true,
        demandId: 16744,
        supplyId: 2,
        mblId: 0,
        demandRemark: null,
        nbRemark: null,
        suppleRemark: null,
        freihtRateRemark: "通过小泛/小远链接订舱\n.;OBS USD30PER TEU Included\n普通客户",
        priceChangeNotice: null,
        lock: false,
        lockTime: null,
        hsLock: false,
        hsLockTime: null,
        checkTime: null,
        putTime: null,
        createPriceTime: "2026-05-18 13:36:33",
        demandComfirmTime: null,
        supplyComfirmTime: null,
        bookingRemark: "订5月5号 AS PATRIA2604S 上海--槟城 ONE 40HC 1100美金",
        financeRemark: "05.13 改单",
        freightId: 5579885,
        basePrice: null,
        frevary: true,
        marketCost: true,
        rate: null,
        prices: null,
        pricesTime: null,
        bookingParty: 5918,
        CNY: 6.8435,
        ypEmail: "",
        updatefreightId: null,
        updateconId: null,
        updateUser: "0",
        top: 1,
        billStatus: false,
        specialRemark: '["与港区船名不一致"]',
        updatetbn: null,
        yjRemark: null,
        pcRemark:
            "1.小箱设备单72个小时有效,大高箱的24个小时, 过期可以重放\n2.进港代码见设备单,洋山提箱点无法更改\n3.ONE晚进港费收取的时间以船靠前6小时为划分标准,过了时间会收取晚进港费\n4. ONE没有内部截关时间,截关时间一般船靠前24-28小时,在节前或在船爆仓的情况下船司不会进行提前通知,自行提早截关时间,建议贵司早做早报\n5. 截单后我司会提供二次确认件,烦请仔细核对！二次件确认后若有任何更改均会产生改单费,该费用将由贵司。",
        ebId: 0,
        routeId: 10,
        routeCode: "KCS",
        freightSupplier: "上海泛远国际货运代理有限公司",
        settlement: null,
        gxStatus: 2,
        tgCause: null,
        sdCause: 6,
        preAudit: 2,
        qy: 0,
        seaOrderPrice: null,
        "20gp": "550.00",
        "40gp": "1100.00",
        "40hq": "1100.00",
        autoPrepNote: null,
        priceInfo: null,
        costWarning: 0,
        costLock: true,
        dzResult: null,
        hasBill: 0,
        reviewMark: 0,
        createTime: "2026-05-18T02:34:59.000Z",
        updateTime: "2026-05-20T08:28:55.000Z",
        leaders: [
            {
                id: 655133,
                uid: 228,
                username: "LUNA",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 228,
                    username: "LUNA",
                    rid: 794,
                    currentRole: {
                        id: 794,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "LUNA的角色",
                        createUid: null,
                        createTime: "2021-04-13T10:17:32.000Z",
                        updateTime: "2021-04-13T10:17:32.000Z",
                    },
                },
            },
            {
                id: 655134,
                uid: 219,
                username: "QUEENCY",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 219,
                    username: "QUEENCY",
                    rid: 791,
                    currentRole: {
                        id: 791,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "QUEENCY的角色",
                        createUid: null,
                        createTime: "2021-04-13T07:37:05.000Z",
                        updateTime: "2021-04-13T07:37:05.000Z",
                    },
                },
            },
            {
                id: 655135,
                uid: 226,
                username: "HELEN",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 226,
                    username: "HELEN",
                    rid: 796,
                    currentRole: {
                        id: 796,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "HELEN的角色",
                        createUid: null,
                        createTime: "2021-04-13T10:33:03.000Z",
                        updateTime: "2021-04-13T10:33:03.000Z",
                    },
                },
            },
            {
                id: 655136,
                uid: 975,
                username: "BrucedadA",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 975,
                    username: "BrucedadA",
                    rid: 3,
                    currentRole: {
                        id: 3,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "管理员",
                        createUid: null,
                        createTime: "2020-02-17T06:53:43.000Z",
                        updateTime: "2020-02-17T06:53:43.000Z",
                    },
                },
            },
            {
                id: 655137,
                uid: 231,
                username: "JASMINE",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 231,
                    username: "JASMINE",
                    rid: 795,
                    currentRole: {
                        id: 795,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "JASMINE的角色",
                        createUid: null,
                        createTime: "2021-04-13T10:23:45.000Z",
                        updateTime: "2021-04-13T10:23:45.000Z",
                    },
                },
            },
            {
                id: 655138,
                uid: 1268,
                username: "MERA",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 1268,
                    username: "MERA",
                    rid: 799,
                    currentRole: {
                        id: 799,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "MERA的角色",
                        createUid: null,
                        createTime: "2021-04-13T10:41:36.000Z",
                        updateTime: "2021-04-13T10:41:36.000Z",
                    },
                },
            },
            {
                id: 655139,
                uid: 1659,
                username: "ZELDA",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 1659,
                    username: "ZELDA",
                    rid: 889,
                    currentRole: {
                        id: 889,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "ZELDA的角色",
                        createUid: null,
                        createTime: "2021-05-31T07:53:34.000Z",
                        updateTime: "2021-05-31T07:53:56.000Z",
                    },
                },
            },
            {
                id: 655140,
                uid: 2198,
                username: "+84865439399",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 2198,
                    username: "+84865439399",
                    rid: null,
                    currentRole: null,
                },
            },
            {
                id: 655141,
                uid: 2245,
                username: "SORA",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 2245,
                    username: "SORA",
                    rid: 1424,
                    currentRole: {
                        id: 1424,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "BELL的角色",
                        createUid: null,
                        createTime: "2022-08-01T03:59:07.000Z",
                        updateTime: "2024-11-15T03:33:32.000Z",
                    },
                },
            },
            {
                id: 655142,
                uid: 4045,
                username: "KATHY RUAN",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 4045,
                    username: "KATHY RUAN",
                    rid: 2118,
                    currentRole: {
                        id: 2118,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "KATHY RUAN的角色",
                        createUid: null,
                        createTime: "2024-03-12T02:38:06.000Z",
                        updateTime: "2024-03-12T02:38:06.000Z",
                    },
                },
            },
            {
                id: 655143,
                uid: 2334,
                username: "宋诗聪",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 2334,
                    username: "宋诗聪",
                    rid: 1534,
                    currentRole: {
                        id: 1534,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "李文竹的角色",
                        createUid: null,
                        createTime: "2022-10-09T07:37:02.000Z",
                        updateTime: "2022-10-09T07:37:02.000Z",
                    },
                },
            },
            {
                id: 655144,
                uid: 5042,
                username: "JANCY",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 5042,
                    username: "JANCY",
                    rid: 2188,
                    currentRole: {
                        id: 2188,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "河内操作单证的角色",
                        createUid: null,
                        createTime: "2025-06-16T04:22:29.000Z",
                        updateTime: "2026-04-15T05:32:24.000Z",
                    },
                },
            },
            {
                id: 655145,
                uid: 5743,
                username: "MIRA",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 5743,
                    username: "MIRA",
                    rid: 2197,
                    currentRole: {
                        id: 2197,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "MIRA单证角色",
                        createUid: null,
                        createTime: "2026-01-05T06:02:45.000Z",
                        updateTime: "2026-01-05T06:02:45.000Z",
                    },
                },
            },
            {
                id: 655146,
                uid: 6026,
                username: "LYN",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 6026,
                    username: "LYN",
                    rid: 2188,
                    currentRole: {
                        id: 2188,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "河内操作单证的角色",
                        createUid: null,
                        createTime: "2025-06-16T04:22:29.000Z",
                        updateTime: "2026-04-15T05:32:24.000Z",
                    },
                },
            },
            {
                id: 655147,
                uid: 6028,
                username: "ASTRA",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 6028,
                    username: "ASTRA",
                    rid: 2188,
                    currentRole: {
                        id: 2188,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "河内操作单证的角色",
                        createUid: null,
                        createTime: "2025-06-16T04:22:29.000Z",
                        updateTime: "2026-04-15T05:32:24.000Z",
                    },
                },
            },
            {
                id: 655148,
                uid: 6027,
                username: "HENRY",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 6027,
                    username: "HENRY",
                    rid: 2188,
                    currentRole: {
                        id: 2188,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "河内操作单证的角色",
                        createUid: null,
                        createTime: "2025-06-16T04:22:29.000Z",
                        updateTime: "2026-04-15T05:32:24.000Z",
                    },
                },
            },
            {
                id: 655149,
                uid: 4289,
                username: "Kitty黎银春",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 4289,
                    username: "Kitty黎银春",
                    rid: 2150,
                    currentRole: {
                        id: 2150,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "Kitty黎银春的角色",
                        createUid: null,
                        createTime: "2024-08-01T02:56:43.000Z",
                        updateTime: "2024-08-01T02:56:43.000Z",
                    },
                },
            },
            {
                id: 655150,
                uid: 4046,
                username: "SUNNY",
                soBindId: 118479,
                type: 0,
                createTime: "2026-05-18T02:34:59.000Z",
                updateTime: "2026-05-18T02:34:59.000Z",
                user: {
                    id: 4046,
                    username: "SUNNY",
                    rid: 2124,
                    currentRole: {
                        id: 2124,
                        status: 0,
                        cid: 2,
                        fid: null,
                        name: "SUNNY的角色",
                        createUid: null,
                        createTime: "2024-04-18T05:53:35.000Z",
                        updateTime: "2024-04-18T05:53:35.000Z",
                    },
                },
            },
        ],
        route: {
            id: 10,
            name: "东南亚线",
            nameEn: "IPC",
            status: 0,
            port: null,
            createTime: "2020-02-17T06:54:26.000Z",
            updateTime: "2021-08-03T06:44:32.000Z",
        },
        party: {
            id: 5918,
            name: "海洋网联船务（中国）有限公司",
            code: "HDHYWL2",
        },
        demand: {
            id: 16744,
            name: "上海怡世豪国际物流有限公司",
            code: "HDSHYSHGJW",
            contractExpiryDate: "2027-05-08",
            vip: 0,
        },
        xcompany: null,
        freightss: {
            id: 5579885,
            routeId: 10,
            remark: ".",
            remarkOp: "OBS USD30PER TEU Included",
            firstSupply: "上海泛远国际货运代理有限公司",
            startPortPierId: 502,
            route: {
                id: 10,
                name: "东南亚线",
            },
            startPortPier: {
                nameEn: "WGQ4",
            },
        },
        chat_users: [],
        kid2List: "",
        company: {
            id: 2,
            name: "上海泛远国际货运代理有限公司",
            status: 0,
            code: "HDFYGJ1",
        },
        uidUser: {
            id: 6108,
            cid: 16744,
            username: "上海怡世豪",
            email: null,
        },
        kidUser: {
            id: 5031,
            cid: 2,
            username: "Ozzy李贺02",
            email: "3001383936@qq.com",
        },
        sidUser: {
            id: 5055,
            cid: 2,
            username: "Jacf陈嘉富",
            email: "chenjiafu@sfyf.cn",
        },
    },
    endPortPierData: null,
    containner_vgms: [
        {
            id: 231948,
            oid: 121726,
            lclid: 0,
            cabinId: 0,
            vC: 0,
            ladingNub: null,
            type: false,
            cType: 2,
            boxNub: "abc123",
            sealNUb: "123456",
            price: "1100.00",
            self: false,
            overweight: "0.000",
            overhigh: false,
            containnerMark: false,
            hostMark: false,
            specialMsg: null,
            remark: null,
            responsible: null,
            method: false,
            unit: null,
            weighing: null,
            verifyNub: null,
            signature: null,
            signatureEm: null,
            amount: 0,
            weight: "0.000",
            volume: "0.000",
            czbs: "0.000",
            basePrice: "1100.00",
            freetimePrice: "0.00",
            demurrage: null,
            combine: null,
            detention: null,
            qy: 0,
            refer: 0,
            vgmDate: null,
            openPrice: "1100.00",
            createTime: "2026-05-18T02:34:59.000Z",
            updateTime: "2026-05-18T02:34:59.000Z",
        },
    ],
    sea_order_contacts: [
        {
            id: 384125,
            oid: 121726,
            cabinId: 0,
            lclid: 0,
            type: false,
            master: "WUXI ALINK OPTOELECTRONIC CO.,LTD",
            address: "BUILDING 1-2, NO.95 YANGGANG ROAD,\nYANGJIAN TOWN, XISHAN DISTRICT,\nWUXI CITY, JIANGSU PROVINCE, CHINA",
            firmCode: null,
            country: null,
            phone: null,
            aeo: null,
            spName: "",
            spType: null,
            spContact: null,
            qy: 0,
            createTime: "2026-05-18T02:34:59.000Z",
            updateTime: "2026-05-18T06:04:11.000Z",
        },
        {
            id: 384126,
            oid: 121726,
            cabinId: 0,
            lclid: 0,
            type: 2,
            master: "URBAN CRATE INDUSTRY (003705495-K)",
            address: "20 JALAN BUKIT PANCHOR\nTAMAN CAMAR JAYA\n14300 NIBONG TEBAL",
            firmCode: null,
            country: null,
            phone: null,
            aeo: null,
            spName: "",
            spType: null,
            spContact: null,
            qy: 0,
            createTime: "2026-05-18T02:34:59.000Z",
            updateTime: "2026-05-18T06:04:11.000Z",
        },
        {
            id: 384127,
            oid: 121726,
            cabinId: 0,
            lclid: 0,
            type: true,
            master: "URBAN CRATE INDUSTRY(003705495-K)",
            address: "20 JALAN BUKIT PANCHOR\nTAMAN CAMAR JAYA\n14300 NIBONG TEBAL",
            firmCode: null,
            country: null,
            phone: null,
            aeo: null,
            spName: "",
            spType: null,
            spContact: null,
            qy: 0,
            createTime: "2026-05-18T02:34:59.000Z",
            updateTime: "2026-05-18T06:04:11.000Z",
        },
    ],
    goods: [
        {
            id: 128239,
            oid: 121726,
            cabinId: 0,
            lclid: 0,
            shantou: "aaa",
            name: "COLD WATER MACHINE",
            description: "",
            cargoType: false,
            amount: "7.000",
            unit: null,
            weight: "5603.000",
            volume: "39.780",
            hscode: "85431000",
            dangerClass: null,
            unNub: null,
            dangerCode: null,
            dangerPoint: "0",
            packType: "PALLET",
            packDesc: null,
            packWeight: null,
            packSize: null,
            grossWeight: null,
            quarantineCode: null,
            quarantineName: null,
            sign: null,
            qy: 0,
            conid: null,
            exigencyName: null,
            exigencyPhone: null,
            exigencyEmail: null,
            exigencyFax: null,
            mp: false,
            createTime: "2026-05-18T02:34:59.000Z",
            updateTime: "2026-05-18T06:04:11.000Z",
        },
    ],
    startPortData: {
        id: 599,
        name: "上海",
        nameEn: "SHANGHAI",
        code: "CNSHA",
    },
    purposePortData: {
        id: 2445,
        name: "槟城",
        nameEn: "PENANG",
        code: "MYPEN",
    },
    uploadPortsea: {
        id: 3108,
        name: "新加坡",
        nameEn: "SINGAPORE",
        code: "SGSIN",
    },
    carrier: {
        id: 30,
        code: "MSK",
        name: "海洋网联",
        nameEn: "ONE",
    },
    operation: null,
    trailerCom: null,
    orderUser: null,
    leader: "LUNA/QUEENCY/HELEN/BrucedadA/JASMINE/MERA/ZELDA/+84865439399/SORA/KATHY RUAN/宋诗聪/JANCY/MIRA/LYN/ASTRA/HENRY/Kitty黎银春/SUNNY",
    xxxl: "40HCX1",
}

function importData() {
    const ystObj = () => {
        return {
            1: "CY-CY",
            2: "CY-CFS",
            3: "CFS-CY",
            4: "CFS-CFS",
            5: "CY-DR",
            6: "CFS-DR",
            7: "DR-CY",
            8: "DR-CFS",
            9: "DR-DR",
            10: "CY-RAMP",
            11: "CY-FO",
            12: "CY-LO",
            13: "DR-FO",
            14: "DR-LO",
            15: "TACKLE-CY",
            16: "CY-TACKLE",
            17: "TACKLE-CFS",
            18: "RAMP-CY",
            19: "FI-CY",
            20: "FI-D",
            21: "LI-CY",
            22: "LI-DR",
            23: "CY-SHIPSHOOK",
            24: "CY-RAMP",
        }
    }

    const transportTerms = (ystObj()[data.transportTerms as keyof typeof ystObj] as string).split("-")
    const transportTerm = transportTerms[0] + "/" + transportTerms[1]

    setTimeout(() => {
        const btns = document.querySelectorAll(".el-button.el-button--primary") as NodeListOf<HTMLElement>

        btns[1]?.click()

        waitUntil(
            () => {
                return location.href.includes("/newManifest?flag=0&billId=0")
            },

            async () => {
                try {
                    // ship name
                    const shipName = data.shipName.split("/")[0]
                    const shipVoyage = data.shipName.split("/")[1]
                    const shipNameFull = `${shipName}/${shipVoyage}`

                    await chooseSelectByLabel("船名航次", shipName, shipNameFull, 13)

                    // Loading port
                    await chooseSelectByLabel("装货港", data.startPortData.code, `${data.startPortData.code}/${data.startPortData.nameEn}`, 14)

                    // Discharge port
                    await chooseSelectByLabel("卸货港", data.uploadPortsea.code, `${data.uploadPortsea.code}/${data.uploadPortsea.nameEn}`, 15)

                    // Payment method
                    await selectPaymentMethod("付款方式", "PAY IN CASH", 16)

                    // Carrier
                    await selectPaymentMethod("提单承运人", data.carrier.code, 17)

                    // BL No
                    const blNoInput = document.querySelector(".el-input__inner") as HTMLInputElement
                    setNativeValue(blNoInput, data.blNo)

                    // Destination port
                    await chooseSelectByLabel("目的港", data.purposePortData.code, `${data.purposePortData.code}/${data.purposePortData.nameEn}`, 18)

                    // Service terms
                    await selectPaymentMethod("服务条款", transportTerm, 19)

                    // BL type
                    await selectPaymentMethod("提单性质", "正常", 20)

                    // Shipper
                    await setTextareaByLabel("发货人", getContactByType(false)?.master || "")
                    // Consignee
                    await setTextareaByLabel("收货人", getContactByType(2)?.master || "")
                    // Notify party
                    await setTextareaByLabel("通知人", getContactByType(true)?.master || "")

                    // Shipper address
                    await setInputByLabel("发货人地址", getContactByType(false)?.address || "")
                    // Consignee address
                    await setInputByLabel("收货人地址", getContactByType(2)?.address || "")
                    // Notify party address
                    await setInputByLabel("通知人地址", getContactByType(true)?.address || "")

                    // Goods
                    for (const good of data.goods) {
                        waitUntil(
                            () => !!document.querySelector(".el-button.el-button--primary.el-button--small"),
                            () => {
                                const buttonNewContact = document.querySelector(".el-button.el-button--primary.el-button--small") as HTMLElement
                                buttonNewContact.click()
                            }
                        )

                        // Amount
                        waitUntil(
                            () => {
                                const formItem = Array.from(document.querySelectorAll(".el-form-item")).find(
                                    (item) => item.querySelector(".el-form-item__label")?.textContent?.trim() === "件数"
                                ) as HTMLElement

                                if (!formItem) {
                                    return false
                                }

                                return true
                            },
                            async () => {
                                await setInputByLabel("件数", good.amount)
                            }
                        )
                        // Weight
                        waitUntil(
                            () => {
                                const formItem = Array.from(document.querySelectorAll(".el-form-item")).find(
                                    (item) => item.querySelector(".el-form-item__label")?.textContent?.trim() === "重量 KGS"
                                ) as HTMLElement

                                if (!formItem) {
                                    return false
                                }
                                return true
                            },
                            async () => {
                                await setInputByLabel("重量 KGS", good.weight)
                            }
                        )
                        waitUntil(
                            () => {
                                const formItem = Array.from(document.querySelectorAll(".el-form-item")).find(
                                    (item) => item.querySelector(".el-form-item__label")?.textContent?.trim() === "体积(立方米)"
                                ) as HTMLElement

                                if (!formItem) {
                                    return false
                                }
                                return true
                            },
                            async () => {
                                await setInputByLabel("体积(立方米)", good.volume)
                            }
                        )
                        // Goods name
                        waitUntil(
                            () => {
                                const formItem = Array.from(document.querySelectorAll(".el-form-item")).find(
                                    (item) => item.querySelector(".el-form-item__label")?.textContent?.trim() === "品名"
                                ) as HTMLElement

                                if (!formItem) {
                                    return false
                                }
                                return true
                            },
                            async () => {
                                await setTextareaByLabel("品名", good.name)
                            }
                        )
                        // Mark
                        waitUntil(
                            () => {
                                const formItem = Array.from(document.querySelectorAll(".el-form-item")).find(
                                    (item) => item.querySelector(".el-form-item__label")?.textContent?.trim() === "唛头"
                                ) as HTMLElement

                                if (!formItem) {
                                    return false
                                }
                                return true
                            },
                            async () => {
                                await setTextareaByLabel("唛头", good.shantou)
                            }
                        )
                        // Pack type
                        waitUntil(
                            () => {
                                const formItem = Array.from(document.querySelectorAll(".el-form-item")).find(
                                    (item) => item.querySelector(".el-form-item__label")?.textContent?.trim() === "包装类型名称"
                                ) as HTMLElement
                                console.log("formItem", formItem)
                                if (!formItem) {
                                    return false
                                }
                                return true
                            },
                            async () => {
                                await chooseSelectByLabel("包装类型名称", good.packType, good.packType, 24)
                            }
                        )

                        await sleep(10000)

                        const buttonCreate = Array.from(document.querySelectorAll(".el-button.el-button--primary.el-button--default")).find(
                            (item) => item.querySelector(".el-button__text--expand")?.textContent?.trim() === "保存"
                        ) as HTMLElement
                        console.log("buttonCreate", buttonCreate)
                        buttonCreate.click()
                    }

                    // containner_vgms
                    for (const container of data.containner_vgms) {
                        const buttonCreate = document.querySelector(".vxe-button.type--button.size--mini.theme--primary") as HTMLElement
                        console.log("buttonCreate", buttonCreate)
                        buttonCreate.click()
                        await sleep(3000)
                        let input = document.querySelector(".vxe-input--inner") as HTMLInputElement

                        setNativeValue(input, container.boxNub)

                        await sleep(500)

                        // click sang cell seal
                        const clickSelect = document.querySelector(".vxe-body--column.col_26") as HTMLElement

                        clickSelect.click()

                        // CHỜ UI render input mới
                        await sleep(500)

                        // ===== seal =====

                        input = document.querySelector(".vxe-input--inner") as HTMLInputElement

                        setNativeValue(input, container.sealNUb)

                        await sleep(500)

                        // click sang cell price
                        const clickSelectSize = document.querySelector(".vxe-body--column.col_27") as HTMLElement
                        clickSelectSize.click()
                        await sleep(500)
                        input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        input.click()
                        const size = data.xxxl.split(/(?=[A-Za-z])/)[0]
                        await sleep(1000)

                        // const selectSize = document.querySelector(".vxe-table--ignore-clear.vxe-select--panel.is--transfer") as HTMLElement
                        const optionSize = Array.from(document.querySelectorAll(".vxe-select-option")).find(
                            (x) => x.textContent === size
                        ) as HTMLElement

                        console.log("optionSize", optionSize)
                        optionSize.click()
                        await sleep(1000)

                        const clickSelectType = document.querySelector(".vxe-body--column.col_28") as HTMLElement
                        clickSelectType.click()
                        await sleep(500)
                        const selectType = document.querySelectorAll(".el-select__selection")[11] as HTMLInputElement
                        selectType.click()
                        const type = data.xxxl.match(/\d+([A-Z]+)(?=[xX])/i)?.[1] || ""
                        console.log("type", type)
                        await sleep(1000)
                        await chooseSelect(type, 24)
                        // console.log("optionType", optionType)
                        await sleep(2000)
                        // optionType.click()

                        // click sang cell price
                        // const clickSelectPrice = document.querySelector(".vxe-body--column.col_27") as HTMLElement
                        // clickSelectPrice.click()
                        // await sleep(500)
                        // input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        // setNativeValue(input, container.price)
                        // await sleep(500)
                    }

                    chrome.storage.local.set({
                        started: false,
                    })
                } catch (error) {
                    console.error("Error:", error)
                }
            }
        )
        // console.log("Import success")

        // chrome.storage.local.set({
        //     started: false,
        // })
    }, 1000)
}

function setNativeValue(element: HTMLInputElement, value: string) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set

    setter?.call(element, value)

    element.dispatchEvent(
        new Event("input", {
            bubbles: true,
        })
    )

    element.dispatchEvent(
        new Event("change", {
            bubbles: true,
        })
    )
}

// function waitForInput() {
//     return new Promise<HTMLInputElement>((resolve) => {
//         const timer = setInterval(() => {
//             const input = document.querySelector(".vxe-input--inner") as HTMLInputElement

//             if (input) {
//                 clearInterval(timer)
//                 resolve(input)
//             }
//         }, 200)
//     })
// }

async function selectPaymentMethod(label: string, value: string, i: number) {
    const form = Array.from(document.querySelectorAll(".el-form-item")).find(
        (x) => x.querySelector(".el-form-item__label")?.textContent?.trim() === label
    ) as HTMLElement
    const wrapper = form?.querySelector(".el-select__wrapper") as HTMLElement

    wrapper?.click()
    await sleep(1000)

    const selectPoppers = document.querySelectorAll(".el-popper.is-pure.is-light.el-select__popper") as NodeListOf<HTMLElement>
    // console.log("selectPoppers", selectPoppers)

    const selectPopper = selectPoppers[i] as HTMLElement

    const option = Array.from(selectPopper.querySelectorAll(".el-select-dropdown__item")).find((x) =>
        x.textContent?.toUpperCase().includes(value.toUpperCase())
    ) as HTMLElement

    if (!option) throw Error(`missing ${value}`)

    option.click()

    // đóng dropdown
    document.body.click()

    await sleep(1000)

    console.log("Selected", label, value)
}

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms))
}

async function chooseSelectByLabel(label: string, code: string, full: string, i: number) {
    const form = Array.from(document.querySelectorAll(".el-form-item")).find(
        (x) => x.querySelector(".el-form-item__label")?.textContent?.trim() === label
    ) as HTMLElement

    const wrapper = form?.querySelector(".el-select__wrapper") as HTMLElement

    wrapper?.click()

    await sleep(500)

    const input = wrapper?.querySelector(".el-select__input.is-default") as HTMLInputElement
    console.log("input", input)

    setNativeValue(input, code)

    await sleep(5000)
    const selectPoppers = document.querySelectorAll(".el-popper.is-pure.is-light.el-select__popper") as NodeListOf<HTMLElement>
    // console.log("selectPoppers", selectPoppers)

    const selectPopper = selectPoppers[i] as HTMLElement

    const option = Array.from(selectPopper.querySelectorAll(".el-select-dropdown__item")).find((x) =>
        x.textContent?.toUpperCase().includes(full.toUpperCase())
    ) as HTMLElement

    if (!option) throw Error(`missing ${full}`)

    option.click()

    // đóng dropdown
    document.body.click()

    await sleep(1000)

    console.log("Selected", label, full)

    // KHÔNG check selectedText nữa
    return true
}

async function chooseSelect(value: string, i: number) {
    const selectPoppers = document.querySelectorAll(".el-popper.is-pure.is-light.el-select__popper") as NodeListOf<HTMLElement>
    // console.log("selectPoppers", selectPoppers)

    const selectPopper = selectPoppers[i] as HTMLElement
    console.log("selectPopper", selectPopper)
    const option = Array.from(selectPopper.querySelectorAll(".el-select-dropdown__item")).find((x) =>
        x.textContent?.toUpperCase().includes(value.toUpperCase())
    ) as HTMLElement
    console.log("option", option)
    if (!option) throw Error(`missing ${value}`)

    option.click()

    // đóng dropdown
    document.body.click()

    await sleep(1000)

    console.log("Selected", value)

    // KHÔNG check selectedText nữa
    return true
}

async function setTextareaByLabel(labelText: string, value: string) {
    const formItem = Array.from(document.querySelectorAll(".el-form-item")).find(
        (item) => item.querySelector(".el-form-item__label")?.textContent?.trim() === labelText
    ) as HTMLElement

    if (!formItem) {
        throw Error(`${labelText} not found`)
    }

    const textarea = formItem.querySelector("textarea") as HTMLTextAreaElement

    if (!textarea) {
        throw Error(`${labelText} textarea missing`)
    }

    // set value theo kiểu native
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set

    setter?.call(textarea, value)

    textarea.dispatchEvent(new Event("input", { bubbles: true }))

    textarea.dispatchEvent(new Event("change", { bubbles: true }))

    textarea.dispatchEvent(new Event("blur", { bubbles: true }))

    console.log(`${labelText} updated`)
}

async function setInputByLabel(labelText: string, value: string) {
    const formItem = Array.from(document.querySelectorAll(".el-form-item")).find(
        (item) => item.querySelector(".el-form-item__label")?.textContent?.trim() === labelText
    ) as HTMLElement

    if (!formItem) {
        throw Error(`${labelText} not found`)
    }

    const input = formItem.querySelector("input") as HTMLInputElement
    console.log("input", input)

    if (!input) {
        throw Error(`${labelText} input missing`)
    }

    // set value theo kiểu native
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set

    setter?.call(input, value)

    input.dispatchEvent(new Event("input", { bubbles: true }))

    input.dispatchEvent(new Event("change", { bubbles: true }))

    input.dispatchEvent(new Event("blur", { bubbles: true }))

    console.log(`${labelText} updated`)
}

function getContactByType(type: boolean | number) {
    return data.sea_order_contacts.find((x) => x.type === type)
}
