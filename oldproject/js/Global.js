function OnTomatoCalendarClicked() {
	var pluginPath = objApp.GetPluginPathByScriptFileName("Global.js");
	objWindow.ViewHtml(`${pluginPath}dist/index.html`, true);
}

(function() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("Global.js");
    var languangeFileName = pluginPath + "src/oldproject/plugin.ini";
	// 番茄日历
	var buttonText = objApp.LoadStringFromFile(languangeFileName, "strTomatoCalendar");
	objWindow.AddToolButton("main", "TomatoCalendar", buttonText, `${pluginPath}src/oldproject/icons/calendar.ico`, "OnTomatoCalendarClicked");
})()