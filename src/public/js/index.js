const url = "http://localhost/discord";

const questions = [
    "Milyen cryptopénz tárolási módokat ismersz?",
    "Mit jelent a gas fee?",
    "Megnyitsz olyan linket amit ismeretlentől privát üzenetben kapsz?",
    "Mi történhet, ha kiadod a crypto tárcádhoz tartozó seed phrase-eket, vagy private key-t?",
    "Írj példát a jelszavad, seed phrase-ed biztonságos tárolására!",
    "Miért veszélyes egy olyan projektbe fektetni, aminek hiányos a leírása, kevés követője van, a készítői ismeretlenek és feltűnően nagy mozgásokat lehet látni az árban?",
    "Mit jelent a “rug pull” kifejezés?",
    "Mi történik, ha nem megfelelő láncon utalsz cryptot? (nem azon a láncon küldöd, amin a céltárca van)",
    "Miért fontos ellenőrizni, hogy megfelelő URL-en látogattad-e meg azt az oldalt, amit szerettél volna?",
    "Milyen módon jársz utána, hogy egy általad kiszemelt projekt megbízható e, vagy sem?",
    "Miért jelentkezel a csoportba?",
    "Mit szeretnél elérni a befektetéseiddel?",
    "Hol hallottál először a crypto világról?",
    "Mit jelent az NFA kifejezés?",
    "Mit jelent a DYOR kifejezés?",
    "Mit jelent a KYC kifejezés? Mihez szükséges és hol kérhetnek ilyet tőled?",
    "Mit jelent kriptopénz váltáskor a slippage?",
    "Mit jelent, ha egy NFT-t mintelnek?",
    "Mit jelent a WL, azaz Whitelist?",
    "Mi a CEX és a DEX?",
    "Mit jelent a bear illetve bull market, illetve medve vagy bika piac?"

]
const questionsNumber = 8;

renderForm = () => {
    var selectedQuestions = [];

    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container");
    divElement.setAttribute("id", "container");

    const title = document.createElement("h1");
    title.setAttribute("class", "text-center mt-5 mb-5");
    title.innerHTML = "Jelentkezési lap";

    const description = document.createElement("h2");
    description.setAttribute("class", "text-center mt-5 mb-5");
    description.innerHTML =  "Megkérünk, a válaszokat lehetőség szerint a saját szavaiddal fogalmazd meg.";

    divElement.appendChild(title);
    divElement.appendChild(description);

    const form = document.createElement("form");
    form.setAttribute("id", "sign-form");

    const discordDiv = document.createElement("div");
    discordDiv.setAttribute("class", "mb-4");

    const discordLabel = document.createElement("label");
    discordLabel.setAttribute("for", "discorDName");
    discordLabel.setAttribute("class", "form-label mb-3");
    discordLabel.setAttribute("id","discordLabelId");
    discordLabel.innerHTML = "Discord azonosító";

    const discordInput = document.createElement("input");
    discordInput.setAttribute("type", "text");
    discordInput.setAttribute("class", "form-control");
    discordInput.setAttribute("id", "discordName");
    discordInput.setAttribute("placeholder", "dummy#0001");
    discordInput.setAttribute("name", "discord");
    
    discordDiv.appendChild(discordLabel);
    discordDiv.appendChild(discordInput);

    form.appendChild(discordDiv);

    for(var i=0;i<questionsNumber; i++){
        
        var selectedQuestion = questions[Math.floor(Math.random() * (questions.length-1))];
        const div = document.createElement("div");
        div.setAttribute("class", "mb-4");

        const label = document.createElement("label");
        label.setAttribute("for", `question${i+1}`);
        label.setAttribute("class", "form-label mb-3");
        label.setAttribute("id", `questionLabel${i+1}`);      
        
        while (selectedQuestions.includes(selectedQuestion)){
            selectedQuestion = questions[Math.floor(Math.random() * (questions.length-1))];
        }

        label.innerHTML = selectedQuestion;
        selectedQuestions.push(selectedQuestion);

        const textarea = document.createElement("textarea");
        textarea.setAttribute("type", "text");
        textarea.setAttribute("class", "form-control");
        textarea.setAttribute("id", `question${i+1}`);
        textarea.setAttribute("name", `q${i+1}`);

        div.appendChild(label);
        div.appendChild(textarea);

        form.appendChild(div);
    }

    const rulesDiv = document.createElement("div");
    rulesDiv.setAttribute("class", "mb-4");

    const rulesLabel = document.createElement("label");
    rulesLabel.setAttribute("class", "form-label mb-3");
    rulesLabel.innerHTML = "A válaszok beküldésével elfogadod a szerver szabályzatát és vállalod a megszegésük következményeit, illetve tudomásul veszed, hogy a szerveren olvasottak közül semmi nem minősül pénzügyi tanácsadásnak, minden pénzügyi döntés az egyén felelőssége!";

    const br = document.createElement("br");

    const rulesCheckboxDiv = document.createElement("div");
    rulesCheckboxDiv.setAttribute("class", "form-check form-check-inline");

    const rulesCheckboxLabel = document.createElement("label");
    rulesCheckboxLabel.setAttribute("class", "form-check-label");
    rulesCheckboxLabel.setAttribute("for", "questionYes");
    rulesCheckboxLabel.innerHTML = "Megértettem és elfogadom a szabályzatot!";

    const rulesCheckboxInput = document.createElement("input");
    rulesCheckboxInput.setAttribute("class", "form-check-input");
    rulesCheckboxInput.setAttribute("type", "radio");
    rulesCheckboxInput.setAttribute("name", "rulesRadio");
    rulesCheckboxInput.setAttribute("id", "questionYes");
    rulesCheckboxInput.setAttribute("value", "yes");

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("class","btn btn-primary");
    submitBtn.setAttribute("id", "submit");
    submitBtn.setAttribute("disabled", "");
    submitBtn.innerHTML = "Beküldés";


    rulesDiv.appendChild(rulesLabel);
    rulesDiv.appendChild(br);

    rulesCheckboxDiv.appendChild(rulesCheckboxLabel);
    rulesCheckboxDiv.appendChild(rulesCheckboxInput);
    rulesCheckboxDiv.appendChild(br);

    rulesDiv.appendChild(rulesCheckboxDiv);

    form.appendChild(rulesDiv);
    form.appendChild(submitBtn);

    divElement.appendChild(form);

    document.body.appendChild(divElement);
}

