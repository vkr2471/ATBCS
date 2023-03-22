// Requiring the module
const reader = require('xlsx')
const airpo = require('./schemas/airports.js')
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Mokshith:mok123@node.oj4ykhp.mongodb.net/ATBCS?retryWrites=true&w=majority")

// Reading our test file
const file = reader.readFile("C:\\Users\\venka\\Downloads\\Schedules_Domestic.xlsx")
const file1 = reader.readFile("C:\\Users\\venka\\Downloads\\airport-codes.xls")

let data = []
let data1 = []
const sheets = file.SheetNames

for(let i = 0; i < sheets.length-1; i++)
{
const temp = reader.utils.sheet_to_json(
		file.Sheets[file.SheetNames[i]])
const temp1 = reader.utils.sheet_to_json(file1.Sheets[file1.SheetNames[0]])
temp.forEach((res) => {
	data.push(res)
})
temp1.forEach((res) => {
    data1.push(res)})
}
//console.log(data);
let names = new Set(data.map((item) => item['__EMPTY_2']))
let names1 = new Set(data.map((item) => item['SPICEJET FLIGHTS SCHEDULE']))
let names2 = new Set(data1.map((item) => {
    if(item['Country name']=='India')
    {
        return [item['Airport Name'],item['Airport Code']]
    }
}))
names2.delete(undefined)
names2 = [...names2]
console.log(names2);
names1.delete('Direct & Via Flights')
names1.delete('All timings are shown in Local timings')
names1.delete('Schedule subject to change and regulatory authority approvals')
names1.delete('ORIGIN')
names.delete(undefined)
names.delete('FLIGHT NO')
names = [...names]
names1 = [...names1]
// Printing data
names = names.map((item) => item.replace("SG","KB").replace("  ","").replace(" ",""))
console.log(names)
console.log(names1)
let final = []
names1.map((item) => {
    if(item == "GOA (DABOLIM)" ){
        code = "GOD"
    }
    else if(item == "JAISALMER"){
        code = "JSA"
    }
    else if(item == "KANPUR"){
        code = "KNU"
    }
    else if(item == "SHIRDI"){
        code = "SAG"
    }
    else {
        code = item.slice(0,3)
    }
    final.push({"name":item,"code":code})
})
console.log(final);
console.log(final.length);
console.log(names1.length);
const air = async () =>{
    data = await airpo.findOne({"name":"GOA (DABOLIM)"})
    console.log(data);
}
air()
