/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

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
            chrome.storage.local.get(["blNo", "carrierCode"], (result) => {
                importData(result.blNo as string, result.carrierCode as string)
            })
        }
    )
}

async function getData(blNo: string) {
    // const data = await axios.get(`https://www.dadaex.cn/api/vn/order/getManifestInfo?blNo=${blNo}`)
    const data = await axios.get(`http://localhost:3001/vn/order/getManifestInfo?blNo=${blNo}`)
    if (!data.data.data) {
        return null
    }
    return data.data.data
}

// const dataTest = {
//     id: 16792,
//     status: false,
//     oid: 122196,
//     ebId: 0,
//     blNo: "802220087",
//     shipName: "ERASMUS PASSION",
//     voyage: "622S",
//     loadCode: "CNSHA",
//     loadPort: 599,
//     uploadCode: "THLCH",
//     uploadPort: 3174,
//     aimPort: 3174,
//     aimPortCode: "THLCH",
//     payType: false,
//     transportTerms: "1",
//     cdstatus: 0,
//     cderror: null,
//     cdreceipt: null,
//     subNumber: 0,
//     qy: 0,
//     msgType: 0,
//     carrierCode: "MCC",
//     createTime: "2026-05-29T06:16:13.000Z",
//     updateTime: "2026-05-29T06:16:25.000Z",
//     cdCon: [
//         {
//             id: 233397,
//             oid: 0,
//             lclid: 0,
//             cabinId: 16792,
//             vC: 0,
//             ladingNub: null,
//             type: false,
//             cType: 2,
//             boxNub: "TGBU8897976",
//             sealNUb: "CN4802340",
//             price: null,
//             self: false,
//             overweight: "0.000",
//             overhigh: false,
//             containnerMark: false,
//             hostMark: false,
//             specialMsg: null,
//             remark: null,
//             responsible: null,
//             method: false,
//             unit: null,
//             weighing: null,
//             verifyNub: null,
//             signature: null,
//             signatureEm: null,
//             amount: 36,
//             weight: "8568.000",
//             volume: "46.901",
//             czbs: "0.000",
//             basePrice: null,
//             freetimePrice: "0.00",
//             demurrage: null,
//             combine: null,
//             detention: null,
//             qy: 0,
//             refer: 0,
//             vgmDate: null,
//             openPrice: "0.00",
//             createTime: "2026-05-29T06:16:13.000Z",
//             updateTime: "2026-05-29T06:16:25.000Z",
//         },
//         {
//             id: 233398,
//             oid: 0,
//             lclid: 0,
//             cabinId: 16793,
//             vC: 0,
//             ladingNub: null,
//             type: false,
//             cType: 2,
//             boxNub: "TGBU8897977",
//             sealNUb: "CN4802341",
//             price: null,
//             self: false,
//             overweight: "0.000",
//             overhigh: false,
//             containnerMark: false,
//             hostMark: false,
//             specialMsg: null,
//             remark: null,
//             responsible: null,
//             method: false,
//             unit: null,
//             weighing: null,
//             verifyNub: null,
//             signature: null,
//             signatureEm: null,
//             amount: 36,
//             weight: "8568.000",
//             volume: "46.901",
//             czbs: "0.000",
//             basePrice: null,
//             freetimePrice: "0.00",
//             demurrage: null,
//             combine: null,
//             detention: null,
//             qy: 0,
//             refer: 0,
//             vgmDate: null,
//             openPrice: "0.00",
//             createTime: "2026-05-29T06:16:13.000Z",
//             updateTime: "2026-05-29T06:16:25.000Z",
//         },
//     ],
//     loadPortData: {
//         id: 599,
//         name: "上海",
//         nameEn: "SHANGHAI",
//     },
//     uploadPortData: {
//         id: 3174,
//         name: "林查班",
//         nameEn: "LAEM CHABANG",
//     },
//     aimPortData: {
//         id: 3174,
//         name: "林查班",
//         nameEn: "LAEM CHABANG",
//     },
//     cabContacts: [
//         {
//             id: 386251,
//             oid: 0,
//             cabinId: 16792,
//             lclid: 0,
//             type: 2,
//             master: "TCC LOGISTICS LIMITED",
//             address: "LUMPINI TOWER,3RD FLOOR,NO.1168/5,RAMA 4ROAD,TUNGMAHAMEK,SATHORN,BANGKOK 10120,THAILAND",
//             firmCode: null,
//             country: "TH",
//             phone: "66(0)2 0267111",
//             aeo: null,
//             spName: null,
//             spType: "0",
//             spContact: null,
//             qy: 0,
//             createTime: "2026-05-29T06:16:13.000Z",
//             updateTime: "2026-05-29T06:16:25.000Z",
//         },
//         {
//             id: 386250,
//             oid: 0,
//             cabinId: 16792,
//             lclid: 0,
//             type: true,
//             master: "TCC LOGISTICS LIMITED",
//             address: "LUMPINI TOWER,3RD FLOOR,NO.1168/5,RAMA 4ROAD,TUNGMAHAMEK,SATHORN,BANGKOK 10120,THAILAND",
//             firmCode: null,
//             country: "TH",
//             phone: "66(0)2 0267111",
//             aeo: null,
//             spName: null,
//             spType: "0",
//             spContact: null,
//             qy: 0,
//             createTime: "2026-05-29T06:16:13.000Z",
//             updateTime: "2026-05-29T06:16:25.000Z",
//         },
//         {
//             id: 386249,
//             oid: 0,
//             cabinId: 16792,
//             lclid: 0,
//             type: false,
//             master: "REX INTERNATIONAL LOGISTICS CO.,LTD.CHONGQING BRANCH",
//             address: "ROOM.1706,BUILDING 1,LONGHU NEW FIRST STREET,JIANGBEI DISTRICT,CHONGQING,CHINA",
//             firmCode: null,
//             country: "CN",
//             phone: "86-23-6776 2322",
//             aeo: null,
//             spName: null,
//             spType: "0",
//             spContact: null,
//             qy: 0,
//             createTime: "2026-05-29T06:16:13.000Z",
//             updateTime: "2026-05-29T06:16:25.000Z",
//         },
//     ],
//     cdgoods: [
//         {
//             id: 128947,
//             oid: 0,
//             cabinId: 16792,
//             lclid: 0,
//             shantou: "WTP-HUB26052601",
//             name: "JBW CASE ASSY",
//             description: null,
//             cargoType: false,
//             amount: "36.000",
//             unit: "PALLETS",
//             weight: "8568.000",
//             volume: "46.901",
//             hscode: null,
//             dangerClass: null,
//             unNub: null,
//             dangerCode: null,
//             dangerPoint: "0",
//             packType: null,
//             packDesc: null,
//             packWeight: null,
//             packSize: null,
//             grossWeight: null,
//             quarantineCode: null,
//             quarantineName: null,
//             sign: null,
//             qy: 0,
//             conid: null,
//             exigencyName: null,
//             exigencyPhone: null,
//             exigencyEmail: null,
//             exigencyFax: null,
//             mp: false,
//             createTime: "2026-05-29T06:16:13.000Z",
//             updateTime: "2026-05-29T06:16:25.000Z",
//         },
//     ],
// }

