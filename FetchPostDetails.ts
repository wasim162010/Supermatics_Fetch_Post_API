"use strict";
import { format } from "prettier";
import { createNoSubstitutionTemplateLiteral } from "typescript";

// import * as request from 'request'
// var request = require('request');

const request = require('request');
const fetch = require("node-fetch");


var MonthlhyLongestPost = {}  as  any

var TokenObject = {}


//let countPerUserPerMonth = new Object(); 

var sl_token;
var email;
var name;



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




//var token = "smslt_25969541f56408_63056d33edd8"  //"smslt_9d414122b0bb40_8f15a3edfab8"

// const fetchAllPosts = async (pageNo): Promise<typeof MonthlhyLongestPost> => {

// }

// const fetchAllPosts = async (pageNo): Promise<typeof MonthlhyLongestPost> => {
//     console.log("fetchAllPosts")
//     let token ='smslt_47c56b5c6b6a94_5e9cb957304631'
//     const api = 'https://api.supermetrics.com/assignment/posts?sl_token='+token+'&page='+pageNo
//     try {
//         const response = await fetch(api)
//         const { data } = await response.json()
//         return data
//     } catch (error) {
//         if (error) {
//             return error.message
//         }
//     }
// }

const fetchToken = async (cid, emailid, clientName) => {
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


    TokenObject = data
    return data
}
//fetchToken("ju16a6m81mhid5ue1z3v2g0uh", "wasimbari162@gmail.com","wasim")

const fetchAllPosts = async (pageNo) => {
  //  console.log("fetchAllPosts")
    //let token = 'smslt_8bf7dfcfce7_0cd2b89685f3'
    let api;
  //  console.log(JSON.parse(JSON.stringify(TokenObject)))
    try {
        // TokenObject = await fetchToken("ju16a6m81mhid5ue1z3v2g0uh", "wasimbari162@gmail.com", "wasim")
        TokenObject = await fetchToken(sl_token, email,name)
       // console.log(JSON.parse(JSON.stringify(TokenObject)))
        //console.log("TokenObject[sl_token] " + TokenObject["sl_token"])
        api = 'https://api.supermetrics.com/assignment/posts?sl_token=' + TokenObject["sl_token"] + '&page=' + pageNo
       // console.log(api)
        const response = await fetch(api)
        const { data } = await response.json()
        return data
    } catch (error) {
        if (error) {
            return error.message
        }
    } 
   
}

//fetchAllPosts(2).then(function (results) {}).catch((err) => { console.error(err) });

// const fetchToken= async (cid,emailid,clientName): Promise<typeof MonthlhyLongestPost> => {
//     var propertiesObject = { client_id: cid, email: emailid, name: clientName };
//     const response = await fetch("https://api.supermetrics.com/assignment/register", {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(propertiesObject)
//     })
//     const { data } = await response.json()


//     return data
// }

const LongestPostPerMonth = async () => { //Working. Longest post by character length per month. Take this

    console.log("Longest post by character length per month ")
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
//LongestPostPerMonth().then(function (results) {}).catch((err) => { console.error(err) });
//LPPM().then(function (results) {}).catch((err) => { console.error(err) });

const TotalPostsPerWeek = async () => { ////Working. Total posts split by week number. Take this
    console.log("Total posts split by week number")
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
            if (curWeek in totalPostsPerWeek) {
                totalPostsPerWeek[curWeek]  = totalPostsPerWeek[curWeek] + 1  
            } else {
                totalPostsPerWeek[curWeek] = 1
            }
        });//arr for each
            
    }//i loop
    console.log(JSON.parse(JSON.stringify(totalPostsPerWeek)))
    return JSON.parse(JSON.stringify(totalPostsPerWeek)) 
    
}
//TotalPostsPerWeek().then(function (results) {}).catch((err) => { console.error(err) });
 
const AvgPostPerUserPerWeek = async () => {////Working.Average number of posts per user per month. Take this
    console.log("Average number of posts per user per month")
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
//AvgPostPerUserPerWeek().then(function (results) { }).catch((err) => { console.error(err) });
//APPUPW().then(function (results) { }).catch((err) => { console.error(err) });

const AvgPostLenPerMonth = async () => { //Working . Average character length of posts per month. Take this
    console.log("Average character length of posts per month")
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
//AvgPostLenPerMonth().then(function (results) {}).catch((err) => { console.error(err) });


function FetchCurrentWeekNumber(curDate) {

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

function executeFunctionality() {
    var params = process.argv.slice(4)
    console.log(params)
    sl_token = params[0]
    email = params[1]
    name = params[2]
    var option = params[3]

    console.log(sl_token, email, name, option)
    
    //Valid 'option' values :
    //LongestPostPerMonth   option 1
    //TotalPostsPerWeek     option 2
    //AvgPostPerUserPerWeek option 3
    //AvgPostLenPerMonth    option 4

    switch(Number(option)) { 
        case 1: { 
           
           LongestPostPerMonth();
           break; 
        } 
        case 2: {
            TotalPostsPerWeek();
         
            
           break; 
        }
        case 3: { 
           
            AvgPostPerUserPerWeek();
            break; 
        }
        case 4: { 
           
            AvgPostLenPerMonth();
            break; 
         }   
        default: { 
            console.error("Enter proper opotions. Please view the valid options mentioned above in comments or refer below statements.")
            console.log("LongestPostPerMonth   option 1")
            console.log("TotalPostsPerWeek     option 2")
            console.log("AvgPostPerUserPerWeek option 3")
            console.log("AvgPostLenPerMonth    option 4")
           break; 
        } 
     } 
}
executeFunctionality()