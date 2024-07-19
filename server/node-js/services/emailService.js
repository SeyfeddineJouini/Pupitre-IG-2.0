const sgMail = require("@sendgrid/mail");

async function sendResetPasswordEmail(admin, token) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const resetURL = `${process.env.FRONT_URL}/reset-password/${token}`;

  const msg = {
    to: admin.email,
    from: "service.bilancarbone@gmail.com",
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
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Préparer les éléments HTML pour chaque résultat
  let htmlResultItemsLi = "";
  resultResponse.result.forEach((item) => {
    let roundedValue = parseFloat(item.value).toFixed(3);
    htmlResultItemsLi += `<li>${item.label} : ${roundedValue} TCO2</li>`;
  });

  // Calculer le total des émissions de CO2
  const totalCO2 = resultResponse.result
    ?.map((item) => item.value)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(3);

  // Déterminer l'équivalent des émissions par rapport au budget
  const budget = resultRequest["budget"];
  const equivalenceBudgetCO2 = determineEquivalence(budget);

  // Générer le message personnalisé
  const personalizedMessage = generatePersonalizedMessage(totalCO2, equivalenceBudgetCO2);

  // Préparer le message à envoyer par email
  const msg = {
    to: emailAdress,
    from: "service.bilancarbone@gmail.com",
    subject: "Résultat de votre bilan carbone",
    html: `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title>
      </title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a { padding: 0; }
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        p { display: block; margin: 13px 0; }
      </style>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      </style>
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 { width: 100% !important; max-width: 100%; }
          .mj-column-per-33-33333333333333 { width: 33.33333333333333% !important; max-width: 33.33333333333333%; }
        }
      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; }
        .moz-text-html .mj-column-per-33-33333333333333 { width: 33.33333333333333% !important; max-width: 33.33333333333333%; }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile { width: 100% !important; }
          td.mj-full-width-mobile { width: auto !important; }
        }
      </style>
      <style type="text/css">
        a { color: white !important; }
      </style>
    </head>
    <body style="word-spacing:normal;background-color:#d7dde5;">
      <div style="background-color:#d7dde5;">
        <table align="center" background="http://191n.mj.am/img/191n/1t/h0.jpg" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:url(http://191n.mj.am/img/191n/1t/h0.jpg) center top / cover no-repeat;background-position:center top;background-repeat:no-repeat;background-size:cover;width:100%;">
          <tbody>
            <tr>
              <td>
                <div style="margin:0px auto;max-width:600px;">
                  <div style="line-height:0;font-size:0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;padding-top:45px;padding-bottom:10px;word-break:break-word;">
                                      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:center;color:#45474e;">
                                        <span style="font-size: 30px; line-height: 30px;">Bilan carbone</span><br /><br />Votre résultat du bilan carbone
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
          <tbody>
            <tr>
              <td>
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                          <div class="mj-column-per-33-33333333333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width:50px;">
                                            <img alt="" height="auto" src="https://img.icons8.com/cotton/64/000000/trophy--v2.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="50" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#9da3a3;">
                                      <span style="font-size: 14px; color: #e85034"> Taux d’émission <br /><br /><br />
                                        <b>${totalCO2} TCO2</b>
                                      </span>
                                      <br /><br />
                                      <ul>${htmlResultItemsLi}</ul>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="mj-column-per-33-33333333333333 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width:50px;">
                                            <img alt="" height="auto" src="https://img.icons8.com/cotton/64/000000/money-bag.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="50" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#9da3a3;">
                                      <span style="font-size: 14px; color: #e85034"> Taux d’émission du salaire <br /><br />
                                        <b>${equivalenceBudgetCO2} Tonnes</b>
                                      </span>
                                      <br /><br /> Avec un budget de <b>${budget} euros</b> par an, votre émission est équivalente à
                                      <b>${equivalenceBudgetCO2} tonnes</b>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#e85034;background-color:#e85034;width:100%;">
          <tbody>
            <tr>
              <td>
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
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
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a href="https://www.statistiques.developpement-durable.gouv.fr/edition-numerique/chiffres-cles-du-climat-2022/23-quelques-facteurs-demissions">Chiffres clés du climat France, Europe et Monde</a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a href="https://www.2tonnes.org/" target="_blank">2tonnes, un atelier de formation à la transition écologique</a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a href="https://www.ademe.fr/" target="_blank">ADEME</a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a href="https://www.impacto.org/" target="_blank">Impacto</a></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:5px;word-break:break-word;">
                                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1;text-align:center;color:#f8d5d1;"><a href="https://www.insee.fr/" target="_blank">Insee</a></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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

function determineEquivalence(budget) {
  // Placeholder function to determine CO2 equivalence based on budget.
  // Adjust the logic according to your application's need.
  const data = [7.0, 7.4, 7.2, 8.1, 8.0, 8.3, 8.5, 9.6, 11.6];
  let index = 0;
  if (budget < 750) index = 0;
  else if (budget < 1000) index = 1;
  else if (budget < 1500) index = 2;
  else if (budget < 2000) index = 3;
  else if (budget < 3000) index = 4;
  else if (budget < 3500) index = 5;
  else if (budget < 5000) index = 6;
  else if (budget < 6500) index = 7;
  else index = 8;

  return data[index];
}

function generatePersonalizedMessage(totalCO2, equivalenceBudgetCO2) {
  if (totalCO2 < equivalenceBudgetCO2) {
    return `
      <div style="text-align: center;">
        <div style="display: flex; justify-content: center;">
          <img src="https://img.icons8.com/cotton/64/000000/smiling-face.png" alt="Smiling Face" style="margin-bottom: 10px;" />
        </div>
        <span>Votre bilan carbone est inférieur à l'empreinte carbone de votre revenu, bravo pour vos efforts ! Référez-vous au graphique ci-dessous pour comparer chaque catégorie à la moyenne française et continuer à améliorer vos performances.</span>
      </div>
    `;
  } else {
    return `
      <div style="text-align: center;">
        <div style="display: flex; justify-content: center;">
          <img src="https://img.icons8.com/cotton/64/000000/sad-face.png" alt="Sad Face" style="margin-bottom: 10px;" />
        </div>
        <span>Votre bilan carbone dépasse l'empreinte carbone de votre revenu. Essayez de réduire votre consommation pour un avenir plus durable. Référez-vous au graphique ci-dessous pour comparer chaque catégorie à la moyenne française et identifier les domaines à améliorer.</span>
      </div>
    `;
  }
}

module.exports = { sendResetPasswordEmail, sendQuizResultEmail };