function getCType(cType: number) {
    const containerNumberMap = {
        0: "20GP",
        1: "40GP",
        2: "40HQ",
        3: "20FR",
        4: "40FR",
        5: "20RF",
        6: "40RF",
        7: "20OT",
        8: "40OT",
        9: "40OH",
        10: "20TK",
        11: "40TK",
        12: "20HT",
        13: "40HT",
        14: "45HQ",
        15: "20DG",
        16: "40DG",
        17: "20FQ",
        18: "40FQ",
    }

    return containerNumberMap[cType as keyof typeof containerNumberMap]
}

async function importData(blNo: string, carrierCode: string) {
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

    const data = await getData(blNo)
    console.log("data", data)

    const transportTerms = (ystObj()[data.transportTerms as keyof typeof ystObj] as string).split("-")
    const transportTerm = transportTerms[0] + "/" + transportTerms[1]

    if (!data) {
        console.error("Data not found")
        return
    }

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
                    const shipNameFull = `${data.shipName}/${data.voyage}`
                    await chooseSelectByLabel("船名航次", data.shipName, shipNameFull, 13)
                    // Loading port
                    await chooseSelectByLabel("装货港", data.loadCode, `${data.loadCode}/${data.loadPortData.nameEn}`, 14)
                    // Discharge port
                    await chooseSelectByLabel("卸货港", data.uploadCode, `${data.uploadCode}/${data.uploadPortData.nameEn}`, 15)
                    // Payment method
                    await selectPaymentMethod("付款方式", "PREPAID", 16)
                    // Carrier
                    await selectPaymentMethod("提单承运人", carrierCode, 17)
                    // BL No
                    const blNoInput = document.querySelector(".el-input__inner") as HTMLInputElement
                    setNativeValue(blNoInput, data.blNo)
                    // Destination port
                    await chooseSelectByLabel("目的港", data.aimPortCode, `${data.aimPortCode}/${data.aimPortData.nameEn}`, 18)
                    // Service terms
                    await selectPaymentMethod("服务条款", transportTerm, 19)
                    // BL type
                    await selectPaymentMethod("提单性质", "正常", 20)
                    // Shipper
                    await setTextareaByLabel("发货人", getContactByType(false, data)?.master || "")
                    // Consignee
                    await setTextareaByLabel("收货人", getContactByType(2, data)?.master || "")
                    // Notify party
                    await setTextareaByLabel("通知人", getContactByType(true, data)?.master || "")
                    // Shipper address
                    await setInputByLabel("发货人地址", getContactByType(false, data)?.address || "")
                    // Consignee address
                    await setInputByLabel("收货人地址", getContactByType(2, data)?.address || "")
                    // Notify party address
                    await setInputByLabel("通知人地址", getContactByType(true, data)?.address || "")
                    // Shipper country code
                    // await setInputByLabel("发货人国家代码", getContactByType(false)?.country || "")
                    await chooseSelectByLabel(
                        "发货人国家代码",
                        getContactByType(false, data)?.country || "",
                        getContactByType(false, data)?.country || "",
                        21
                    )
                    // Consignee country code
                    // await setInputByLabel("收货人国家代码", getContactByType(2)?.country || "")
                    await chooseSelectByLabel(
                        "收货人国家代码",
                        getContactByType(2, data)?.country || "",
                        getContactByType(2, data)?.country || "",
                        22
                    )
                    // Notify party country code
                    // await setInputByLabel("通知人国家代码", getContactByType(true)?.country || "")
                    await chooseSelectByLabel(
                        "通知人国家代码",
                        getContactByType(true, data)?.country || "",
                        getContactByType(true, data)?.country || "",
                        23
                    )
                    // Shipper phone
                    await setInputByLabel("发货人电话", getContactByType(false, data)?.phone || "")
                    // Consignee phone
                    await setInputByLabel("收货人电话", getContactByType(2, data)?.phone || "")
                    // Notify party phone
                    await setInputByLabel("通知人电话", getContactByType(true, data)?.phone || "")

                    // Goods
                    for (const good of data.cdgoods) {
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
                                if (good.unit === "PALLETS") {
                                    await chooseSelectByLabel("包装类型名称", "PALLET", "PALLET", 24)
                                } else {
                                    await chooseSelectByLabel("包装类型名称", good.unit, good.unit, 24)
                                }
                            }
                        )

                        waitUntil(
                            () => {
                                const radio = document.querySelector(".el-radio") as HTMLElement
                                return radio ? true : false
                            },
                            async () => {
                                const cargoType = good.cargoType === false ? "普通" : "危险品"
                                await selectRadioByLabel(cargoType)
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
                    for (const container of data.cdCon) {
                        const type = getCType(container.cType).match(/\d+/)?.[0] || ""
                        const size = getCType(container.cType).match(/[A-Za-z]+/)?.[0] || ""
                        console.log("size", size)
                        console.log("type", type)

                        const buttonCreate = document.querySelector(".vxe-button.type--button.size--mini.theme--primary") as HTMLElement
                        console.log("buttonCreate", buttonCreate)
                        buttonCreate.click()
                        await sleep(3000)

                        //container number
                        let input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        setNativeValue(input, container.boxNub || "")
                        await sleep(500)

                        // seal number
                        const clickSelect = document.querySelector(".vxe-body--column.col_26") as HTMLElement
                        clickSelect.click()
                        await sleep(500)
                        input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        setNativeValue(input, container.sealNUb || "")
                        await sleep(500)

                        // size
                        const clickSelectSize = document.querySelector(".vxe-body--column.col_27") as HTMLElement
                        clickSelectSize.click()
                        await sleep(500)
                        input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        input.click()
                        await sleep(1000)

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
                        console.log("selectType", selectType)
                        await sleep(3000)
                        if (type === "HQ") {
                            await chooseSelect("HC", 25)
                        } else {
                            await chooseSelect(type, 25)
                        }
                        await sleep(2000)

                        // status
                        const clickSelectStatus = document.querySelector(".vxe-body--column.col_29") as HTMLElement
                        clickSelectStatus.click()
                        await sleep(500)
                        input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        input.click()
                        const status = "F"
                        await sleep(1000)
                        const optionStatus = Array.from(document.querySelectorAll(".vxe-select-option")).find(
                            (x) => x.textContent === status
                        ) as HTMLElement
                        console.log("optionStatus", optionStatus)
                        optionStatus.click()
                        await sleep(1000)

                        // amount
                        const clickSelectAmount = document.querySelector(".vxe-body--column.col_30") as HTMLElement
                        clickSelectAmount.click()
                        await sleep(500)
                        input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        setNativeValue(input, container.amount || 0)
                        await sleep(500)

                        // weight
                        const clickSelectWeight = document.querySelector(".vxe-body--column.col_31") as HTMLElement
                        clickSelectWeight.click()
                        await sleep(500)
                        input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        setNativeValue(input, container.weight || 0)
                        await sleep(500)

                        // volume
                        const clickSelectVolume = document.querySelector(".vxe-body--column.col_32") as HTMLElement
                        clickSelectVolume.click()
                        await sleep(500)
                        input = document.querySelector(".vxe-input--inner") as HTMLInputElement
                        setNativeValue(input, container.volume || 0)
                        await sleep(500)
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

async function selectRadioByLabel(labelText: string) {
    const radio = Array.from(document.querySelectorAll(".el-radio")).find(
        (el) => el.querySelector(".el-radio__label")?.textContent?.trim() === labelText
    ) as HTMLElement

    if (!radio) {
        throw new Error(`Radio "${labelText}" not found`)
    }

    radio.click()
}

function setNativeValue(element: HTMLInputElement, value: string | number) {
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

    const selectPopper = selectPoppers[i] as HTMLElement

    const option = Array.from(selectPopper.querySelectorAll(".el-select-dropdown__item")).find((x) =>
        x.textContent?.toUpperCase().includes(full.toUpperCase())
    ) as HTMLElement

    if (!option) throw Error(`missing ${full}`)

    option.click()

    document.body.click()

    await sleep(1000)

    console.log("Selected", label, full)

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

    document.body.click()

    await sleep(1000)

    console.log("Selected", value)

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

    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set

    setter?.call(input, value)

    input.dispatchEvent(new Event("input", { bubbles: true }))

    input.dispatchEvent(new Event("change", { bubbles: true }))

    input.dispatchEvent(new Event("blur", { bubbles: true }))

    console.log(`${labelText} updated`)
}

function getContactByType(type: boolean | number, data: any) {
    return data.cabContacts.find((x: any) => x.type === type)
}
