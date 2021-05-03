"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var request = require('request');
var fetch = require("node-fetch");
var TokenObject = {};
var sl_token;
var email;
var name;
var fetchToken = function (cid, emailid, clientName) { return __awaiter(void 0, void 0, void 0, function () {
    var propertiesObject, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                propertiesObject = { client_id: cid, email: emailid, name: clientName };
                return [4 /*yield*/, fetch("https://api.supermetrics.com/assignment/register", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(propertiesObject)
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = (_a.sent()).data;
                TokenObject = data;
                return [2 /*return*/, data];
        }
    });
}); };
var fetchAllPosts = function (pageNo) { return __awaiter(void 0, void 0, void 0, function () {
    var api, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, fetchToken(sl_token, email, name)];
            case 1:
                TokenObject = _a.sent();
                api = 'https://api.supermetrics.com/assignment/posts?sl_token=' + TokenObject["sl_token"] + '&page=' + pageNo;
                return [4 /*yield*/, fetch(api)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 4:
                error_1 = _a.sent();
                if (error_1) {
                    return [2 /*return*/, error_1.message];
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var LongestPostPerMonth = function (maxPagesToRead) { return __awaiter(void 0, void 0, void 0, function () {
    var countByMonth, postPerMonth, results, i, arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Longest post by character length per month ");
                countByMonth = {};
                postPerMonth = {};
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= maxPagesToRead)) return [3 /*break*/, 4];
                return [4 /*yield*/, fetchAllPosts(i)];
            case 2:
                results = _a.sent();
                arr = results["posts"];
                arr.forEach(function (item, index) {
                    var d = new Date(item["created_time"]);
                    var curMonth = d.getMonth();
                    if (curMonth in countByMonth) {
                        if (item["message"].length >= countByMonth[curMonth]) {
                            countByMonth[curMonth] = item["message"].length;
                            postPerMonth[curMonth] = item;
                        }
                    }
                    else {
                        countByMonth[curMonth] = item["message"].length;
                        postPerMonth[curMonth] = item;
                    }
                });
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(JSON.parse(JSON.stringify(postPerMonth)));
                return [2 /*return*/, JSON.parse(JSON.stringify(postPerMonth))];
        }
    });
}); };
var TotalPostsPerWeek = function (maxPagesToRead) { return __awaiter(void 0, void 0, void 0, function () {
    var obj, totalPostsPerWeek, curWeek, results, i, arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Total posts split by week number");
                totalPostsPerWeek = {};
                curWeek = 0;
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= maxPagesToRead)) return [3 /*break*/, 4];
                return [4 /*yield*/, fetchAllPosts(i)];
            case 2:
                results = _a.sent();
                arr = results["posts"];
                arr.forEach(function (item, index) {
                    var d = new Date(item["created_time"]);
                    curWeek = FetchCurrentWeekNumber(d);
                    if (curWeek in totalPostsPerWeek) {
                        totalPostsPerWeek[curWeek] = totalPostsPerWeek[curWeek] + 1;
                    }
                    else {
                        totalPostsPerWeek[curWeek] = 1;
                    }
                });
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(JSON.parse(JSON.stringify(totalPostsPerWeek)));
                return [2 /*return*/, JSON.parse(JSON.stringify(totalPostsPerWeek))];
        }
    });
}); };
var AvgPostPerUserPerWeek = function (maxPagesToRead) { return __awaiter(void 0, void 0, void 0, function () {
    var postPerMonth, postsPerUserPerMonth, postsPerPage, i, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Average number of posts per user per month");
                postPerMonth = {};
                postsPerUserPerMonth = {};
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= maxPagesToRead)) return [3 /*break*/, 4];
                return [4 /*yield*/, fetchAllPosts(i)];
            case 2:
                postsPerPage = _a.sent();
                posts = postsPerPage["posts"];
                posts.forEach(function (item, index) {
                    var curUser = item["from_id"];
                    var d = new Date(item["created_time"]);
                    var curMonth = d.getMonth();
                    if (curUser in postsPerUserPerMonth) {
                        for (var userid in postsPerUserPerMonth) {
                            if (curMonth in postsPerUserPerMonth[userid]) {
                                postsPerUserPerMonth[curUser][curMonth] = postsPerUserPerMonth[curUser][curMonth] + 1;
                            }
                            else {
                                postsPerUserPerMonth[curUser][curMonth] = 1;
                            }
                        }
                    }
                    else {
                        postPerMonth[curMonth] = 1;
                        postsPerUserPerMonth[curUser] = postPerMonth;
                    }
                });
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(JSON.parse(JSON.stringify(postsPerUserPerMonth)));
                return [2 /*return*/, JSON.parse(JSON.stringify(postsPerUserPerMonth))];
        }
    });
}); };
var AvgPostLenPerMonth = function (maxPagesToRead) { return __awaiter(void 0, void 0, void 0, function () {
    var countByMonth, i, postsPerPage, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Average character length of posts per month");
                countByMonth = {};
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= maxPagesToRead)) return [3 /*break*/, 4];
                return [4 /*yield*/, fetchAllPosts(i)];
            case 2:
                postsPerPage = _a.sent();
                posts = postsPerPage["posts"];
                posts.forEach(function (item, index) {
                    var d = new Date(item["created_time"]);
                    var curMonth = d.getMonth();
                    if (curMonth in countByMonth) {
                        countByMonth[curMonth] = countByMonth[curMonth] + 1;
                    }
                    else {
                        countByMonth[curMonth] = 1;
                    }
                }); // foreach
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(JSON.parse(JSON.stringify(countByMonth)));
                return [2 /*return*/, JSON.parse(JSON.stringify(countByMonth))];
        }
    });
}); };
function FetchCurrentWeekNumber(curDate) {
    //define a date object variable with date inside it  
    var date1 = new Date(curDate);
    //find the year of the entered date  
    var oneJan = new Date(date1.getFullYear(), 0, 1);
    // calculating number of days in given year before the given date   
    var numberOfDays = Math.floor((Number(date1) - Number(oneJan)) / (24 * 60 * 60 * 1000));
    // adding 1 since to current date and returns value starting from 0   
    var result = Math.ceil((date1.getDay() + 1 + numberOfDays) / 7);
    return result;
}
/*
You need to pass command line parameters while calling 'executeFunctionality()', pls see the example and order of params

node FetchPostDetails.js --build --test-args <sl_token> <email> <name> <option> <maxPagesToRead>

See the below example :
node FetchPostDetails.js --build --test-args "ju16a6m81mhid5ue1z3v2g0uh" "wasimbari162@gmail.com" "wasim" 4 10
node FetchPostDetails.js --build --test-args "ju16a6m81mhid5ue1z3v2g0uh" "wasimbari162@gmail.com" "wasim" 1 10
node FetchPostDetails.js --build --test-args "ju16a6m81mhid5ue1z3v2g0uh" "wasimbari162@gmail.com" "wasim" 2 10
node FetchPostDetails.js --build --test-args "ju16a6m81mhid5ue1z3v2g0uh" "wasimbari162@gmail.com" "wasim" 3 10

You can view screenshots document too.

*/
function executeFunctionality() {
    var params = process.argv.slice(4);
    console.log(params);
    sl_token = params[0];
    email = params[1];
    name = params[2];
    var option = params[3];
    var maxPagesToRead = params[4];
    //console.log(sl_token, email, name, option)
    //Valid 'option' values :
    //LongestPostPerMonth   option 1
    //TotalPostsPerWeek     option 2
    //AvgPostPerUserPerWeek option 3
    //AvgPostLenPerMonth    option 4
    switch (Number(option)) {
        case 1: {
            LongestPostPerMonth(maxPagesToRead);
            break;
        }
        case 2: {
            TotalPostsPerWeek(maxPagesToRead);
            break;
        }
        case 3: {
            AvgPostPerUserPerWeek(maxPagesToRead);
            break;
        }
        case 4: {
            AvgPostLenPerMonth(maxPagesToRead);
            break;
        }
        default: {
            console.error("Enter proper opotions. Please view the valid options mentioned above in comments or refer below statements.");
            console.log("LongestPostPerMonth   option 1");
            console.log("TotalPostsPerWeek     option 2");
            console.log("AvgPostPerUserPerWeek option 3");
            console.log("AvgPostLenPerMonth    option 4");
            break;
        }
    }
}
executeFunctionality();
