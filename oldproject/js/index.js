// 浏览器对象
var objWizDoc = window.external.WizDocument;
var objDatabase = objWizDoc.Database;
var objCommon = objDatabase.CreateWizObject("WizKMControls.WizCommonUI");

// 全局变量
var objXmlDatabase = loadXmlDatabase();

// 事件绑定
window.onload = initDisplayUI;

function initDisplayUI() {
	displayWizDocInfo();
	createTodoList();
}

function loadXmlDatabase(){
	// 获得路径及字符串
	var GUID = objWizDoc.GUID;
	var tempPath = objCommon.GetSpecialFolder("TemporaryFolder");
	tempPath += GUID +"/128/";
	var xmlHref = document.getElementById("xmldata").getAttribute("href");
	var xmlTempFilePath = tempPath + xmlHref;
	var strXML = objCommon.LoadTextFromFile(xmlTempFilePath);
	// 解析字符串
	var parser = new DOMParser();
	var objXml = parser.parseFromString(strXML, "text/xml")
	return objXml;
}

function displayWizDocInfo(){
	// 获取信息
	var wizDocGUID = objWizDoc.GUID;
	var DateModified = objWizDoc.DateModified.toLocaleString();
	var DataDateModified =  objWizDoc.DataDateModified.toLocaleString();
	var DataMD5 = objWizDoc.DataMD5;
	var docVersion = objWizDoc.Version;
	var serverVersion = objWizDoc.ServerVersion;
	var xmlName = document.getElementById("xmldata").getAttribute("href");;
	var xmlName = xmlName.substr(xmlName.indexOf("ta_todolist"));
	// 创建元素
	var versionInfo = document.createElement("div");
	versionInfo.className = "ver-info";
	var verTitle = document.createElement("div");
	verTitle.textContent = "数据库文档版本信息";
	verTitle.className = "verinfo-title";
	var verGUID = document.createElement("p");
	verGUID.textContent = "GUID: " + wizDocGUID;
	var verDateModified = document.createElement("p");
	verDateModified.textContent = "文档修改时间: " + DateModified;
	var verDataDateModified = document.createElement("p");
	verDataDateModified.textContent = "数据修改时间: " + DataDateModified;
	var verDataMD5 = document.createElement("p");
	verDataMD5.textContent = "Data MD5: " + DataMD5;
	var verDocVersion = document.createElement("p");
	verDocVersion.textContent = "文档版本: " + docVersion;
	var verServerVersion = document.createElement("p");
	verServerVersion.textContent = "服务器版本: " + serverVersion;
	var verXmlVersion = document.createElement("p");
	verXmlVersion.textContent = "XML数据库版本: " + xmlName;
	// 组合元素
	versionInfo.appendChild(verTitle);
	versionInfo.appendChild(verGUID);
	versionInfo.appendChild(verDateModified);
	versionInfo.appendChild(verDataDateModified);
	versionInfo.appendChild(verDataMD5);
	versionInfo.appendChild(verDocVersion);
	versionInfo.appendChild(verServerVersion);
	versionInfo.appendChild(verXmlVersion);
	document.body.appendChild(versionInfo);
}

function createTodoList() {
	// 根据XML数据库创建Todolist
	var objTodoListAll = objXmlDatabase.evaluate("/Tomato_Assistant/TaTodoList", objXmlDatabase, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var objTodoList = objTodoListAll.iterateNext();
	while(objTodoList != null){
		// 读取属性
		var TagName = objTodoList.getAttribute("TagName");
		var ListGUID = objTodoList.getAttribute("ListGUID");
		// 创建todolist
		var todoList = document.createElement("div");
		todoList.id = ListGUID
		todoList.title = TagName
		todoList.className = "todolist";
		// 创建todolist铭牌
		var todoListTitle = document.createElement("div");
		todoListTitle.textContent = TagName;
		todoListTitle.className = "todolist-tagname";
		todoList.appendChild(todoListTitle);
		// 组合todolist元素		
		document.body.appendChild(todoList);		
		// 获得todoItem
		var todoItemAll = objXmlDatabase.evaluate(".//TaTodoItem", objTodoList, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var todoItem = todoItemAll.iterateNext();
		while (todoItem != null){
			// 基本信息
			var itemTitle = todoItem.childNodes[0].textContent;
			var todoItemElem =  document.createElement("div");
			var todoItemTitle = document.createTextNode(itemTitle);
			todoItemElem.className = "todoItem";
			todoItemElem.appendChild(todoItemTitle);
			// 组合信息
			todoList.appendChild(todoItemElem);
			// 下一个todoItem
			todoItem = todoItemAll.iterateNext();
			}
		// 下一个todolist
		objTodoList = objTodoListAll.iterateNext()
	}
}