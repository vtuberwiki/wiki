// const ACCEPT_LANGUAGE = navigator.languages[0];

// function googleTranslateElementInit() {
//     new google.translate.TranslateElement({ pageLanguage: ACCEPT_LANGUAGE.split("-")[0], layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
// }


// (async () => {
//     setTimeout(async () => {
//         const URL = "https://translation.googleapis.com/language/translate/v2";

//         const ACCEPT_LANGUAGE = navigator.languages[0];

//         // Give each element an ID
//         document.querySelectorAll("*").forEach((element, index) => {
//             element.id = `element_${index}`;
//         });

//         let translations = {};

//         // Extract text content from elements
//         document.querySelectorAll("*").forEach((element) => {
//             if (element.textContent) {
//                 translations[element.id] = element.textContent;
//             }
//         });

//         const response = await fetch(URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-goog-api-key": "AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520"
//             },
//             body: JSON.stringify({
//                 q: Object.values(translations), // Translate an array of text
//                 source: ACCEPT_LANGUAGE,
//                 target: "jp",
//             }),
//         });

//         const data = await response.json();

//         console.log(data);
//     }, 1000);
// })();