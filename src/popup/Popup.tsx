import { useEffect, useState } from "react"
import "../App.css"

function Popup() {
    const loginUrl = "https://www.unisco.com.cn/#/login"

    const [blNo, setBlNo] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        chrome.storage.local.get(["blNo", "username"], (result) => {
            setBlNo((result.blNo as string) || "")
            setUsername((result.username as string) || "")
        })
    }, [])

    const start = () => {
        chrome.storage.local.set({
            started: true,
            blNo,
            username,
        })

        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs) => {
                const tab = tabs[0]

                const isUnisco = tab.url?.includes("unisco.com.cn")

                const isManifest = tab.url === "https://www.unisco.com.cn/#/exportDocuments/manifestEntry"
                console.log("tab.url", tab.url)
                console.log("isManifest", isManifest)
                console.log("isUnisco", isUnisco)

                if (!isUnisco) {
                    chrome.tabs.create({
                        url: loginUrl,
                    })

                    return
                }
                if (!isManifest) {
                    chrome.tabs.update(tab.id!, {
                        url: "https://www.unisco.com.cn/#/exportDocuments/manifestEntry",
                    })
                    return
                }

                chrome.tabs.reload(tab.id!)
            }
        )
    }

    return (
        <div className='popup-container'>
            <div className='popup-header'>
                <h1>🚀 UNISCO Manifest</h1>
                <p>Nhập thông tin để bắt đầu</p>
            </div>

            <div className='form-group'>
                <label>Username</label>
                <input type='text' placeholder='Nhập username...' value={username} onChange={(e) => setUsername(e.target.value.toUpperCase())} />
            </div>

            <div className='form-group'>
                <label>BL No</label>
                <input type='text' placeholder='Nhập số vận đơn...' value={blNo} onChange={(e) => setBlNo(e.target.value.toUpperCase())} />
            </div>

            <button className='start-button' onClick={start}>
                ▶️ Bắt đầu
            </button>

            <div className='popup-footer'>
                <span>Unisco Auto Manifest v2.0</span>
            </div>
        </div>
    )
}

export default Popup

