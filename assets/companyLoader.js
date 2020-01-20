function loadJSON(callback) {
    let xObject = new XMLHttpRequest();
    xObject.overrideMimeType("application/json");
    xObject.open("GET", "assets/bedrifter.json", true);
    xObject.onreadystatechange = function () {
        if (xObject.readyState == 4 && xObject.status == "200") {
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
    companies.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    companies.forEach((company) => {
        displayCompany(company);
    });

    document.getElementById("overlayWrapper").addEventListener("click", () => {
        document.getElementById("overlayWrapper").style.display = "none";
    })
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
    if (companyData["white"]) {
        imgWrapper.setAttribute("style", "background: white;");
    }
    if (companyData["svg"]) {
        img.setAttribute("style", "height: 100%");
    }
    imgWrapper.appendChild(img);
    company.appendChild(imgWrapper);

    let name = document.createElement("h3");
    name.appendChild(document.createTextNode(companyData["name"]));
    company.appendChild(name);

    let popup = document.createElement("p");
    if (!companyData["description"]) {
        popup.appendChild(document.createTextNode("Ingen beskrivelse"));
    } else {
        popup.appendChild(document.createTextNode("Les mer..."));
        popup.setAttribute("class", "readMore");
        popup.addEventListener("click", () => {
            document.getElementById("overlayWrapper").style.display = "flex";
            let img = document.getElementById("overlayImg");
            img.setAttribute("src", companyData["img"]);
            img.setAttribute("alt", companyData["name"]);

            document.getElementById("overlayName").innerHTML = companyData["name"];
            document.getElementById("overlayDesc").innerHTML = companyData["description"];

            let imgWrapper = document.getElementById("overlayImgWrapper");

            if (companyData["white"]) {
                imgWrapper.setAttribute("style", "background: white;");
            } else {
                imgWrapper.setAttribute("style", "background: transparent;");
            }
            if (companyData["svg"]) {
                img.setAttribute("style", "height: 100%");
            } else {
                img.setAttribute("style", "height: auto");
            }
            scroll(0, 0);
        });
    }

    company.appendChild(popup);

    if (companyData["interview"]) {
        let interview = document.createElement("a");
        interview.setAttribute("class", "speedInterview");
        interview.setAttribute("href", companyData["interview"]["signupLink"]);
        interview.appendChild(document.createTextNode("Meld deg på speedintervju"));
        company.appendChild(interview);
    } else {
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