// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject jQuery
	chrome.tabs.executeScript(null, {
		file: "vendor/jquery-3.2.1.min.js"
	}, function () {
		// for the current tab, inject jQuery Table-to-JSON
		chrome.tabs.executeScript(null, {
			file: "vendor/jquery.tabletojson.min.js"
		}, function () {
			// for the current tab, inject our custom scraper
			chrome.tabs.executeScript(null, {
				file: "inject.js"
			});
		});
	});
});