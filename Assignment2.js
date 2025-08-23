function launchBrowser(browserName) {
    if (browserName.toLowerCase() === "chrome") {
        console.log("Launching Chrome Browser...");
    } else if (browserName.toLowerCase() === "firefox") {
        console.log("Launching Firefox Browser...");
    } else if (browserName.toLowerCase() === "edge") {
        console.log("Launching Edge Browser...");
    } else {
        console.log("Browser not supported! Launching default Chrome...");
    }
}

function runTests(testType) {
    switch (testType.toLowerCase()) {
        case "smoke":
            console.log("Running Smoke Tests...");
            break;
        case "sanity":
            console.log("Running Sanity Tests...");
            break;
        case "regression":
            console.log("Running Regression Tests...");
            break;
        default:
            console.log("Invalid test type! Running Smoke Tests by default...");
            break;
    }
}


launchBrowser("chrome");
runTests("regression");
launchBrowser("safari");
runTests("performance");