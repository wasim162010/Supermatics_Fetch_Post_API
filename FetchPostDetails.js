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
// import * as request from 'request'
// var request = require('request');
var request = require('request');
var fetch = require("node-fetch");
var MonthlhyLongestPost = {};
var TokenObject = {};
// TokenObject={ client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
// email: 'wasimbari162@gmail.com',
// sl_token: 'smslt_2ac8cb274524_3a6ec7dee0a6' }
var countPerUserPerMonth = new Object();
function hello(person) {
    var propertiesObject = { client_id: 'ju16a6m81mhid5ue1z3v2g0uh', email: 'wasimbari162@gmail.com', name: 'wasim' };
    //fetchData(2,"smslt_07875cc7a37477_e292daf5db23");
    return "Hello, " + person;
}
function fetchData(page, token) {
    request.get({
        url: 'https://api.supermetrics.com/assignment/posts?sl_token=' + token + "&page=" + page
    }, function (error, response, body) {
        var obj = JSON.parse(body);
        for (var prop in obj) {
            // console.log("prop "+ prop );
            for (var vals in obj[prop]) {
                // console.log("vals " + vals);
                if (vals == "posts") {
                    //  console.log("vals " + vals);
                    //console.log("record " + obj["data"][vals]);
                    var arr = obj["data"][vals];
                    arr.forEach(function (item, index) {
                        //console.log(item["message"]);
                        //  let curLen = item["message"]
                        FetchCurrentWeekNumber(item["created_time"]);
                    });
                }
            }
        }
    });
}
function TotalPostPerWeek(pageNumber, weeknumber) {
    var PostsPerWeek = {}; //Total posts split by week number
    //week number 
    //total posts
}
function fetchPostsByPage(token, pageNumber) {
    /*
    {
        "meta": {
            "request_id": "7Z_SE9EpwSBKI4uapQkXSlcWvO_700SS"
        },
        "error": {
            "message": "Invalid SL Token"
        }
    }
   */
    console.log("fetchPostsByPage");
    console.log('https://api.supermetrics.com/assignment/posts?sl_token=' + token + "&page=" + pageNumber);
    request.get({
        url: 'https://api.supermetrics.com/assignment/posts?sl_token=' + token + "&page=" + pageNumber
    }, function (error, response, body) {
        var obj = JSON.parse(body);
        console.log(obj);
        return obj;
        // for (let prop in obj) {
        //     for (let vals in obj[prop]) {
        //         if (vals == "posts") {
        //             var arr = obj["data"][vals];
        //             arr.forEach(function (item, index) {
        //                // FetchCurrentWeekNumber(item["created_time"]);
        //             });   
        //         }
        //     }    
        // }
    });
}
function GenerateToken(cid, emailid, clientName) {
    var propertiesObject = { client_id: cid, email: emailid, name: clientName };
    request.post({
        url: 'https://api.supermetrics.com/assignment/register',
        form: propertiesObject
    }, function (error, response, body) {
        console.log(body);
        var resp = body;
        var obj = JSON.parse(body);
        console.log(response.statusCode);
        if (response.statusCode == 400) {
            if (obj.error.code == "PARAM_REQUIRED") {
                console.log("PARAM_REQUIRED");
                return obj.error.description;
            }
            else if (obj.error.message == "INVALID_CLIENT_ID") {
                console.log("INVALID_CLIENT_ID");
                return obj.error.message;
            }
        }
        else {
            return obj;
        }
    });
}
function FetchCurrentWeekNumber(curDate) {
    // console.log("FetchCurrentWeekNumber")
    //define a date object variable with date inside it  
    var date1 = new Date(curDate);
    //find the year of the entered date  
    var oneJan = new Date(date1.getFullYear(), 0, 1);
    // calculating number of days in given year before the given date   
    var numberOfDays = Math.floor((Number(date1) - Number(oneJan)) / (24 * 60 * 60 * 1000));
    // adding 1 since to current date and returns value starting from 0   
    var result = Math.ceil((date1.getDay() + 1 + numberOfDays) / 7);
    return result;
    //console.log(" week number " + result);
}
var token = "smslt_25969541f56408_63056d33edd8"; //"smslt_9d414122b0bb40_8f15a3edfab8"
// const fetchAllPosts = async (pageNo): Promise<typeof MonthlhyLongestPost> => {
// }
var fetchAllPosts = function (pageNo) { return __awaiter(void 0, void 0, void 0, function () {
    var token, api, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = 'smslt_47c56b5c6b6a94_5e9cb957304631';
                api = 'https://api.supermetrics.com/assignment/posts?sl_token=' + token + '&page=' + pageNo;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
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
//
// fetchAllPosts(5).then(function (result) {
//     console.log(result);
// })
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
                return [2 /*return*/, data];
        }
    });
}); };
// fetchToken("ju16a6m81mhid5ue1z3v2g0uh", "wasimbari162@gmail.com", "wasim").then(function (res) {
//     console.log(res);
//     TokenObject = res;
//     console.log("Token object is " + TokenObject)
//     for (let key in TokenObject)
//         console.log("val is  " + TokenObject[key])
// })
// console.log(fetchAllPosts(5).then(function (value) {
//     return value;
// })
// )
// function InitializeToken() {
//     fetchToken("ju16a6m81mhid5ue1z3v2g0uh", "wasimbari162@gmail.com", "wasim").then(function (res) {
//         console.log(res);
//         TokenObject = res;
//         console.log("Token object is " + TokenObject)
//      })
// }
// InitializeToken();
function AveragePostLenPerMonth(pageNo) {
    console.log("AveragePostLenPerMonth");
    var obj;
    var countByMonth = {};
    fetchAllPosts(pageNo).then(function (result) {
        MonthlhyLongestPost = {};
        obj = result;
        // console.log(obj)
        for (var posts in obj) {
            var arr = obj["posts"];
            //  console.log(arr)
            arr.forEach(function (item, index) {
                var d = new Date(item["created_time"]);
                var curMonth = d.getMonth();
                if (curMonth in countByMonth) {
                    countByMonth[curMonth] = countByMonth[curMonth] + 1;
                }
                else {
                    countByMonth[curMonth] = 1;
                }
                if (curMonth in MonthlhyLongestPost) {
                    MonthlhyLongestPost[curMonth] = MonthlhyLongestPost[curMonth] + item["message"].length;
                }
                else {
                    countByMonth[curMonth] = countByMonth[curMonth] + 1;
                    MonthlhyLongestPost[curMonth] = 0;
                    MonthlhyLongestPost[curMonth] = item["message"].length;
                }
            }); //arr.foreach
        } //vals
        for (var key in countByMonth) {
            MonthlhyLongestPost[key] = MonthlhyLongestPost[key] / countByMonth[key];
        }
        console.log(countByMonth);
        console.log(MonthlhyLongestPost);
    });
}
//AveragePostLenPerMonth(5); //fine
var LPPM = function () { return __awaiter(void 0, void 0, void 0, function () {
    var obj, countByMonth, postPerMonth, results, i, arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("LPPM");
                countByMonth = {};
                postPerMonth = {};
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= 10)) return [3 /*break*/, 4];
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
                    } //if-else end
                }); //foreach of arr
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(JSON.parse(JSON.stringify(postPerMonth)));
                return [2 /*return*/];
        }
    });
}); };
//LPPM().then(function (results) {}).catch((err) => { console.error(err) });
var TPPW = function () { return __awaiter(void 0, void 0, void 0, function () {
    var obj, totalPostsPerWeek, curWeek, results, i, arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("TotalPostsPerWeek");
                totalPostsPerWeek = {};
                curWeek = 0;
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= 10)) return [3 /*break*/, 4];
                return [4 /*yield*/, fetchAllPosts(i)];
            case 2:
                results = _a.sent();
                arr = results["posts"];
                arr.forEach(function (item, index) {
                    var d = new Date(item["created_time"]);
                    curWeek = FetchCurrentWeekNumber(d);
                    // console.log("curweek is"+ curWeek)
                    if (curWeek in totalPostsPerWeek) {
                        totalPostsPerWeek[curWeek] = totalPostsPerWeek[curWeek] + 1;
                    }
                    else {
                        totalPostsPerWeek[curWeek] = 1;
                    }
                }); //arr for each
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: //i loop
            // console.log(JSON.parse(JSON.stringify(totalPostsPerWeek)))
            return [2 /*return*/, JSON.parse(JSON.stringify(totalPostsPerWeek))];
        }
    });
}); };
//TPPW().then(function (results) {}).catch((err) => { console.error(err) });
var APPUPW = function () { return __awaiter(void 0, void 0, void 0, function () {
    var postPerMonth, postsPerUserPerMonth, postsPerPage, i, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("APPUPW");
                postPerMonth = {};
                postsPerUserPerMonth = {};
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= 10)) return [3 /*break*/, 4];
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
                }); //postsPerPage
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
//APPUPW().then(function (results) { }).catch((err) => { console.error(err) });
var APLPM = function () { return __awaiter(void 0, void 0, void 0, function () {
    var countByMonth, i, postsPerPage, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("APLPM");
                countByMonth = {};
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i <= 10)) return [3 /*break*/, 4];
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
APLPM().then(function (results) { })["catch"](function (err) { console.error(err); });
function LongestPostPerMonth() {
    console.log("LongestPostPerMonth");
    var obj;
    var countByMonth = {};
    var postPerMonth = {};
    var results;
    for (var i = 1; i <= 10; i++) {
        console.log("i value is " + i);
        results = fetchAllPosts(i).then(function (result) {
            console.log("page is " + i);
            obj = result;
            // console.log(obj)
            for (var posts in obj) {
                var arr = obj["posts"];
                // console.log(arr)
                arr.forEach(function (item, index) {
                    var d = new Date(item["created_time"]);
                    var curMonth = d.getMonth();
                    if (curMonth in countByMonth) {
                        if (item["message"].length >= countByMonth[curMonth]) {
                            countByMonth[curMonth] = item["message"].length;
                            postPerMonth[curMonth] = item;
                        }
                        /// console.log(item["message"].length  +  " " + countByMonth[curMonth]  +  " month is " + curMonth + " page is "+ i)
                    }
                    else {
                        countByMonth[curMonth] = item["message"].length;
                        //console.log(item["message"].length + " " + countByMonth[curMonth] + " month is " + curMonth+ " page is "+ i)
                        postPerMonth[curMonth] = item;
                    }
                }); //arr.foreach
            } //posts        
            //console.log(countByMonth)
            // console.log(JSON.parse(JSON.stringify(postPerMonth)))
            //return JSON.parse(JSON.stringify(postPerMonth)) 
        });
    }
    console.log("done with it");
    for (var key in postPerMonth) {
        console.log(postPerMonth[key]);
    }
    //  console.log(JSON.parse(JSON.stringify(postPerMonth[5])))
}
//LongestPostPerMonth() //fine
function TotalPostsPerWeek(pageNo) {
    console.log("TotalPostsPerWeek");
    var obj;
    var totalPostsPerWeek = {};
    var curWeek = 0;
    fetchAllPosts(pageNo).then(function (result) {
        obj = result;
        for (var posts in obj) {
            var arr = obj["posts"];
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
        }
        console.log(JSON.parse(JSON.stringify(totalPostsPerWeek)));
        return JSON.parse(JSON.stringify(totalPostsPerWeek));
    }); //then
}
//TotalPostsPerWeek(7); //fine
function AvgPostPerUserPerMonth(pageNo) {
    console.log("AvgPostPerUserPerMonth");
    var obj;
    var countByMonth = {};
    var postPerMonth = {};
    var avgPosts = {};
    var postsPerMonth = {};
    var curMonth = 0;
    fetchAllPosts(pageNo).then(function (result) {
        obj = result;
        for (var posts in obj) {
            var arr = obj["posts"];
            arr.forEach(function (item, index) {
                var curUser = item["from_id"];
                var d = new Date(item["created_time"]);
                var curMonth = d.getMonth();
                if (curUser in avgPosts) {
                    if (curMonth in postsPerMonth[curUser][curMonth]) {
                        postsPerMonth[curUser][curMonth] = postsPerMonth[curUser][curMonth] + 1;
                    }
                    else {
                        postsPerMonth[curUser][curMonth] = 1;
                    }
                }
                else {
                    postPerMonth[curMonth] = 1;
                    postsPerMonth[curUser] = postPerMonth;
                }
            }); //arr.foreach
        } //posts        
        // console.log(postsPerMonth)
        console.log(JSON.parse(JSON.stringify(postsPerMonth)));
        return JSON.parse(JSON.stringify(postsPerMonth));
    });
}
