
/* --------------- GET FORM DATA START --------------- */

const basal = document.getElementById('BM');
const kcalGoal = document.getElementById('kcalgoal');
const kcalAct = document.getElementById('kcalactivity');
const fatsG = document.getElementById('fatsg');
const proteinG = document.getElementById('proteing');
const carbosG = document.getElementById('carbosg');
const fatP = document.getElementById('fatp');
const fatKg = document.getElementById('fatkg');
const card = document.getElementById('card');

/* --------------- GET FORM DATA END --------------- */


/* --------------- FUNCTIONS START --------------- */

function calculateBM() {
    var age = parseInt(document.getElementById('cc_age').value);
    var height = parseInt(document.querySelector('input[name="cc_height"]').value);
    var weight = parseInt(document.querySelector('input[name="cc_weight"]').value);
    var gender = parseInt(document.querySelector('input[name="genderS"]:checked').value);
    let result;
    if (gender === 1) {
        result = 10*weight + 6.25*height - 5*age + 5;
    } else if (gender === 2) {
        result = 10*weight + 6.25*height - 5*age - 161;
    }
    return Math.round(result);
} /* --- Calculate Basal Metabolism --- */

function activity() {
    var activity = parseInt(document.querySelector('input[name="cc_activity"]:checked').value);
    let r;
    if(activity === 0) {
        r = 1.2;
    } else if (activity === 1) {
        r = 1.375
    } else if (activity === 2) {
        r = 1.55
    } else if (activity === 3) {
        r = 1.725
    } else if (activity === 4) {
        r = 1.9
    }
    return r;
} /* --- Convert Activity Data to Activity Semanal Factor --- */

function calculateRKcal() {
    var goal = parseInt(document.querySelector('input[name="cc_goal"]:checked').value);
    return (calculateBM() * activity()) + goal;
} /* --- Calculate Recomended Kcal --- */

function calculateActivity() {
    return (calculateBM() * activity()) - calculateBM();
} /* --- Calculate Activity Level --- */

function calculateFatsG() {
    return Math.round(((25*calculateRKcal()) / 100) / 9);
} /* --- Calculate G of Fats --- */

function calculateProteinG() {
    var weight = parseInt(document.querySelector('input[name="cc_weight"]').value);
    return Math.round(weight*2);
} /* --- Calculate G of Protein --- */

function calculateCarbosG() {
    return Math.round(((50*calculateRKcal()) / 100) / 4);
} /* --- Calculate G of Carbos --- */

function calculateFatPercent() {
    var neck = parseInt(document.querySelector('input[name="cc_neck"]').value);
    var waist = parseInt(document.querySelector('input[name="cc_waist"]').value);
    var height = parseInt(document.querySelector('input[name="cc_height"]').value);
    var hips = parseInt(document.querySelector('input[name="cc_hips"]').value);
    var gender = parseInt(document.querySelector('input[name="genderS"]:checked').value);
    let r;
    if (gender === 1) {
        r = (495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450);
    } else if (gender === 2) {
        r = (495 / (1.29579 - 0.35004 * Math.log10(waist + hips - neck) + 0.22100 * Math.log10(height)) - 450);
    }
    return r.toFixed(1);
} /* --- Calculate Fat Percent --- */

function calculateFatKg() {
    var weight = parseInt(document.querySelector('input[name="cc_weight"]').value);
    let r = calculateFatPercent() * weight / 100;
    return r.toFixed(1);
} /* --- Calculate Fat Kg --- */

function showCard() {
    card.classList.remove('carddisplay');
    setTimeout(function() {card.classList.replace('cardsopacity', 'cards');}, 200);
} /* --- Show Cards --- */

function showInfoCard(card) {
    const infoCard = document.getElementById(card);
    infoCard.classList.remove('showcontent');
} /* --- Show Info Cards --- */
    
function hiddenInfoCard(card) {
    const infoCard = document.getElementById(card);
    infoCard.classList.add('showcontent');
} /* --- Hidden Info Cards --- */

function onSubmit() {
    basal.innerHTML = calculateBM();
    kcalGoal.innerHTML = calculateRKcal();
    kcalAct.innerHTML = calculateActivity();
    fatsG.innerHTML = calculateFatsG();
    proteinG.innerHTML = calculateProteinG();
    carbosG.innerHTML = calculateCarbosG();
    fatP.innerHTML = calculateFatPercent();
    fatKg.innerHTML = calculateFatKg();
    showCard();
} /* --- Submit Form and Show Results --- */

/* --------------- FUNCTIONS END --------------- */