$(document).ready(() => {
    renderForm();
    
    $validator = $("#sign-form").validate({
        debug: true,
        rules: {
            discord: {
                minlength: 5,
                required: true
            },
            q1: {
                minlength: 1,
                required: true
            },
            q2: {
                minlength: 1,
                required: true
            },
            q3: {
                minlength: 1,
                required: true
            },
            q4: {
                minlength: 1,
                required: true
            },
            q5: {
                minlength: 1,
                required: true
            },
            q6: {
                minlength: 1,
                required: true
            },
            q7: {
                minlength: 1,
                required: true
            },
            q8: {
                minlength: 1,
                required: true
            },
            rulesRadio: {
                required: true
            }

        },
        messages: {
            discord: {
                required: "Ezt a mezőt kötelező kitölteni!",
                minlength: "Legalább 5 karakterből kell állnia a mezőnek!"
            },
            q1: {
                minlength: "Ez a mező nem lehet üres!",
                required: "Ezt a mezőt kötelező kitölteni!"
            },
            q2: {
                minlength: "Ez a mező nem lehet üres!",
                required: "Ezt a mezőt kötelező kitölteni!"
            },
            q3: {
                minlength: "Ez a mező nem lehet üres!",
                required: "Ezt a mezőt kötelező kitölteni!"
            },
            q4: {
                minlength: "Ez a mező nem lehet üres!",
                required: "Ezt a mezőt kötelező kitölteni!"
            },
            q5: {
                minlength: "Ez a mező nem lehet üres!",
                required: "Ezt a mezőt kötelező kitölteni!"
            },
            q6: {
                minlength: "Ez a mező nem lehet üres!",
                required: "Ezt a mezőt kötelező kitölteni!"
            },
            q7: {
                minlength: "Ez a mező nem lehet üres!",
                required: "Ezt a mezőt kötelező kitölteni!"
            },
            q8: {
                minlength: "Ez a mező nem lehet üres!",
                required: "Ezt a mezőt kötelező kitölteni!"
            },
            rulesRadio: {
                required: "Kötelező elfogadnod a szabályzatot!"
            }

        },

        highlight: function() {
            $("#submit").attr("disabled", "disabled");
        },
        success: function (){
            $("#submit").removeAttr("disabled");
        }
    }); 

    $("#submit").click(() => {
        if ($("#sign-form").valid()){
            let data = {
                discord: $("#discordName").val(),
                q1: {
                    question: $("label[for=question1]").text(),
                    answer: $("#question1").val()
                },
                q2: {
                    question: $("label[for=question2]").text(),
                    answer: $("#question2").val()
                },
                q3: {
                    question: $("label[for=question3]").text(),
                    answer: $("#question3").val()
                },
                q4: {
                    question: $("label[for=question4]").text(),
                    answer: $("#question4").val()
                },
                q5: {
                    question: $("label[for=question5]").text(),
                    answer: $("#question5").val()
                },
                q6: {
                    question: $("label[for=question6]").text(),
                    answer: $("#question6").val()
                },
                q7: {
                    question: $("label[for=question7]").text(),
                    answer: $("#question7").val()
                },
                q8: {
                    question: $("label[for=question8]").text(),
                    answer: $("#question8").val()
                },
            }
            sendToBot(data);
        }
    });
    
});

sendToBot = (data) => {
    console.log(url);
    $.post(`${url}${window.location.pathname}`, data, (response) => {
        window.location.href = response.href
    }).fail(() => {
        alert("Kérlek próbáld meg 3 órával később!");
    });
}