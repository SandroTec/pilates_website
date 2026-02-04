function sendMail(event) {
  event.preventDefault();
  //fetcht von formspree.io um mails zu senden
  fetch("https://formspree.io/f/mlglqqon", {
    method: "POST",
    body: new FormData(event.target),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(() => {
    alert('Mail wurde gesendet!');
    event.target.reset(); 
  })
  .catch((error) => {
    console.log(error);
  });
}


