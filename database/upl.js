// Requiring the module
const reader = require('xlsx')
const flight = require('./schemas/flights.js')
const schedule = require('./schemas/schedule.js')
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Mokshith:mok123@node.oj4ykhp.mongodb.net/ATBCS?retryWrites=true&w=majority")

// Reading our test file
const file = reader.readFile("C:\\Users\\venka\\Downloads\\Schedules_Domestic.xlsx")
const file1 = reader.readFile("C:\\Users\\venka\\Downloads\\airport-codes.xls")

let data = []
let data1 = {}
const sheets = file.SheetNames
const months = {'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'}
const years = {'23':'2023','24':'2024'}
for(let i = 0; i < sheets.length-1; i++)
{
const temp = reader.utils.sheet_to_json(
		file.Sheets[file.SheetNames[i]])
const temp1 = reader.utils.sheet_to_json(file1.Sheets[file1.SheetNames[0]])
temp.forEach((res) => {
	data.push(res)
})
}
var year = '2013';
var month = '04';
var day = '18';
//console.log(data);
data.forEach(async (res) => {
    const a = res['DEPARTURE'].split(' ')
    const b = res['ARRIVAL'].split(' ')
    var hour1 = parseInt(a[0].split(':')[0])
    var hour2 = parseInt(b[0].split(':')[0])
    var min1 = parseInt(a[0].split(':')[1])
    var min2 = parseInt(b[0].split(':')[1])
    if(a[1] == 'PM' && hour1 != 12) hour1 += 12
    if(b[1] == 'PM' && hour2 != 12) hour2 += 12
    if(a[1] == 'AM' && hour1 == 12) hour1 = 0
    if(b[1] == 'AM' && hour2 == 12) hour2 = 0
    const time1 = new Date(year, month, day, hour1, min1)
    const time2 = new Date(year, month, day, hour2, min2)
    var z = time2.getTime()-time1.getTime()
    if(z < 0) z += 86400000
    z = z/3600000;
    //console.log(time1.getDate());
    var meow = await flight.findOne({name: (res['FLIGHT NO'].replace(" ","").replace(" ","0").replace("SG","KB"))})
    var s = res['EFFECTIVE FROM'].split(' ')
    var s1 = res['EFFECTIVE TILL'].split(' ')
    var start = new Date(years[s[2]], months[s[1]], s[0])
    var end = new Date(years[s1[2]], months[s1[1]], s1[0])
    var now = new Date(start)
    var cost = Math.floor(((Math.random()*300)+1300));
    if(1<=z && z<2.5) cost = Math.floor(z*((Math.random()*300)+1300))
    else if(2.5<=z && z<5) cost = Math.floor(z*((Math.random()*300)+1600))
    else if(5<=z && z<7.5) cost = Math.floor(z*((Math.random()*300)+1900))
    const flight1 = {"flightid":(res['FLIGHT NO'].replace(" ","").replace(" ","0").replace("SG","KB")),"source":res['ORIGIN'],"destination":res['DESTINATION'],"departure":res['DEPARTURE'],"arrival":res['ARRIVAL'],"totalseats":{"fc":meow.seats.fc,"bc":meow.seats.bc,"ec":meow.seats.ec},"seatsbooked":{"fc":0,"bc":0,"ec":0},"ticketfare":{"fc":cost*24,"bc":cost*8,"ec":cost}} 
    while(now<=end){
        var newdate = now.toISOString().split('T')[0];
        //console.log(newdate);
        if(data1[newdate] == undefined) data1[newdate] = [];
        data1[newdate].push(flight1);
        //console.log(data1[newdate]);
        var newdates = now.setDate(now.getDate()+1);
        now = new Date(newdates);
    }
    //console.log((time2.getTime()-time1.getTime())/3600000);
})
var q = 0;
setTimeout(() => {
    var a = Object.keys(data1);
    a.forEach((res) => {
        q = q+1
    }
    )
     console.log(q);
}, 10000)
