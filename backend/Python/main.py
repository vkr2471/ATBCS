# update
import email.mime.text as msg
import os
import shutil
import smtplib
from secrets import token_hex
from time import sleep
import locale
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.by import By
import babel.numbers

# session=smtplib.SMTP('smtp-mail.outlook.com',587)
# print(token_hex(64))
client = MongoClient(
    "mongodb+srv://Mokshith:mok123@node.oj4ykhp.mongodb.net/ATBCS?retryWrites=true&w=majority")
user = client.ATBCS.users
schedule=client.ATBCS.schedules
print("a")

while (1):
    dir_path = os.getcwd()+'/../images'
    # print(os.listdir(dir_path))
    # print(dir_path)
    # exit()
    files = os.listdir(dir_path)
    for file in files:
        try:

            user1 = user.find_one({"email": file})
            # print(user1)
           # print(user1["name"])
            # print(user1["pl"])
            if (user1):

                if (user1["data"]):
                    customer = {
                        "pass": user1["data"]["adult"]
                    }
            images = os.listdir(dir_path+'/'+file)
            nimages = len(images)
            i = 0
            p = []
            for image in images:

                if os.path.exists(os.getcwd() + "/../tempimage/img.png"):
                    print("hello")
                    os.remove(os.getcwd() + "/../tempimage/img.png")
                    sleep(2)
                os.rename(dir_path+'/'+file+'/'+image,
                          os.getcwd() + "/../tempimage/img.png")
                options = webdriver.ChromeOptions()
                options.add_argument("use-fake-ui-for-media-stream")
                # your driver goes here
                driver = webdriver.Chrome(
                    "/Users/karthikreddyvoddula/Downloads/chromedriver_mac_arm64/chromedriver", options=options)
                driver.get('https://verify.cowin.gov.in')
                driver.find_element(By.CLASS_NAME, "green-btn").click()
                sleep(10)
                name = driver.find_element(By.CLASS_NAME, "value-col").text
                flag1 = 0
                for j in range(0, len(customer["pass"])):
                    if customer["pass"][j]["name"] == name:
                        flag = 0
                        for k in p:
                            if j == k:
                                flag = 1
                                break
                        if flag == 0:
                            flag1 = 1
                            p.append(j)
                            break
                if flag1 == 0:
                    # mail invalid
                    print(name)
                    driver.quit()
                    session = smtplib.SMTP(
                        'smtp.gmail.com', 587, timeout=435435)
                    session.starttls()
                    session.login("vkr2471@gmail.com", "kfzmfhusygxiokhb")
                    message = msg.MIMEText(
                        '<p>sorry! we coudnt verify your certificates..make sure the qr is visable in the screenshot and try again! we regret your inconvinience </p>', 'html')
                    message["Subject"] = "Invalid Certificate/Certificates"
                    message["From"] = "Cloud9 Airlines <vkr2471@gmail.com>"
                    session.sendmail("vkr2471@gmail.com",
                                     user1["email"], message.as_string())
                    print("invvalid")
                    shutil.rmtree(dir_path + '/' + file)
                    session.quit()
                    break
                else:
                    i = i+1
                    if i == nimages:
                        driver.quit()
                        user1["pl"] = token_hex(64)
                        user1["sl"] = token_hex(64)
                        user.update_one({"email": file}, {
                                        "$set": {"pl": user1["pl"], "sl": user1["sl"]}})
                        if user1["data"]["details"]["option"]=="one-way":
                            session = smtplib.SMTP(
                                'smtp.gmail.com', 587, timeout=435435)
                            session.starttls()
                            session.login("vkr2471@gmail.com", "kfzmfhusygxiokhb")
                            day=schedule.find_one({"date":user1["data"]["details"]["date"]})
                            flights1=day["flights"]
                            #flight={"name":"karthik"}
                            print(user1["data"]["flightId"])

                            for flights in flights1:
                                print(flights["_id"])
                                if str(flights["_id"])==user1["data"]["flightId"]:
                                    print("hello")
                                    flight=flights

                            adult_cost=flight["ticketfare"][user1["data"]["details"]["class"]]
                            TAC=adult_cost*(user1["data"]["details"]["adults"])
                            TCC=adult_cost*(user1["data"]["details"]["children"])
                            TIC=0.5*adult_cost*(user1["data"]["details"]["infants"])
                            discount=user1["data"]["discount"]

                            message = msg.MIMEText(




                                f'<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Billing Details</title></head><body>  <h1>Billing Details</h1 <div style="margin-left: 30px;">  <p>To: {user1["name"]}</p><p> Billing details are as shown.</p> <div style="margin-left: 20px;">   <p>Number Of Adults:&nbsp; {user1["data"]["details"]["adults"]}&emsp;&emsp;&ensp;Ticket price for Adult: {babel.numbers.format_currency(adult_cost,"INR",locale="en_IN")}&emsp;&emsp;&nbsp; Total price: {babel.numbers.format_currency(TAC,"INR",locale="en_IN")}</p></div><div style="margin-left: 20px;"> <p>Number Of Children: {user1["data"]["details"]["children"]}&emsp;&emsp;Ticket price for Child: {babel.numbers.format_currency(adult_cost,"INR",locale="en_IN")}&emsp;&emsp;&nbsp;Total price: {babel.numbers.format_currency(TCC,"INR",locale="en_IN")}</p></div>  <div style="margin-left: 20px;"><p>Number Of Infants:&nbsp; {user1["data"]["details"]["infants"]}&emsp;&emsp;&ensp;Ticket price for Infant: {babel.numbers.format_currency(0.5*adult_cost,"INR",locale="en_IN")}&emsp;&emsp;&nbsp; Total price: {babel.numbers.format_currency(TIC,"INR",locale="en_IN")}</p></div><p>Total Price: {babel.numbers.format_currency(TIC+TAC+TCC,"INR",locale="en_IN")}</p><p>Discount: {babel.numbers.format_currency(discount,"INR",locale="en_IN")}</p><p>Final Price(including taxes): {babel.numbers.format_currency(TIC+TAC+TCC-discount,"INR",locale="en_IN")}</p></div><p>Click <a href="http://localhost:5002/payment/{user1["pl"]}/1">here</a> to complete you payment </p></body></html>', 'html')
                            message["Subject"] = "Complete Your Payment"
                            message["From"] = "Cloud9 Airlines <vkr2471@gmail.com>"
                            # print(user1["email"])
                            session.sendmail("vkr2471@gmail.com",
                                             user1["email"], message.as_string())
                            shutil.rmtree(dir_path + '/' + file)
                            print("valid")
                            session.quit()
                            break
                        else:
                            print("hello")
                            session = smtplib.SMTP(
                                'smtp.gmail.com', 587, timeout=435435)
                            session.starttls()
                            session.login("vkr2471@gmail.com", "kfzmfhusygxiokhb")
                            day = schedule.find_one({"date": user1["data"]["details"]["date"]})
                            flights1 = day["flights"]
                            day1 = schedule.find_one({"date": user1["data"]["details"]["returndate"]})
                            flights2 = day1["flights"]
                            # flight={"name":"karthik"}
                            #print(user1["data"]["flightId"])

                            for flights in flights1:
                                #print(flights["_id"])
                                if str(flights["_id"]) == user1["data"]["flightId"]:
                                   # print("hello")
                                    flight = flights

                            for flights in flights2:
                                if str(flights["_id"]) == user1["data"]["flightId1"]:
                                    # print("hello")
                                    flight1 = flights


                            adult_cost = flight["ticketfare"][user1["data"]["details"]["class"]]
                            TAC = adult_cost * (user1["data"]["details"]["adults"])
                            TCC = adult_cost * (user1["data"]["details"]["children"])
                            TIC = 0.5 * adult_cost * (user1["data"]["details"]["infants"])
                            discount = user1["data"]["discount"]

                            adult_cost1 = flight1["ticketfare"][user1["data"]["details"]["class"]]
                            TAC1 = adult_cost1 * (user1["data"]["details"]["adults"])
                            TCC1 = adult_cost1 * (user1["data"]["details"]["children"])
                            TIC1 = 0.5 * adult_cost1 * (user1["data"]["details"]["infants"])
                            #discount1 = user1["data"]["discount"]

                            message = msg.MIMEText(

                                f'<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Billing Details</title></head><body><h1>Billing Details</h1> <div style="margin-left: 30px;"> <p>To: {user1["name"]}</p><p>Billing details are as shown.</p><div><h3>Outbound Flight</h3> <div style="margin-left: 20px;"><p>Number Of Adults:&nbsp;{user1["data"]["details"]["adults"]}&emsp;&emsp;&ensp;Ticket price for Adult: {babel.numbers.format_currency(adult_cost,"INR",locale="en_IN")}&emsp;&emsp;&nbsp; Total price: {babel.numbers.format_currency(TAC,"INR",locale="en_IN")}</p> </div><div style="margin-left: 20px;"><p>Number Of Children:{user1["data"]["details"]["children"]}&emsp;&emsp;Ticket price for Child: {babel.numbers.format_currency(adult_cost,"INR",locale="en_IN")}&emsp;&emsp;Total price: {babel.numbers.format_currency(TCC,"INR",locale="en_IN")}</p></div><div style="margin-left: 20px;"><p>Number Of Infants:&nbsp; {user1["data"]["details"]["infants"]}&emsp;&emsp;&ensp;Ticket price for Infant: {babel.numbers.format_currency(0.5*adult_cost,"INR",locale="en_IN")}&emsp;&emsp;&nbsp;Total price: {babel.numbers.format_currency(TIC,"INR",locale="en_IN")}</p></div> </div><div><h3>Return Flight</h3><div style="margin-left: 20px;"><p>Number Of Adults:&nbsp; {user1["data"]["details"]["adults"]}&emsp;&emsp;&ensp;Ticket price for Adult: {babel.numbers.format_currency(adult_cost1,"INR",locale="en_IN")}&emsp;&emsp;Total price: {babel.numbers.format_currency(TAC1,"INR",locale="en_IN")}</p></div><div style="margin-left: 20px;"><p>Number Of Children: {user1["data"]["details"]["children"]}&emsp;&emsp;Ticket price for Child: {babel.numbers.format_currency(adult_cost1,"INR",locale="en_IN")}&emsp;&emsp;Total price: {babel.numbers.format_currency(TCC1,"INR",locale="en_IN")}</p></div><div style="margin-left: 20px;"><p>Number Of Infants:&nbsp; {user1["data"]["details"]["infants"]}&emsp;&emsp;&ensp;Ticket price for Infant: {babel.numbers.format_currency(0.5*adult_cost,"INR",locale="en_IN")}&emsp;&emsp;&nbsp;Total price: {babel.numbers.format_currency(TIC1,"INR",locale="en_IN")}</p></div><p>Total Price: {babel.numbers.format_currency(TAC+TAC1+TCC+TCC1+TIC+TIC1,"INR",locale="en_IN")}</p><p>Discount: {babel.numbers.format_currency(discount,"INR",locale="en_IN")}</p><p>Final Price(including taxes): {babel.numbers.format_currency(TAC+TAC1+TCC+TCC1+TIC+TIC1-discount,"INR",locale="en_IN")}</p></div><p>Click <a href="http://localhost:5002/payment/{user1["pl"]}/1">here</a> to complete you payment </p></body></html>',
                                'html')
                            message["Subject"] = "Complete Your Payment"
                            message["From"] = "Cloud9 Airlines <vkr2471@gmail.com>"
                            # print(user1["email"])
                            session.sendmail("vkr2471@gmail.com",
                                             user1["email"], message.as_string())
                            shutil.rmtree(dir_path + '/' + file)
                            print("valid")
                            session.quit()
                            break

        except:
            try:
                driver.quit()
            except:

                print("no user")
            session = smtplib.SMTP('smtp.gmail.com', 587, timeout=435435)
            session.starttls()
            session.login("vkr2471@gmail.com", "kfzmfhusygxiokhb")
            message = msg.MIMEText(
                '<p>sorry! we coudnt verify your certificates..make sure the qr is visable in the screenshot and try again! we regret your inconvinience </p>',
                'html')
            message["Subject"] = "Invalid Certificate/Certificates"
            message["From"] = "Cloud9 Airlines <vkr2471@gmail.com>"
            session.sendmail("vkr2471@gmail.com",
                             user1["email"], message.as_string())
            session.quit()
            print("invalid")
            shutil.rmtree(dir_path + '/' + file)
            break
    sleep(1)


# sleep(20)
