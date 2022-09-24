/*==================================================
//*        1- Senkron-Asenkron Programlama
//*==================================================

//! Javascript, single-threaded ve Asenkron Programlama dilidir.

//? Asenkron Programlama
//? --------------------------------------------------------------
//? Asenkron Programlama, bir alt gorevin uygulamanin asil thread'inden
//? bagimsiz olarak arka planda calistirilmasina izin veren paralel programlama
//? teknigidir. Bu alt gorev tamamlandiginda (basriyla veya basarisizlikla)
//? asil thread bu konuda bilgilendirilir. Asenkron programlama, uygulamalarin
//? performansininin artirilmasina ve daha iyi kullanici deneyimine katki saglamaktadir.

//? Ozellikle bir API'den veya Veritabanindan veri cekme, Giris/Cikis islemleri,
//? Dosya Okuma/Yazma islemleri gibi zaman tuketen kodlarda Asyn Programlama
//? kullanilmasi cok onemlidir.

//* Senkron
//* ------------------------------------------------

// const bekle = (waitingTime) => {
//   const startTime = new Date().getTime();
//   while (new Date().getTime() < startTime + waitingTime);
// };

// console.log("Hello");
// // alert("CW"); //! blocking code

// console.time("timer");
// bekle(3000); //! blocking code
// console.timeEnd("timer");
// console.log("FS12");

//* Asenkron (setTimeout)
//*----------------------------------------------------
// console.log("timeout");
// setTimeout(() => {
//   //! non-blocking
//   console.log("Hi");
// }, 1000);

// setTimeout(() => {
//   //! non-blocking
//   console.log("Hello");
// }, 3000);

// console.log("timeout bitti");

//* Asenkron (setInterval, clearInterval)
//*----------------------------------------------------
// console.log("Timer Started");
// let counter = 0;
// const intervalId = setInterval(() => {
//   console.log(++counter);
//   if (counter > 4) {
//     clearInterval(intervalId);
//     console.log("Timer Stoped");
//   }
// }, 1000);

// console.log("Timer Stoped");

//! Callback Hell (nested ve birbirine bagli callback'ler)
//!-----------------------------------------------------
//* Eger birbirine bagimli asenkron kodlarin yazilmasi gerekirse,nested callback
//* yapisinin kullanilmasi gerekebilir. Fakat bu iyi bir programlama yaklasimi degildir.
// !callback hell olarak adlandirilan bu yapinin anlasilmasi ve surdurulebilirligi oldukca zordur.

setTimeout(() => {
  console.log("john:Hi");
  setTimeout(() => {
    console.log("Sarah: Hello");
    setTimeout(() => {
      console.log("John: How Are you?");
      setTimeout(() => {
        console.log("Sarah:Fine and you?");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

//? COZUMLER:
//?----------------------------------------------------
//* 1- XMLHttpRequest (Eski yontem, Ornek: AJAX)
//? https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
//* 2- Promise,
//! 3- Fetch API (Promise'in basitlestirilmis hali),
//! 4- ASYNC-AWAIT (Fetch API'nin makyajlanmis hali)
//* =================================================
//*                2- Promises
//* =================================================

//? Promise, asenkron bir islemin basariyla ve basarisizlikla bittigini gosteren
//? ve ayni zamanda basariyla bittiginde sonuc verilerini temsil eden bir nesne yapisidir.

//? SYTNAX
//?----------
//* 1- Ilk olarak new Promise() constructor'i ile yeni bir promise nesnesi olusturulur,
//* 2- constructor'a asil islemin yapilmasini saglayan bir executor fonksiyion verilir.
//* 3- Executor fonksiyona ise 2 argument gecirilir: resolve ve reject fonksiyonlari
//* 4- resolve fonksiyonu promise'in basariyla bittiginda, reject ise
//*    basarisizlikla bittiginde isletilirler.

//? new Promise (
//?    /* executor */
//?    function(resolve,reject){
//?       .......
//?    }
//? )

//? Bir Promise asagidaki state(durumlari) icerebilir:
//* pending: ilk state, fulfilled veya rejected olmayan
//* fulfilled:islem basariyla tamamlandini gosteren state.
//* rejected: islemin basarisizlikla tamamlandigini gosteren state

//! Bir promise bir degerler tamamlanabilir yada bir sebeple (hata) iptal edilebilir.
//! Bu durumlar then() ve catch() metotlari ile yakalanabilir.
//? then() ve catch() metotlari promise dondururler.
//? Zincirleme olarak kullanilabilirler.

console.log("Promise");

const myPromise = new Promise((resolve, reject) => {
  const success = Math.floor(Math.random() * 2);
  const data = { a: 1, b: 2 };
  if (success) {
    console.log("Data fetchd");
    resolve(data);
  } else {
    reject(new Error("Fetch halted"));
  }
});

myPromise
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
  //*========================================
//*             3- FETCH API
//*========================================

//? Dis kaynaklardan veri getirmek icin kullanilan basit bir arabirimdir.
//? Ag istekleri yapmamizi ve cevaplari yontebilmemize olanak saglar.
//? Javascript ortaminda en cok kullanilan Asenkron islem orneklerinin basinda
//? gelmektedir.

//? fetch() fonksiyonu veri getirmek istediginiz kaynagin yolunu gosteren zorunlu
//? bir parametre almaktadir ve bu istegin cevabini gosteren bir Promise dondurmektedir.

console.log("FETCH");
// let userData;

fetch("https://api.github.com/users")
  .then((res) => {
    // console.log(res);
    //! Error handling
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => updateDOM(data))
  .catch((hata) => console.log(hata));

// console.log(userData);

const updateDOM = (users) => {
  console.log(users);
  const userDiv = document.querySelector(".users");
  users.forEach((user) => {
    const { login, avatar_url, following_url } = user;
    userDiv.innerHTML += ` <h2>${login}</h2>
    <img src="${avatar_url}" width="300px" alt="" />
    `;
  });
};