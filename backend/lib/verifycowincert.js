let webdriver =require('selenium-webdriver')
let chrome =require('selenium-webdriver/chrome')


const verify= async(req,res,next)=>
{


   try
   {

    let options = new chrome.Options();
    options.addArguments("use-fake-ui-for-media-stream");
    
    let driver = new    webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();

    await driver.get('https://verify.cowin.gov.in/');
    source =await driver.getPageSource();
    await driver.findElement({className:'green-btn'}).click()
    await driver.sleep(10000)
    let name =await driver.findElement({className:'value-col'}).getText();
    //console.log(req);
    if(req.user.name===name)
        {   
            return res.send('verified')
}
    else 
        {
           return  res.send('not verified')
        }

    }catch(error)
    {
        return res.send('not verified')
    }
    console.log(name)
   // console.log(source)
   driver.quit();
   next();



}
module.exports={verify}