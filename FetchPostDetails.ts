"use strict";
import { format } from "prettier";
import { createNoSubstitutionTemplateLiteral } from "typescript";

const request = require('request');
const fetch = require("node-fetch");

var TokenObject = {}

var sl_token;
var email;
var name;


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
    let api;
    try {
        TokenObject = await fetchToken(sl_token, email,name)
        api = 'https://api.supermetrics.com/assignment/posts?sl_token=' + TokenObject["sl_token"] + '&page=' + pageNo
        const response = await fetch(api)
        const { data } = await response.json()
        return data
    } catch (error) {
        if (error) {
            return error.message
        }
    } 
}


const LongestPostPerMonth = async (maxPagesToRead) => { //Working. Longest post by character length per month. Take this

    console.log("Longest post by character length per month ")
    var obj;
    var countByMonth = {}
   var postPerMonth = {}
    var results;

     /*
    Looping through all the posts from page 1 till page number specified in maxPagesToRead. According to doc the records are split
    across pages and each page contains 100 posts.
    */
   for (var i = 1; i <= maxPagesToRead; i++) {
  
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
    return JSON.parse(JSON.stringify(postPerMonth))
   

}
//LongestPostPerMonth().then(function (results) {}).catch((err) => { console.error(err) });
//LPPM().then(function (results) {}).catch((err) => { console.error(err) });

const TotalPostsPerWeek = async (maxPagesToRead) => { ////Working. Total posts split by week number. Take this
    console.log("Total posts split by week number")
    var obj;
    var totalPostsPerWeek = {}
    var curWeek = 0
    var results;
    
    /*
    Looping through all the posts from page 1 till page number specified in maxPagesToRead. According to doc the records are split
    across pages and each page contains 100 posts.
    */
    for (var i = 1; i <= maxPagesToRead; i++) {
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
 
const AvgPostPerUserPerWeek = async (maxPagesToRead) => {////Working.Average number of posts per user per month. Take this
    console.log("Average number of posts per user per month")
    var postPerMonth = {}
    var postsPerUserPerMonth = {}
    let postsPerPage;

    /*
    Looping through all the posts from page 1 till page number specified in maxPagesToRead. According to doc the records are split
    across pages and each page contains 100 posts.
    */
    for (var i = 1; i <= maxPagesToRead; i++) {
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


const AvgPostLenPerMonth = async (maxPagesToRead) => { //Working . Average character length of posts per month. Take this
    console.log("Average character length of posts per month")
    var countByMonth = {}

    /*
    Looping through all the posts from page 1 till page number specified in maxPagesToRead. According to doc the records are split
    across pages and each page contains 100 posts.
    */
    for (var i = 1; i <= maxPagesToRead; i++) {
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
}

function executeFunctionality() {
    var params = process.argv.slice(4)
    console.log(params)
    sl_token = params[0]
    email = params[1]
    name = params[2]
    var option = params[3]
    var maxPagesToRead = params[4]

    console.log(sl_token, email, name, option)
    
    //Valid 'option' values :
    //LongestPostPerMonth   option 1
    //TotalPostsPerWeek     option 2
    //AvgPostPerUserPerWeek option 3
    //AvgPostLenPerMonth    option 4

    switch(Number(option)) { 
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