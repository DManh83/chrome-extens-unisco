function Popup(){
    const loginUrl = "https://www.unisco.com.cn/#/login?redirect=/home"

    // const homeUrl = "https://www.unisco.com.cn/#/home";

    const handleImportDataOrderToManifest = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (!tab.id) return;
            const url = tab.url;
            const isLoginPage = url?.includes("/#/login");

            const isUnisco = url?.includes("unisco.com.cn");
            if (isLoginPage && isUnisco) {
                chrome.tabs.sendMessage(tab.id, { action: "LOGIN" });
                return;
            }
            console.log(isUnisco, isLoginPage)
            if (isUnisco && !isLoginPage) {
                chrome.tabs.sendMessage(tab.id, { action: "MANIFEST_ENTRY" });
                return;
            }
            chrome.tabs.update(tabs[0].id, { url: loginUrl })
        })
    }

    return (
        <div>
            <h1>Unisco Extension</h1>
            <button onClick={handleImportDataOrderToManifest}>
                Import data order to manifest
            </button>
        </div>
    )
}
    
export default Popup