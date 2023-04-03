const qrcode=require('qrcode');
qrcode.toFile('/Users/karthikreddyvoddula/Documents/ATBCS/backend/mailbody/test.png', '123fjaebfia85y934q0545y93840r5y934bjksbfksjfsksjfeifbw;ifdgdfgfdgfdgdgdfgdgdgdgdggdfgfbweiulfbweilfwbuilfwbfrilawfricjmhvb,jugbi,ukgjk,jmbj,bjbhbhb nkb bjlaw4', {
    errorCorrectionLevel: 'H'
  }, function(err) {
    if (err) throw err;
    console.log('QR code saved!');
  });

