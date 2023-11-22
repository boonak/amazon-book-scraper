# amazon-book-scraper
## Amazon Book Information Scraper

### Overview

This Google Script project allows you to retrieve book information from Amazon based on a list of ISBN numbers provided by the user. The retrieved information, including book title and paperback price, is then compiled into an Excel spreadsheet (.xlsx) and emailed to the specified recipient.

### Setup

Follow the steps below to set up and run the project:

1. Open the [Google Sheet]([link_to_google_sheet](https://docs.google.com/spreadsheets/d/1x8sRpYZc_3yk3ESTwIc8ttl-R30BqB-J7jgCgzlcv8I/edit?usp=sharing)) associated with this project and make a copy.
2. Go to Extensions > Apps Script
3. Copy the code in Code.gs and paste, then click save
4. Go back to Google Sheet and navigate to the "Setting" sheet and provide the following information:
   - **API Key:** Obtain an API key from [ScraperApi](https://scraperapi.com) and enter it here.
   - **Recipient Email:** Enter the email address where you want to receive the book information.
   - **Email Subject:** Specify the subject of the email.
   - **Email Body:** Customize the email body as needed.
5. Switch to the "Input" sheet and enter the list of ISBN numbers in column A, starting from row 2.
6. Right click at the "Run" button and click the button on the upper right corner and choose "Assign Script"
7. Type "main" and click Ok
8. Click the "Run" button to execute the script.
9. Once the execution is complete, check the specified email address for the sent email with the attached book details spreadsheet.

### Code Execution Flow

1. The project relies on [ScraperApi](https://scraperapi.com) as a proxy provider to bypass Amazon's anti-bot measures.
2. The script generates the product URL page for each ISBN using the following template: `https://www.amazon.com/s?k={isbn}`
3. It then visits the product page to extract the book title and paperback price using regular expressions.
4. The obtained information is compiled into an Excel spreadsheet.
5. The script utilizes `MailApp` to send an email with the attached spreadsheet to the specified recipient.

### Note

Amazon has measures in place to prevent web scraping, and the use of a proxy provider is necessary for the script to function correctly. Ensure that you have a valid ScraperApi API key and that it is correctly entered in the "Setting" sheet.

### Dependencies

- **ScraperApi:** Sign up and obtain an API key from [scraperapi.com](https://scraperapi.com).
- **Google Sheets:** The project is designed to run within Google Sheets.
- **MailApp:** Used for sending emails from the Google Script.

### Screenshots
<img width="679" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/2d01b39e-acb7-4cfb-97ed-2be7c9d39f48">
<img width="720" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/327c09a7-ebaf-42da-80e9-6beab971dc46">
<img width="575" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/94d65d29-99be-4ffa-912e-06a8f2f79179">
<img width="593" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/f062ed49-9c81-4004-83b4-0fcf97b77023">
<img width="408" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/2a014ae7-1a21-47dc-a5c2-b30b4b6328a4">
<img width="346" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/0cd23e8e-71f7-4fb0-9391-3dddc3fb6fd2">
<img width="562" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/9335aa6c-4b98-4c7d-91a6-1595f9fc318c">
<img width="559" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/30823f54-e258-42d0-8211-a48f67837579">
<img width="590" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/e50927cd-b6fa-4698-ac78-4145346402bd">
<img width="547" alt="image" src="https://github.com/boonak/amazon-book-scraper/assets/33080981/eeed9e4a-fd29-4318-83c4-53e2f3c5fe7d">



### Disclaimer

This script is intended for educational purposes and personal use only. Ensure compliance with Amazon's terms of service and ScraperApi's usage policies. Use responsibly and avoid violating any terms or agreements.
