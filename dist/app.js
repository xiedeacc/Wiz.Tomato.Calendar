/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "36952e6dceb30543c2c3"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/Widget/EventPopover/EventPopover.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/Widget/EventPopover/EventPopover.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Popover 组件样式\r\n-------------------------------------------------------------------------*/\r\n\r\n/* Popover 容器及定位\r\n-------------------------------------*/\r\n\r\n.tc-popover {\r\n    position: absolute;\r\n    background: #FFF;\r\n    color: black;\r\n    width: auto;\r\n    border: 1px solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 6px;\r\n    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);\r\n    text-align: left;\r\n}\r\n\r\n.tc-popover .arrow {\r\n    position: absolute;\r\n    display: block;\r\n    width: 20px;\r\n    height: 10px;\r\n    margin: 0 6px;\r\n}\r\n\r\n.tc-popover .arrow::before, .tc-popover .arrow::after {\r\n    position: absolute;\r\n    display: block;\r\n    content: \"\";\r\n    border-color: transparent;\r\n    border-style: solid;\r\n}\r\n\r\n/* top 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"top\"] {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow {\r\n    bottom: calc((10px + 1px) * -1);\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::before,\r\n.tc-popover[x-placement^=\"top\"] .arrow::after {\r\n    border-width: 10px 10px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::before {\r\n    bottom: 0;\r\n    border-top-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::after {\r\n    bottom: 1px;\r\n    border-top-color: #fff;\r\n}\r\n\r\n/* right 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"right\"] {\r\n    margin-left: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow {\r\n    left: calc((10px + 1px) * -1);\r\n    width: 10px;\r\n    height: 20px;\r\n    margin: 6px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::before,\r\n.tc-popover[x-placement^=\"right\"] .arrow::after {\r\n    border-width: 10px 10px 10px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::before {\r\n    left: 0;\r\n    border-right-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::after {\r\n    left: 1px;\r\n    border-right-color: #fff;\r\n}\r\n\r\n/* bottom 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"bottom\"] {\r\n    margin-top: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow {\r\n    top: calc((10px + 1px) * -1);\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::before,\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::after {\r\n    border-width: 0 10px 10px 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::before {\r\n    top: 0;\r\n    border-bottom-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::after {\r\n    top: 1px;\r\n    border-bottom-color: #f7f7f7; /*这里为了专门适配有标题背景的Popover*/\r\n}\r\n\r\n/* left 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"left\"] {\r\n    margin-right: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow {\r\n    right: calc((10px + 1px) * -1);\r\n    width: 10px;\r\n    height: 20px;\r\n    margin: 6px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::before,\r\n.tc-popover[x-placement^=\"left\"] .arrow::after {\r\n    border-width: 10px 0 10px 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::before {\r\n    right: 0;\r\n    border-left-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::after {\r\n    right: 1px;\r\n    border-left-color: #fff;\r\n}\r\n\r\n/* Content 标题和内容\r\n-------------------------------------*/\r\n\r\n.tc-popover-header {\r\n    padding: .5rem .75rem;\r\n    margin-bottom: 0;\r\n    font-size: 1rem;\r\n    color: inherit;\r\n    background-color: #f7f7f7;\r\n    border-bottom: 1px solid #ebebeb;\r\n    border-top-left-radius: 6px;\r\n    border-top-right-radius: 6px;\r\n}\r\n\r\n.tc-popover-body {\r\n    padding: 10px 15px;\r\n}\r\n\r\n#tc-editpopper-eventtitle {\r\n    border-width: 1px;\r\n    border-color: transparent;\r\n    background-color: transparent;\r\n    padding: 0;\r\n    margin: 0;\r\n    font-size: 1.2em;\r\n    font-weight: bold;\r\n}\r\n\r\n#tc-popover-event-title:focus,\r\n#tc-popover-event-title:hover {\r\n    outline: none;\r\n    border-bottom-color: black; \r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/index.css":
/*!*************************************************!*\
  !*** ./node_modules/css-loader!./src/index.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html, body {\r\n    overflow: hidden;\r\n    font-size: 14px;\r\n}\r\n\r\n:focus {\r\n    outline:none;\r\n}\r\n\r\n#calendar-container {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 8px;\r\n    right: 8px;\r\n    bottom: 8px;\r\n}\r\n\r\n.fc-header-toolbar {\r\n    /*\r\n    the calendar will be butting up against the edges,\r\n    but let's scoot in the header's buttons\r\n    */\r\n    padding-top: 14px;\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n}\r\n\r\n\r\n/* Fonts.css -- 跨平台中文字体解决方案\r\n-----------------------------------------------------------------*/\r\n.font-hei {font-family: -apple-system, \"Noto Sans\", \"Helvetica Neue\", Helvetica, \"Nimbus Sans L\", Arial, \"Liberation Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans CJK SC\", \"Source Han Sans SC\", \"Source Han Sans CN\", \"Microsoft YaHei\", \"Wenquanyi Micro Hei\", \"WenQuanYi Zen Hei\", \"ST Heiti\", SimHei, \"WenQuanYi Zen Hei Sharp\", sans-serif;}\r\n.font-kai {font-family: Baskerville, Georgia, \"Liberation Serif\", \"Kaiti SC\", STKaiti, \"AR PL UKai CN\", \"AR PL UKai HK\", \"AR PL UKai TW\", \"AR PL UKai TW MBE\", \"AR PL KaitiM GB\", KaiTi, KaiTi_GB2312, DFKai-SB, \"TW-Kai\", serif;}\r\n.font-song {font-family: Georgia, \"Nimbus Roman No9 L\", \"Songti SC\", \"Noto Serif CJK SC\", \"Source Han Serif SC\", \"Source Han Serif CN\", STSong, \"AR PL New Sung\", \"AR PL SungtiL GB\", NSimSun, SimSun, \"TW-Sung\", \"WenQuanYi Bitmap Song\", \"AR PL UMing CN\", \"AR PL UMing HK\", \"AR PL UMing TW\", \"AR PL UMing TW MBE\", PMingLiU, MingLiU, serif;}\r\n.font-fang-song {font-family: Baskerville, \"Times New Roman\", \"Liberation Serif\", STFangsong, FangSong, FangSong_GB2312, \"CWTEX-F\", serif;}\r\n\r\n/* 临时放置\r\n-------------------------------------*/\r\n\r\n.ui-button-icon-only.splitbutton-select {\r\n    width: 1em;\r\n}\r\n\r\na[data-goto] {\r\n    color: #000;\r\n}\r\n\r\n/* Bootstrap 4 组件样式\r\n-------------------------------------------------------------------------*/\r\n\r\n/* 表单\r\n-------------------------------------*/\r\n.col-form-label {\r\n    padding-top: calc(.375rem + 1px);\r\n    padding-bottom: calc(.375rem + 1px);\r\n    margin-bottom: 0;\r\n    font-size: inherit;\r\n    line-height: 1.5;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/CalendarEvent.js":
/*!******************************!*\
  !*** ./src/CalendarEvent.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CalendarEvent; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fullcalendar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WizInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WizInterface */ "./src/WizInterface.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Config */ "./src/Config.js");





const g_cal = $('#calendar');

class CalendarEvent {
	constructor( data ) {
		if (!_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"]) throw new Error('IWizDatabase is not valid.');
		const type = this._checkDataType(data);
		switch ( type ) {
			case "WizEvent":
				try {
					this._Info = this._parseInfo(data.CALENDAR_INFO);
					this._ExtraInfo = data.CALENDAR_EXTRAINFO ? this._parseInfo(data.CALENDAR_EXTRAINFO) : this._getDefaultExtraInfo();
					this._create(data, type);
				} catch (e) { console.error(e); }
				break;
			case "FullCalendarEvent":
				try {
					this._create(data, type);
					// 设置info对象
					this._update();
				} catch (e) { console.error(e); }
				break;
			case "GUID":
				try {
					//TODO: 获得WizEvent数据，并创建对象
					const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(data);
					const newEventData = {
						"CALENDAR_END" : doc.GetParamValue('CALENDAR_END'),
						"CALENDAR_INFO" : doc.GetParamValue('CALENDAR_INFO'),
						"CALENDAR_START" : doc.GetParamValue('CALENDAR_START'),
						"created" : moment__WEBPACK_IMPORTED_MODULE_0___default()(doc.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
						"guid" : doc.GUID,
						"title" : doc.Title,
						"updated" : moment__WEBPACK_IMPORTED_MODULE_0___default()(doc.DateModified).format('YYYY-MM-DD HH:mm:ss')
					}
					this._create(newEventData, 'WizEvent');
				} catch (e) { console.error(e); }
				break;
		}
	};

	_create(data, type) {
		let start, end, id, bkColor, allDay, complete, dateCompleted;
		switch (type) {
			case "WizEvent":
				// 统一变量
				id = data.guid;
				start = data.CALENDAR_START;
				end = data.CALENDAR_END;
				// 判断是否用户自定义背景色，向下兼容原版日历
				bkColor = this._Info.ci == 0 ? this._Info.b : _Config__WEBPACK_IMPORTED_MODULE_3__["default"].colorItems[this._Info.ci].colorValue;
				allDay = data.CALENDAR_END.indexOf("23:59:59") != -1 ? true : false;
				complete = this._ExtraInfo.Complete;
				dateCompleted = this._ExtraInfo.DateCompleted;
				break;
			case "FullCalendarEvent":
				id = data.id;
				start = data.start;
				end = data.end;
				bkColor = data.backgroundColor;
				allDay = data.allDay ? data.allDay : !$.fullCalendar.moment(data.start).hasTime();
				complete = data.complete || 0;
				dateCompleted = data.dateCompleted || '';
				break;
			default:
				throw new Error('Can not identify data type.');
				break;
		}
		// 基本信息
		this.id = id;
		this.title = data.title;
		// 时间信息
		this.allDay = allDay;
		// 注意！start/end 可能是moment对象或者str，所以一律先转换成moment再格式化输出
		this.start = allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format("YYYY-MM-DD") : moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format('YYYY-MM-DD HH:mm:ss');
		this.end = allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(end).format("YYYY-MM-DD") : moment__WEBPACK_IMPORTED_MODULE_0___default()(end).format('YYYY-MM-DD HH:mm:ss');
		this.created = data.created ? data.created : moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format('YYYY-MM-DD HH:mm:ss');
		this.updated = data.updated ? data.updated : moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY-MM-DD HH:mm:ss');
		// 设置信息
		this.textColor = 'black';
		this.backgroundColor = bkColor;
		this.complete = complete;
		this.dateCompleted = dateCompleted;
	}

	_checkDataType(data) {
		const objClass = data.constructor;
        const GUID_RegExr = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        let type;
        switch (objClass) {
            case String:
                if ( GUID_RegExr.test(data) ) type = "GUID";
                else throw new Error('Unknown data, cannot create CalendarEvent object.');
                break;
            case Object:
				if ( data.CALENDAR_INFO && data.title ) { 
					type = 'WizEvent';
				} else if ( data.start && data.title ) {
					type = 'FullCalendarEvent';
				}
                break;
        }
        return type;
	};

	_parseInfo(InfoString) {
		const InfoObject = {};
		// 拆解CALENDAR_INFO
		const InfoArray = InfoString.split('/');
		InfoArray.forEach(function(item, index, arr){
			const pair = item.split('=');
			InfoObject[pair[0]] = pair[1];
		});
		// 处理颜色值
		if ( InfoObject.b ) InfoObject.b = '#' + InfoObject.b;

		return InfoObject;
	};

	/**
     * 将 Info 对象序列化.
	 * @private
	 * @param {Object} [InfoObject=] 提供 Info 对象，默认为`this._Info`.
     * @return {String} 返回用于Info对象字符串.
     */
	_stringifyInfo( InfoObject = this._Info ) {
		if ( !InfoObject ) return '';
		const InfoArray = [];
		const InfoObjectKeysArray = Object.keys(InfoObject);
		InfoObjectKeysArray.forEach(function(item, index, arr){
			const singleInfo = `${item}=${InfoObject[item]}`;
			InfoArray.push(singleInfo);
		});
		return InfoArray.join('/').replace('#', '');
	};

	_update() {
		this._updateInfo();
		this._updateExtraInfo();
	};

	_updateInfo() {
		const that = this;
		const InfoObject = {
			'b': null, //背景色hex值
			'r': '-1', //提醒方式
			'c': '0', //结束提醒信息
			'ci': 0 //背景色ID，默认 0 表示背景为用户自定义
		};
		// 更新背景色'b'
		InfoObject['b'] = this.backgroundColor.replace('#', '');
		// 更新颜色指数'ci'
		_Config__WEBPACK_IMPORTED_MODULE_3__["default"].colorItems.forEach(function(item, index, arr){
			if ( item.colorValue ==  that.backgroundColor ) {
				// 当日程背景色与色表匹配时则用 color idex 来储存（兼容原版日历插件）
				InfoObject['ci'] = index;
			};
		});
		// 应用更新
		this._Info = InfoObject;
	};

	_getDefaultExtraInfo() {
		return {
			'Complete': 0, //
			'DateCompleted': '', // ISO 标准日期字符串 YYYY-MM-DD 00:00:00
			'Prior': 0
		};
	};

	_updateExtraInfo() {
		const ExtraInfoObject = {
			'Complete': 0,
			'DateCompleted': '',
			'Prior': 0
		};
		ExtraInfoObject['Complete'] = this.complete;
		ExtraInfoObject['DateCompleted'] = this.dateCompleted;
		this._ExtraInfo = ExtraInfoObject;
	};

	_getEventHtml(title = this.title, content = ''){
		const htmlText = 
			`<html>
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=unicode">
					<title>${title}</title> 
				</head>
				<body>
					<!--WizHtmlContentBegin-->
					<div>${content}</div>
					<!--WizHtmlContentEnd-->
				</body>
			</html>`;
	
		  return htmlText
	};

	toFullCalendarEvent() {
		// 注意方法返回的只是FullCalendarEvent的数据类型，并不是event对象
		const that = this;
		const newEvent = {};
		const keys = Object.keys(this);
		keys.splice( keys.findIndex( (i) => i == '_Info' ), 1);
		keys.forEach(function(item, index, arr){
			newEvent[item] = that[item];
		});
		return newEvent;
	};

	toWizEventData() {
		this._update();
		const newEvent = {};
		newEvent.title = this.title;
		newEvent.guid = this.id;
		newEvent.CALENDAR_START = this.allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM-DD 00:00:00') : this.start;
		newEvent.CALENDAR_END = this.allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).format('YYYY-MM-DD 23:59:59') : this.end;
		newEvent.CALENDAR_INFO = this._stringifyInfo(this._Info);
		newEvent.CALENDAR_EXTRAINFO = this._stringifyInfo(this._ExtraInfo);
		newEvent.created = this.created;
		newEvent.updated = this.updated;
		return newEvent;
	};

	addToFullCalendar() {
		//TODO: 将自身添加到FullCalendar
		if (!g_cal) throw new Error('Can not find FullCalendar Widget.')
		g_cal.fullCalendar( 'addEventSource', {
			events: [
				this.toFullCalendarEvent()
			]
		});
	};

	_saveAllProp() {
		//TODO: 保存全部数据包括Title
		// 更新事件文档数据
		const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(this.id);
		// 保存标题
		doc.Title = this.title;
		// 保存时间数据
		if ( this.allDay ) {
			let startStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		} else {
			let startStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		}

		// 保存 CALENDAR_INFO
		this._update();
		this._setParamValue(doc, "CALENDAR_INFO", this._stringifyInfo(this._Info));
		this._setParamValue(doc, "CALENDAR_EXTRAINFO", this._stringifyInfo(this._ExtraInfo));
	};

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	};

	_createWizEventDoc() {
		//TODO: 保存全部数据包括Title
		// 创建WizDoc
		const location = `My Events/${ moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM') }/`;
		const objFolder = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].GetFolderByLocation(location, true);
		const tempHtml = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"].GetATempFileName('.html');
		const htmlText = this._getEventHtml(this.title, '');
		_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"].SaveTextToFile(tempHtml, htmlText, 'unicode');
		const doc = objFolder.CreateDocument2(this.title, "");
		doc.ChangeTitleAndFileName(this.title);
		doc.UpdateDocument6(tempHtml, tempHtml, 0x22);
		// 设置标签
		//if ( tags ) doc.SetTagsText2(tags, "Calendar");
		// 将信息编码到WizDoc属性中去
		const newEvent = this.toWizEventData();
		doc.AddToCalendar(newEvent.CALENDAR_START, newEvent.CALENDAR_END, newEvent.CALENDAR_INFO);
		// change database
		doc.type = "event";
		//
		this.id = doc.GUID;
	}

	saveToWizEventDoc( prop = 'all' ) {
		if (!_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"] || !_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"]) throw new Error('IWizDatabase or IWizCommonUI is not valid.');
		//检查文档是否存在
		const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		const isWizDocExist = guidRegex.test(this.id);
		// 创建或者更新文档
		if ( isWizDocExist ) {
			// 根据指令更新内容
			this._saveAllProp();
			// 更新FullCalendar
		} else {
			// 创建新的事件文档
			this._createWizEventDoc();
		}
		
	};

	deleteEventData( isDeleteDoc = false ){
		if (!g_cal) throw new Error('Can not find FullCalendar Widget.')
		let doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(this.id);
		if (!doc) throw new Error('Can not find Event related WizDocument.')
		// 移除FullCalendar事件
		g_cal.fullCalendar('removeEvents', this.id);
		// 移除日历数据
		doc.RemoveFromCalendar();
		// 删除文档
		if ( isDeleteDoc ) doc.Delete();
	}

	refetchData() {
		//TODO: 重数据库重新获取数据更新实例
	};

	renderEvent() {
		// 看该事件是否已存在，如果存在则updateEvent
		if (!g_cal) throw new Error('Can not find FullCalendar Widget.')
	};

	refreshEvent(event) {
		//TODO: 应该自动遍历并修改属性
		if ( event ) {
			// 重新渲染FullCalendar事件
			event.title = this.title;
			event.backgroundColor = this.backgroundColor;
			g_cal.fullCalendar('updateEvent', event);
		} else {
			//用.fullCalendar( ‘clientEvents’ [, idOrFilter ] ) -> Array 获取源数据从而更新
			//TODO: 遍历并寻找GUID匹配的事件
		}
	}

	static refreshEventSources() {
		//TODO: 将FullCalendar所有Sources删除，重新添加
		// 没点击一个视图更新时就执行
	}

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/Config.js":
/*!***********************!*\
  !*** ./src/Config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    colorCount: 12,
    colorItems: [
        { "colorValue": "#32CD32", "colorName": '橄榄绿' },
        { "colorValue": "#5484ED", "colorName": '宝石蓝' },
        { "colorValue": "#A4BDFE", "colorName": '蓝色' },
        { "colorValue": "#46D6DB", "colorName": '青绿色' },
        { "colorValue": "#7AE7BF", "colorName": '绿色' },
        { "colorValue": "#51B749", "colorName": '清新绿' },
        { "colorValue": "#FBD75B", "colorName": '黄色' },
        { "colorValue": "#FFB878", "colorName": '橘色' },
        { "colorValue": "#FF887C", "colorName": '红色' },
        { "colorValue": "#DC2127", "colorName": '奢华红' },
        { "colorValue": "#DBADFF", "colorName": '紫色' },
        { "colorValue": "#E1E1E1", "colorName": '灰色' }
    ],

});

/***/ }),

/***/ "./src/Modal/EventCreateModal.js":
/*!***************************************!*\
  !*** ./src/Modal/EventCreateModal.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventCreateModal; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/modal */ "./node_modules/bootstrap/js/modal.js");
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/FormHandles */ "./src/Utils/FormHandles.js");
/* harmony import */ var _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Widget/DateTimePicker */ "./src/Widget/DateTimePicker.js");
/* harmony import */ var _Widget_ColorPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Widget/ColorPicker */ "./src/Widget/ColorPicker.js");
/* harmony import */ var _EventModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventModal */ "./src/Modal/EventModal.js");








class EventCreateModal extends _EventModal__WEBPACK_IMPORTED_MODULE_5__["default"] {

    constructor(args) {
        super(args);
        //TODO: 想办法避免导出全局变量
        window.g_createModal = this;
    };

    update(args) {
        this.resetFormInput(this.modal, '#tc-createpage-eventstart,#tc-createpage-eventend');
        super.update(args);
    };

