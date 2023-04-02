from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from pymongo import MongoClient
from secrets import  token_hex

import smtplib
import email.mime.text as msg
import shutil

#session=smtplib.SMTP('smtp-mail.outlook.com',587)
session =smtplib.SMTP('smtp.gmail.com',587)
session.starttls()
session.login("vkr2471@gmail.com","zlstktcnyzacsijb")

#print(token_hex(64))

client=MongoClient("mongodb+srv://Mokshith:mok123@node.oj4ykhp.mongodb.net/ATBCS?retryWrites=true&w=majority")
user =client.ATBCS.users


#print(a)
import os




while(1):

    dir_path = os.getcwd()+'/../images'
    #print(os.listdir(dir_path))
    #print(dir_path)
    #exit()
    files = os.listdir(dir_path)

    for file in files:





        user1=user.find_one({"email":file})
        #print(user1)


       # print(user1["name"])

        #print(user1["pl"])








        if(user1["data"]):

            customer={
               "pass": user1["data"]["adult"]
            }



        images=os.listdir(dir_path+'/'+file);
        nimages =len(images)
        i = 0
        p = []

        for image in images :










            os.rename(dir_path+'/'+file+'/'+image,"/Users/karthikreddyvoddula/Desktop/ATBCS/backend/tempimage/img.png")








            options =webdriver.ChromeOptions()
            options.add_argument( "use-fake-ui-for-media-stream")

            driver =webdriver.Chrome('/Users/karthikreddyvoddula/Downloads/chromedriver_mac_arm64/chromedriver',options=options)
            driver.get('https://verify.cowin.gov.in')
            driver.find_element(By.CLASS_NAME,"green-btn").click()
            sleep(15)

            name =driver.find_element(By.CLASS_NAME,"value-col").text
            flag1=0
            for j in range(0,len(customer["pass"])):
                if customer["pass"][j]["name"] ==name :
                    flag=0;
                    for k in p:
                        if j==k:
                            flag=1
                            break
                    if flag==0:
                        flag1=1
                        p.append(j)
                        break

            if flag1==0:
                #mail invalid
                 driver.quit()

                 message=msg.MIMEText('<p>sorry! we coudnt verify your certificates..make sure the qr is visable in the screenshot and try again! we regret your inconvinience </p>','html')
                 message["Subject"] = "Invalid Certificate/Certificates"
                 message["From"] = "Cloud9 Airlines <vkr2471@gmail.com>"
                 session.sendmail("vkr2471@gmail.com", user1["email"], message.as_string())
                 #shutil.rmtree(dir_path + '/' + file)
                 break

                 print("invvalid")


            else :
                i=i+1
                if i==nimages:
                    driver.quit()
                    user1["pl"]=token_hex(64)
                    user1["sl"]=token_hex(64)
                    user.update_one({"email":file},{"$set":{"pl":user1["pl"],"sl":user1["sl"]}})

                    message=msg.MIMEText(f'<p>Click <a href="http://localhost:5002/payment/{user1["pl"]}">here</a> to complete you payment </p>','html')
                    message["Subject"]  ="Complete Your Payment"
                    message["From"]="Cloud9 Airlines <vkr2471@gmail.com>"
                    #print(user1["email"])

                    session.sendmail("vkr2471@gmail.com",user1["email"],message.as_string())
                    #shutil.rmtree(dir_path + '/' + file)



                    print("valid")


            # driver.quit()
            # message = msg.MIMEText(
            #     '<p>sorry! we coudnt verify your certificates..make sure the qr is visable in the screenshot and try again! we regret your inconvinience </p>',
            #     'html')
            # message["Subject"] = "Invalid Certificate/Certificates"
            # message["From"] = "Cloud9 Airlines <vkr2471@gmail.com>"
            # session.sendmail("vkr2471@gmail.com", user1["email"], message.as_string())
            # print("invalid")
            # #shutil.rmtree(dir_path + '/' + file)
            # break








    sleep(3)








#sleep(20)
