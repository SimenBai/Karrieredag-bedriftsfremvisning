function loadJSON(callback) {
    let xObject = new XMLHttpRequest();
    xObject.overrideMimeType("application/json");
    xObject.open("GET", "assets/bedrifter.json", true);
    xObject.onreadystatechange = function () {
        if (xObject.readyState === 4 && xObject.status === "200") {
            callback(xObject.responseText);
        }
    };
    xObject.send(null);
}

function init() {
    loadJSON((response) => {
        addCompanies(response);
    });
}

function addCompanies(json) {
    let companies = JSON.parse(json)["company"];
    companies.forEach((company) => {
        displayCompany(company);
    });
}

function displayCompany(companyData) {
    let companiesElement = document.getElementById("companies");
    let company = document.createElement("div");
    company.setAttribute("class", "company");

    let imgWrapper = document.createElement("div");
    imgWrapper.setAttribute("class", "imgWrapper");
    let img = document.createElement("img");
    img.setAttribute("class", "companyLogo");
    img.setAttribute("src", companyData["img"]);
    img.setAttribute("alt", companyData["name"]);
    if(companyData["white"]){
        imgWrapper.setAttribute("style", "background: white;");
    }
    if(companyData["svg"]){
        img.setAttribute("style", "height: 100%");
    }
    imgWrapper.appendChild(img);
    company.appendChild(imgWrapper);

    let name = document.createElement("h3");
    name.appendChild(document.createTextNode(companyData["name"]));
    company.appendChild(name);

    let blockQuote = document.createElement("textarea");
    blockQuote.setAttribute("readonly", "");
    if (!companyData["description"]) {
        companyData["description"] = "Ingen beskrivelse";
    }
    blockQuote.appendChild(document.createTextNode(companyData["description"]));
    company.appendChild(blockQuote);

    if (companyData["interview"]) {
        let interview = document.createElement("a");
        interview.setAttribute("class", "speedInterview");
        interview.setAttribute("href", companyData["interview"]["signupLink"]);
        interview.appendChild(document.createTextNode("Meld deg på speedintervju"));
        company.appendChild(interview);
    }
    else {
        let interview = document.createElement("p");
        interview.setAttribute("class", "speedInterview");
        interview.appendChild(document.createTextNode("Har ikke speedintervju"));
        company.appendChild(interview);
    }


    if (companyData["presentation"]) {
        let presentation = document.createElement("small");
        presentation.setAttribute("class", "presentationInfo");
        presentation.appendChild(document.createTextNode(companyData["presentation"]["room"] + ' - ' + companyData["presentation"]["time"]));
        company.appendChild(presentation);
    }


    companiesElement.appendChild(company);
}

init();