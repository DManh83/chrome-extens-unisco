function Popup() {
    const loginUrl = "https://www.unisco.com.cn/#/login"

    const start = () => {
        chrome.storage.local.set({
            started: true,
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

    return <button onClick={start}>Start</button>
}

export default Popup
