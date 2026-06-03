import { useEffect, useState } from "react"

function Popup() {
    const loginUrl = "https://www.unisco.com.cn/#/login"

    const [blNo, setBlNo] = useState("")
    const [carrierCode, setCarrierCode] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        chrome.storage.local.get(["blNo", "carrierCode", "username"], (result) => {
            setBlNo((result.blNo as string) || "")
            setCarrierCode((result.carrierCode as string) || "")
            setUsername((result.username as string) || "")
        })
    }, [blNo, carrierCode, username])

    const start = () => {
        chrome.storage.local.set({
            started: true,
            blNo,
            carrierCode,
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
        <div
            style={{
                padding: 12,
                width: 300,
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />

            <input type='text' placeholder='BL No' value={blNo} onChange={(e) => setBlNo(e.target.value)} />

            <input type='text' placeholder='Carrier Code' value={carrierCode} onChange={(e) => setCarrierCode(e.target.value)} />
            <button onClick={start}>Start</button>
        </div>
    )
}

export default Popup
