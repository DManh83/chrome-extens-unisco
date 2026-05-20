const username = "FANYUAN"
const password = "2025Fy@*"

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

boot()

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
    const timer = setInterval(() => {
        const stillLoginPage = location.href.includes("/#/login")

        console.log("Waiting login success:", location.href)

        if (!stillLoginPage) {
            clearInterval(timer)

            console.log("Login success, redirect manifest")

            redirectManifest()
        }
    }, 1000)
}

function redirectManifest() {
    const manifestUrl = "https://www.unisco.com.cn/#/exportDocuments/manifestEntry"

    if (location.href === manifestUrl) {
        waitManifestReady()
        return
    }

    console.log("Changing url to manifest")

    window.location.href = manifestUrl
    console.log("Changed url to manifest")
    console.log("Current url:", location.href)
    setTimeout(() => {
        waitManifestReady()
    }, 2000)
}

function waitManifestReady() {
    const timer = setInterval(() => {
        const btns = document.querySelectorAll(".el-button.el-button--primary") as NodeListOf<HTMLElement>

        if (btns.length >= 3) {
            btns[2]?.click()

            clearInterval(timer)

            importData()
        }
    }, 1000)
}

function importData() {
    setTimeout(() => {
        const btns = document.querySelectorAll(".el-button.el-button--primary") as NodeListOf<HTMLElement>

        btns[1]?.click()

        console.log("Import success")
    }, 1000)
}
