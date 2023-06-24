//-----------validating emails-----------
let upload = document.getElementById('upload');
upload.addEventListener('change', () => {
  let fr = new FileReader();
  fr.readAsText(upload.files[0]);
  fr.onload = function () {

    let Arr = fr.result.split(/\r?\n|\n/).map(e => {
      return e.split(',');
    });
    Window.valNo = 0;
    let invalNo = 0;
    Window.valMail = [];
    Arr.forEach(e => {
      let em = String(e);
      let m = e.map(e => {
        return `<td>${e}</td>`; //table data
      })
      let creEle = document.createElement("tr");//tr = table row
      creEle.innerHTML = m;
      if (em != "") { // so that blank row will not be printed as well as counted 
        // if(em.indexOf('@') != 0) {
        //    document.querySelector("table#val").appendChild(creEle);
        //    return false;
        // }

        if (em.charAt(em.length - 4) == '.') {
          document.querySelector("table#val").appendChild(creEle);
          Window.valMail.push(em);
          Window.valNo = Window.valNo + 1;
          return false;
        }
        else if (em.charAt(em.length - 3) == '.') {
          document.querySelector("table#val").appendChild(creEle);
          Window.valMail.push(em);
          Window.valNo = Window.valNo + 1;
          return false;
        }
        else {
          document.querySelector("table#inval").appendChild(creEle);
          invalNo = invalNo + 1;
          // console.log(creEle);
          return false;
        }

      }
    });

    document.querySelector('#valCount').innerHTML = Window.valNo;
    document.querySelector('#invalCount').innerHTML = invalNo;
  };
});

function sendEmails() {
  var promise = new Promise(function (resolve, reject) {
    console.log(document.getElementById("from").value);
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "shreyanshmaurya1910@gmail.com",
      Password: "E9255B56983C34DB14935AB58853AB80D016",
      To: "shreyanshmaurya9@gmail.com",
      From: "shreyanshmaurya1910@gmail.com",
      Subject: document.querySelector('#subject').value,
      Body: document.getElementById('msg').value
    }).then(
      function (message) {
        resolve(message);
      },
      function (error) {
        reject(error);
      }
    );
  });

  promise.then(
    function (message) {
      alert(" mails have been sent successfully. Press " + message);
      location.reload();
    },
    function (error) {
      alert("Error sending emails: " + error);
    }
  );
}

window.addEventListener("scroll", function () {
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  var scrollButton = document.getElementById("scroll-top-btn");

  if (scrollPosition > 300) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
});

document.getElementById("scroll-top-btn").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
