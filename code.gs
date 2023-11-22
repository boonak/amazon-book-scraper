function scraper(isbnNumber) {
  var apiKey = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting").getRange("B1").getValue()
  var isbn = isbnNumber
  var url = "http://api.scraperapi.com?api_key=" + apiKey + "&url=https://www.amazon.com/s?k=" + isbn

  var getContent = UrlFetchApp.fetch(url).getContentText()

  const regex = /data-component-type="s-product-image".*?href="(.*?)"/

  const match = getContent.match(regex);

  const hrefLink = match ? match[1] : null
  // console.log(hrefLink)
  return hrefLink
}



function getDetail(source){
  var apiKey = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting").getRange("B1").getValue()
  var sourceUrl = source
  var url = "http://api.scraperapi.com?api_key=" + apiKey + "&url=https://www.amazon.com/" + sourceUrl
  var getContent = UrlFetchApp.fetch(url).getContentText()
  var result = {}
  result.title = ""
  result.price = 0.0
  const regex = /<span>Paperback<\/span>\s*<br\/>\s*<span class="a-color-secondary">\s*<span class="a-size-base a-color-secondary">\s*(.*?)\s*<\/span>/
  const regexTitle = /<span id="productTitle"[^>]*>\s*([^<]*)\s*<\/span>/
  const matchTitle = getContent.match(regexTitle)
  var title = matchTitle ? matchTitle[1] : null
  title = title.trim()
  const match = getContent.match(regex);

  var price = match ? match[1] : null
  if(price == null){
    const regex = /<span class="a-price[^>]*>\s*<span class="a-offscreen">(\$[\d.,]+)<\/span><span aria-hidden="true">(\$[\d.,]+)<\/span><\/span>/;
    const match = getContent.match(regex);
    price = match ? match[1] : null
  }
  result.title = title
  result.price = price

  return result
}

function main(){
  var email = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting").getRange("B2").getValue()
  var emailSubject = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting").getRange("B3").getValue()
  var emailBody = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Setting").getRange("B4").getValue()
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input")
  var lastRow = sheet.getLastRow()
  var isbnNumbers = sheet.getRange("A2:A" + lastRow).getValues()

  // Remove the "ResultSheet" if it exists
  var resultSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ResultSheet")
  if (resultSheet != null) {
    SpreadsheetApp.getActiveSpreadsheet().deleteSheet(resultSheet)
  }

  // Create a new sheet for results
  resultSheet = createResultSheet()

  for (var i = 0; i < isbnNumbers.length; i++) {
    var isbnNo = isbnNumbers[i][0]
    var hreflink = scraper(isbnNo)
    var bookDetail = getDetail(hreflink)
    console.log("ISBN: " + isbnNo + ",Title: " + bookDetail.title + ", Paperback Price: " + bookDetail.price)

    resultSheet.appendRow([isbnNo, bookDetail.title, bookDetail.price])
  }

  sendEmailWithAttachment(email, emailSubject, emailBody)
}

function createResultSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var resultSheetName = "ResultSheet"

  // Check if the result sheet already exists
  var resultSheet = spreadsheet.getSheetByName(resultSheetName)
  if (resultSheet != null) {
    resultSheet.clear()
  } else {
    resultSheet = spreadsheet.insertSheet(resultSheetName)
    resultSheet.appendRow(["ISBN", "Title", "Price"])
  }

  return resultSheet
}

function sendEmailWithAttachment(recipient, subjects, bodies) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getActiveSheet()

  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var ssID = ss.getId()
  var sheetgId = ss.getActiveSheet().getSheetId()
  var sheetName = ss.getName()

  var token = ScriptApp.getOAuthToken()
  console.log("token: "+token)
  var email = recipient
  var subject = subjects
  var body = bodies

  var url = "https://docs.google.com/spreadsheets/d/"+ssID+"/export?" + "format=xlsx" + "&gid="+sheetgId+ "&portrait=false" + "&exportFormat=xlsx"
  console.log("url:" + url)
  var result = UrlFetchApp.fetch(url, {
  headers: {
  'Authorization': 'Bearer ' + token
  }
  })

  var contents = result.getContent()

  MailApp.sendEmail(email,subject ,body, {attachments:[{fileName:sheetName+".xlsx", content:contents, mimeType:"application//xlsx"}]})

}
