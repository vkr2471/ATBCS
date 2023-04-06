let webdriver =require('selenium-webdriver')
let chrome =require('selenium-webdriver/chrome')


const verify= async(req,res,next)=>
{


   try
   {


    let options = new chrome.Options();
    options.addArguments("use-fake-ui-for-media-stream");

     options.addArguments("use-fake-device-for-media-stream"); 
     options.addArguments("use-file-for-fake-video-capture=/Users/karthikreddyvoddula/Documents/ATBCS/backend/tempimage/img.png");
    
    let driver = new    webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();

    await driver.get('https://verify.cowin.gov.in/');
    source =await driver.getPageSource();
    await driver.findElement({className:'green-btn'}).click()
    await driver.sleep(10000)
    let name =await driver.findElement({className:'value-col'}).getText();
    //console.log(req);
    if("voddula jagadeeswara reddy"===name)
        {   
            console.log("verified")
}
    else 
        {
           console.log("not verified")
        }

    }catch(error)
    {
        console.log(error)
        return console.log('not verified')
    }
    console.log(name)
   // console.log(source)
   driver.quit();
   next();



}
verify()
module.exports={verify}