    renderTemplate() {
        // 渲染 DOM
        this.renderFormComponent(this.modal, [
            {
                node: this.modal,
                eventName: 'shown.bs.modal',
                handle: () => this.modal.find('#tc-createpage-eventtitle').focus(),
            },
            {
                node: '#tc-createpage-eventstart',
                value: this.args.start.format('YYYY-MM-DD HH:mm:ss'),
                renderer: _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["createDatetimePicker"]
            },
            {
                node: '#tc-createpage-eventend',
                value: this.args.end.format('YYYY-MM-DD HH:mm:ss'),
                renderer: _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["createDatetimePicker"]
            },
            {
                node: '#tc-createpage-eventcolor',
                value: '',
                renderer: _Widget_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["createColorPicker"]
            },
            {
                node: '#tc-createpage-create',
                eventName: 'click',
                handle: () => new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__["default"]().onCreateBtnClick(this.args.start, this.args.end, this.args.jsEvent, this.args.view, this.modal),
            },
            {
                node: '#tc-createpage-cancel,#tc-createpage-close',
                eventName: 'click',
                handle: () => jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar').fullCalendar('unselect')
            }
        ]);
    };

    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog" id="tc-EventCreateModal" aria-labelledby="tc-createpage-dialogtitle">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <button id='tc-createpage-close' type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id='tc-createpage-dialogtitle'>创建新的日程</h4>
                    </div> 
                    <div class="modal-body">
                    <form>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-createpage-eventtitle">标题</label>
                            <input type="text" class="form-control eventtitle" id="tc-createpage-eventtitle">
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-createpage-eventstart" class="col-form-label">开始日期</label>
                            <input type="text" class="form-control datetimepicker-input eventstart" id="tc-createpage-eventstart" data-toggle="datetimepicker" data-target="#tc-createpage-eventstart" readonly/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-createpage-eventend" class="col-form-label">结束日期</label>
                            <input type='text' class="form-control eventend" id='tc-createpage-eventend' readonly/>
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-createpage-eventcolor" class="col-form-label">色彩</label>
                            <input id="tc-createpage-eventcolor" class="form-control eventcolor" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-createpage-eventtags" class="col-form-label">标签</label>
                            <input id="tc-createpage-eventtags" class="form-control eventtags" > 
                        </div>
                        </div>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-createpage-eventremark">备注</label>
                            <textarea class="form-control eventremark" id="tc-createpage-eventremark" rows="3"></textarea>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                    <div class='row'>
                        <div class='col-xs-12' >
                            <button id='tc-createpage-create' class="btn btn-success" type="button">创建</button>      
                            <button id='tc-createpage-cancel' type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `
    }
}

/***/ }),

/***/ "./src/Modal/EventEditModal.js":
/*!*************************************!*\
  !*** ./src/Modal/EventEditModal.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEditModal; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/modal */ "./node_modules/bootstrap/js/modal.js");
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/FormHandles */ "./src/Utils/FormHandles.js");
/* harmony import */ var _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Widget/DateTimePicker */ "./src/Widget/DateTimePicker.js");
/* harmony import */ var _Widget_ColorPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Widget/ColorPicker */ "./src/Widget/ColorPicker.js");
/* harmony import */ var _EventModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventModal */ "./src/Modal/EventModal.js");







class EventEditModal extends _EventModal__WEBPACK_IMPORTED_MODULE_5__["default"] {

    constructor(args) {
        super(args);
        //TODO: 想办法避免全局变量
        window.g_editModal = this;
    };

    renderTemplate() {
        const that = this;
        const event = this.args.event;
        this.renderFormComponent(this.modal, [
            {//所有输入框
                node: 'input',
                eventName: 'change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//标题
                node: '#tc-editpage-eventtitle',
                value: event.title,
            },
            {//开始日期
                node: '#tc-editpage-eventstart',
                value: event.start.format('YYYY-MM-DD HH:mm:ss'),
                renderer: _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["createDatetimePicker"],
                eventName: 'dp.change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//结束日期
                node: '#tc-editpage-eventend',
                value: event.end.format('YYYY-MM-DD HH:mm:ss'),
                renderer: _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["createDatetimePicker"],
                eventName: 'dp.change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//颜色
                node: '#tc-editpage-eventcolor',
                value: event.backgroundColor,
                renderer: (node) => {
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).css('background-color', event.backgroundColor);
                    Object(_Widget_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["createColorPicker"])(node)
                }
            },
            {//保存按钮
                node: '#tc-editpage-save',
                renderer: (node) => jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).attr('disabled', true),
                eventName: 'click',
                handle: () => {
                    new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__["default"]().onSaveBtnClick(event, that.modal);
                    that.hide()
                }
            },
			{// 完成按钮
				node: '#tc-editpage-finish',
				eventName: 'click',
				handle: () => {
					formHandles.onCompleteBtnClick(event);
					that.hide();
				}
			},
            {//删除按钮
                node: '#tc-editpage-delete',
                eventName: 'click',
                handle: () => {
                    new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__["default"]().onDeleteDataBtnClick(event);
                    that.hide();
                }
            },
            {//删除源文档
                node: '#tc-editpage-deleteEventDoc',
                eventName: 'click',
                handle: () => {
                    new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__["default"]().onDeleteDocBtnClick(event);
                    that.hide()
                }
            }
        ])
    };

    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog" id='tc-EventEditModal'>
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">日程编辑</h4>
                    </div> 
                    <div class="modal-body">
                    <form>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-editpage-eventtitle">标题</label>
                            <input type="text" class="form-control eventtitle" id="tc-editpage-eventtitle">
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventstart" class="col-form-label">开始日期</label>
                            <input type="text" class="form-control datetimepicker-input eventstart" id="tc-editpage-eventstart" data-toggle="datetimepicker" data-target="#tc-editpage-eventstart"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventend" class="col-form-label">结束日期</label>
                            <input type='text' class="form-control eventend" id='tc-editpage-eventend' />
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventcolor" class="col-form-label">色彩</label>
                            <input id="tc-editpage-eventcolor" class="form-control eventcolor" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventtags" class="col-form-label">标签</label>
                            <input id="tc-editpage-eventtags" class="form-control eventtags" > 
                        </div>
                        </div>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-editpage-eventremark">备注</label>
                            <textarea class="form-control eventremark" id="tc-editpage-eventremark" rows="3"></textarea>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                    <div class='row' style='text-align: left;'>
                        <div class='col-md-6'>
                        <div id="tc-editpage-buttongroup" class="btn-group" role="group">
                            <button id='tc-editpage-save' class="btn btn-danger" type="button" disabled>保存</button>
                            <button id='tc-editpage-finish' class="btn btn-default" type="button">完成</button>
                            <button id='tc-editpage-delete' class="btn btn-default" type="button">删除</button>
                            <button id='tc-editpage-deleteEventDoc' class="btn btn-default" type="button">删除源文档</button>
                        </div>
                        </div>
                        <div class='col-md-2 col-md-offset-4' style='text-align: right;'>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>

                    </div>
                </div>
                </div>
            </div>
        `
    }

}

/***/ }),

/***/ "./src/Modal/EventModal.js":
/*!*********************************!*\
  !*** ./src/Modal/EventModal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventModal; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/modal */ "./node_modules/bootstrap/js/modal.js");
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__);



class EventModal {

    constructor(args) {
        this.args = args;
        const html = this.HtmlTemplate;
        this.modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()(html).modal({
            show: false
        });
        this.renderTemplate();
    };

    update(args) {
        this.args = args;
        this.renderTemplate();
    };

    show() {
        this.modal.modal('show');
    };

    hide() {
        this.modal.modal('hide');
    };

    /**
     * 写入HTML模板.
     */
    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Modal title</h4>
                </div>
                <div class="modal-body">
                    <p>One fine body&hellip;</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
        `
    };

    /**
     * 由子类定义渲染任务.
     */
    renderTemplate() { };

    /**
     * 渲染模态框表单组件.
     * @param {string|HTMLElement} modalNode - 表单或包含表单的块元素|CSS选择器.
     * @param {Object[]} tasks - 任务列表.
     * @param {string} tasks[].node - CSS选择器.
     * @param {string} tasks[].value - 需要填入的值.
     * @param {Function} tasks[].renderer - 组件渲染器.
     * @param {string} tasks[].eventName - 事件名称.
     * @param {Function} tasks[].handle - 句柄.
     */
    renderFormComponent(modalNode, tasks) {
        for (let task of tasks) {
            let $comps = jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).get(0) == jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node).get(0) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).find(task.node);
            // 渲染组件
            if ( task.value ) $comps.val(task.value);
            if ( typeof task.renderer == 'function' ) task.renderer($comps);
            // 绑定句柄
            if ( task.handle && typeof task.handle == 'function' && task.eventName ) {
                this.refreshEventHandle($comps, task.eventName, task.handle);
            }
        }
    };

    /**
     * 刷新事件句柄.
     * @param {string|HTMLElement} node - 元素或CSS选择器.
     * @param {string} jsEventName - 要刷新的事件名称.
     * @param {function} handle - 要绑定的句柄
     */
    refreshEventHandle(node, jsEventName, handle) {
        // 利用jQuery本身的类数组特性实现多个绑定；
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).off(jsEventName).on(jsEventName, handle);
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
    }

    /**
     * 重置表单.
     * @param {string|HTMLElement} form - 表单或包含表单的块元素|CSS选择器.
     * @param {string} excludes - 用CSS选择器代表需要排除的元素.
     */
    resetFormInput(form, excludes) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(form).find('input').not(excludes).each(function(index,element){
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('background-color', '');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).val('');
        })
    }
}

/***/ }),

/***/ "./src/Utils/FormHandles.js":
/*!**********************************!*\
  !*** ./src/Utils/FormHandles.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormHandles; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WizEventDataLoader */ "./src/WizEventDataLoader.js");
/* harmony import */ var _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CalendarEvent */ "./src/CalendarEvent.js");
/* harmony import */ var _WizInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../WizInterface */ "./src/WizInterface.js");





const g_cal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar');

class FormHandles {
    constructor() {

    };

    onCreateBtnClick(start, end, jsEvent, view, formNode) {
        const title = jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).find('#tc-createpage-eventtitle').val();
        const color = jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).find('#tc-createpage-eventcolor').val();
        new _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_1__["default"]().createEvent({start, end, jsEvent, view}, {title, color}); // 这一步耗时
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).modal('hide');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar').fullCalendar('unselect');
    };

    onSaveBtnClick(event, formNode) {
        //TODO: 完成开始与结束时间变更
        //TODO: 通过在formNode搜索.eventtitle,.eventcolor等class来获取变量
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        // 保存数据
        const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
        newEvent.title = formNode.find('.eventtitle').val();
        newEvent.backgroundColor = formNode.find('.eventcolor').val();
        // 保存到数据文档
        newEvent.saveToWizEventDoc();
        newEvent.refreshEvent(event)
    };

    onCompleteBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        // 修改数据
        const isComplete = parseInt(event.complete) == 5;
        if ( isComplete ) {
            event.complete = '0';
        } else {
            event.complete = '5';
        }
        // 保存数据
        const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
        newEvent.saveToWizEventDoc();
        // 重新渲染
        g_cal.fullCalendar( 'updateEvent', event );
    };

    onDeleteDataBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        if ( Object(_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizConfirm"])("确定要删除该日程？", '番茄助理') ) {
            // 删除日程
            let newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
            newEvent.deleteEventData(false);
        }
    };

    onDeleteDocBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        if ( Object(_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizConfirm"])("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理') ) {
            let newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
            newEvent.deleteEventData(true);
        }	
    };

}

/***/ }),

/***/ "./src/Utils/FormUtils.js":
/*!********************************!*\
  !*** ./src/Utils/FormUtils.js ***!
  \********************************/
/*! exports provided: resetFormInput, renderFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFormInput", function() { return resetFormInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderFormComponent", function() { return renderFormComponent; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);




/**
 * 刷新事件句柄.
 * @param {string|HTMLElement} node - 元素或CSS选择器.
 * @param {string} jsEventName - 要刷新的事件名称.
 * @param {function} handle - 要绑定的句柄
 */
function refreshEventHandle(node, jsEventName, handle) {
	// 利用jQuery本身的类数组特性实现多个绑定；
	jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).off(jsEventName).on(jsEventName, handle);
	return jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
}

/**
 * 重置表单.
 * @param {string|HTMLElement} form - 表单或包含表单的块元素|CSS选择器.
 * @param {string} excludes - 用CSS选择器代表需要排除的元素.
 */
function resetFormInput(form, excludes) {
	jquery__WEBPACK_IMPORTED_MODULE_0___default()(form).find('input').not(excludes).each(function(index,element){
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('background-color', '');
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).val('');
	})
}

/**
 * 渲染模态框表单组件.
 * @param {string|HTMLElement} modalNode - 表单或包含表单的块元素|CSS选择器.
 * @param {Object[]} tasks - 任务列表.
 * @param {string} tasks[].node - CSS选择器.
 * @param {string} tasks[].value - 需要填入的值.
 * @param {Function} tasks[].renderer - 组件渲染器.
 * @param {string} tasks[].eventName - 事件名称.
 * @param {Function} tasks[].handle - 句柄.
 */
function renderFormComponent(modalNode, tasks) {
	for (let task of tasks) {
		let $comps = jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).get(0) == jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node).get(0) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).find(task.node);
		// 渲染组件
		if ( task.value ) $comps.val(task.value);
		if ( typeof task.renderer == 'function' ) task.renderer($comps);
		// 绑定句柄
		if ( task.handle && typeof task.handle == 'function' && task.eventName ) refreshEventHandle($comps, task.eventName, task.handle);
	}
}

/**
 * 绑定模态框按钮句柄, 通过 refreshEventHandler
 * @param {string|HTMLElement} modalNode - 表单或包含表单的块元素|CSS选择器.
 * @param {Object[]} tasks - 任务列表.
 * @param {string} tasks[].node - CSS选择器.
 * @param {string} tasks[].eventName - 事件名称.
 * @param {Function} tasks[].handle - 句柄.
 */
function bindModalHandle(modalNode, tasks) {
	//TODO: 是否可以将bindModalHandle与renderModalForm合二为一？
	for (let task of tasks) {
		// 判断是否绑定modalNode的句柄
		let $comps = jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).get(0) == jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node).get(0) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).find(task.node);
		if ( typeof task.handle == 'function' ) refreshEventHandle($comps, task.eventName, task.handle);
	}
}

/***/ }),

/***/ "./src/Widget/ColorPicker.js":
/*!***********************************!*\
  !*** ./src/Widget/ColorPicker.js ***!
  \***********************************/
/*! exports provided: createColorPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createColorPicker", function() { return createColorPicker; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery-ui/ui/widget */ "./node_modules/jquery-ui/ui/widget.js");
/* harmony import */ var jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! huebee/dist/huebee.css */ "./node_modules/huebee/dist/huebee.css");
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2__);


/* NPM 版本 Huebee 源代码中 pointerdown 事件在 Chrome 55 以后才实现
 * Wiznote 只能使用跨浏览器兼容版，所以导入打包版 */
const Huebee = __webpack_require__(/*! huebee/dist/huebee.pkgd */ "./node_modules/huebee/dist/huebee.pkgd.js"); 




jquery__WEBPACK_IMPORTED_MODULE_0___default.a.widget("tc.ColorPicker", {
	options: {
		staticOpen: false, // Displays open and stays open. 
		setText: true, // Sets elements’ text to color. 将原始的文本设置设置成颜色值.
		setBGColor: true, // Sets elements’ background color to color.
		hues: 12, // Number of hues of the color grid. Hues are slices of the color wheel.
		hue0: 0, // The first hue of the color grid. 
		shades: 5, // Number of shades of colors and shades of gray between white and black. 
		saturations: 3, // Number of sets of saturation of the color grid.
		customColors: null, // Custom colors added to the top of the grid. 
		notation: 'hex', // Text syntax of colors values.
		className: null, // Class added to Huebee element. Useful for CSS.
		onchange: null,
	},

	_create: function() {
		// 创建实例
		this.huebeeInstance = new Huebee(this.element.get(0), this.options);
		// 重写了该方法，判断input内容是否相同并触发 change 事件
		this.huebeeInstance.setTexts = function() {
			if ( !this.setTextElems ) {
				return;
			}
			  for ( var i=0; i < this.setTextElems.length; i++ ) {
				var elem = this.setTextElems[i];
				var property = elem.nodeName == 'INPUT' ? 'value' : 'textContent';
				// 触发change事件
				if ( elem.value != this.color ) {
					elem[ property ] = this.color;
					elem.dispatchEvent(new Event('change'));
				}
			}
		};
		this.huebeeInstance.on( 'change', this.options.onchange);
		
	}
})


/**
 * 创建颜色拾取器.
 * @param {string|HTMLElement} node - 元素或CSS选择器.
 */
function createColorPicker(node) {
	//TODO: 读取Config
	jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).ColorPicker({
		saturations: 2,
		shades: 5,
		customColors: [ '#32CD32', '#5484ED', '#A4BDFE', 
		'#46D6DB', '#7AE7BF', '#51B749',
		'#FBD75B', '#FFB878', '#FF887C', 
		'#DC2127', '#DBADFF', '#E1E1E1'	],
		"staticOpen": false
	});

	return jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
}

/***/ }),

/***/ "./src/Widget/DateTimePicker.js":
/*!**************************************!*\
  !*** ./src/Widget/DateTimePicker.js ***!
  \**************************************/
/*! exports provided: createDatetimePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDatetimePicker", function() { return createDatetimePicker; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/js/collapse */ "./node_modules/bootstrap/js/collapse.js");
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/transition */ "./node_modules/bootstrap/js/transition.js");
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker */ "./node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js");
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css */ "./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css");
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7__);









/**
 * 创建日期时间选择器.
 * @param {string|HTMLElement} node - 元素或CSS选择器.
 */
function createDatetimePicker(node) {
	//TOOD: 读取Config
	jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).datetimepicker({
		format: 'YYYY-MM-DD HH:mm:ss'
	});

	return jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
}

/***/ }),

/***/ "./src/Widget/EventPopover/EventPopover.css":
/*!**************************************************!*\
  !*** ./src/Widget/EventPopover/EventPopover.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/Widget/EventPopover/EventPopover.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/Widget/EventPopover/EventPopover.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/Widget/EventPopover/EventPopover.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/Widget/EventPopover/EventPopover.js":
/*!*************************************************!*\
  !*** ./src/Widget/EventPopover/EventPopover.js ***!
  \*************************************************/
/*! exports provided: renderEditPopper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderEditPopper", function() { return renderEditPopper; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery-ui/ui/widget */ "./node_modules/jquery-ui/ui/widget.js");
/* harmony import */ var jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_js_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/dropdown */ "./node_modules/bootstrap/js/dropdown.js");
/* harmony import */ var bootstrap_js_dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dropdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/all */ "./node_modules/@fortawesome/fontawesome-free/js/all.js");
/* harmony import */ var _fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EventPopover.css */ "./src/Widget/EventPopover/EventPopover.css");
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_EventPopover_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Utils_FormUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Utils/FormUtils */ "./src/Utils/FormUtils.js");
/* harmony import */ var _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Utils/FormHandles */ "./src/Utils/FormHandles.js");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ColorPicker */ "./src/Widget/ColorPicker.js");
/* harmony import */ var _Modal_EventEditModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Modal/EventEditModal */ "./src/Modal/EventEditModal.js");















jquery__WEBPACK_IMPORTED_MODULE_0___default.a.widget("tc.EventPopover", {
	options: {
		title: 'No title !', //String
		template:
		`
		<div class="tc-popover" role="tooltip">
			<div class="arrow"></div>
			<div class="tc-popover-header">
				<input type="text" id="tc-editpopper-eventtitle"  form='tc-popover-event-editForm' class='eventtitle'>
			</div>
			<div class="tc-popover-body">
				<form id = 'tc-popover-event-editForm' class='form-horizontal'>
					<div class="form-group">
						<label for="tc-editpopper-eventdate" class="col-sm-2 col-form-label"><i class='far fa-calendar-alt fa-lg'></i></label>
						<div class="col-sm-10">
							<input type="text" readonly class="form-control eventdate" id="tc-editpopper-eventdate">
						</div>
					</div>
					<div class="form-group">
						<label for="tc-editpopper-eventcolor" class="col-sm-2 col-form-label"><i class="fas fa-paint-brush"></i></label>
						<div class="col-sm-10">
							<input id="tc-editpopper-eventcolor" class="form-control eventcolor" >
						</div>
					</div>
				</form>
				<div id="tc-editpopper-buttongroup" class="btn-group" role="group">
					<button id='tc-editpopper-save' class="btn btn-default" type="button">保存</button>
					<button id='tc-editpopper-finish' class="btn btn-default" type="button">完成</button>
					<button id='tc-editpopper-edit' class="btn btn-default" type="button">编辑</button>
					<button id='tc-editpopper-delete' class="btn btn-default" type="button">删除</button>
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span class="caret"></span>
					</button>
					<ul class="dropdown-menu dropdown-menu-right">
						<li>
							<a id='tc-editpopper-deleteEventDoc' href='javascript:void(0);'>删除源文档</a>
						</li>
					</ul>
				</div>

