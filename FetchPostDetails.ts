"use strict";
import { format } from "prettier";
import { createNoSubstitutionTemplateLiteral } from "typescript";

// import * as request from 'request'
// var request = require('request');

const request = require('request');
const fetch = require("node-fetch");


var MonthlhyLongestPost = {}  as  any

var TokenObject = {}

// TokenObject={ client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
// email: 'wasimbari162@gmail.com',
// sl_token: 'smslt_2ac8cb274524_3a6ec7dee0a6' }

let countPerUserPerMonth = new Object(); 

function hello(person) {
    

    var propertiesObject = { client_id: 'ju16a6m81mhid5ue1z3v2g0uh', email: 'wasimbari162@gmail.com', name: 'wasim' };

    //fetchData(2,"smslt_07875cc7a37477_e292daf5db23");
    return "Hello, " + person;
}
 

function fetchData(page, token) {
    
    request.get({
        url:     'https://api.supermetrics.com/assignment/posts?sl_token='+token+"&page="+page,
      }, function(error, response, body){
      
            var obj = JSON.parse(body);
    
            for (let prop in obj) {
               // console.log("prop "+ prop );
                for (let vals in obj[prop]) {
                  
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






function TotalPostPerWeek(pageNumber,weeknumber) { //Total posts split by week number
    var PostsPerWeek = {} //Total posts split by week number
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
    
    console.log("fetchPostsByPage")
    console.log('https://api.supermetrics.com/assignment/posts?sl_token='+token+"&page="+pageNumber)
    request.get({
        url:     'https://api.supermetrics.com/assignment/posts?sl_token='+token+"&page="+pageNumber
      }, function(error, response, body){
            var obj = JSON.parse(body);
            console.log(obj)
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
        url:     'https://api.supermetrics.com/assignment/register',
        form:    propertiesObject
      }, function(error, response, body){
            console.log(body);
            var resp = body
            var obj = JSON.parse(body);
            console.log(response.statusCode);
          
            if (response.statusCode == 400) {
                if (obj.error.code == "PARAM_REQUIRED") {
                    console.log("PARAM_REQUIRED");
                    return obj.error.description
                } else if (obj.error.message == "INVALID_CLIENT_ID") {
                    console.log("INVALID_CLIENT_ID");
                    return obj.error.message
                }
            } else {
                return obj
            }
    });
}

function FetchCurrentWeekNumber(curDate) {
   // console.log("FetchCurrentWeekNumber")
    //define a date object variable with date inside it  
    var date1 = new Date(curDate);  

    //find the year of the entered date  
     var oneJan =  new Date(date1.getFullYear(), 0, 1);   
  
     // calculating number of days in given year before the given date   
     var numberOfDays =  Math.floor((Number(date1) - Number(oneJan)) / (24 * 60 * 60 * 1000));   
  
     // adding 1 since to current date and returns value starting from 0   
     var result = Math.ceil(( date1.getDay() + 1 + numberOfDays) / 7);  
     return result
    //console.log(" week number " + result);
  

}


var token = "smslt_25969541f56408_63056d33edd8"  //"smslt_9d414122b0bb40_8f15a3edfab8"

// const fetchAllPosts = async (pageNo): Promise<typeof MonthlhyLongestPost> => {

// }

const fetchAllPosts = async (pageNo): Promise<typeof MonthlhyLongestPost> => {
    let token ='smslt_47c56b5c6b6a94_5e9cb957304631'
    const api = 'https://api.supermetrics.com/assignment/posts?sl_token='+token+'&page='+pageNo
    try {
        const response = await fetch(api)
        const { data } = await response.json()
        return data
    } catch (error) {
        if (error) {
            return error.message
        }
    }
}
//
// fetchAllPosts(5).then(function (result) {
//     console.log(result);
// })

const fetchToken= async (cid,emailid,clientName): Promise<typeof MonthlhyLongestPost> => {
    var propertiesObject = { client_id: cid, email: emailid, name: clientName };
    const response = await fetch("https://api.supermetrics.com/assignment/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertiesObject)
    })
    const { data } = await response.json()


    return data
}
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

function AveragePostLenPerMonth(pageNo) {  //Working . Average character length of posts per month
    console.log("AveragePostLenPerMonth")
    var obj;
    var countByMonth = {}
    
    fetchAllPosts(pageNo).then(function (result) {
        MonthlhyLongestPost={}
        obj = result
      // console.log(obj)
            for (let posts in obj) {
                    var arr = obj["posts"];
                  //  console.log(arr)
                    arr.forEach(function (item, index) {
                        var d = new Date(item["created_time"])
                        var curMonth = d.getMonth()
                        if (curMonth in countByMonth) {
                            countByMonth[curMonth] = countByMonth[curMonth] + 1  
                        } else {
                            countByMonth[curMonth]= 1
                        }
                        if (curMonth in MonthlhyLongestPost) {
                            MonthlhyLongestPost[curMonth] = MonthlhyLongestPost[curMonth] + item["message"].length
                        } else {
                            countByMonth[curMonth] = countByMonth[curMonth] + 1  
                            MonthlhyLongestPost[curMonth] = 0
                            MonthlhyLongestPost[curMonth] = item["message"].length
                        }
                        
                    });//arr.foreach
        }//vals
        for (let key in countByMonth) {
            MonthlhyLongestPost[key]= MonthlhyLongestPost[key]/ countByMonth[key]
        }
     console.log(countByMonth)
     console.log(MonthlhyLongestPost)
        
    });
}
//AveragePostLenPerMonth(5); //fine

const LPPM = async () => { //Working. Longest post by character length per month. Take this

    console.log("LPPM")
    var obj;
    var countByMonth = {}
   var postPerMonth = {}
   var results;
   for (var i = 1; i <= 10; i++) {
  
       results = await fetchAllPosts(i);
       var arr = results["posts"];
      
        arr.forEach(function (item, index) {
            var d = new Date(item["created_time"])
               var curMonth = d.getMonth()
    
               if (curMonth in countByMonth) {
                     if (item["message"].length >= countByMonth[curMonth]) {
                                               countByMonth[curMonth] = item["message"].length
                                               postPerMonth[curMonth]= item
                       }
                    
                } else {
                                           countByMonth[curMonth] = item["message"].length
                                    
                                           postPerMonth[curMonth]= item
                } //if-else end
           });//foreach of arr
        
     //  } //obj
    
   }//i loop

  console.log(JSON.parse(JSON.stringify(postPerMonth)))
   

}
//LPPM().then(function (results) {}).catch((err) => { console.error(err) });

const TPPW = async () => { ////Working. Total posts split by week number. Take this
    console.log("TotalPostsPerWeek")
    var obj;
    var totalPostsPerWeek = {}
    var curWeek = 0
    var results;
    
    for (var i = 1; i <= 10; i++) {
        results = await fetchAllPosts(i);
        var arr = results["posts"];
        arr.forEach(function (item, index) {
            var d = new Date(item["created_time"])
            curWeek = FetchCurrentWeekNumber(d)
           // console.log("curweek is"+ curWeek)
            if (curWeek in totalPostsPerWeek) {
                totalPostsPerWeek[curWeek]  = totalPostsPerWeek[curWeek] + 1  
            } else {
                totalPostsPerWeek[curWeek] = 1
            }
        });//arr for each
            
    }//i loop
   // console.log(JSON.parse(JSON.stringify(totalPostsPerWeek)))
    return JSON.parse(JSON.stringify(totalPostsPerWeek)) 
    
}
//TPPW().then(function (results) {}).catch((err) => { console.error(err) });
 
const APPUPW = async () => {////Working. Total posts split by week number. Take this
    console.log("APPUPW")
    var postPerMonth = {}
    var postsPerUserPerMonth = {}
    let postsPerPage;

    for (var i = 1; i <= 10; i++) {
        postsPerPage = await fetchAllPosts(i);
        var posts = postsPerPage["posts"];
        posts.forEach(function (item, index) {
            var curUser = item["from_id"]
            var d = new Date(item["created_time"])
            var curMonth = d.getMonth()

            if (curUser in postsPerUserPerMonth) {
                for (const userid in postsPerUserPerMonth) {
                    if (curMonth in postsPerUserPerMonth[userid]) {
                        postsPerUserPerMonth[curUser][curMonth] = postsPerUserPerMonth[curUser][curMonth] + 1 
                    } else {
                        postsPerUserPerMonth[curUser][curMonth] =  1 
                    }
                }
            } else {
        
                postPerMonth[curMonth] = 1
                postsPerUserPerMonth[curUser]= postPerMonth
           }

        });//postsPerPage

    } // for i
    console.log(JSON.parse(JSON.stringify(postsPerUserPerMonth)))
    return JSON.parse(JSON.stringify(postsPerUserPerMonth)) 
}
//APPUPW().then(function (results) { }).catch((err) => { console.error(err) });

const APLPM = async () => { //Working . Average character length of posts per month. Take this
    console.log("APLPM")
    var countByMonth = {}

    for (var i = 1; i <= 10; i++) {
        var postsPerPage = await fetchAllPosts(i);
        var posts = postsPerPage["posts"];

        posts.forEach(function (item, index) {
            var d = new Date(item["created_time"])
            var curMonth = d.getMonth()

            if (curMonth in countByMonth) {
                countByMonth[curMonth] = countByMonth[curMonth] + 1  
            } else {
                countByMonth[curMonth]= 1
            }

        });// foreach

    }//for i
    console.log(JSON.parse(JSON.stringify(countByMonth)))
    return JSON.parse(JSON.stringify(countByMonth)) 

}
APLPM().then(function (results) {}).catch((err) => { console.error(err) });


function LongestPostPerMonth() { //Working. Longest post by character length per month
    
     console.log("LongestPostPerMonth")
     var obj;
     var countByMonth = {}
    var postPerMonth = {}
    var results;
    for (var i = 1; i <= 10; i++) {
        console.log("i value is " + i)
        results = fetchAllPosts(i).then(function (result) {
            console.log("page is " + i)
             obj = result
            // console.log(obj)
                for (let posts in obj) {
                        var arr = obj["posts"];
                      // console.log(arr)
                        arr.forEach(function (item, index) {
                            var d = new Date(item["created_time"])
                            var curMonth = d.getMonth()
                            if (curMonth in countByMonth) {
                                if (item["message"].length >= countByMonth[curMonth]) {
                                    countByMonth[curMonth] = item["message"].length
                                    postPerMonth[curMonth]= item
                                }
                                  /// console.log(item["message"].length  +  " " + countByMonth[curMonth]  +  " month is " + curMonth + " page is "+ i)
                            } else {
                                countByMonth[curMonth] = item["message"].length
                               //console.log(item["message"].length + " " + countByMonth[curMonth] + " month is " + curMonth+ " page is "+ i)
                                postPerMonth[curMonth]= item
                            }
                            
                        });//arr.foreach
            }//posts        
         //console.log(countByMonth)
        // console.log(JSON.parse(JSON.stringify(postPerMonth)))
         //return JSON.parse(JSON.stringify(postPerMonth)) 
        });
    }
    console.log("done with it")

    for (let key in postPerMonth) {
        console.log(postPerMonth[key])
    }
  //  console.log(JSON.parse(JSON.stringify(postPerMonth[5])))
    

}
//LongestPostPerMonth() //fine

function TotalPostsPerWeek(pageNo) {//Working.  Total posts split by week number
    console.log("TotalPostsPerWeek")
     var obj;
    var totalPostsPerWeek = {}
    var curWeek=0
    fetchAllPosts(pageNo).then(function (result) {
        obj = result
        for (let posts in obj) {
            var arr = obj["posts"];
            arr.forEach(function (item, index) {
                var d = new Date(item["created_time"])
                curWeek = FetchCurrentWeekNumber(d)
                if (curWeek in totalPostsPerWeek) {
                    totalPostsPerWeek[curWeek]  = totalPostsPerWeek[curWeek] + 1  
                } else {
                    totalPostsPerWeek[curWeek] = 1
                }
                
            });
        }
        console.log(JSON.parse(JSON.stringify(totalPostsPerWeek)))
        return JSON.parse(JSON.stringify(totalPostsPerWeek)) 
    });//then
}
//TotalPostsPerWeek(7); //fine
  
function AvgPostPerUserPerMonth(pageNo) { //Working. Average number of posts per user per month
    
    console.log("AvgPostPerUserPerMonth")
    var obj;
    var countByMonth = {}
    var postPerMonth = {}
    var avgPosts = {}
    var postsPerMonth = {}
    let curMonth = 0
    fetchAllPosts(pageNo).then(function (result) {
       obj = result

           for (let posts in obj) {
                   var arr = obj["posts"];
           
                   arr.forEach(function (item, index) {
                       var curUser = item["from_id"]
                
                       var d = new Date(item["created_time"])
                       var curMonth = d.getMonth()
                    
                       if (curUser in avgPosts) {
                            if (curMonth in postsPerMonth[curUser][curMonth] ) {
                                postsPerMonth[curUser][curMonth] = postsPerMonth[curUser][curMonth] + 1 
                            } else {
                                postsPerMonth[curUser][curMonth] =  1 
                            }       
                       } else {
                            postPerMonth[curMonth] = 1
                           postsPerMonth[curUser]= postPerMonth
                       }
                       
                   });//arr.foreach
       }//posts        
   // console.log(postsPerMonth)
    console.log(JSON.parse(JSON.stringify(postsPerMonth)))
    return JSON.parse(JSON.stringify(postsPerMonth)) 
   });

}
//AvgPostPerUserPerMonth(5) //fine

/** 
 *function LongestPostPerMonth(pageNo) { //Working. Longest post by character length per month
    
     console.log("LongestPostPerMonth")
     var obj;
     var countByMonth = {}
     var postPerMonth={}
     fetchAllPosts(pageNo).then(function (result) {
        obj = result
       // console.log(obj)
            for (let posts in obj) {
                    var arr = obj["posts"];
                  //  console.log(arr)
                    arr.forEach(function (item, index) {
                        var d = new Date(item["created_time"])
                        var curMonth = d.getMonth()
                        if (curMonth in countByMonth) {
                            if (item["message"].length >= countByMonth[curMonth]) {
                                countByMonth[curMonth] = item["message"].length
                                postPerMonth[curMonth]= item
                            }
                                console.log(item["message"].length  +  " " + countByMonth[curMonth]  +  " month is " + curMonth)
                        } else {
                            countByMonth[curMonth] = item["message"].length
                            console.log(item["message"].length + " " + countByMonth[curMonth] + " month is " + curMonth)
                            postPerMonth[curMonth]= item
                        }
                        
                    });//arr.foreach
        }//posts        
     console.log(countByMonth)
     console.log(JSON.parse(JSON.stringify(postPerMonth)))
     return JSON.parse(JSON.stringify(postPerMonth)) 
    });

}
 */