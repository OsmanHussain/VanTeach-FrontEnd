$(document).ready(function() {
    iris = iris.iris.init({
        selector: "body",
        source: "discover",
        noun: "user",
        url: "https://eventable.Athlean.cloud"
    });
    iris.emit("page_loaded")
    if (typeof mixpanel === "object") {
        // mixpanel.identify(iris.fingerprint)
    }
});