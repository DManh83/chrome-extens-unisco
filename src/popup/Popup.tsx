import { useState } from "react"

function Popup() {
    const loginUrl = "https://www.unisco.com.cn/#/login"

    const [blNo, setBlNo] = useState("")
    const [carrierCode, setCarrierCode] = useState("")

    const start = () => {
        chrome.storage.local.set({
            started: true,
            blNo,
            carrierCode,
        })

        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs) => {
                const tab = tabs[0]

                const isUnisco = tab.url?.includes("unisco.com.cn")

                if (!isUnisco) {
                    chrome.tabs.create({
                        url: loginUrl,
                    })

                    return
                }

                chrome.tabs.reload(tab.id!)
            }
        )
    }

    return (
        <div
            style={{
                padding: 12,
                width: 300,
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <input type='text' placeholder='BL No' value={blNo} onChange={(e) => setBlNo(e.target.value)} />

            <input type='text' placeholder='Carrier Code' value={carrierCode} onChange={(e) => setCarrierCode(e.target.value)} />

            <button onClick={start}>Start</button>
        </div>
    )
}

export default Popup