			</div>
		</div>
		`,
		placement: 'right',
		offset: '10px',
		autoShow: true,
		reference: null, // 用户输入时可以时jQuery或者HTMLElement
	},
	
	_create: function() {
		let that = this;
		let opts = this.options;
		
		// 检测是否提供reference，没有则设置为 this.element，统一格式化为jQuery对象；
		opts.reference = opts.reference ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(opts.reference) : this.element;

		// 准备模板，有重复调用的bug
		this.$popperNode = this._processTemplate(opts.template);

		// 创建Popper实例(定位引擎)
		this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_6__["default"](opts.reference.get(0), this.$popperNode.get(0), {
			placement: opts.placement,
			modifiers: {
				arrow: {
				  element: '.arrow'
				}
			},
		});

		// 设置自动隐藏
		this._setAutoHide();

		//根据设置是否自动显示
		if ( opts.autoShow == true ) this.show();

	},

	_processTemplate: function(template) {
		const that = this;
		const opts = this.options;
		const event = opts.args.event;
		const $popper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(template);
		const formHandles = new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_9__["default"]();

		Object(_Utils_FormUtils__WEBPACK_IMPORTED_MODULE_8__["renderFormComponent"])($popper, [
			{// 标题
				node: '#tc-editpopper-eventtitle',
				value: event.title,
				eventName: 'change',
				handle: () => $popper.find('#tc-editpopper-save').attr('disabled', false)
			},
			{// 日期
				node: '#tc-editpopper-eventdate',
				value: event.start.format('YYYY-MM-DD HH:mm:ss')
			},
			{// 颜色
				node: '#tc-editpopper-eventcolor',
				value: event.backgroundColor,
				renderer: (node) => {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).css('background-color', event.backgroundColor);
					Object(_ColorPicker__WEBPACK_IMPORTED_MODULE_10__["createColorPicker"])(node);
				},
				eventName: 'change',
				handle: () => $popper.find('#tc-editpopper-save').attr('disabled', false)
			},
			{// 保存按钮
				node: '#tc-editpopper-save',
				renderer: (node) => jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).attr("disabled", true),
				eventName: 'click',
				handle: () => {
					formHandles.onSaveBtnClick(event, $popper);
					that.hide();
				}
			},
			{// 完成按钮
				node: '#tc-editpopper-finish',
				renderer: (node) => jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).text(
					parseInt(event.complete) == 5 ? '恢复' : '完成'
				),
				eventName: 'click',
				handle: () => {
					formHandles.onCompleteBtnClick(event);
					that.hide();
				}
			},
			{// 编辑按钮
				node: '#tc-editpopper-edit',
				eventName: 'click',
				handle: () => {
					//TODO: 想办法不要用全局变量
					if ( !window.g_editModal ) new _Modal_EventEditModal__WEBPACK_IMPORTED_MODULE_11__["default"]({event});
					g_editModal.update({event});
					g_editModal.show();
				}
			},
			{// 删除日程数据按钮
				node: '#tc-editpopper-delete',
				eventName: 'click',
				handle: () => {
					formHandles.onDeleteDataBtnClick(event);
					that.hide();
				}
			},
			{// 删除源文档按钮
				node: '#tc-editpopper-deleteEventDoc',
				eventName: 'click',
				handle: () => {
					formHandles.onDeleteDocBtnClick(event);
					that.hide();
				}
			}
		])

		return $popper; // jQuery
	},

	_setAutoHide() {
		let opts = this.options;
		let that = this;

		// 先取消已有自动隐藏事件，方式反复添加句柄
		this._off(this.document, 'click');

		// 点击空白处自动隐藏
		this._on(this.document, {
			click: function(e) {
				if (
					// 不是日历事件元素
					!jquery__WEBPACK_IMPORTED_MODULE_0___default()(opts.reference).is(e.target) &&
					// 也不是子元素
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(opts.reference).has(e.target).length === 0 &&
					// 不是popper元素
					 !that.$popperNode.is(e.target) &&
					// 也不是子元素
					that.$popperNode.has(e.target).length === 0
				) {
					that.hide();
				}
			}
		})
	},

	update: function() {
		// 根据Options更新popperInstance以及$popperNode
		let opts = this.options;
		// 设置自动隐藏
		this._setAutoHide();
		// 更新 $popperNode
		this.$popperNode = this._processTemplate(this.$popperNode); // 传入的是引用
		// 更新 popperInstance
		this.popperInstance.popper = this.$popperNode.get(0);
		this.popperInstance.reference = opts.reference ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(opts.reference).get(0) : this.element.get(0);
		this.popperInstance.update();
	},

	show: function() {
		let opts = this.options;
		// 如果没有添加到DOM树则添加
		if( !jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$popperNode).parent().is('body') ) jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$popperNode).appendTo('body');
		// 显示$popperNode
		this._show(this.$popperNode);

	},

	hide: function() {
		//TODO: 隐藏Popover
		this._hide(this.$popperNode)
	},

	destroy: function() {
		this.popperInstance.destroy();
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$popperNode).remove();
		this.$popperNode = null;
	}
})

/**
 * 渲染事件小弹窗.
 * @param {object} args 包含FullCalendar传入的参数.
 * @param {object} args.event FullCalendar事件.
 * @param {object} args.jsEvent native JavaScript 事件.
 * @param {object} args.view FullCalendar 视图.
 * @param {object} element is a jQuery element for the container of the new view.
 * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
 */
function renderEditPopper(args, reference) {
	// 渲染弹窗
	const editPopper = jquery__WEBPACK_IMPORTED_MODULE_0___default()( '<div></div>' ).EventPopover({
		args: args,
		placement: 'auto',
		reference: reference,
	});

	return editPopper;
}

/***/ }),

/***/ "./src/WizEventDataLoader.js":
/*!***********************************!*\
  !*** ./src/WizEventDataLoader.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WizEventDataLoader; });
/* harmony import */ var _WizInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WizInterface */ "./src/WizInterface.js");
/* harmony import */ var _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalendarEvent */ "./src/CalendarEvent.js");



/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/

/** 该类与Wiznote的WizDatabase接口交换信息，获取数据 */
class WizEventDataLoader {
	/**
     * 创造一个事件数据加载器.
     */
	constructor() {
		if (!_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"]) throw new Error('WizDatabase not valid !');
		this.Database = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"];
		this.userName = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].UserName;
	};

	/**
     * 获得渲染后的所有FullCalendar事件.
	 * @param {object} view is the View Object of FullCalendar for the new view.
	 * @param {object} element is a jQuery element for the container of the new view.
     * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
     */
	getEventSource( view, element ){
		const currentView = view;
		const eventsArr = this._getAllOriginalEvent([], this._d2s(currentView.start.toDate()), this._d2s(currentView.end.toDate()));
		return eventsArr;
	};

	/**
     * 从WizDatabase中获取所有数据文档.
	 * @param {array} events 初始事件数组.
	 * @param {string} start ISO标准日期字符串.
	 * @param {string} end ISO标准日期字符串.
     * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
     */
	_getAllOriginalEvent(events, start, end){
		let sql = `DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '')`;
		let and1 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_START'  and  PARAM_VALUE <= '${end}' )`;
		let and2 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_END'  and  PARAM_VALUE >= '${start}' )`;
		if (start) sql += and2;
		if (end) sql += and1;
		if (_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentsDataFromSQL) {
			try {
				const data = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentsDataFromSQL(sql);
				const obj = JSON.parse(data);
				if ( !obj || !isArray(obj) ) return false;
				console.log(obj);
				for (let i = 0; i < obj.length; i ++) {
					events.push(
						new _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__["default"](obj[i]).toFullCalendarEvent()
					);
				}
				
				return events;
			}
			catch(err) {
				console.error(err);
				return false;
			}
		}
		else {
			throw new Error('DocumentsDataFromSQL method of WizDatabase not exist!');
			/*
			let docColletion = objDatabase.DocumentsFromSQL(sql);
			//
			if (docColletion && docColletion.Count){
				let doc;
				for (let i = 0; i < docColletion.Count; ++ i){
					doc = docColletion.Item(i);
					let eventObj = _eventObject(_newPseudoDoc(doc));
					if (eventObj)
						events.push(eventObj);
				}
				return events;
			}
			*/		
		}

	};

	// 日历事件拖动后更新数据
	updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view){
		// Call hasTime on the event’s start/end to see if it has been dropped in a timed or all-day area.
		const allDay = !event.start.hasTime();
		// 获取事件文档时间数据
		const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentFromGUID(event.id);
		// 更新数据
		if ( allDay ) {
			const startStr = event.start.set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
			const endStr = event.end.set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		} else {
			const startStr = event.start.format('YYYY-MM-DD HH:mm:ss');
			const endStr = event.end.format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		}
		// 
		this._updateDocModifyDate(doc);
	};

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	};

	// 更新WizDoc修改时间
	_updateDocModifyDate(doc){
		const now = new Date();
		if (!doc) return false;
		now.setSeconds((now.getSeconds() + 1) % 60);
		doc.DateModified = this._d2s(now);
	};

	// 将日期对象转化为字符串
	//TODO: 考虑依赖moment来简化转换过程
	_d2s(dt){
		const ret = dt.getFullYear() + "-" + 
					formatIntToDateString(dt.getMonth() + 1) + "-" + 
					formatIntToDateString(dt.getDate()) + " " + 
					formatIntToDateString(dt.getHours())+ ":" + 
					formatIntToDateString(dt.getMinutes()) + ":" + 
					formatIntToDateString(dt.getSeconds());
		return ret;
	};

	// 日历时间重置时间范围后更新数据
	updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view){
		const allDay = event.start.hasTime() ? false : true;
		// 获得事件文档时间数据
		const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentFromGUID(event.id);
		// 计算更改后的结束时间
		const eventEndStr = event.end.format('YYYY-MM-DD HH:mm:ss');
		// 更新文档数据
		this._setParamValue(doc, "CALENDAR_END", eventEndStr);
		this._updateDocModifyDate(doc);
	};

	// 创建事件 start, end, jsEvent, view
	/**
     * 创建事件.
	 * @param {Object} selectionData FullCalendar 传入的数据.
	 * @param {Object} selectionData.start Moment 类日期对象.
	 * @param {Object} selectionData.end Moment 类日期对象.
	 * @param {Object} selectionData.jsEvent native JavaScript 事件.
	 * @param {Object} selectionData.view FullCalendar 视图对象.
	 * @param {Object} userInputs 用户传入的其他信息.
     * TODO: 该方法可以放置到CalendarEvent的静态方法上
     */
	createEvent(selectionData, userInputs){
		try {
			// 获取用户设置
			const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__["default"]({
				title: userInputs.title ? userInputs.title : '无标题',
				start: selectionData.start,
				end: selectionData.end,
				allDay: selectionData.start.hasTime() && selectionData.end.hasTime() ? false : true,
				backgroundColor: userInputs.color ? userInputs.color : '#32CD32',
			});
			// 保存并渲染事件
			newEvent.saveToWizEventDoc();
			newEvent.refetchData();
			newEvent.addToFullCalendar();
		} catch (e) {console.log(e)}
	}

}


// TODO: 重写获取数据的方式
function _getWizEvent(start, end) {
	//TODO:
	let events = [];
	let EventCollection = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].GetCalendarEvents2(start, end);
	return events
}


/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/


/* 杂项和工具
----------------------------------------------------------------------------------------------------------------------*/

// 判断内核
function isChrome() {
	if (g_isChrome) return g_isChrome;
	//
	var ua = navigator.userAgent.toLowerCase();
	g_isChrome = ua.indexOf('chrome') != -1;
	//
	return g_isChrome;
}

// 将整数转换成日期字符串
function formatIntToDateString(n){
		
	return n < 10 ? '0' + n : n;
}

// 判断实参是否是数组的实例
function isArray(array) {
    return (array instanceof Array);
}

// 检查及增加数值字符串长度，例如：'2' -> '02'
function checkAndAddStrLength(str) {
	if (str.length < 2) {
		return '0' + str;
	} else {
		return str;
	}
}

// 将字符串转化为日期对象
function _s2d(str){
	if (!str)
		return '';
	var date = new Date(str.substr(0, 4),
					str.substr(5, 2) - 1,
					str.substr(8, 3),
					str.substr(11, 2),
					str.substr(14, 2),
					str.substr(17, 2)
					);		
	return date;
}


/***/ }),

/***/ "./src/WizInterface.js":
/*!*****************************!*\
  !*** ./src/WizInterface.js ***!
  \*****************************/
/*! exports provided: WizExplorerApp, WizExplorerWindow, WizDatabase, WizCommonUI, WizConfirm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizExplorerApp", function() { return WizExplorerApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizExplorerWindow", function() { return WizExplorerWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizDatabase", function() { return WizDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizCommonUI", function() { return WizCommonUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizConfirm", function() { return WizConfirm; });


//TODO: 判断window.external是否为WizHtmlEditorApp
const WizExplorerApp = window.external;
const WizExplorerWindow = WizExplorerApp.Window;
const WizDatabase = WizExplorerApp.Database;
const WizCommonUI = WizExplorerApp.CreateWizObject("WizKMControls.WizCommonUI");

function WizConfirm(msg, title) {
    return WizExplorerWindow.ShowMessage(msg, title, 0x00000020 | 0x00000001) == 1;
}


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!./index.css */ "./node_modules/css-loader/index.js!./src/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader!./index.css */ "./node_modules/css-loader/index.js!./src/index.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader!./index.css */ "./node_modules/css-loader/index.js!./src/index.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fullcalendar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fullcalendar_dist_fullcalendar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fullcalendar/dist/fullcalendar.css */ "./node_modules/fullcalendar/dist/fullcalendar.css");
/* harmony import */ var fullcalendar_dist_fullcalendar_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fullcalendar_dist_fullcalendar_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WizEventDataLoader */ "./src/WizEventDataLoader.js");
/* harmony import */ var _Widget_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Widget/EventPopover/EventPopover */ "./src/Widget/EventPopover/EventPopover.js");
/* harmony import */ var _Modal_EventCreateModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modal/EventCreateModal */ "./src/Modal/EventCreateModal.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_5__);







