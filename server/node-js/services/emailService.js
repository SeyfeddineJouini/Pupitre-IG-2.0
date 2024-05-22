const sgMail = require("@sendgrid/mail");

async function sendResetPasswordEmail(admin, token) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const resetURL = `${process.env.FRONT_URL}/reset-password/${token}`;

  const msg = {
    to: admin.email,
    from: "bilancarbonneinfo2@gmail.com",
    subject: "Réinitialisation du mot de passe",
    html: `Bonjour, <br> Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant: <a href="${resetURL}">Réinitialiser le mot de passe</a>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending reset password email", error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

async function sendQuizResultEmail(emailAdress, resultResponse, resultRequest) {
  //console.log('----- SEND EMAIL QUIZ RESULT ----');
  //console.log('------ TOKEN : ', process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let htmlResultItemsLi = '';
  resultResponse.result.forEach(item => {
    htmlResultItemsLi+= `<li>${item.label} : ${item.value} TCO2</li>`;
  })

  const msg = {
    to: emailAdress,
    from: "bilancarbonneinfo2@gmail.com",
    subject: "Résultat de bilan carbon",
    html: `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <title>
      </title>
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
    
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if mso]>
            <noscript>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            </noscript>
            <![endif]-->
      <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
    
          .mj-column-per-33-33333333333333 {
            width: 33.33333333333333% !important;
            max-width: 33.33333333333333%;
          }
        }
      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
    
        .moz-text-html .mj-column-per-33-33333333333333 {
          width: 33.33333333333333% !important;
          max-width: 33.33333333333333%;
        }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
    
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
      </style>
      <style type="text/css">
        a {
          color: white !important;
        }
      </style>
    </head>
    
    <body style="word-spacing:normal;background-color:#d7dde5;">
      <div style="background-color:#d7dde5;">
        <table align="center" background="http://191n.mj.am/img/191n/1t/h0.jpg" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:url(http://191n.mj.am/img/191n/1t/h0.jpg) center top / cover no-repeat;background-position:center top;background-repeat:no-repeat;background-size:cover;width:100%;">
          <tbody>
            <tr>
              <td>
                <!--[if mso | IE]><v:rect style="mso-width-percent:1000;" xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false"><v:fill origin="0, -0.5" position="0, -0.5" src="http://191n.mj.am/img/191n/1t/h0.jpg" type="frame" size="1,1" aspect="atleast" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                  <div style="line-height:0;font-size:0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;padding-top:45px;padding-bottom:10px;word-break:break-word;">
                                      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:center;color:#45474e;"><span style="font-size: 30px; line-height: 30px;">Bilan carbone</span><br /><br />Votre résultat du bilan cabone</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!--[if mso | IE]></td></tr></table></v:textbox></v:rect><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
          <tbody>
            <tr>
              <td>
                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:199.99999999999997px;" ><![endif]-->
                          <div class="mj-column-per-33-33333333333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width:50px;">
                                            <img alt="" height="auto" src="http://191n.mj.am/img/191n/1t/hs.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="50" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#9da3a3;"><span style="font-size: 14px; color: #e85034"> Taux d’émission <br /><br /><br />
                                    <b>${resultResponse?.result
                                      ?.map((item) => item.value)
                                      .reduce(
                                        (accumulator, currentValue) =>
                                          accumulator + currentValue,
                                        0
                                      )} TCO2</b>
                                  </span>
                                  <br /><br />
                                  <ul>
                                  ${htmlResultItemsLi}
                                  </ul>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:199.99999999999997px;" ><![endif]-->
                          <div class="mj-column-per-33-33333333333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width:50px;">
                                            <img alt="" height="auto" src="http://191n.mj.am/img/191n/1t/hm.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="50" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#9da3a3;"><span style="font-size: 14px; color: #e85034"> Taux d’émission du salaire <br /><br />
                                    <b>${resultResponse.budget?.toFixed(3).replace(".", ",")} TCO2</b>
                                    </span>
                                    <br /><br /> Avec un budget de <b>${resultRequest['budget']} euros</b> par an, votre émission est équivalente à
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#e85034;background-color:#e85034;width:100%;">
          <tbody>
            <tr>
              <td>
                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#e85034" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:10px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:18px;line-height:1;text-align:center;color:#ffffff;">Références</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-top:20px;padding-right:100px;padding-bottom:20px;padding-left:100px;word-break:break-word;">
                                    <p style="border-top:solid 1px #ffffff;font-size:1px;margin:0px auto;width:100%;">
                                    </p>
                                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #ffffff;font-size:1px;margin:0px auto;width:400px;" role="presentation" width="400px" ><tr><td style="height:0;line-height:0;"> &nbsp;
    </td></tr></table><![endif]-->
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a href="https://www.ghgsat.com/fr/medias/quelles-sont-les-principales-emissions-de-co2-par-source/" target="_blank" className="text-blue-600 hover:text-blue-800 transition duration-300"> Quelles sont les principales émissions de CO2 par source ? - GHGSat </a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a href="https://www.statistiques.developpement-durable.gouv.fr/edition-numerique/chiffres-cles-du-climat-2022/23-quelques-facteurs-demissions" target="_blank" className="text-blue-600 hover:text-blue-800 transition duration-300"> Quelques facteurs d’émissions | Chiffres clés du climat 2022 (developpementdurable.gouv.fr) </a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a color="#f8d5d1" href="https://leshorizons.net/2tonnes-atelier-former-professionnels-transition-ecologique/" target="_blank" className="text-blue-600 hover:text-blue-800 transition duration-300"> 2tonnes, un atelier pour former les professionnels à la transition écologique </a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a href="https://www.vie-publique.fr/eclairage/290911-chronologie-du-changement-climatique-dorigine-humaine" target="_blank" className="text-blue-600 hover:text-blue-800 transition duration-300"> Chronologie du changement climatique d'origine humaine | vie-publique.fr </a></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
    
    </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Result sent successfully");
  } catch (error) {
    console.error("Error sending quiz result", error);
      throw ("Error sending quiz result", error);
  }
}

module.exports = { sendResetPasswordEmail, sendQuizResultEmail };