$(function(){
    // 定义变量
	const dataLoader = new _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_2__["default"]();
	let g_editPopper, g_createModal, g_editModal;

    const calendar = $('#calendar').fullCalendar({
		themeSystem: 'standard',
		height: 'parent',
		header: {
			left: 'prev,next,today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
		},
		views: {
			month: {
				//titleFormat: g_loc_titleformat_month, //var g_loc_titleformat_month = "MMMM yyyy";
			},
			agenda: {
				minTime: "08:00:00",
				slotLabelFormat: 'h(:mm) a'
			},
			listWeek: {

			}
		},
		navLinks: true,
		allDayDefault: false,
		defaultView: 'agendaWeek',
		eventLimit: true,
		buttonText: {
			today: '今天',
			month: '月',
			week: '周',
			day: '日',
			list: '表'
        },
		monthNames: [
            '1月', '2月', '3月', '4月', 
            '5月', '6月', '7月', '8月', 
            '9月', '10月', '11月', '12月'
        ],
		monthNamesShort: [
            '1月', '2月', '3月', '4月', 
            '5月', '6月', '7月', '8月', 
            '9月', '10月', '11月', '12月'
        ],
		dayNames: [
            '周日', '周一', '周二', '周三', '周四', '周五', '周六'
        ],
		dayNamesShort: [
            '周日', '周一', '周二', '周三', '周四', '周五', '周六'
        ],
		selectable: true,
		selectHelper: true,
		unselectCancel: '.modal *',
		allDayText: '全天',
		nowIndicator: true,
		forceEventDuration: true,
		firstDay: 1, // 第一天是周一还是周天，与datepicker必须相同
		dragOpacity:{
			"month": .5,
			"agendaWeek": 1,
			"agendaDay": 1
		},
		editable: true,

		// 刷新视图，重新获取日历事件
		viewRender: function( view, element ) {
			//TODO: 感觉这样造成性能上的损失，是否有更好的方法？
			const calendar = $('#calendar');
			const eventsArr = dataLoader.getEventSource( view, element );
			calendar.fullCalendar('removeEvents');
			calendar.fullCalendar('addEventSource', {
				events: eventsArr
			});
		},

		// 选择动作触发的事件句柄，定义了一个callback
		select: function(start, end, jsEvent, view){
			// 弹出“创建日历事件”窗口
			// 判断是否渲染
			//TODO: 想办法不要用全局变量
			if ( !window.g_createModal ) new _Modal_EventCreateModal__WEBPACK_IMPORTED_MODULE_4__["default"]({start, end, jsEvent, view});
			// 传递参数
			window.g_createModal.update({start, end, jsEvent, view});
			window.g_createModal.show();
		},

		// 日历事件拖动 event, delta, revertFunc, jsEvent, ui, view
		eventDrop: function(event, delta, revertFunc, jsEvent, ui, view){
			if (event.id){
				dataLoader.updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view)
			} else {
				revertFunc();
			}
		},

		// 日历事件日期范围重置
		eventResize: function(event, delta, revertFunc, jsEvent, ui, view){
			if (event.id){
				dataLoader.updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view);
			} else {
				revertFunc();
			}
		},

		eventRender: function(eventObj, $el) {
			// 元素已经渲染，可修改元素
			const isComplete = parseInt(eventObj.complete) == 5;
			if ( isComplete ) {
				$el.css('background-color', '#E1E1E1');
				$el.find('.fc-content').css('visibility', 'hidden');
				$el.css('border', '1px solid #E1E1E1');
			}
			
		},

		// 日历事件点击后事件句柄
		eventClick: function( event, jsEvent, view ) {
			// this 指向包裹事件的<a>元素

			// 判断是否已经渲染弹窗
			if ( !g_editPopper ) {
				g_editPopper = Object(_Widget_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_3__["renderEditPopper"])({
					'event': event,
					'jsEvent': jsEvent,
					'view': view
				}, this).EventPopover('show');
			} else {
				// 更新reference
				g_editPopper.EventPopover('option', {
					args: {
						'event': event,
						'jsEvent': jsEvent,
						'view': view
					},
					title: event.title,
					reference: this
				}).EventPopover('update').EventPopover('show');
			}

		}
		
	})
})
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dpZGdldC9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlIHN5bmMgXlxcLlxcLy4qJCIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FsZW5kYXJFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9Nb2RhbC9FdmVudENyZWF0ZU1vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9Nb2RhbC9FdmVudEVkaXRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTW9kYWwvRXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVXRpbHMvRm9ybUhhbmRsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzL0Zvcm1VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvV2lkZ2V0L0NvbG9yUGlja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9XaWRnZXQvRGF0ZVRpbWVQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dpZGdldC9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmNzcz83OTAxIiwid2VicGFjazovLy8uL3NyYy9XaWRnZXQvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvV2l6RXZlbnREYXRhTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9XaXpJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcz9kOGMzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJ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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1UUE7QUFDQTtBQUNtRDtBQUNuRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7OztBQzNWQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTO0FBQ1Q7O0FBRUEsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDK0I7QUFDSDtBQUM1Qjs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5SkFBeUo7QUFDeko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDK0I7QUFDSDtBQUM1Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnSUFBZ0k7QUFDaEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RkFBdUY7QUFDdkY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ25CQTs7QUFFQTs7QUFFQTtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM4QjtBQUM5QjtBQUM0QjtBQUM1Qjs7QUFFUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUdBQXNELDBCQUEwQjtBQUNoRjtBQUNBLGdDQUFnQywwQkFBMEI7QUFDMUQ7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQSxFQUFFO0FBQ0YsQ0FBQyxDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjM2OTUyZTZkY2ViMzA1NDNjMmMzXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdHtcbiBcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2luZGV4LmpzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIFBvcG92ZXIg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyogUG9wb3ZlciDlrrnlmajlj4rlrprkvY1cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogI0ZGRjtcXHJcXG4gICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICB3aWR0aDogYXV0bztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIC4yKTtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIgLmFycm93IHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgd2lkdGg6IDIwcHg7XFxyXFxuICAgIGhlaWdodDogMTBweDtcXHJcXG4gICAgbWFyZ2luOiAwIDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIgLmFycm93OjpiZWZvcmUsIC50Yy1wb3BvdmVyIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogdG9wIOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0ge1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIGJvdHRvbTogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm90dG9tOiAxcHg7XFxyXFxuICAgIGJvcmRlci10b3AtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIHJpZ2h0IOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93IHtcXHJcXG4gICAgbGVmdDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxuICAgIHdpZHRoOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogNnB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDEwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGxlZnQ6IDFweDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBib3R0b20g5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93IHtcXHJcXG4gICAgdG9wOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDAgMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIHRvcDogMXB4O1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjZjdmN2Y3OyAvKui/memHjOS4uuS6huS4k+mXqOmAgumFjeacieagh+mimOiDjOaZr+eahFBvcG92ZXIqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBsZWZ0IOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3cge1xcclxcbiAgICByaWdodDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxuICAgIHdpZHRoOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogNnB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMCAxMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgcmlnaHQ6IDA7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgcmlnaHQ6IDFweDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIENvbnRlbnQg5qCH6aKY5ZKM5YaF5a65XFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXItaGVhZGVyIHtcXHJcXG4gICAgcGFkZGluZzogLjVyZW0gLjc1cmVtO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xcclxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWJlYjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1ib2R5IHtcXHJcXG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4yZW07XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jdGMtcG9wb3Zlci1ldmVudC10aXRsZTpmb2N1cyxcXHJcXG4jdGMtcG9wb3Zlci1ldmVudC10aXRsZTpob3ZlciB7XFxyXFxuICAgIG91dGxpbmU6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGJsYWNrOyBcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLCBib2R5IHtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG46Zm9jdXMge1xcclxcbiAgICBvdXRsaW5lOm5vbmU7XFxyXFxufVxcclxcblxcclxcbiNjYWxlbmRhci1jb250YWluZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogOHB4O1xcclxcbiAgICByaWdodDogOHB4O1xcclxcbiAgICBib3R0b206IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZjLWhlYWRlci10b29sYmFyIHtcXHJcXG4gICAgLypcXHJcXG4gICAgdGhlIGNhbGVuZGFyIHdpbGwgYmUgYnV0dGluZyB1cCBhZ2FpbnN0IHRoZSBlZGdlcyxcXHJcXG4gICAgYnV0IGxldCdzIHNjb290IGluIHRoZSBoZWFkZXIncyBidXR0b25zXFxyXFxuICAgICovXFxyXFxuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxyXFxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XFxyXFxufVxcclxcblxcclxcblxcclxcbi8qIEZvbnRzLmNzcyAtLSDot6jlubPlj7DkuK3mloflrZfkvZPop6PlhrPmlrnmoYhcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmZvbnQtaGVpIHtmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgXFxcIk5vdG8gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgXFxcIk5pbWJ1cyBTYW5zIExcXFwiLCBBcmlhbCwgXFxcIkxpYmVyYXRpb24gU2Fuc1xcXCIsIFxcXCJQaW5nRmFuZyBTQ1xcXCIsIFxcXCJIaXJhZ2lubyBTYW5zIEdCXFxcIiwgXFxcIk5vdG8gU2FucyBDSksgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2FucyBDTlxcXCIsIFxcXCJNaWNyb3NvZnQgWWFIZWlcXFwiLCBcXFwiV2VucXVhbnlpIE1pY3JvIEhlaVxcXCIsIFxcXCJXZW5RdWFuWWkgWmVuIEhlaVxcXCIsIFxcXCJTVCBIZWl0aVxcXCIsIFNpbUhlaSwgXFxcIldlblF1YW5ZaSBaZW4gSGVpIFNoYXJwXFxcIiwgc2Fucy1zZXJpZjt9XFxyXFxuLmZvbnQta2FpIHtmb250LWZhbWlseTogQmFza2VydmlsbGUsIEdlb3JnaWEsIFxcXCJMaWJlcmF0aW9uIFNlcmlmXFxcIiwgXFxcIkthaXRpIFNDXFxcIiwgU1RLYWl0aSwgXFxcIkFSIFBMIFVLYWkgQ05cXFwiLCBcXFwiQVIgUEwgVUthaSBIS1xcXCIsIFxcXCJBUiBQTCBVS2FpIFRXXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFcgTUJFXFxcIiwgXFxcIkFSIFBMIEthaXRpTSBHQlxcXCIsIEthaVRpLCBLYWlUaV9HQjIzMTIsIERGS2FpLVNCLCBcXFwiVFctS2FpXFxcIiwgc2VyaWY7fVxcclxcbi5mb250LXNvbmcge2ZvbnQtZmFtaWx5OiBHZW9yZ2lhLCBcXFwiTmltYnVzIFJvbWFuIE5vOSBMXFxcIiwgXFxcIlNvbmd0aSBTQ1xcXCIsIFxcXCJOb3RvIFNlcmlmIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNlcmlmIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgQ05cXFwiLCBTVFNvbmcsIFxcXCJBUiBQTCBOZXcgU3VuZ1xcXCIsIFxcXCJBUiBQTCBTdW5ndGlMIEdCXFxcIiwgTlNpbVN1biwgU2ltU3VuLCBcXFwiVFctU3VuZ1xcXCIsIFxcXCJXZW5RdWFuWWkgQml0bWFwIFNvbmdcXFwiLCBcXFwiQVIgUEwgVU1pbmcgQ05cXFwiLCBcXFwiQVIgUEwgVU1pbmcgSEtcXFwiLCBcXFwiQVIgUEwgVU1pbmcgVFdcXFwiLCBcXFwiQVIgUEwgVU1pbmcgVFcgTUJFXFxcIiwgUE1pbmdMaVUsIE1pbmdMaVUsIHNlcmlmO31cXHJcXG4uZm9udC1mYW5nLXNvbmcge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFxcXCJMaWJlcmF0aW9uIFNlcmlmXFxcIiwgU1RGYW5nc29uZywgRmFuZ1NvbmcsIEZhbmdTb25nX0dCMjMxMiwgXFxcIkNXVEVYLUZcXFwiLCBzZXJpZjt9XFxyXFxuXFxyXFxuLyog5Li05pe25pS+572uXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnVpLWJ1dHRvbi1pY29uLW9ubHkuc3BsaXRidXR0b24tc2VsZWN0IHtcXHJcXG4gICAgd2lkdGg6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuYVtkYXRhLWdvdG9dIHtcXHJcXG4gICAgY29sb3I6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi8qIEJvb3RzdHJhcCA0IOe7hOS7tuagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi8qIOihqOWNlVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi5jb2wtZm9ybS1sYWJlbCB7XFxyXFxuICAgIHBhZGRpbmctdG9wOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyguMzc1cmVtICsgMXB4KTtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBnX2RiLCBXaXpDb21tb25VSSBhcyBnX2Ntbn0gZnJvbSAnLi9XaXpJbnRlcmZhY2UnXHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi9Db25maWcnXHJcblxyXG5jb25zdCBnX2NhbCA9ICQoJyNjYWxlbmRhcicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XHJcblx0Y29uc3RydWN0b3IoIGRhdGEgKSB7XHJcblx0XHRpZiAoIWdfZGIpIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdGNvbnN0IHR5cGUgPSB0aGlzLl9jaGVja0RhdGFUeXBlKGRhdGEpO1xyXG5cdFx0c3dpdGNoICggdHlwZSApIHtcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHRoaXMuX0luZm8gPSB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdFx0XHRcdHRoaXMuX0V4dHJhSW5mbyA9IGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPID8gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPKSA6IHRoaXMuX2dldERlZmF1bHRFeHRyYUluZm8oKTtcclxuXHRcdFx0XHRcdHRoaXMuX2NyZWF0ZShkYXRhLCB0eXBlKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSk7IH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHRoaXMuX2NyZWF0ZShkYXRhLCB0eXBlKTtcclxuXHRcdFx0XHRcdC8vIOiuvue9rmluZm/lr7nosaFcclxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKTsgfVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvL1RPRE86IOiOt+W+l1dpekV2ZW505pWw5o2u77yM5bm25Yib5bu65a+56LGhXHJcblx0XHRcdFx0XHRjb25zdCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQoZGF0YSk7XHJcblx0XHRcdFx0XHRjb25zdCBuZXdFdmVudERhdGEgPSB7XHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRU5EXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRU5EJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfSU5GT1wiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0lORk8nKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9TVEFSVFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX1NUQVJUJyksXHJcblx0XHRcdFx0XHRcdFwiY3JlYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlQ3JlYXRlZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcblx0XHRcdFx0XHRcdFwiZ3VpZFwiIDogZG9jLkdVSUQsXHJcblx0XHRcdFx0XHRcdFwidGl0bGVcIiA6IGRvYy5UaXRsZSxcclxuXHRcdFx0XHRcdFx0XCJ1cGRhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVNb2RpZmllZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX2NyZWF0ZShuZXdFdmVudERhdGEsICdXaXpFdmVudCcpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKTsgfVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdF9jcmVhdGUoZGF0YSwgdHlwZSkge1xyXG5cdFx0bGV0IHN0YXJ0LCBlbmQsIGlkLCBia0NvbG9yLCBhbGxEYXksIGNvbXBsZXRlLCBkYXRlQ29tcGxldGVkO1xyXG5cdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRcdC8vIOe7n+S4gOWPmOmHj1xyXG5cdFx0XHRcdGlkID0gZGF0YS5ndWlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5DQUxFTkRBUl9TVEFSVDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLkNBTEVOREFSX0VORDtcclxuXHRcdFx0XHQvLyDliKTmlq3mmK/lkKbnlKjmiLfoh6rlrprkuYnog4zmma/oibLvvIzlkJHkuIvlhbzlrrnljp/niYjml6XljoZcclxuXHRcdFx0XHRia0NvbG9yID0gdGhpcy5fSW5mby5jaSA9PSAwID8gdGhpcy5fSW5mby5iIDogQ29uZmlnLmNvbG9ySXRlbXNbdGhpcy5fSW5mby5jaV0uY29sb3JWYWx1ZTtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLkNBTEVOREFSX0VORC5pbmRleE9mKFwiMjM6NTk6NTlcIikgIT0gLTEgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0Y29tcGxldGUgPSB0aGlzLl9FeHRyYUluZm8uQ29tcGxldGU7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IHRoaXMuX0V4dHJhSW5mby5EYXRlQ29tcGxldGVkO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHRpZCA9IGRhdGEuaWQ7XHJcblx0XHRcdFx0c3RhcnQgPSBkYXRhLnN0YXJ0O1xyXG5cdFx0XHRcdGVuZCA9IGRhdGEuZW5kO1xyXG5cdFx0XHRcdGJrQ29sb3IgPSBkYXRhLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLmFsbERheSA/IGRhdGEuYWxsRGF5IDogISQuZnVsbENhbGVuZGFyLm1vbWVudChkYXRhLnN0YXJ0KS5oYXNUaW1lKCk7XHJcblx0XHRcdFx0Y29tcGxldGUgPSBkYXRhLmNvbXBsZXRlIHx8IDA7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IGRhdGEuZGF0ZUNvbXBsZXRlZCB8fCAnJztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgaWRlbnRpZnkgZGF0YSB0eXBlLicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0Ly8g5Z+65pys5L+h5oGvXHJcblx0XHR0aGlzLmlkID0gaWQ7XHJcblx0XHR0aGlzLnRpdGxlID0gZGF0YS50aXRsZTtcclxuXHRcdC8vIOaXtumXtOS/oeaBr1xyXG5cdFx0dGhpcy5hbGxEYXkgPSBhbGxEYXk7XHJcblx0XHQvLyDms6jmhI/vvIFzdGFydC9lbmQg5Y+v6IO95pivbW9tZW505a+56LGh5oiW6ICFc3Ry77yM5omA5Lul5LiA5b6L5YWI6L2s5o2i5oiQbW9tZW505YaN5qC85byP5YyW6L6T5Ye6XHJcblx0XHR0aGlzLnN0YXJ0ID0gYWxsRGF5ID8gbW9tZW50KHN0YXJ0KS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpIDogbW9tZW50KHN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuZW5kID0gYWxsRGF5ID8gbW9tZW50KGVuZCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChlbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkID8gZGF0YS5jcmVhdGVkIDogbW9tZW50KHN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMudXBkYXRlZCA9IGRhdGEudXBkYXRlZCA/IGRhdGEudXBkYXRlZCA6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Ly8g6K6+572u5L+h5oGvXHJcblx0XHR0aGlzLnRleHRDb2xvciA9ICdibGFjayc7XHJcblx0XHR0aGlzLmJhY2tncm91bmRDb2xvciA9IGJrQ29sb3I7XHJcblx0XHR0aGlzLmNvbXBsZXRlID0gY29tcGxldGU7XHJcblx0XHR0aGlzLmRhdGVDb21wbGV0ZWQgPSBkYXRlQ29tcGxldGVkO1xyXG5cdH1cclxuXHJcblx0X2NoZWNrRGF0YVR5cGUoZGF0YSkge1xyXG5cdFx0Y29uc3Qgb2JqQ2xhc3MgPSBkYXRhLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIGNvbnN0IEdVSURfUmVnRXhyID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuICAgICAgICBsZXQgdHlwZTtcclxuICAgICAgICBzd2l0Y2ggKG9iakNsYXNzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxyXG4gICAgICAgICAgICAgICAgaWYgKCBHVUlEX1JlZ0V4ci50ZXN0KGRhdGEpICkgdHlwZSA9IFwiR1VJRFwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGF0YSwgY2Fubm90IGNyZWF0ZSBDYWxlbmRhckV2ZW50IG9iamVjdC4nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE9iamVjdDpcclxuXHRcdFx0XHRpZiAoIGRhdGEuQ0FMRU5EQVJfSU5GTyAmJiBkYXRhLnRpdGxlICkgeyBcclxuXHRcdFx0XHRcdHR5cGUgPSAnV2l6RXZlbnQnO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRhdGEuc3RhcnQgJiYgZGF0YS50aXRsZSApIHtcclxuXHRcdFx0XHRcdHR5cGUgPSAnRnVsbENhbGVuZGFyRXZlbnQnO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuXHR9O1xyXG5cclxuXHRfcGFyc2VJbmZvKEluZm9TdHJpbmcpIHtcclxuXHRcdGNvbnN0IEluZm9PYmplY3QgPSB7fTtcclxuXHRcdC8vIOaLhuino0NBTEVOREFSX0lORk9cclxuXHRcdGNvbnN0IEluZm9BcnJheSA9IEluZm9TdHJpbmcuc3BsaXQoJy8nKTtcclxuXHRcdEluZm9BcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRjb25zdCBwYWlyID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cdFx0XHRJbmZvT2JqZWN0W3BhaXJbMF1dID0gcGFpclsxXTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5aSE55CG6aKc6Imy5YC8XHJcblx0XHRpZiAoIEluZm9PYmplY3QuYiApIEluZm9PYmplY3QuYiA9ICcjJyArIEluZm9PYmplY3QuYjtcclxuXHJcblx0XHRyZXR1cm4gSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOWwhiBJbmZvIOWvueixoeW6j+WIl+WMli5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbSW5mb09iamVjdD1dIOaPkOS+myBJbmZvIOWvueixoe+8jOm7mOiupOS4umB0aGlzLl9JbmZvYC5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30g6L+U5Zue55So5LqOSW5mb+WvueixoeWtl+espuS4si5cclxuICAgICAqL1xyXG5cdF9zdHJpbmdpZnlJbmZvKCBJbmZvT2JqZWN0ID0gdGhpcy5fSW5mbyApIHtcclxuXHRcdGlmICggIUluZm9PYmplY3QgKSByZXR1cm4gJyc7XHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IEluZm9PYmplY3RLZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhJbmZvT2JqZWN0KTtcclxuXHRcdEluZm9PYmplY3RLZXlzQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3Qgc2luZ2xlSW5mbyA9IGAke2l0ZW19PSR7SW5mb09iamVjdFtpdGVtXX1gO1xyXG5cdFx0XHRJbmZvQXJyYXkucHVzaChzaW5nbGVJbmZvKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIEluZm9BcnJheS5qb2luKCcvJykucmVwbGFjZSgnIycsICcnKTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlSW5mbygpO1xyXG5cdFx0dGhpcy5fdXBkYXRlRXh0cmFJbmZvKCk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZUluZm8oKSB7XHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IEluZm9PYmplY3QgPSB7XHJcblx0XHRcdCdiJzogbnVsbCwgLy/og4zmma/oibJoZXjlgLxcclxuXHRcdFx0J3InOiAnLTEnLCAvL+aPkOmGkuaWueW8j1xyXG5cdFx0XHQnYyc6ICcwJywgLy/nu5PmnZ/mj5DphpLkv6Hmga9cclxuXHRcdFx0J2NpJzogMCAvL+iDjOaZr+iJsklE77yM6buY6K6kIDAg6KGo56S66IOM5pmv5Li655So5oi36Ieq5a6a5LmJXHJcblx0XHR9O1xyXG5cdFx0Ly8g5pu05paw6IOM5pmv6ImyJ2InXHJcblx0XHRJbmZvT2JqZWN0WydiJ10gPSB0aGlzLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKCcjJywgJycpO1xyXG5cdFx0Ly8g5pu05paw6aKc6Imy5oyH5pWwJ2NpJ1xyXG5cdFx0Q29uZmlnLmNvbG9ySXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0aWYgKCBpdGVtLmNvbG9yVmFsdWUgPT0gIHRoYXQuYmFja2dyb3VuZENvbG9yICkge1xyXG5cdFx0XHRcdC8vIOW9k+aXpeeoi+iDjOaZr+iJsuS4juiJsuihqOWMuemFjeaXtuWImeeUqCBjb2xvciBpZGV4IOadpeWCqOWtmO+8iOWFvOWuueWOn+eJiOaXpeWOhuaPkuS7tu+8iVxyXG5cdFx0XHRcdEluZm9PYmplY3RbJ2NpJ10gPSBpbmRleDtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5bqU55So5pu05pawXHJcblx0XHR0aGlzLl9JbmZvID0gSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHRfZ2V0RGVmYXVsdEV4dHJhSW5mbygpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCdDb21wbGV0ZSc6IDAsIC8vXHJcblx0XHRcdCdEYXRlQ29tcGxldGVkJzogJycsIC8vIElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIgWVlZWS1NTS1ERCAwMDowMDowMFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVFeHRyYUluZm8oKSB7XHJcblx0XHRjb25zdCBFeHRyYUluZm9PYmplY3QgPSB7XHJcblx0XHRcdCdDb21wbGV0ZSc6IDAsXHJcblx0XHRcdCdEYXRlQ29tcGxldGVkJzogJycsXHJcblx0XHRcdCdQcmlvcic6IDBcclxuXHRcdH07XHJcblx0XHRFeHRyYUluZm9PYmplY3RbJ0NvbXBsZXRlJ10gPSB0aGlzLmNvbXBsZXRlO1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydEYXRlQ29tcGxldGVkJ10gPSB0aGlzLmRhdGVDb21wbGV0ZWQ7XHJcblx0XHR0aGlzLl9FeHRyYUluZm8gPSBFeHRyYUluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldEV2ZW50SHRtbCh0aXRsZSA9IHRoaXMudGl0bGUsIGNvbnRlbnQgPSAnJyl7XHJcblx0XHRjb25zdCBodG1sVGV4dCA9IFxyXG5cdFx0XHRgPGh0bWw+XHJcblx0XHRcdFx0PGhlYWQ+XHJcblx0XHRcdFx0XHQ8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgY29udGVudD1cInRleHQvaHRtbDsgY2hhcnNldD11bmljb2RlXCI+XHJcblx0XHRcdFx0XHQ8dGl0bGU+JHt0aXRsZX08L3RpdGxlPiBcclxuXHRcdFx0XHQ8L2hlYWQ+XHJcblx0XHRcdFx0PGJvZHk+XHJcblx0XHRcdFx0XHQ8IS0tV2l6SHRtbENvbnRlbnRCZWdpbi0tPlxyXG5cdFx0XHRcdFx0PGRpdj4ke2NvbnRlbnR9PC9kaXY+XHJcblx0XHRcdFx0XHQ8IS0tV2l6SHRtbENvbnRlbnRFbmQtLT5cclxuXHRcdFx0XHQ8L2JvZHk+XHJcblx0XHRcdDwvaHRtbD5gO1xyXG5cdFxyXG5cdFx0ICByZXR1cm4gaHRtbFRleHRcclxuXHR9O1xyXG5cclxuXHR0b0Z1bGxDYWxlbmRhckV2ZW50KCkge1xyXG5cdFx0Ly8g5rOo5oSP5pa55rOV6L+U5Zue55qE5Y+q5pivRnVsbENhbGVuZGFyRXZlbnTnmoTmlbDmja7nsbvlnovvvIzlubbkuI3mmK9ldmVudOWvueixoVxyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0luZm8nICksIDEpO1xyXG5cdFx0a2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRuZXdFdmVudFtpdGVtXSA9IHRoYXRbaXRlbV07XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHR0b1dpekV2ZW50RGF0YSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB7fTtcclxuXHRcdG5ld0V2ZW50LnRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdG5ld0V2ZW50Lmd1aWQgPSB0aGlzLmlkO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgMDA6MDA6MDAnKSA6IHRoaXMuc3RhcnQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FTkQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIDIzOjU5OjU5JykgOiB0aGlzLmVuZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0lORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRVhUUkFJTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pO1xyXG5cdFx0bmV3RXZlbnQuY3JlYXRlZCA9IHRoaXMuY3JlYXRlZDtcclxuXHRcdG5ld0V2ZW50LnVwZGF0ZWQgPSB0aGlzLnVwZGF0ZWQ7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0YWRkVG9GdWxsQ2FsZW5kYXIoKSB7XHJcblx0XHQvL1RPRE86IOWwhuiHqui6q+a3u+WKoOWIsEZ1bGxDYWxlbmRhclxyXG5cdFx0aWYgKCFnX2NhbCkgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRnVsbENhbGVuZGFyIFdpZGdldC4nKVxyXG5cdFx0Z19jYWwuZnVsbENhbGVuZGFyKCAnYWRkRXZlbnRTb3VyY2UnLCB7XHJcblx0XHRcdGV2ZW50czogW1xyXG5cdFx0XHRcdHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdF9zYXZlQWxsUHJvcCgpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOabtOaWsOS6i+S7tuaWh+aho+aVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0Ly8g5L+d5a2Y5qCH6aKYXHJcblx0XHRkb2MuVGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0Ly8g5L+d5a2Y5pe26Ze05pWw5o2uXHJcblx0XHRpZiAoIHRoaXMuYWxsRGF5ICkge1xyXG5cdFx0XHRsZXQgc3RhcnRTdHIgPSBtb21lbnQodGhpcy5zdGFydCkuc2V0KHsnaCc6IDAsICdtJzogMCwgJ3MnOiAwfSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGxldCBlbmRTdHIgPSBtb21lbnQodGhpcy5lbmQpLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDkv53lrZggQ0FMRU5EQVJfSU5GT1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9JTkZPXCIsIHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbykpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIsIHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fRXh0cmFJbmZvKSk7XHJcblx0fTtcclxuXHJcblx0Ly8g6K6+572u5paH5qGj5bGe5oCn5YC8XHJcblx0X3NldFBhcmFtVmFsdWUoZG9jLCBrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZG9jLlNldFBhcmFtVmFsdWUoa2V5LCB2YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0X2NyZWF0ZVdpekV2ZW50RG9jKCkge1xyXG5cdFx0Ly9UT0RPOiDkv53lrZjlhajpg6jmlbDmja7ljIXmi6xUaXRsZVxyXG5cdFx0Ly8g5Yib5bu6V2l6RG9jXHJcblx0XHRjb25zdCBsb2NhdGlvbiA9IGBNeSBFdmVudHMvJHsgbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTScpIH0vYDtcclxuXHRcdGNvbnN0IG9iakZvbGRlciA9IGdfZGIuR2V0Rm9sZGVyQnlMb2NhdGlvbihsb2NhdGlvbiwgdHJ1ZSk7XHJcblx0XHRjb25zdCB0ZW1wSHRtbCA9IGdfY21uLkdldEFUZW1wRmlsZU5hbWUoJy5odG1sJyk7XHJcblx0XHRjb25zdCBodG1sVGV4dCA9IHRoaXMuX2dldEV2ZW50SHRtbCh0aGlzLnRpdGxlLCAnJyk7XHJcblx0XHRnX2Ntbi5TYXZlVGV4dFRvRmlsZSh0ZW1wSHRtbCwgaHRtbFRleHQsICd1bmljb2RlJyk7XHJcblx0XHRjb25zdCBkb2MgPSBvYmpGb2xkZXIuQ3JlYXRlRG9jdW1lbnQyKHRoaXMudGl0bGUsIFwiXCIpO1xyXG5cdFx0ZG9jLkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUodGhpcy50aXRsZSk7XHJcblx0XHRkb2MuVXBkYXRlRG9jdW1lbnQ2KHRlbXBIdG1sLCB0ZW1wSHRtbCwgMHgyMik7XHJcblx0XHQvLyDorr7nva7moIfnrb5cclxuXHRcdC8vaWYgKCB0YWdzICkgZG9jLlNldFRhZ3NUZXh0Mih0YWdzLCBcIkNhbGVuZGFyXCIpO1xyXG5cdFx0Ly8g5bCG5L+h5oGv57yW56CB5YiwV2l6RG9j5bGe5oCn5Lit5Y67XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9XaXpFdmVudERhdGEoKTtcclxuXHRcdGRvYy5BZGRUb0NhbGVuZGFyKG5ld0V2ZW50LkNBTEVOREFSX1NUQVJULCBuZXdFdmVudC5DQUxFTkRBUl9FTkQsIG5ld0V2ZW50LkNBTEVOREFSX0lORk8pO1xyXG5cdFx0Ly8gY2hhbmdlIGRhdGFiYXNlXHJcblx0XHRkb2MudHlwZSA9IFwiZXZlbnRcIjtcclxuXHRcdC8vXHJcblx0XHR0aGlzLmlkID0gZG9jLkdVSUQ7XHJcblx0fVxyXG5cclxuXHRzYXZlVG9XaXpFdmVudERvYyggcHJvcCA9ICdhbGwnICkge1xyXG5cdFx0aWYgKCFnX2RiIHx8ICFnX2NtbikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2Ugb3IgSVdpekNvbW1vblVJIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdC8v5qOA5p+l5paH5qGj5piv5ZCm5a2Y5ZyoXHJcblx0XHRjb25zdCBndWlkUmVnZXggPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xyXG5cdFx0Y29uc3QgaXNXaXpEb2NFeGlzdCA9IGd1aWRSZWdleC50ZXN0KHRoaXMuaWQpO1xyXG5cdFx0Ly8g5Yib5bu65oiW6ICF5pu05paw5paH5qGjXHJcblx0XHRpZiAoIGlzV2l6RG9jRXhpc3QgKSB7XHJcblx0XHRcdC8vIOagueaNruaMh+S7pOabtOaWsOWGheWuuVxyXG5cdFx0XHR0aGlzLl9zYXZlQWxsUHJvcCgpO1xyXG5cdFx0XHQvLyDmm7TmlrBGdWxsQ2FsZW5kYXJcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIOWIm+W7uuaWsOeahOS6i+S7tuaWh+aho1xyXG5cdFx0XHR0aGlzLl9jcmVhdGVXaXpFdmVudERvYygpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fTtcclxuXHJcblx0ZGVsZXRlRXZlbnREYXRhKCBpc0RlbGV0ZURvYyA9IGZhbHNlICl7XHJcblx0XHRpZiAoIWdfY2FsKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBGdWxsQ2FsZW5kYXIgV2lkZ2V0LicpXHJcblx0XHRsZXQgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0aWYgKCFkb2MpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEV2ZW50IHJlbGF0ZWQgV2l6RG9jdW1lbnQuJylcclxuXHRcdC8vIOenu+mZpEZ1bGxDYWxlbmRhcuS6i+S7tlxyXG5cdFx0Z19jYWwuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnLCB0aGlzLmlkKTtcclxuXHRcdC8vIOenu+mZpOaXpeWOhuaVsOaNrlxyXG5cdFx0ZG9jLlJlbW92ZUZyb21DYWxlbmRhcigpO1xyXG5cdFx0Ly8g5Yig6Zmk5paH5qGjXHJcblx0XHRpZiAoIGlzRGVsZXRlRG9jICkgZG9jLkRlbGV0ZSgpO1xyXG5cdH1cclxuXHJcblx0cmVmZXRjaERhdGEoKSB7XHJcblx0XHQvL1RPRE86IOmHjeaVsOaNruW6k+mHjeaWsOiOt+WPluaVsOaNruabtOaWsOWunuS+i1xyXG5cdH07XHJcblxyXG5cdHJlbmRlckV2ZW50KCkge1xyXG5cdFx0Ly8g55yL6K+l5LqL5Lu25piv5ZCm5bey5a2Y5Zyo77yM5aaC5p6c5a2Y5Zyo5YiZdXBkYXRlRXZlbnRcclxuXHRcdGlmICghZ19jYWwpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEZ1bGxDYWxlbmRhciBXaWRnZXQuJylcclxuXHR9O1xyXG5cclxuXHRyZWZyZXNoRXZlbnQoZXZlbnQpIHtcclxuXHRcdC8vVE9ETzog5bqU6K+l6Ieq5Yqo6YGN5Y6G5bm25L+u5pS55bGe5oCnXHJcblx0XHRpZiAoIGV2ZW50ICkge1xyXG5cdFx0XHQvLyDph43mlrDmuLLmn5NGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdFx0ZXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0XHRldmVudC5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0Z19jYWwuZnVsbENhbGVuZGFyKCd1cGRhdGVFdmVudCcsIGV2ZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8v55SoLmZ1bGxDYWxlbmRhcigg4oCYY2xpZW50RXZlbnRz4oCZIFssIGlkT3JGaWx0ZXIgXSApIC0+IEFycmF5IOiOt+WPlua6kOaVsOaNruS7juiAjOabtOaWsFxyXG5cdFx0XHQvL1RPRE86IOmBjeWOhuW5tuWvu+aJvkdVSUTljLnphY3nmoTkuovku7ZcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyByZWZyZXNoRXZlbnRTb3VyY2VzKCkge1xyXG5cdFx0Ly9UT0RPOiDlsIZGdWxsQ2FsZW5kYXLmiYDmnIlTb3VyY2Vz5Yig6Zmk77yM6YeN5paw5re75YqgXHJcblx0XHQvLyDmsqHngrnlh7vkuIDkuKrop4blm77mm7TmlrDml7blsLHmiafooYxcclxuXHR9XHJcblxyXG59IiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29sb3JDb3VudDogMTIsXHJcbiAgICBjb2xvckl0ZW1zOiBbXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjMzJDRDMyXCIsIFwiY29sb3JOYW1lXCI6ICfmqYTmpoTnu78nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNTQ4NEVEXCIsIFwiY29sb3JOYW1lXCI6ICflrp3nn7Pok50nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjQTRCREZFXCIsIFwiY29sb3JOYW1lXCI6ICfok53oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNDZENkRCXCIsIFwiY29sb3JOYW1lXCI6ICfpnZLnu7/oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjN0FFN0JGXCIsIFwiY29sb3JOYW1lXCI6ICfnu7/oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNTFCNzQ5XCIsIFwiY29sb3JOYW1lXCI6ICfmuIXmlrDnu78nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkJENzVCXCIsIFwiY29sb3JOYW1lXCI6ICfpu4ToibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkZCODc4XCIsIFwiY29sb3JOYW1lXCI6ICfmqZjoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkY4ODdDXCIsIFwiY29sb3JOYW1lXCI6ICfnuqLoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjREMyMTI3XCIsIFwiY29sb3JOYW1lXCI6ICflpaLljY7nuqInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjREJBREZGXCIsIFwiY29sb3JOYW1lXCI6ICfntKvoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRTFFMUUxXCIsIFwiY29sb3JOYW1lXCI6ICfngbDoibInIH1cclxuICAgIF0sXHJcblxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvbW9kYWwnO1xyXG5pbXBvcnQgRm9ybUhhbmRsZXMgZnJvbSAnLi4vVXRpbHMvRm9ybUhhbmRsZXMnO1xyXG5pbXBvcnQgeyBjcmVhdGVEYXRldGltZVBpY2tlciB9IGZyb20gJy4uL1dpZGdldC9EYXRlVGltZVBpY2tlcic7XHJcbmltcG9ydCB7IGNyZWF0ZUNvbG9yUGlja2VyIH0gZnJvbSAnLi4vV2lkZ2V0L0NvbG9yUGlja2VyJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9FdmVudE1vZGFsJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENyZWF0ZU1vZGFsIGV4dGVuZHMgRXZlbnRNb2RhbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXJncykge1xyXG4gICAgICAgIHN1cGVyKGFyZ3MpO1xyXG4gICAgICAgIC8vVE9ETzog5oOz5Yqe5rOV6YG/5YWN5a+85Ye65YWo5bGA5Y+Y6YePXHJcbiAgICAgICAgd2luZG93LmdfY3JlYXRlTW9kYWwgPSB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUoYXJncykge1xyXG4gICAgICAgIHRoaXMucmVzZXRGb3JtSW5wdXQodGhpcy5tb2RhbCwgJyN0Yy1jcmVhdGVwYWdlLWV2ZW50c3RhcnQsI3RjLWNyZWF0ZXBhZ2UtZXZlbnRlbmQnKTtcclxuICAgICAgICBzdXBlci51cGRhdGUoYXJncyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlclRlbXBsYXRlKCkge1xyXG4gICAgICAgIC8vIOa4suafkyBET01cclxuICAgICAgICB0aGlzLnJlbmRlckZvcm1Db21wb25lbnQodGhpcy5tb2RhbCwgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlOiB0aGlzLm1vZGFsLFxyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnc2hvd24uYnMubW9kYWwnLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlOiAoKSA9PiB0aGlzLm1vZGFsLmZpbmQoJyN0Yy1jcmVhdGVwYWdlLWV2ZW50dGl0bGUnKS5mb2N1cygpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWNyZWF0ZXBhZ2UtZXZlbnRzdGFydCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5hcmdzLnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IGNyZWF0ZURhdGV0aW1lUGlja2VyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGU6ICcjdGMtY3JlYXRlcGFnZS1ldmVudGVuZCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5hcmdzLmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBjcmVhdGVEYXRldGltZVBpY2tlclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWNyZWF0ZXBhZ2UtZXZlbnRjb2xvcicsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJycsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogY3JlYXRlQ29sb3JQaWNrZXJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZTogJyN0Yy1jcmVhdGVwYWdlLWNyZWF0ZScsXHJcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGU6ICgpID0+IG5ldyBGb3JtSGFuZGxlcygpLm9uQ3JlYXRlQnRuQ2xpY2sodGhpcy5hcmdzLnN0YXJ0LCB0aGlzLmFyZ3MuZW5kLCB0aGlzLmFyZ3MuanNFdmVudCwgdGhpcy5hcmdzLnZpZXcsIHRoaXMubW9kYWwpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWNyZWF0ZXBhZ2UtY2FuY2VsLCN0Yy1jcmVhdGVwYWdlLWNsb3NlJyxcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKCkgPT4gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCd1bnNlbGVjdCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0IEh0bWxUZW1wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwgZmFkZVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgaWQ9XCJ0Yy1FdmVudENyZWF0ZU1vZGFsXCIgYXJpYS1sYWJlbGxlZGJ5PVwidGMtY3JlYXRlcGFnZS1kaWFsb2d0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWRcIiByb2xlPVwiZG9jdW1lbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9J3RjLWNyZWF0ZXBhZ2UtY2xvc2UnIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgaWQ9J3RjLWNyZWF0ZXBhZ2UtZGlhbG9ndGl0bGUnPuWIm+W7uuaWsOeahOaXpeeoizwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZm9ybS1ncm91cCBjb2wtbWQtMTInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0aXRsZVwiPuagh+mimDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBldmVudHRpdGxlXCIgaWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50dGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1tZC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGMtY3JlYXRlcGFnZS1ldmVudHN0YXJ0XCIgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbFwiPuW8gOWni+aXpeacnzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBkYXRldGltZXBpY2tlci1pbnB1dCBldmVudHN0YXJ0XCIgaWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50c3RhcnRcIiBkYXRhLXRvZ2dsZT1cImRhdGV0aW1lcGlja2VyXCIgZGF0YS10YXJnZXQ9XCIjdGMtY3JlYXRlcGFnZS1ldmVudHN0YXJ0XCIgcmVhZG9ubHkvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50ZW5kXCIgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbFwiPue7k+adn+aXpeacnzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZXZlbnRlbmRcIiBpZD0ndGMtY3JlYXRlcGFnZS1ldmVudGVuZCcgcmVhZG9ubHkvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50Y29sb3JcIiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsXCI+6Imy5b2pPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRjb2xvclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50Y29sb3JcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0YWdzXCIgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbFwiPuagh+etvjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50dGFnc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50dGFnc1wiID4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdmb3JtLWdyb3VwIGNvbC1tZC0xMic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGMtY3JlYXRlcGFnZS1ldmVudHJlbWFya1wiPuWkh+azqDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZXZlbnRyZW1hcmtcIiBpZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRyZW1hcmtcIiByb3dzPVwiM1wiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3Jvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC14cy0xMicgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ndGMtY3JlYXRlcGFnZS1jcmVhdGUnIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgdHlwZT1cImJ1dHRvblwiPuWIm+W7ujwvYnV0dG9uPiAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ndGMtY3JlYXRlcGFnZS1jYW5jZWwnIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+5Y+W5raIPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvbW9kYWwnO1xyXG5pbXBvcnQgRm9ybUhhbmRsZXMgZnJvbSAnLi4vVXRpbHMvRm9ybUhhbmRsZXMnO1xyXG5pbXBvcnQgeyBjcmVhdGVEYXRldGltZVBpY2tlciB9IGZyb20gJy4uL1dpZGdldC9EYXRlVGltZVBpY2tlcic7XHJcbmltcG9ydCB7IGNyZWF0ZUNvbG9yUGlja2VyIH0gZnJvbSAnLi4vV2lkZ2V0L0NvbG9yUGlja2VyJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9FdmVudE1vZGFsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RWRpdE1vZGFsIGV4dGVuZHMgRXZlbnRNb2RhbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXJncykge1xyXG4gICAgICAgIHN1cGVyKGFyZ3MpO1xyXG4gICAgICAgIC8vVE9ETzog5oOz5Yqe5rOV6YG/5YWN5YWo5bGA5Y+Y6YePXHJcbiAgICAgICAgd2luZG93LmdfZWRpdE1vZGFsID0gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyVGVtcGxhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmFyZ3MuZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb3JtQ29tcG9uZW50KHRoaXMubW9kYWwsIFtcclxuICAgICAgICAgICAgey8v5omA5pyJ6L6T5YWl5qGGXHJcbiAgICAgICAgICAgICAgICBub2RlOiAnaW5wdXQnLFxyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnY2hhbmdlJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKCkgPT4gdGhhdC5tb2RhbC5maW5kKCcjdGMtZWRpdHBhZ2Utc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHsvL+agh+mimFxyXG4gICAgICAgICAgICAgICAgbm9kZTogJyN0Yy1lZGl0cGFnZS1ldmVudHRpdGxlJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBldmVudC50aXRsZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgey8v5byA5aeL5pel5pyfXHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWVkaXRwYWdlLWV2ZW50c3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IGNyZWF0ZURhdGV0aW1lUGlja2VyLFxyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnZHAuY2hhbmdlJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKCkgPT4gdGhhdC5tb2RhbC5maW5kKCcjdGMtZWRpdHBhZ2Utc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHsvL+e7k+adn+aXpeacn1xyXG4gICAgICAgICAgICAgICAgbm9kZTogJyN0Yy1lZGl0cGFnZS1ldmVudGVuZCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IGNyZWF0ZURhdGV0aW1lUGlja2VyLFxyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnZHAuY2hhbmdlJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKCkgPT4gdGhhdC5tb2RhbC5maW5kKCcjdGMtZWRpdHBhZ2Utc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHsvL+minOiJslxyXG4gICAgICAgICAgICAgICAgbm9kZTogJyN0Yy1lZGl0cGFnZS1ldmVudGNvbG9yJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBldmVudC5iYWNrZ3JvdW5kQ29sb3IsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKG5vZGUpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGV2ZW50LmJhY2tncm91bmRDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29sb3JQaWNrZXIobm9kZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgey8v5L+d5a2Y5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWVkaXRwYWdlLXNhdmUnLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IChub2RlKSA9PiAkKG5vZGUpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRm9ybUhhbmRsZXMoKS5vblNhdmVCdG5DbGljayhldmVudCwgdGhhdC5tb2RhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5oaWRlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHRcdFx0ey8vIOWujOaIkOaMiemSrlxyXG5cdFx0XHRcdG5vZGU6ICcjdGMtZWRpdHBhZ2UtZmluaXNoJyxcclxuXHRcdFx0XHRldmVudE5hbWU6ICdjbGljaycsXHJcblx0XHRcdFx0aGFuZGxlOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRmb3JtSGFuZGxlcy5vbkNvbXBsZXRlQnRuQ2xpY2soZXZlbnQpO1xyXG5cdFx0XHRcdFx0dGhhdC5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG4gICAgICAgICAgICB7Ly/liKDpmaTmjInpkq5cclxuICAgICAgICAgICAgICAgIG5vZGU6ICcjdGMtZWRpdHBhZ2UtZGVsZXRlJyxcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGb3JtSGFuZGxlcygpLm9uRGVsZXRlRGF0YUJ0bkNsaWNrKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgey8v5Yig6Zmk5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWVkaXRwYWdlLWRlbGV0ZUV2ZW50RG9jJyxcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGb3JtSGFuZGxlcygpLm9uRGVsZXRlRG9jQnRuQ2xpY2soZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdKVxyXG4gICAgfTtcclxuXHJcbiAgICBnZXQgSHRtbFRlbXBsYXRlKCkge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBpZD0ndGMtRXZlbnRFZGl0TW9kYWwnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWRcIiByb2xlPVwiZG9jdW1lbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj7ml6XnqIvnvJbovpE8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Zvcm0tZ3JvdXAgY29sLW1kLTEyJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1lZGl0cGFnZS1ldmVudHRpdGxlXCI+5qCH6aKYPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50dGl0bGVcIiBpZD1cInRjLWVkaXRwYWdlLWV2ZW50dGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1tZC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGMtZWRpdHBhZ2UtZXZlbnRzdGFydFwiIGNsYXNzPVwiY29sLWZvcm0tbGFiZWxcIj7lvIDlp4vml6XmnJ88L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZGF0ZXRpbWVwaWNrZXItaW5wdXQgZXZlbnRzdGFydFwiIGlkPVwidGMtZWRpdHBhZ2UtZXZlbnRzdGFydFwiIGRhdGEtdG9nZ2xlPVwiZGF0ZXRpbWVwaWNrZXJcIiBkYXRhLXRhcmdldD1cIiN0Yy1lZGl0cGFnZS1ldmVudHN0YXJ0XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1lZGl0cGFnZS1ldmVudGVuZFwiIGNsYXNzPVwiY29sLWZvcm0tbGFiZWxcIj7nu5PmnZ/ml6XmnJ88L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50ZW5kXCIgaWQ9J3RjLWVkaXRwYWdlLWV2ZW50ZW5kJyAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1lZGl0cGFnZS1ldmVudGNvbG9yXCIgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbFwiPuiJsuW9qTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ0Yy1lZGl0cGFnZS1ldmVudGNvbG9yXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZXZlbnRjb2xvclwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1tZC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGMtZWRpdHBhZ2UtZXZlbnR0YWdzXCIgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbFwiPuagh+etvjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ0Yy1lZGl0cGFnZS1ldmVudHRhZ3NcIiBjbGFzcz1cImZvcm0tY29udHJvbCBldmVudHRhZ3NcIiA+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZm9ybS1ncm91cCBjb2wtbWQtMTInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRjLWVkaXRwYWdlLWV2ZW50cmVtYXJrXCI+5aSH5rOoPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbCBldmVudHJlbWFya1wiIGlkPVwidGMtZWRpdHBhZ2UtZXZlbnRyZW1hcmtcIiByb3dzPVwiM1wiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3Jvdycgc3R5bGU9J3RleHQtYWxpZ246IGxlZnQ7Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLW1kLTYnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGMtZWRpdHBhZ2UtYnV0dG9uZ3JvdXBcIiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ndGMtZWRpdHBhZ2Utc2F2ZScgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD7kv53lrZg8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9J3RjLWVkaXRwYWdlLWZpbmlzaCcgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCI+5a6M5oiQPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSd0Yy1lZGl0cGFnZS1kZWxldGUnIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiPuWIoOmZpDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ndGMtZWRpdHBhZ2UtZGVsZXRlRXZlbnREb2MnIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiPuWIoOmZpOa6kOaWh+ahozwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC1tZC0yIGNvbC1tZC1vZmZzZXQtNCcgc3R5bGU9J3RleHQtYWxpZ246IHJpZ2h0Oyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj7lj5bmtog8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2pzL21vZGFsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50TW9kYWwge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcclxuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xyXG4gICAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLkh0bWxUZW1wbGF0ZTtcclxuICAgICAgICB0aGlzLm1vZGFsID0gJChodG1sKS5tb2RhbCh7XHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUZW1wbGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUoYXJncykge1xyXG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUZW1wbGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMubW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuICAgIH07XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLm1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YaZ5YWlSFRNTOaooeadvy5cclxuICAgICAqL1xyXG4gICAgZ2V0IEh0bWxUZW1wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwgZmFkZVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiPk1vZGFsIHRpdGxlPC9oND5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5PbmUgZmluZSBib2R5JmhlbGxpcDs8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPlNhdmUgY2hhbmdlczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj48IS0tIC8ubW9kYWwtY29udGVudCAtLT5cclxuICAgICAgICAgICAgPC9kaXY+PCEtLSAvLm1vZGFsLWRpYWxvZyAtLT5cclxuICAgICAgICAgICAgPC9kaXY+PCEtLSAvLm1vZGFsIC0tPlxyXG4gICAgICAgIGBcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlLHlrZDnsbvlrprkuYnmuLLmn5Pku7vliqEuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclRlbXBsYXRlKCkgeyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T5qih5oCB5qGG6KGo5Y2V57uE5Lu2LlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR9IG1vZGFsTm9kZSAtIOihqOWNleaIluWMheWQq+ihqOWNleeahOWdl+WFg+e0oHxDU1PpgInmi6nlmaguXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSB0YXNrcyAtIOS7u+WKoeWIl+ihqC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXNrc1tdLm5vZGUgLSBDU1PpgInmi6nlmaguXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFza3NbXS52YWx1ZSAtIOmcgOimgeWhq+WFpeeahOWAvC5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRhc2tzW10ucmVuZGVyZXIgLSDnu4Tku7bmuLLmn5PlmaguXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFza3NbXS5ldmVudE5hbWUgLSDkuovku7blkI3np7AuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0YXNrc1tdLmhhbmRsZSAtIOWPpeafhC5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyRm9ybUNvbXBvbmVudChtb2RhbE5vZGUsIHRhc2tzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGFzayBvZiB0YXNrcykge1xyXG4gICAgICAgICAgICBsZXQgJGNvbXBzID0gJChtb2RhbE5vZGUpLmdldCgwKSA9PSAkKHRhc2subm9kZSkuZ2V0KDApID8gJCh0YXNrLm5vZGUpIDogJChtb2RhbE5vZGUpLmZpbmQodGFzay5ub2RlKTtcclxuICAgICAgICAgICAgLy8g5riy5p+T57uE5Lu2XHJcbiAgICAgICAgICAgIGlmICggdGFzay52YWx1ZSApICRjb21wcy52YWwodGFzay52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHRhc2sucmVuZGVyZXIgPT0gJ2Z1bmN0aW9uJyApIHRhc2sucmVuZGVyZXIoJGNvbXBzKTtcclxuICAgICAgICAgICAgLy8g57uR5a6a5Y+l5p+EXHJcbiAgICAgICAgICAgIGlmICggdGFzay5oYW5kbGUgJiYgdHlwZW9mIHRhc2suaGFuZGxlID09ICdmdW5jdGlvbicgJiYgdGFzay5ldmVudE5hbWUgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hFdmVudEhhbmRsZSgkY29tcHMsIHRhc2suZXZlbnROYW1lLCB0YXNrLmhhbmRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5LqL5Lu25Y+l5p+ELlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR9IG5vZGUgLSDlhYPntKDmiJZDU1PpgInmi6nlmaguXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ganNFdmVudE5hbWUgLSDopoHliLfmlrDnmoTkuovku7blkI3np7AuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGUgLSDopoHnu5HlrprnmoTlj6Xmn4RcclxuICAgICAqL1xyXG4gICAgcmVmcmVzaEV2ZW50SGFuZGxlKG5vZGUsIGpzRXZlbnROYW1lLCBoYW5kbGUpIHtcclxuICAgICAgICAvLyDliKnnlKhqUXVlcnnmnKzouqvnmoTnsbvmlbDnu4TnibnmgKflrp7njrDlpJrkuKrnu5HlrprvvJtcclxuICAgICAgICAkKG5vZGUpLm9mZihqc0V2ZW50TmFtZSkub24oanNFdmVudE5hbWUsIGhhbmRsZSk7XHJcbiAgICAgICAgcmV0dXJuICQobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43nva7ooajljZUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gZm9ybSAtIOihqOWNleaIluWMheWQq+ihqOWNleeahOWdl+WFg+e0oHxDU1PpgInmi6nlmaguXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXhjbHVkZXMgLSDnlKhDU1PpgInmi6nlmajku6PooajpnIDopoHmjpLpmaTnmoTlhYPntKAuXHJcbiAgICAgKi9cclxuICAgIHJlc2V0Rm9ybUlucHV0KGZvcm0sIGV4Y2x1ZGVzKSB7XHJcbiAgICAgICAgJChmb3JtKS5maW5kKCdpbnB1dCcpLm5vdChleGNsdWRlcykuZWFjaChmdW5jdGlvbihpbmRleCxlbGVtZW50KXtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnJyk7XHJcbiAgICAgICAgICAgICQoZWxlbWVudCkudmFsKCcnKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IFdpekV2ZW50RGF0YUxvYWRlciBmcm9tICcuLi9XaXpFdmVudERhdGFMb2FkZXInO1xyXG5pbXBvcnQgQ2FsZW5kYXJFdmVudCBmcm9tICcuLi9DYWxlbmRhckV2ZW50JztcclxuaW1wb3J0IHsgV2l6Q29uZmlybSB9IGZyb20gJy4uL1dpekludGVyZmFjZSc7XHJcblxyXG5jb25zdCBnX2NhbCA9ICQoJyNjYWxlbmRhcicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUhhbmRsZXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBvbkNyZWF0ZUJ0bkNsaWNrKHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXcsIGZvcm1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSAkKGZvcm1Ob2RlKS5maW5kKCcjdGMtY3JlYXRlcGFnZS1ldmVudHRpdGxlJykudmFsKCk7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSAkKGZvcm1Ob2RlKS5maW5kKCcjdGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yJykudmFsKCk7XHJcbiAgICAgICAgbmV3IFdpekV2ZW50RGF0YUxvYWRlcigpLmNyZWF0ZUV2ZW50KHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSwge3RpdGxlLCBjb2xvcn0pOyAvLyDov5nkuIDmraXogJfml7ZcclxuICAgICAgICAkKGZvcm1Ob2RlKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndW5zZWxlY3QnKTtcclxuICAgIH07XHJcblxyXG4gICAgb25TYXZlQnRuQ2xpY2soZXZlbnQsIGZvcm1Ob2RlKSB7XHJcbiAgICAgICAgLy9UT0RPOiDlrozmiJDlvIDlp4vkuI7nu5PmnZ/ml7bpl7Tlj5jmm7RcclxuICAgICAgICAvL1RPRE86IOmAmui/h+WcqGZvcm1Ob2Rl5pCc57SiLmV2ZW50dGl0bGUsLmV2ZW50Y29sb3LnrYljbGFzc+adpeiOt+WPluWPmOmHj1xyXG4gICAgICAgIGlmICghZ19jYWwpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEZ1bGxDYWxlbmRhciBXaWRnZXQuJyk7XHJcbiAgICAgICAgLy8g5L+d5a2Y5pWw5o2uXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgbmV3RXZlbnQudGl0bGUgPSBmb3JtTm9kZS5maW5kKCcuZXZlbnR0aXRsZScpLnZhbCgpO1xyXG4gICAgICAgIG5ld0V2ZW50LmJhY2tncm91bmRDb2xvciA9IGZvcm1Ob2RlLmZpbmQoJy5ldmVudGNvbG9yJykudmFsKCk7XHJcbiAgICAgICAgLy8g5L+d5a2Y5Yiw5pWw5o2u5paH5qGjXHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgICAgICBuZXdFdmVudC5yZWZyZXNoRXZlbnQoZXZlbnQpXHJcbiAgICB9O1xyXG5cclxuICAgIG9uQ29tcGxldGVCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICghZ19jYWwpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEZ1bGxDYWxlbmRhciBXaWRnZXQuJyk7XHJcbiAgICAgICAgLy8g5L+u5pS55pWw5o2uXHJcbiAgICAgICAgY29uc3QgaXNDb21wbGV0ZSA9IHBhcnNlSW50KGV2ZW50LmNvbXBsZXRlKSA9PSA1O1xyXG4gICAgICAgIGlmICggaXNDb21wbGV0ZSApIHtcclxuICAgICAgICAgICAgZXZlbnQuY29tcGxldGUgPSAnMCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnQuY29tcGxldGUgPSAnNSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOS/neWtmOaVsOaNrlxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcbiAgICAgICAgLy8g6YeN5paw5riy5p+TXHJcbiAgICAgICAgZ19jYWwuZnVsbENhbGVuZGFyKCAndXBkYXRlRXZlbnQnLCBldmVudCApO1xyXG4gICAgfTtcclxuXHJcbiAgICBvbkRlbGV0ZURhdGFCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICghZ19jYWwpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEZ1bGxDYWxlbmRhciBXaWRnZXQuJyk7XHJcbiAgICAgICAgaWYgKCBXaXpDb25maXJtKFwi56Gu5a6a6KaB5Yig6Zmk6K+l5pel56iL77yfXCIsICfnlarojITliqnnkIYnKSApIHtcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5pel56iLXHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG9uRGVsZXRlRG9jQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoIWdfY2FsKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBGdWxsQ2FsZW5kYXIgV2lkZ2V0LicpO1xyXG4gICAgICAgIGlmICggV2l6Q29uZmlybShcIuehruWumuimgeWIoOmZpOivpeaXpeeoi+a6kOaWh+aho++8n1xcbuOAjOehruWumuOAjeWwhuS8muWvvOiHtOebuOWFs+eslOiusOiiq+WIoOmZpO+8gVwiLCAn55Wq6IyE5Yqp55CGJykgKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKHRydWUpO1xyXG4gICAgICAgIH1cdFxyXG4gICAgfTtcclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuZXhwb3J0IHtcclxuXHRyZXNldEZvcm1JbnB1dCxcclxuXHRyZW5kZXJGb3JtQ29tcG9uZW50LFxyXG59XHJcblxyXG4vKipcclxuICog5Yi35paw5LqL5Lu25Y+l5p+ELlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gbm9kZSAtIOWFg+e0oOaIlkNTU+mAieaLqeWZqC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGpzRXZlbnROYW1lIC0g6KaB5Yi35paw55qE5LqL5Lu25ZCN56ewLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGUgLSDopoHnu5HlrprnmoTlj6Xmn4RcclxuICovXHJcbmZ1bmN0aW9uIHJlZnJlc2hFdmVudEhhbmRsZShub2RlLCBqc0V2ZW50TmFtZSwgaGFuZGxlKSB7XHJcblx0Ly8g5Yip55SoalF1ZXJ55pys6Lqr55qE57G75pWw57uE54m55oCn5a6e546w5aSa5Liq57uR5a6a77ybXHJcblx0JChub2RlKS5vZmYoanNFdmVudE5hbWUpLm9uKGpzRXZlbnROYW1lLCBoYW5kbGUpO1xyXG5cdHJldHVybiAkKG5vZGUpO1xyXG59XHJcblxyXG4vKipcclxuICog6YeN572u6KGo5Y2VLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gZm9ybSAtIOihqOWNleaIluWMheWQq+ihqOWNleeahOWdl+WFg+e0oHxDU1PpgInmi6nlmaguXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBleGNsdWRlcyAtIOeUqENTU+mAieaLqeWZqOS7o+ihqOmcgOimgeaOkumZpOeahOWFg+e0oC5cclxuICovXHJcbmZ1bmN0aW9uIHJlc2V0Rm9ybUlucHV0KGZvcm0sIGV4Y2x1ZGVzKSB7XHJcblx0JChmb3JtKS5maW5kKCdpbnB1dCcpLm5vdChleGNsdWRlcykuZWFjaChmdW5jdGlvbihpbmRleCxlbGVtZW50KXtcclxuXHRcdCQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJycpO1xyXG5cdFx0JChlbGVtZW50KS52YWwoJycpO1xyXG5cdH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmuLLmn5PmqKHmgIHmoYbooajljZXnu4Tku7YuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBtb2RhbE5vZGUgLSDooajljZXmiJbljIXlkKvooajljZXnmoTlnZflhYPntKB8Q1NT6YCJ5oup5ZmoLlxyXG4gKiBAcGFyYW0ge09iamVjdFtdfSB0YXNrcyAtIOS7u+WKoeWIl+ihqC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHRhc2tzW10ubm9kZSAtIENTU+mAieaLqeWZqC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHRhc2tzW10udmFsdWUgLSDpnIDopoHloavlhaXnmoTlgLwuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRhc2tzW10ucmVuZGVyZXIgLSDnu4Tku7bmuLLmn5PlmaguXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXNrc1tdLmV2ZW50TmFtZSAtIOS6i+S7tuWQjeensC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gdGFza3NbXS5oYW5kbGUgLSDlj6Xmn4QuXHJcbiAqL1xyXG5mdW5jdGlvbiByZW5kZXJGb3JtQ29tcG9uZW50KG1vZGFsTm9kZSwgdGFza3MpIHtcclxuXHRmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XHJcblx0XHRsZXQgJGNvbXBzID0gJChtb2RhbE5vZGUpLmdldCgwKSA9PSAkKHRhc2subm9kZSkuZ2V0KDApID8gJCh0YXNrLm5vZGUpIDogJChtb2RhbE5vZGUpLmZpbmQodGFzay5ub2RlKTtcclxuXHRcdC8vIOa4suafk+e7hOS7tlxyXG5cdFx0aWYgKCB0YXNrLnZhbHVlICkgJGNvbXBzLnZhbCh0YXNrLnZhbHVlKTtcclxuXHRcdGlmICggdHlwZW9mIHRhc2sucmVuZGVyZXIgPT0gJ2Z1bmN0aW9uJyApIHRhc2sucmVuZGVyZXIoJGNvbXBzKTtcclxuXHRcdC8vIOe7keWumuWPpeafhFxyXG5cdFx0aWYgKCB0YXNrLmhhbmRsZSAmJiB0eXBlb2YgdGFzay5oYW5kbGUgPT0gJ2Z1bmN0aW9uJyAmJiB0YXNrLmV2ZW50TmFtZSApIHJlZnJlc2hFdmVudEhhbmRsZSgkY29tcHMsIHRhc2suZXZlbnROYW1lLCB0YXNrLmhhbmRsZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog57uR5a6a5qih5oCB5qGG5oyJ6ZKu5Y+l5p+ELCDpgJrov4cgcmVmcmVzaEV2ZW50SGFuZGxlclxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gbW9kYWxOb2RlIC0g6KGo5Y2V5oiW5YyF5ZCr6KGo5Y2V55qE5Z2X5YWD57SgfENTU+mAieaLqeWZqC5cclxuICogQHBhcmFtIHtPYmplY3RbXX0gdGFza3MgLSDku7vliqHliJfooaguXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXNrc1tdLm5vZGUgLSBDU1PpgInmi6nlmaguXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXNrc1tdLmV2ZW50TmFtZSAtIOS6i+S7tuWQjeensC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gdGFza3NbXS5oYW5kbGUgLSDlj6Xmn4QuXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5kTW9kYWxIYW5kbGUobW9kYWxOb2RlLCB0YXNrcykge1xyXG5cdC8vVE9ETzog5piv5ZCm5Y+v5Lul5bCGYmluZE1vZGFsSGFuZGxl5LiOcmVuZGVyTW9kYWxGb3Jt5ZCI5LqM5Li65LiA77yfXHJcblx0Zm9yIChsZXQgdGFzayBvZiB0YXNrcykge1xyXG5cdFx0Ly8g5Yik5pat5piv5ZCm57uR5a6abW9kYWxOb2Rl55qE5Y+l5p+EXHJcblx0XHRsZXQgJGNvbXBzID0gJChtb2RhbE5vZGUpLmdldCgwKSA9PSAkKHRhc2subm9kZSkuZ2V0KDApID8gJCh0YXNrLm5vZGUpIDogJChtb2RhbE5vZGUpLmZpbmQodGFzay5ub2RlKTtcclxuXHRcdGlmICggdHlwZW9mIHRhc2suaGFuZGxlID09ICdmdW5jdGlvbicgKSByZWZyZXNoRXZlbnRIYW5kbGUoJGNvbXBzLCB0YXNrLmV2ZW50TmFtZSwgdGFzay5oYW5kbGUpO1xyXG5cdH1cclxufSIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCAnanF1ZXJ5LXVpL3VpL3dpZGdldCc7XHJcbi8qIE5QTSDniYjmnKwgSHVlYmVlIOa6kOS7o+eggeS4rSBwb2ludGVyZG93biDkuovku7blnKggQ2hyb21lIDU1IOS7peWQjuaJjeWunueOsFxyXG4gKiBXaXpub3RlIOWPquiDveS9v+eUqOi3qOa1j+iniOWZqOWFvOWuueeJiO+8jOaJgOS7peWvvOWFpeaJk+WMheeJiCAqL1xyXG5jb25zdCBIdWViZWUgPSByZXF1aXJlKCdodWViZWUvZGlzdC9odWViZWUucGtnZCcpOyBcclxuaW1wb3J0ICdodWViZWUvZGlzdC9odWViZWUuY3NzJztcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUNvbG9yUGlja2VyIH07XHJcblxyXG4kLndpZGdldChcInRjLkNvbG9yUGlja2VyXCIsIHtcclxuXHRvcHRpb25zOiB7XHJcblx0XHRzdGF0aWNPcGVuOiBmYWxzZSwgLy8gRGlzcGxheXMgb3BlbiBhbmQgc3RheXMgb3Blbi4gXHJcblx0XHRzZXRUZXh0OiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIHRleHQgdG8gY29sb3IuIOWwhuWOn+Wni+eahOaWh+acrOiuvue9ruiuvue9ruaIkOminOiJsuWAvC5cclxuXHRcdHNldEJHQ29sb3I6IHRydWUsIC8vIFNldHMgZWxlbWVudHPigJkgYmFja2dyb3VuZCBjb2xvciB0byBjb2xvci5cclxuXHRcdGh1ZXM6IDEyLCAvLyBOdW1iZXIgb2YgaHVlcyBvZiB0aGUgY29sb3IgZ3JpZC4gSHVlcyBhcmUgc2xpY2VzIG9mIHRoZSBjb2xvciB3aGVlbC5cclxuXHRcdGh1ZTA6IDAsIC8vIFRoZSBmaXJzdCBodWUgb2YgdGhlIGNvbG9yIGdyaWQuIFxyXG5cdFx0c2hhZGVzOiA1LCAvLyBOdW1iZXIgb2Ygc2hhZGVzIG9mIGNvbG9ycyBhbmQgc2hhZGVzIG9mIGdyYXkgYmV0d2VlbiB3aGl0ZSBhbmQgYmxhY2suIFxyXG5cdFx0c2F0dXJhdGlvbnM6IDMsIC8vIE51bWJlciBvZiBzZXRzIG9mIHNhdHVyYXRpb24gb2YgdGhlIGNvbG9yIGdyaWQuXHJcblx0XHRjdXN0b21Db2xvcnM6IG51bGwsIC8vIEN1c3RvbSBjb2xvcnMgYWRkZWQgdG8gdGhlIHRvcCBvZiB0aGUgZ3JpZC4gXHJcblx0XHRub3RhdGlvbjogJ2hleCcsIC8vIFRleHQgc3ludGF4IG9mIGNvbG9ycyB2YWx1ZXMuXHJcblx0XHRjbGFzc05hbWU6IG51bGwsIC8vIENsYXNzIGFkZGVkIHRvIEh1ZWJlZSBlbGVtZW50LiBVc2VmdWwgZm9yIENTUy5cclxuXHRcdG9uY2hhbmdlOiBudWxsLFxyXG5cdH0sXHJcblxyXG5cdF9jcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8g5Yib5bu65a6e5L6LXHJcblx0XHR0aGlzLmh1ZWJlZUluc3RhbmNlID0gbmV3IEh1ZWJlZSh0aGlzLmVsZW1lbnQuZ2V0KDApLCB0aGlzLm9wdGlvbnMpO1xyXG5cdFx0Ly8g6YeN5YaZ5LqG6K+l5pa55rOV77yM5Yik5pataW5wdXTlhoXlrrnmmK/lkKbnm7jlkIzlubbop6blj5EgY2hhbmdlIOS6i+S7tlxyXG5cdFx0dGhpcy5odWViZWVJbnN0YW5jZS5zZXRUZXh0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoICF0aGlzLnNldFRleHRFbGVtcyApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0ICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5zZXRUZXh0RWxlbXMubGVuZ3RoOyBpKysgKSB7XHJcblx0XHRcdFx0dmFyIGVsZW0gPSB0aGlzLnNldFRleHRFbGVtc1tpXTtcclxuXHRcdFx0XHR2YXIgcHJvcGVydHkgPSBlbGVtLm5vZGVOYW1lID09ICdJTlBVVCcgPyAndmFsdWUnIDogJ3RleHRDb250ZW50JztcclxuXHRcdFx0XHQvLyDop6blj5FjaGFuZ2Xkuovku7ZcclxuXHRcdFx0XHRpZiAoIGVsZW0udmFsdWUgIT0gdGhpcy5jb2xvciApIHtcclxuXHRcdFx0XHRcdGVsZW1bIHByb3BlcnR5IF0gPSB0aGlzLmNvbG9yO1xyXG5cdFx0XHRcdFx0ZWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRoaXMuaHVlYmVlSW5zdGFuY2Uub24oICdjaGFuZ2UnLCB0aGlzLm9wdGlvbnMub25jaGFuZ2UpO1xyXG5cdFx0XHJcblx0fVxyXG59KVxyXG5cclxuXHJcbi8qKlxyXG4gKiDliJvlu7rpopzoibLmi77lj5blmaguXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBub2RlIC0g5YWD57Sg5oiWQ1NT6YCJ5oup5ZmoLlxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlQ29sb3JQaWNrZXIobm9kZSkge1xyXG5cdC8vVE9ETzog6K+75Y+WQ29uZmlnXHJcblx0JChub2RlKS5Db2xvclBpY2tlcih7XHJcblx0XHRzYXR1cmF0aW9uczogMixcclxuXHRcdHNoYWRlczogNSxcclxuXHRcdGN1c3RvbUNvbG9yczogWyAnIzMyQ0QzMicsICcjNTQ4NEVEJywgJyNBNEJERkUnLCBcclxuXHRcdCcjNDZENkRCJywgJyM3QUU3QkYnLCAnIzUxQjc0OScsXHJcblx0XHQnI0ZCRDc1QicsICcjRkZCODc4JywgJyNGRjg4N0MnLCBcclxuXHRcdCcjREMyMTI3JywgJyNEQkFERkYnLCAnI0UxRTFFMSdcdF0sXHJcblx0XHRcInN0YXRpY09wZW5cIjogZmFsc2VcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuICQobm9kZSk7XHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgJ21vbWVudCc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2pzL2NvbGxhcHNlJztcclxuaW1wb3J0ICdib290c3RyYXAvanMvdHJhbnNpdGlvbic7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAtdGhlbWUuY3NzJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9idWlsZC9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLmNzcyc7XHJcblxyXG4vKipcclxuICog5Yib5bu65pel5pyf5pe26Ze06YCJ5oup5ZmoLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gbm9kZSAtIOWFg+e0oOaIlkNTU+mAieaLqeWZqC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEYXRldGltZVBpY2tlcihub2RlKSB7XHJcblx0Ly9UT09EOiDor7vlj5ZDb25maWdcclxuXHQkKG5vZGUpLmRhdGV0aW1lcGlja2VyKHtcclxuXHRcdGZvcm1hdDogJ1lZWVktTU0tREQgSEg6bW06c3MnXHJcblx0fSk7XHJcblxyXG5cdHJldHVybiAkKG5vZGUpO1xyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdqcXVlcnktdWkvdWkvd2lkZ2V0JztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcyc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC10aGVtZS5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9kcm9wZG93bic7XHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvanMvYWxsJztcclxuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xyXG5pbXBvcnQgJy4vRXZlbnRQb3BvdmVyLmNzcyc7XHJcbmltcG9ydCB7IHJlbmRlckZvcm1Db21wb25lbnQgfSBmcm9tICcuLi8uLi9VdGlscy9Gb3JtVXRpbHMnO1xyXG5pbXBvcnQgRm9ybUhhbmRsZXMgZnJvbSAnLi4vLi4vVXRpbHMvRm9ybUhhbmRsZXMnO1xyXG5pbXBvcnQgeyBjcmVhdGVDb2xvclBpY2tlciB9IGZyb20gJy4uL0NvbG9yUGlja2VyJztcclxuaW1wb3J0IEV2ZW50RWRpdE1vZGFsIGZyb20gJy4uLy4uL01vZGFsL0V2ZW50RWRpdE1vZGFsJ1xyXG5cclxuZXhwb3J0IHsgcmVuZGVyRWRpdFBvcHBlciB9O1xyXG5cclxuJC53aWRnZXQoXCJ0Yy5FdmVudFBvcG92ZXJcIiwge1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHRpdGxlOiAnTm8gdGl0bGUgIScsIC8vU3RyaW5nXHJcblx0XHR0ZW1wbGF0ZTpcclxuXHRcdGBcclxuXHRcdDxkaXYgY2xhc3M9XCJ0Yy1wb3BvdmVyXCIgcm9sZT1cInRvb2x0aXBcIj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJ0Yy1wb3BvdmVyLWhlYWRlclwiPlxyXG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGMtZWRpdHBvcHBlci1ldmVudHRpdGxlXCIgIGZvcm09J3RjLXBvcG92ZXItZXZlbnQtZWRpdEZvcm0nIGNsYXNzPSdldmVudHRpdGxlJz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJ0Yy1wb3BvdmVyLWJvZHlcIj5cclxuXHRcdFx0XHQ8Zm9ybSBpZCA9ICd0Yy1wb3BvdmVyLWV2ZW50LWVkaXRGb3JtJyBjbGFzcz0nZm9ybS1ob3Jpem9udGFsJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcblx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJ0Yy1lZGl0cG9wcGVyLWV2ZW50ZGF0ZVwiIGNsYXNzPVwiY29sLXNtLTIgY29sLWZvcm0tbGFiZWxcIj48aSBjbGFzcz0nZmFyIGZhLWNhbGVuZGFyLWFsdCBmYS1sZyc+PC9pPjwvbGFiZWw+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtc20tMTBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiByZWFkb25seSBjbGFzcz1cImZvcm0tY29udHJvbCBldmVudGRhdGVcIiBpZD1cInRjLWVkaXRwb3BwZXItZXZlbnRkYXRlXCI+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwidGMtZWRpdHBvcHBlci1ldmVudGNvbG9yXCIgY2xhc3M9XCJjb2wtc20tMiBjb2wtZm9ybS1sYWJlbFwiPjxpIGNsYXNzPVwiZmFzIGZhLXBhaW50LWJydXNoXCI+PC9pPjwvbGFiZWw+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtc20tMTBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJ0Yy1lZGl0cG9wcGVyLWV2ZW50Y29sb3JcIiBjbGFzcz1cImZvcm0tY29udHJvbCBldmVudGNvbG9yXCIgPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZm9ybT5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwidGMtZWRpdHBvcHBlci1idXR0b25ncm91cFwiIGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLXNhdmUnIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiPuS/neWtmDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1maW5pc2gnIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiPuWujOaIkDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1lZGl0JyBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIj7nvJbovpE8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDxidXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItZGVsZXRlJyBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIj7liKDpmaQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdDxhIGlkPSd0Yy1lZGl0cG9wcGVyLWRlbGV0ZUV2ZW50RG9jJyBocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7Jz7liKDpmaTmupDmlofmoaM8L2E+XHJcblx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdGAsXHJcblx0XHRwbGFjZW1lbnQ6ICdyaWdodCcsXHJcblx0XHRvZmZzZXQ6ICcxMHB4JyxcclxuXHRcdGF1dG9TaG93OiB0cnVlLFxyXG5cdFx0cmVmZXJlbmNlOiBudWxsLCAvLyDnlKjmiLfovpPlhaXml7blj6/ku6Xml7ZqUXVlcnnmiJbogIVIVE1MRWxlbWVudFxyXG5cdH0sXHJcblx0XHJcblx0X2NyZWF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgdGhhdCA9IHRoaXM7XHJcblx0XHRsZXQgb3B0cyA9IHRoaXMub3B0aW9ucztcclxuXHRcdFxyXG5cdFx0Ly8g5qOA5rWL5piv5ZCm5o+Q5L6bcmVmZXJlbmNl77yM5rKh5pyJ5YiZ6K6+572u5Li6IHRoaXMuZWxlbWVudO+8jOe7n+S4gOagvOW8j+WMluS4umpRdWVyeeWvueixoe+8m1xyXG5cdFx0b3B0cy5yZWZlcmVuY2UgPSBvcHRzLnJlZmVyZW5jZSA/ICQob3B0cy5yZWZlcmVuY2UpIDogdGhpcy5lbGVtZW50O1xyXG5cclxuXHRcdC8vIOWHhuWkh+aooeadv++8jOaciemHjeWkjeiwg+eUqOeahGJ1Z1xyXG5cdFx0dGhpcy4kcG9wcGVyTm9kZSA9IHRoaXMuX3Byb2Nlc3NUZW1wbGF0ZShvcHRzLnRlbXBsYXRlKTtcclxuXHJcblx0XHQvLyDliJvlu7pQb3BwZXLlrp7kvoso5a6a5L2N5byV5pOOKVxyXG5cdFx0dGhpcy5wb3BwZXJJbnN0YW5jZSA9IG5ldyBQb3BwZXIob3B0cy5yZWZlcmVuY2UuZ2V0KDApLCB0aGlzLiRwb3BwZXJOb2RlLmdldCgwKSwge1xyXG5cdFx0XHRwbGFjZW1lbnQ6IG9wdHMucGxhY2VtZW50LFxyXG5cdFx0XHRtb2RpZmllcnM6IHtcclxuXHRcdFx0XHRhcnJvdzoge1xyXG5cdFx0XHRcdCAgZWxlbWVudDogJy5hcnJvdydcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyDorr7nva7oh6rliqjpmpDol49cclxuXHRcdHRoaXMuX3NldEF1dG9IaWRlKCk7XHJcblxyXG5cdFx0Ly/moLnmja7orr7nva7mmK/lkKboh6rliqjmmL7npLpcclxuXHRcdGlmICggb3B0cy5hdXRvU2hvdyA9PSB0cnVlICkgdGhpcy5zaG93KCk7XHJcblxyXG5cdH0sXHJcblxyXG5cdF9wcm9jZXNzVGVtcGxhdGU6IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XHJcblx0XHRjb25zdCBldmVudCA9IG9wdHMuYXJncy5ldmVudDtcclxuXHRcdGNvbnN0ICRwb3BwZXIgPSAkKHRlbXBsYXRlKTtcclxuXHRcdGNvbnN0IGZvcm1IYW5kbGVzID0gbmV3IEZvcm1IYW5kbGVzKCk7XHJcblxyXG5cdFx0cmVuZGVyRm9ybUNvbXBvbmVudCgkcG9wcGVyLCBbXHJcblx0XHRcdHsvLyDmoIfpophcclxuXHRcdFx0XHRub2RlOiAnI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZScsXHJcblx0XHRcdFx0dmFsdWU6IGV2ZW50LnRpdGxlLFxyXG5cdFx0XHRcdGV2ZW50TmFtZTogJ2NoYW5nZScsXHJcblx0XHRcdFx0aGFuZGxlOiAoKSA9PiAkcG9wcGVyLmZpbmQoJyN0Yy1lZGl0cG9wcGVyLXNhdmUnKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7Ly8g5pel5pyfXHJcblx0XHRcdFx0bm9kZTogJyN0Yy1lZGl0cG9wcGVyLWV2ZW50ZGF0ZScsXHJcblx0XHRcdFx0dmFsdWU6IGV2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXHJcblx0XHRcdH0sXHJcblx0XHRcdHsvLyDpopzoibJcclxuXHRcdFx0XHRub2RlOiAnI3RjLWVkaXRwb3BwZXItZXZlbnRjb2xvcicsXHJcblx0XHRcdFx0dmFsdWU6IGV2ZW50LmJhY2tncm91bmRDb2xvcixcclxuXHRcdFx0XHRyZW5kZXJlcjogKG5vZGUpID0+IHtcclxuXHRcdFx0XHRcdCQobm9kZSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZXZlbnQuYmFja2dyb3VuZENvbG9yKTtcclxuXHRcdFx0XHRcdGNyZWF0ZUNvbG9yUGlja2VyKG5vZGUpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXZlbnROYW1lOiAnY2hhbmdlJyxcclxuXHRcdFx0XHRoYW5kbGU6ICgpID0+ICRwb3BwZXIuZmluZCgnI3RjLWVkaXRwb3BwZXItc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpXHJcblx0XHRcdH0sXHJcblx0XHRcdHsvLyDkv53lrZjmjInpkq5cclxuXHRcdFx0XHRub2RlOiAnI3RjLWVkaXRwb3BwZXItc2F2ZScsXHJcblx0XHRcdFx0cmVuZGVyZXI6IChub2RlKSA9PiAkKG5vZGUpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKSxcclxuXHRcdFx0XHRldmVudE5hbWU6ICdjbGljaycsXHJcblx0XHRcdFx0aGFuZGxlOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRmb3JtSGFuZGxlcy5vblNhdmVCdG5DbGljayhldmVudCwgJHBvcHBlcik7XHJcblx0XHRcdFx0XHR0aGF0LmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHsvLyDlrozmiJDmjInpkq5cclxuXHRcdFx0XHRub2RlOiAnI3RjLWVkaXRwb3BwZXItZmluaXNoJyxcclxuXHRcdFx0XHRyZW5kZXJlcjogKG5vZGUpID0+ICQobm9kZSkudGV4dChcclxuXHRcdFx0XHRcdHBhcnNlSW50KGV2ZW50LmNvbXBsZXRlKSA9PSA1ID8gJ+aBouWkjScgOiAn5a6M5oiQJ1xyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0ZXZlbnROYW1lOiAnY2xpY2snLFxyXG5cdFx0XHRcdGhhbmRsZTogKCkgPT4ge1xyXG5cdFx0XHRcdFx0Zm9ybUhhbmRsZXMub25Db21wbGV0ZUJ0bkNsaWNrKGV2ZW50KTtcclxuXHRcdFx0XHRcdHRoYXQuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ey8vIOe8lui+keaMiemSrlxyXG5cdFx0XHRcdG5vZGU6ICcjdGMtZWRpdHBvcHBlci1lZGl0JyxcclxuXHRcdFx0XHRldmVudE5hbWU6ICdjbGljaycsXHJcblx0XHRcdFx0aGFuZGxlOiAoKSA9PiB7XHJcblx0XHRcdFx0XHQvL1RPRE86IOaDs+WKnuazleS4jeimgeeUqOWFqOWxgOWPmOmHj1xyXG5cdFx0XHRcdFx0aWYgKCAhd2luZG93LmdfZWRpdE1vZGFsICkgbmV3IEV2ZW50RWRpdE1vZGFsKHtldmVudH0pO1xyXG5cdFx0XHRcdFx0Z19lZGl0TW9kYWwudXBkYXRlKHtldmVudH0pO1xyXG5cdFx0XHRcdFx0Z19lZGl0TW9kYWwuc2hvdygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ey8vIOWIoOmZpOaXpeeoi+aVsOaNruaMiemSrlxyXG5cdFx0XHRcdG5vZGU6ICcjdGMtZWRpdHBvcHBlci1kZWxldGUnLFxyXG5cdFx0XHRcdGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuXHRcdFx0XHRoYW5kbGU6ICgpID0+IHtcclxuXHRcdFx0XHRcdGZvcm1IYW5kbGVzLm9uRGVsZXRlRGF0YUJ0bkNsaWNrKGV2ZW50KTtcclxuXHRcdFx0XHRcdHRoYXQuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ey8vIOWIoOmZpOa6kOaWh+aho+aMiemSrlxyXG5cdFx0XHRcdG5vZGU6ICcjdGMtZWRpdHBvcHBlci1kZWxldGVFdmVudERvYycsXHJcblx0XHRcdFx0ZXZlbnROYW1lOiAnY2xpY2snLFxyXG5cdFx0XHRcdGhhbmRsZTogKCkgPT4ge1xyXG5cdFx0XHRcdFx0Zm9ybUhhbmRsZXMub25EZWxldGVEb2NCdG5DbGljayhldmVudCk7XHJcblx0XHRcdFx0XHR0aGF0LmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdF0pXHJcblxyXG5cdFx0cmV0dXJuICRwb3BwZXI7IC8vIGpRdWVyeVxyXG5cdH0sXHJcblxyXG5cdF9zZXRBdXRvSGlkZSgpIHtcclxuXHRcdGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xyXG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdC8vIOWFiOWPlua2iOW3suacieiHquWKqOmakOiXj+S6i+S7tu+8jOaWueW8j+WPjeWkjea3u+WKoOWPpeafhFxyXG5cdFx0dGhpcy5fb2ZmKHRoaXMuZG9jdW1lbnQsICdjbGljaycpO1xyXG5cclxuXHRcdC8vIOeCueWHu+epuueZveWkhOiHquWKqOmakOiXj1xyXG5cdFx0dGhpcy5fb24odGhpcy5kb2N1bWVudCwge1xyXG5cdFx0XHRjbGljazogZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdC8vIOS4jeaYr+aXpeWOhuS6i+S7tuWFg+e0oFxyXG5cdFx0XHRcdFx0ISQob3B0cy5yZWZlcmVuY2UpLmlzKGUudGFyZ2V0KSAmJlxyXG5cdFx0XHRcdFx0Ly8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcblx0XHRcdFx0XHQkKG9wdHMucmVmZXJlbmNlKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJlxyXG5cdFx0XHRcdFx0Ly8g5LiN5pivcG9wcGVy5YWD57SgXHJcblx0XHRcdFx0XHQgIXRoYXQuJHBvcHBlck5vZGUuaXMoZS50YXJnZXQpICYmXHJcblx0XHRcdFx0XHQvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuXHRcdFx0XHRcdHRoYXQuJHBvcHBlck5vZGUuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDBcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdHRoYXQuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8g5qC55o2uT3B0aW9uc+abtOaWsHBvcHBlckluc3RhbmNl5Lul5Y+KJHBvcHBlck5vZGVcclxuXHRcdGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xyXG5cdFx0Ly8g6K6+572u6Ieq5Yqo6ZqQ6JePXHJcblx0XHR0aGlzLl9zZXRBdXRvSGlkZSgpO1xyXG5cdFx0Ly8g5pu05pawICRwb3BwZXJOb2RlXHJcblx0XHR0aGlzLiRwb3BwZXJOb2RlID0gdGhpcy5fcHJvY2Vzc1RlbXBsYXRlKHRoaXMuJHBvcHBlck5vZGUpOyAvLyDkvKDlhaXnmoTmmK/lvJXnlKhcclxuXHRcdC8vIOabtOaWsCBwb3BwZXJJbnN0YW5jZVxyXG5cdFx0dGhpcy5wb3BwZXJJbnN0YW5jZS5wb3BwZXIgPSB0aGlzLiRwb3BwZXJOb2RlLmdldCgwKTtcclxuXHRcdHRoaXMucG9wcGVySW5zdGFuY2UucmVmZXJlbmNlID0gb3B0cy5yZWZlcmVuY2UgPyAkKG9wdHMucmVmZXJlbmNlKS5nZXQoMCkgOiB0aGlzLmVsZW1lbnQuZ2V0KDApO1xyXG5cdFx0dGhpcy5wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcclxuXHR9LFxyXG5cclxuXHRzaG93OiBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xyXG5cdFx0Ly8g5aaC5p6c5rKh5pyJ5re75Yqg5YiwRE9N5qCR5YiZ5re75YqgXHJcblx0XHRpZiggISQodGhpcy4kcG9wcGVyTm9kZSkucGFyZW50KCkuaXMoJ2JvZHknKSApICQodGhpcy4kcG9wcGVyTm9kZSkuYXBwZW5kVG8oJ2JvZHknKTtcclxuXHRcdC8vIOaYvuekuiRwb3BwZXJOb2RlXHJcblx0XHR0aGlzLl9zaG93KHRoaXMuJHBvcHBlck5vZGUpO1xyXG5cclxuXHR9LFxyXG5cclxuXHRoaWRlOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vVE9ETzog6ZqQ6JePUG9wb3ZlclxyXG5cdFx0dGhpcy5faGlkZSh0aGlzLiRwb3BwZXJOb2RlKVxyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5wb3BwZXJJbnN0YW5jZS5kZXN0cm95KCk7XHJcblx0XHQkKHRoaXMuJHBvcHBlck5vZGUpLnJlbW92ZSgpO1xyXG5cdFx0dGhpcy4kcG9wcGVyTm9kZSA9IG51bGw7XHJcblx0fVxyXG59KVxyXG5cclxuLyoqXHJcbiAqIOa4suafk+S6i+S7tuWwj+W8ueeqly5cclxuICogQHBhcmFtIHtvYmplY3R9IGFyZ3Mg5YyF5ZCrRnVsbENhbGVuZGFy5Lyg5YWl55qE5Y+C5pWwLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy5ldmVudCBGdWxsQ2FsZW5kYXLkuovku7YuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLmpzRXZlbnQgbmF0aXZlIEphdmFTY3JpcHQg5LqL5Lu2LlxyXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy52aWV3IEZ1bGxDYWxlbmRhciDop4blm74uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50IGlzIGEgalF1ZXJ5IGVsZW1lbnQgZm9yIHRoZSBjb250YWluZXIgb2YgdGhlIG5ldyB2aWV3LlxyXG4gKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qE5LqL5Lu25pWw57uELlxyXG4gKi9cclxuZnVuY3Rpb24gcmVuZGVyRWRpdFBvcHBlcihhcmdzLCByZWZlcmVuY2UpIHtcclxuXHQvLyDmuLLmn5PlvLnnqpdcclxuXHRjb25zdCBlZGl0UG9wcGVyID0gJCggJzxkaXY+PC9kaXY+JyApLkV2ZW50UG9wb3Zlcih7XHJcblx0XHRhcmdzOiBhcmdzLFxyXG5cdFx0cGxhY2VtZW50OiAnYXV0bycsXHJcblx0XHRyZWZlcmVuY2U6IHJlZmVyZW5jZSxcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIGVkaXRQb3BwZXI7XHJcbn0iLCJpbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBvYmpEYXRhYmFzZSB9IGZyb20gJy4vV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENhbGVuZGFyRXZlbnQgZnJvbSAnLi9DYWxlbmRhckV2ZW50JztcclxuXHJcbi8qIOaVsOaNruiOt+WPllxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8qKiDor6XnsbvkuI5XaXpub3Rl55qEV2l6RGF0YWJhc2XmjqXlj6PkuqTmjaLkv6Hmga/vvIzojrflj5bmlbDmja4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2l6RXZlbnREYXRhTG9hZGVyIHtcclxuXHQvKipcclxuICAgICAqIOWIm+mAoOS4gOS4quS6i+S7tuaVsOaNruWKoOi9veWZqC5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0aWYgKCFvYmpEYXRhYmFzZSkgdGhyb3cgbmV3IEVycm9yKCdXaXpEYXRhYmFzZSBub3QgdmFsaWQgIScpO1xyXG5cdFx0dGhpcy5EYXRhYmFzZSA9IG9iakRhdGFiYXNlO1xyXG5cdFx0dGhpcy51c2VyTmFtZSA9IG9iakRhdGFiYXNlLlVzZXJOYW1lO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog6I635b6X5riy5p+T5ZCO55qE5omA5pyJRnVsbENhbGVuZGFy5LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB2aWV3IGlzIHRoZSBWaWV3IE9iamVjdCBvZiBGdWxsQ2FsZW5kYXIgZm9yIHRoZSBuZXcgdmlldy5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCBpcyBhIGpRdWVyeSBlbGVtZW50IGZvciB0aGUgY29udGFpbmVyIG9mIHRoZSBuZXcgdmlldy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXLmuLLmn5PnmoTkuovku7bmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRnZXRFdmVudFNvdXJjZSggdmlldywgZWxlbWVudCApe1xyXG5cdFx0Y29uc3QgY3VycmVudFZpZXcgPSB2aWV3O1xyXG5cdFx0Y29uc3QgZXZlbnRzQXJyID0gdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudChbXSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LnN0YXJ0LnRvRGF0ZSgpKSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LmVuZC50b0RhdGUoKSkpO1xyXG5cdFx0cmV0dXJuIGV2ZW50c0FycjtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOS7jldpekRhdGFiYXNl5Lit6I635Y+W5omA5pyJ5pWw5o2u5paH5qGjLlxyXG5cdCAqIEBwYXJhbSB7YXJyYXl9IGV2ZW50cyDliJ3lp4vkuovku7bmlbDnu4QuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXLmuLLmn5PnmoTkuovku7bmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsT3JpZ2luYWxFdmVudChldmVudHMsIHN0YXJ0LCBlbmQpe1xyXG5cdFx0bGV0IHNxbCA9IGBET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKWA7XHJcblx0XHRsZXQgYW5kMSA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfU1RBUlQnICBhbmQgIFBBUkFNX1ZBTFVFIDw9ICcke2VuZH0nIClgO1xyXG5cdFx0bGV0IGFuZDIgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX0VORCcgIGFuZCAgUEFSQU1fVkFMVUUgPj0gJyR7c3RhcnR9JyApYDtcclxuXHRcdGlmIChzdGFydCkgc3FsICs9IGFuZDI7XHJcblx0XHRpZiAoZW5kKSBzcWwgKz0gYW5kMTtcclxuXHRcdGlmIChvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0XHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0aWYgKCAhb2JqIHx8ICFpc0FycmF5KG9iaikgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cob2JqKTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0XHRcdGV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdFx0XHRuZXcgQ2FsZW5kYXJFdmVudChvYmpbaV0pLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudHNEYXRhRnJvbVNRTCBtZXRob2Qgb2YgV2l6RGF0YWJhc2Ugbm90IGV4aXN0IScpO1xyXG5cdFx0XHQvKlxyXG5cdFx0XHRsZXQgZG9jQ29sbGV0aW9uID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRnJvbVNRTChzcWwpO1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRpZiAoZG9jQ29sbGV0aW9uICYmIGRvY0NvbGxldGlvbi5Db3VudCl7XHJcblx0XHRcdFx0bGV0IGRvYztcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRvY0NvbGxldGlvbi5Db3VudDsgKysgaSl7XHJcblx0XHRcdFx0XHRkb2MgPSBkb2NDb2xsZXRpb24uSXRlbShpKTtcclxuXHRcdFx0XHRcdGxldCBldmVudE9iaiA9IF9ldmVudE9iamVjdChfbmV3UHNldWRvRG9jKGRvYykpO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50T2JqKVxyXG5cdFx0XHRcdFx0XHRldmVudHMucHVzaChldmVudE9iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBldmVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0Ki9cdFx0XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuS6i+S7tuaLluWKqOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdC8vIENhbGwgaGFzVGltZSBvbiB0aGUgZXZlbnTigJlzIHN0YXJ0L2VuZCB0byBzZWUgaWYgaXQgaGFzIGJlZW4gZHJvcHBlZCBpbiBhIHRpbWVkIG9yIGFsbC1kYXkgYXJlYS5cclxuXHRcdGNvbnN0IGFsbERheSA9ICFldmVudC5zdGFydC5oYXNUaW1lKCk7XHJcblx0XHQvLyDojrflj5bkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g5pu05paw5pWw5o2uXHJcblx0XHRpZiAoIGFsbERheSApIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gXHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g6K6+572u5paH5qGj5bGe5oCn5YC8XHJcblx0X3NldFBhcmFtVmFsdWUoZG9jLCBrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZG9jLlNldFBhcmFtVmFsdWUoa2V5LCB2YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0Ly8g5pu05pawV2l6RG9j5L+u5pS55pe26Ze0XHJcblx0X3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKXtcclxuXHRcdGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0bm93LnNldFNlY29uZHMoKG5vdy5nZXRTZWNvbmRzKCkgKyAxKSAlIDYwKTtcclxuXHRcdGRvYy5EYXRlTW9kaWZpZWQgPSB0aGlzLl9kMnMobm93KTtcclxuXHR9O1xyXG5cclxuXHQvLyDlsIbml6XmnJ/lr7nosaHovazljJbkuLrlrZfnrKbkuLJcclxuXHQvL1RPRE86IOiAg+iZkeS+nei1lm1vbWVudOadpeeugOWMlui9rOaNoui/h+eoi1xyXG5cdF9kMnMoZHQpe1xyXG5cdFx0Y29uc3QgcmV0ID0gZHQuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXREYXRlKCkpICsgXCIgXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRIb3VycygpKSsgXCI6XCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNaW51dGVzKCkpICsgXCI6XCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRTZWNvbmRzKCkpO1xyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9O1xyXG5cclxuXHQvLyDml6Xljobml7bpl7Tph43nva7ml7bpl7TojIPlm7TlkI7mm7TmlrDmlbDmja5cclxuXHR1cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdGNvbnN0IGFsbERheSA9IGV2ZW50LnN0YXJ0Lmhhc1RpbWUoKSA/IGZhbHNlIDogdHJ1ZTtcclxuXHRcdC8vIOiOt+W+l+S6i+S7tuaWh+aho+aXtumXtOaVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcblx0XHQvLyDorqHnrpfmm7TmlLnlkI7nmoTnu5PmnZ/ml7bpl7RcclxuXHRcdGNvbnN0IGV2ZW50RW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Ly8g5pu05paw5paH5qGj5pWw5o2uXHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZXZlbnRFbmRTdHIpO1xyXG5cdFx0dGhpcy5fdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2MpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWIm+W7uuS6i+S7tiBzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEgRnVsbENhbGVuZGFyIOS8oOWFpeeahOaVsOaNri5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5zdGFydCBNb21lbnQg57G75pel5pyf5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLmVuZCBNb21lbnQg57G75pel5pyf5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLmpzRXZlbnQgbmF0aXZlIEphdmFTY3JpcHQg5LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnZpZXcgRnVsbENhbGVuZGFyIOinhuWbvuWvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gdXNlcklucHV0cyDnlKjmiLfkvKDlhaXnmoTlhbbku5bkv6Hmga8uXHJcbiAgICAgKiBUT0RPOiDor6Xmlrnms5Xlj6/ku6XmlL7nva7liLBDYWxlbmRhckV2ZW5055qE6Z2Z5oCB5pa55rOV5LiKXHJcbiAgICAgKi9cclxuXHRjcmVhdGVFdmVudChzZWxlY3Rpb25EYXRhLCB1c2VySW5wdXRzKXtcclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIOiOt+WPlueUqOaIt+iuvue9rlxyXG5cdFx0XHRjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KHtcclxuXHRcdFx0XHR0aXRsZTogdXNlcklucHV0cy50aXRsZSA/IHVzZXJJbnB1dHMudGl0bGUgOiAn5peg5qCH6aKYJyxcclxuXHRcdFx0XHRzdGFydDogc2VsZWN0aW9uRGF0YS5zdGFydCxcclxuXHRcdFx0XHRlbmQ6IHNlbGVjdGlvbkRhdGEuZW5kLFxyXG5cdFx0XHRcdGFsbERheTogc2VsZWN0aW9uRGF0YS5zdGFydC5oYXNUaW1lKCkgJiYgc2VsZWN0aW9uRGF0YS5lbmQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogdXNlcklucHV0cy5jb2xvciA/IHVzZXJJbnB1dHMuY29sb3IgOiAnIzMyQ0QzMicsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvLyDkv53lrZjlubbmuLLmn5Pkuovku7ZcclxuXHRcdFx0bmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuXHRcdFx0bmV3RXZlbnQucmVmZXRjaERhdGEoKTtcclxuXHRcdFx0bmV3RXZlbnQuYWRkVG9GdWxsQ2FsZW5kYXIoKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtjb25zb2xlLmxvZyhlKX1cclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuLy8gVE9ETzog6YeN5YaZ6I635Y+W5pWw5o2u55qE5pa55byPXHJcbmZ1bmN0aW9uIF9nZXRXaXpFdmVudChzdGFydCwgZW5kKSB7XHJcblx0Ly9UT0RPOlxyXG5cdGxldCBldmVudHMgPSBbXTtcclxuXHRsZXQgRXZlbnRDb2xsZWN0aW9uID0gb2JqRGF0YWJhc2UuR2V0Q2FsZW5kYXJFdmVudHMyKHN0YXJ0LCBlbmQpO1xyXG5cdHJldHVybiBldmVudHNcclxufVxyXG5cclxuXHJcbi8qIOaVsOaNruiOt+WPllxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblxyXG4vKiDmnYLpobnlkozlt6XlhbdcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vLyDliKTmlq3lhoXmoLhcclxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XHJcblx0aWYgKGdfaXNDaHJvbWUpIHJldHVybiBnX2lzQ2hyb21lO1xyXG5cdC8vXHJcblx0dmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG5cdGdfaXNDaHJvbWUgPSB1YS5pbmRleE9mKCdjaHJvbWUnKSAhPSAtMTtcclxuXHQvL1xyXG5cdHJldHVybiBnX2lzQ2hyb21lO1xyXG59XHJcblxyXG4vLyDlsIbmlbTmlbDovazmjaLmiJDml6XmnJ/lrZfnrKbkuLJcclxuZnVuY3Rpb24gZm9ybWF0SW50VG9EYXRlU3RyaW5nKG4pe1xyXG5cdFx0XHJcblx0cmV0dXJuIG4gPCAxMCA/ICcwJyArIG4gOiBuO1xyXG59XHJcblxyXG4vLyDliKTmlq3lrp7lj4LmmK/lkKbmmK/mlbDnu4TnmoTlrp7kvotcclxuZnVuY3Rpb24gaXNBcnJheShhcnJheSkge1xyXG4gICAgcmV0dXJuIChhcnJheSBpbnN0YW5jZW9mIEFycmF5KTtcclxufVxyXG5cclxuLy8g5qOA5p+l5Y+K5aKe5Yqg5pWw5YC85a2X56ym5Liy6ZW/5bqm77yM5L6L5aaC77yaJzInIC0+ICcwMidcclxuZnVuY3Rpb24gY2hlY2tBbmRBZGRTdHJMZW5ndGgoc3RyKSB7XHJcblx0aWYgKHN0ci5sZW5ndGggPCAyKSB7XHJcblx0XHRyZXR1cm4gJzAnICsgc3RyO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxufVxyXG5cclxuLy8g5bCG5a2X56ym5Liy6L2s5YyW5Li65pel5pyf5a+56LGhXHJcbmZ1bmN0aW9uIF9zMmQoc3RyKXtcclxuXHRpZiAoIXN0cilcclxuXHRcdHJldHVybiAnJztcclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0ci5zdWJzdHIoMCwgNCksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDUsIDIpIC0gMSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoOCwgMyksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDExLCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTQsIDIpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxNywgMilcclxuXHRcdFx0XHRcdCk7XHRcdFxyXG5cdHJldHVybiBkYXRlO1xyXG59XHJcbiIsImV4cG9ydCB7IFdpekV4cGxvcmVyQXBwLCBXaXpFeHBsb3JlcldpbmRvdywgV2l6RGF0YWJhc2UsIFdpekNvbW1vblVJLCBXaXpDb25maXJtIH07XHJcblxyXG4vL1RPRE86IOWIpOaWrXdpbmRvdy5leHRlcm5hbOaYr+WQpuS4uldpekh0bWxFZGl0b3JBcHBcclxuY29uc3QgV2l6RXhwbG9yZXJBcHAgPSB3aW5kb3cuZXh0ZXJuYWw7XHJcbmNvbnN0IFdpekV4cGxvcmVyV2luZG93ID0gV2l6RXhwbG9yZXJBcHAuV2luZG93O1xyXG5jb25zdCBXaXpEYXRhYmFzZSA9IFdpekV4cGxvcmVyQXBwLkRhdGFiYXNlO1xyXG5jb25zdCBXaXpDb21tb25VSSA9IFdpekV4cGxvcmVyQXBwLkNyZWF0ZVdpek9iamVjdChcIldpektNQ29udHJvbHMuV2l6Q29tbW9uVUlcIik7XHJcblxyXG5mdW5jdGlvbiBXaXpDb25maXJtKG1zZywgdGl0bGUpIHtcclxuICAgIHJldHVybiBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIHRpdGxlLCAweDAwMDAwMDIwIHwgMHgwMDAwMDAwMSkgPT0gMTtcclxufVxyXG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgJ2Z1bGxjYWxlbmRhcic7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyL2Rpc3QvZnVsbGNhbGVuZGFyLmNzcyc7XHJcbmltcG9ydCBXaXpFdmVudERhdGFMb2FkZXIgZnJvbSAnLi9XaXpFdmVudERhdGFMb2FkZXInO1xyXG5pbXBvcnQgeyByZW5kZXJFZGl0UG9wcGVyIH0gZnJvbSAnLi9XaWRnZXQvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlcic7XHJcbmltcG9ydCBFdmVudENyZWF0ZU1vZGFsIGZyb20gJy4vTW9kYWwvRXZlbnRDcmVhdGVNb2RhbCdcclxuaW1wb3J0ICcuL2luZGV4LmNzcyc7XHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyDlrprkuYnlj5jph49cclxuXHRjb25zdCBkYXRhTG9hZGVyID0gbmV3IFdpekV2ZW50RGF0YUxvYWRlcigpO1xyXG5cdGxldCBnX2VkaXRQb3BwZXIsIGdfY3JlYXRlTW9kYWwsIGdfZWRpdE1vZGFsO1xyXG5cclxuICAgIGNvbnN0IGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuXHRcdHRoZW1lU3lzdGVtOiAnc3RhbmRhcmQnLFxyXG5cdFx0aGVpZ2h0OiAncGFyZW50JyxcclxuXHRcdGhlYWRlcjoge1xyXG5cdFx0XHRsZWZ0OiAncHJldixuZXh0LHRvZGF5JyxcclxuXHRcdFx0Y2VudGVyOiAndGl0bGUnLFxyXG5cdFx0XHRyaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5LGxpc3RXZWVrJ1xyXG5cdFx0fSxcclxuXHRcdHZpZXdzOiB7XHJcblx0XHRcdG1vbnRoOiB7XHJcblx0XHRcdFx0Ly90aXRsZUZvcm1hdDogZ19sb2NfdGl0bGVmb3JtYXRfbW9udGgsIC8vdmFyIGdfbG9jX3RpdGxlZm9ybWF0X21vbnRoID0gXCJNTU1NIHl5eXlcIjtcclxuXHRcdFx0fSxcclxuXHRcdFx0YWdlbmRhOiB7XHJcblx0XHRcdFx0bWluVGltZTogXCIwODowMDowMFwiLFxyXG5cdFx0XHRcdHNsb3RMYWJlbEZvcm1hdDogJ2goOm1tKSBhJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsaXN0V2Vlazoge1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdG5hdkxpbmtzOiB0cnVlLFxyXG5cdFx0YWxsRGF5RGVmYXVsdDogZmFsc2UsXHJcblx0XHRkZWZhdWx0VmlldzogJ2FnZW5kYVdlZWsnLFxyXG5cdFx0ZXZlbnRMaW1pdDogdHJ1ZSxcclxuXHRcdGJ1dHRvblRleHQ6IHtcclxuXHRcdFx0dG9kYXk6ICfku4rlpKknLFxyXG5cdFx0XHRtb250aDogJ+aciCcsXHJcblx0XHRcdHdlZWs6ICflkagnLFxyXG5cdFx0XHRkYXk6ICfml6UnLFxyXG5cdFx0XHRsaXN0OiAn6KGoJ1xyXG4gICAgICAgIH0sXHJcblx0XHRtb250aE5hbWVzOiBbXHJcbiAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgIF0sXHJcblx0XHRtb250aE5hbWVzU2hvcnQ6IFtcclxuICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgXSxcclxuXHRcdGRheU5hbWVzOiBbXHJcbiAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgXSxcclxuXHRcdGRheU5hbWVzU2hvcnQ6IFtcclxuICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICBdLFxyXG5cdFx0c2VsZWN0YWJsZTogdHJ1ZSxcclxuXHRcdHNlbGVjdEhlbHBlcjogdHJ1ZSxcclxuXHRcdHVuc2VsZWN0Q2FuY2VsOiAnLm1vZGFsIConLFxyXG5cdFx0YWxsRGF5VGV4dDogJ+WFqOWkqScsXHJcblx0XHRub3dJbmRpY2F0b3I6IHRydWUsXHJcblx0XHRmb3JjZUV2ZW50RHVyYXRpb246IHRydWUsXHJcblx0XHRmaXJzdERheTogMSwgLy8g56ys5LiA5aSp5piv5ZGo5LiA6L+Y5piv5ZGo5aSp77yM5LiOZGF0ZXBpY2tlcuW/hemhu+ebuOWQjFxyXG5cdFx0ZHJhZ09wYWNpdHk6e1xyXG5cdFx0XHRcIm1vbnRoXCI6IC41LFxyXG5cdFx0XHRcImFnZW5kYVdlZWtcIjogMSxcclxuXHRcdFx0XCJhZ2VuZGFEYXlcIjogMVxyXG5cdFx0fSxcclxuXHRcdGVkaXRhYmxlOiB0cnVlLFxyXG5cclxuXHRcdC8vIOWIt+aWsOinhuWbvu+8jOmHjeaWsOiOt+WPluaXpeWOhuS6i+S7tlxyXG5cdFx0dmlld1JlbmRlcjogZnVuY3Rpb24oIHZpZXcsIGVsZW1lbnQgKSB7XHJcblx0XHRcdC8vVE9ETzog5oSf6KeJ6L+Z5qC36YCg5oiQ5oCn6IO95LiK55qE5o2f5aSx77yM5piv5ZCm5pyJ5pu05aW955qE5pa55rOV77yfXHJcblx0XHRcdGNvbnN0IGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRcdGNvbnN0IGV2ZW50c0FyciA9IGRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2UoIHZpZXcsIGVsZW1lbnQgKTtcclxuXHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuXHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdhZGRFdmVudFNvdXJjZScsIHtcclxuXHRcdFx0XHRldmVudHM6IGV2ZW50c0FyclxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g6YCJ5oup5Yqo5L2c6Kem5Y+R55qE5LqL5Lu25Y+l5p+E77yM5a6a5LmJ5LqG5LiA5LiqY2FsbGJhY2tcclxuXHRcdHNlbGVjdDogZnVuY3Rpb24oc3RhcnQsIGVuZCwganNFdmVudCwgdmlldyl7XHJcblx0XHRcdC8vIOW8ueWHuuKAnOWIm+W7uuaXpeWOhuS6i+S7tuKAneeql+WPo1xyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKbmuLLmn5NcclxuXHRcdFx0Ly9UT0RPOiDmg7Plip7ms5XkuI3opoHnlKjlhajlsYDlj5jph49cclxuXHRcdFx0aWYgKCAhd2luZG93LmdfY3JlYXRlTW9kYWwgKSBuZXcgRXZlbnRDcmVhdGVNb2RhbCh7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld30pO1xyXG5cdFx0XHQvLyDkvKDpgJLlj4LmlbBcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwudXBkYXRlKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdHdpbmRvdy5nX2NyZWF0ZU1vZGFsLnNob3coKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25ouW5YqoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXdcclxuXHRcdGV2ZW50RHJvcDogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25pel5pyf6IyD5Zu06YeN572uXHJcblx0XHRldmVudFJlc2l6ZTogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnRSZW5kZXI6IGZ1bmN0aW9uKGV2ZW50T2JqLCAkZWwpIHtcclxuXHRcdFx0Ly8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcblx0XHRcdGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudE9iai5jb21wbGV0ZSkgPT0gNTtcclxuXHRcdFx0aWYgKCBpc0NvbXBsZXRlICkge1xyXG5cdFx0XHRcdCRlbC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnI0UxRTFFMScpO1xyXG5cdFx0XHRcdCRlbC5maW5kKCcuZmMtY29udGVudCcpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdFx0XHQkZWwuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNFMUUxRTEnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu254K55Ye75ZCO5LqL5Lu25Y+l5p+EXHJcblx0XHRldmVudENsaWNrOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcblx0XHRcdC8vIHRoaXMg5oyH5ZCR5YyF6KO55LqL5Lu255qEPGE+5YWD57SgXHJcblxyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKblt7Lnu4/muLLmn5PlvLnnqpdcclxuXHRcdFx0aWYgKCAhZ19lZGl0UG9wcGVyICkge1xyXG5cdFx0XHRcdGdfZWRpdFBvcHBlciA9IHJlbmRlckVkaXRQb3BwZXIoe1xyXG5cdFx0XHRcdFx0J2V2ZW50JzogZXZlbnQsXHJcblx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHR9LCB0aGlzKS5FdmVudFBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyDmm7TmlrByZWZlcmVuY2VcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIuRXZlbnRQb3BvdmVyKCdvcHRpb24nLCB7XHJcblx0XHRcdFx0XHRhcmdzOiB7XHJcblx0XHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHRcdCd2aWV3Jzogdmlld1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpdGxlOiBldmVudC50aXRsZSxcclxuXHRcdFx0XHRcdHJlZmVyZW5jZTogdGhpc1xyXG5cdFx0XHRcdH0pLkV2ZW50UG9wb3ZlcigndXBkYXRlJykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9KVxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=