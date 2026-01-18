// misc
var setupImportCode, id, _targetWidth, _bob = 0.0; 

// IMAGES
var rBRONZE = "https://codehs.com/uploads/f4c107afdb2191daeee9fe2781ba2fc4"; 
var rSILVER = "https://codehs.com/uploads/1042137d45421c6d90e2fb345b34c16a"; 
var rGOLD = "https://codehs.com/uploads/fd4a8de507c6362eb32732b03a72a93d";
var rS1 = "https://codehs.com/uploads/bfd60fe35d5819ebd58e2a78813840e5";
var rS2 = "https://codehs.com/uploads/1b2e4ee4c3ab3d2c89428de2a815a4b9";
var rV = "https://codehs.com/uploads/270cae9285107c50e16902d7021028ba";

var rSTAR = "https://codehs.com/uploads/abb49061d5605cc9465b68eed21f5375";

// COLORS
const backRectCOLOR = "#151b24"; 
const backgroundCOLOR = "#353545"; 
const vbgCOLOR = "#42030c"; 

const BRONZE = "#c27b48"; 
const SILVER = "#b9bfc9"; 
const GOLD = "#ffd429"; 
const S1 = "#5cc0ff"; 
const S2 = "#2bff36"; 
const V = "#ff2e3f"; 

// UI - buttons and values
var attendanceButton, attendClass, attendanceMarked = false;
var updateTestScoreButton, score, previousScore = null;
var addHoursStudying, hoursStudied, dailyStudyHours = 0, allowedHours;
var genTestButton, testDifficulty, testCount; 
var profileIDbutton; 

// UI Action Logger
var actionLog = [];
var actionDiv, actionLabel

// UI - labels
var nameLabel, schoolLabel, pointsLabel, rankLabel;

// UI - Graphics
let backRect, rankRect, background; 

var RANK, STAR; 

// User variables
var name, school, points = 0, rank = "Bronze 🥉";

var median; 
let testScores = []; 
function Start()
{
    actionDiv = document.createElement("div");
    actionDiv.innerText = "Action Log:";
    actionDiv.style.position = "fixed";
    // actionDiv.style.left = "553px";
    // actionDiv.style.top = "215px";
    actionDiv.style.left = "120px"
    actionDiv.style.top = "40px"
    // actionDiv.style.transform = "translateX(-65.75%)";
    actionDiv.style.width = "280px";
    actionDiv.style.height = "200px"
    actionDiv.style.font = "12pt Courier New";
    actionDiv.style.color = "black";
    actionDiv.style.whiteSpace = "pre-line";
    document.body.appendChild(actionDiv);


    var _warning = false; 
    var _loop = true; 
    
    while (_loop == true)
    {
        if (_warning) setupImportCode = readLine("Invalid Input! please try again. (enter '0' to setup a new profile): "); 
        else setupImportCode = readLine("Input ProfileID (enter '0' to setup a new profile): "); 
        
        // DEBUG ONLY
        if (setupImportCode == "n") _loop = false; 
        
        if (setupImportCode == 0)
        {
            // Create a new profile
            name = readLine("Input Name: ");
            school = readLine("Input School: "); 
            
            _loop = false; 
        } 
        else if (setupImportCode.includes("*"))
        {
            // Valid Import Upload
            id = atob(setupImportCode.replaceAll("*", "")); 
            
            const [_name, _school, _points] = id.split("_");
            name = _name; 
            school = _school; 
            points = _points; 
            
            _loop = false; 
        }
        else
        {
            // Invalid Import Upload
            _warning = true; 
            
            print("Invalid Input, try again!"); 
        }
    }
    
    setupMainMenu(); 
    
    // Initialize Shapes
    InitShapes(); 
    
    // Render Shapes
    setTimer(RenderShapes, 0); 
}

function InitShapes()
{
    // background
    background = new Rectangle(getWidth(), getHeight()); 
    background.setPosition(0, 0);
    background.setColor(backgroundCOLOR);
    background.setOpacity(1);
    background.layer = -1; 
    add(background);
    
    // back bar
    backRect = new Rectangle(345, 8);
    backRect.setPosition(27.5, 365); 
    backRect.setColor(backRectCOLOR); 
    backRect.setOpacity(0.8); 
    backRect.layer = 1; 
    add(backRect); 
    
    // rank bar
    rankRect = new Rectangle(0, 8); 
    rankRect.setPosition(27.5, 365); 
    rankRect.setColor(BRONZE);
    rankRect.setOpacity(1);
    rankRect.layer = 2; 
    add(rankRect);
    
    // Rank image
    RANK = new WebImage(rBRONZE); 
    RANK.setPosition(142, 200);
    RANK.setOpacity(1);
    RANK.layer = 5;
    add(RANK);
    
    // Star image
    STAR = new WebImage(rSTAR); 
    STAR.setPosition(-5, 72);
    STAR.setOpacity(0.3);
    STAR.layer = 4;
    add(STAR);
}

function RenderShapes()
{
    var _color; 
    
    if (points >= 4000) { _targetWidth = 345; _color = V; }
    if (points < 4000) { _targetWidth = (points - 2800) * 3.45/12; _color = S2; }
    if (points < 2800) { _targetWidth = (points - 1800) * 3.45/10; _color = S1; }
    if (points < 1800) { _targetWidth = (points - 1000) * 3.45/8; _color = GOLD; }
    if (points < 1000) { _targetWidth = (points - 500) * 3.45/5; _color = SILVER; }
    if (points < 500) { _targetWidth = points * 3.45/5; _color = BRONZE; }
    
    var _delta = (Math.abs(_targetWidth - rankRect.getWidth()))/10
    
    if (rankRect.getWidth() < _targetWidth)
    {
        rankRect.setSize(rankRect.getWidth() + _delta, 8); 
    }
    else if (rankRect.getWidth() > _targetWidth)
    {
        rankRect.setSize(rankRect.getWidth() - _delta, 8); 
    }
    
    rankRect.setColor(_color); 
    
    background.setColor(points >= 4000 ? vbgCOLOR : backgroundCOLOR); 
    
    // RANK image
    var _rank;
    if (points >= 4000) _rank = rV; 
    if (points < 4000) _rank = rS2;
    if (points < 2800) _rank = rS1; 
    if (points < 1800) _rank = rGOLD;
    if (points < 1000) _rank = rSILVER;
    if (points < 500) _rank = rBRONZE; 
    
    RANK.setImage(_rank); 
    
    // y + sin(x) * amplitude >> x is time, y is offset
    _bob += 0.03; 
    if (_bob >= 3.14159 * 2) _bob = 0; 
    var _pos = 200 + Math.sin(_bob) * 10; 
    RANK.setPosition(142, _pos); 
    
    // STAR image
    STAR.rotate(0.18); 
    
}

function setupMainMenu()
{
    // UPDATE ATTENDANCE - Button
    attendanceButton = document.createElement("button");
    attendanceButton.innerHTML = "Attend";
    attendanceButton.style.width = "70px"
    attendanceButton.style.height = "70px";
    attendanceButton.style.position = "fixed";
    attendanceButton.style.left = "50%";
    attendanceButton.style.top = "50%";
    attendanceButton.style.transform = "translateX(-250%) translateY(210%)";

    // attendanceButton.style.left = "547px";
    // attendanceButton.style.top = "120px";
    attendanceButton.addEventListener("click", function(){
        if (attendanceMarked == true)
        {
            println("Your attendence was already marked. ");
            return;
        }
     
        attendClass = readLine('Did you attend class today? (type "yes" or "no") ')
        if (attendClass.toLowerCase() == "yes")
        {
            points += 5
            addAction("Attended class. (+5)")
            attendanceMarked = true;
        }
        else if (attendClass.toLowerCase() == "no")
        {
            points -= 10
            print("Go to class!")
            addAction("Did not attend class. (-10)")
            attendanceMarked = true;
        }
        else
        {
            print("Invalid input.")
        }
        setRank();
        updateUIvalues();
    });
    document.body.appendChild(attendanceButton)
    
    // UPDATE TEST SCORES - Button
    updateTestScoreButton = document.createElement("button");
    updateTestScoreButton.innerHTML = "Test";
    updateTestScoreButton.style.width = "70px"
    updateTestScoreButton.style.height = "70px";
    updateTestScoreButton.style.position = "fixed";
    updateTestScoreButton.style.left = "50%";
    updateTestScoreButton.style.top = "50%";
    updateTestScoreButton.style.transform = "translateX(-117%) translateY(210%)";
    // updateTestScoreButton.style.left = "654px";
    // updateTestScoreButton.style.top = "120px";
    updateTestScoreButton.addEventListener("click", function(){
        score = readFloat("Enter your test score as a percentage (ex: 95): ");
        median = readFloat("Enter the median of the test: "); 
        
        add = 0
        if (previousScore != null)
        {
            add += improvementBonus();
        }
        if (["Bronze 🥉", "Silver 🥈", "Gold 🥇"].includes(rank)) 
        {
            add += ((score-median)*2 + (score >= 80 ? (score-80)*2 : 0)); 
        }
        else 
        {
            add += (score-median)*1.5 + (score - 80)*3; 
        }
        points += Math.round(add); 
        setRank();
        updateUIvalues();
        previousScore = score;
        if (add >= 0)
        {
            addAction("Scored " + score + "% on a test. (+" + add + ")");
        }
        else
        {
            addAction("Scored " + score + "% on a test. (" + add + ")");
        }
        
    });
    document.body.appendChild(updateTestScoreButton)
    
    // ADD HOURS STUDYING - Button
    addHoursStudying = document.createElement("button");
    addHoursStudying.innerHTML = "Study";
    addHoursStudying.style.width = "70px";
    addHoursStudying.style.height = "70px";
    addHoursStudying.style.position = "fixed";
    addHoursStudying.style.left = "50%";
    addHoursStudying.style.top = "50%";
    addHoursStudying.style.transform = "translateX(15%) translateY(210%)";
    // addHoursStudying.style.left = "761px";
    // addHoursStudying.style.top = "120px";
    addHoursStudying.addEventListener("click", function(){
        if (dailyStudyHours >= 10)
        {
            println("You reached the daily study limit.");
            return;
        }
        hoursStudied = readFloat("How many hours did you study today? ");


        allowedHours = Math.min(hoursStudied, 10-dailyStudyHours);
        add = 0
        for (let i = 0; i < allowedHours; i++)
        {
            if (dailyStudyHours < 5) {
                add += 2;
            }
        
            else {
                add += 1;
            }
            dailyStudyHours++;
        }
        points += add
        if (hoursStudied > 1)
        {
            addAction("Studied for " + hoursStudied + " hours. (+" + add + ")");
        }
        else 
        {
            addAction("Studied for " + hoursStudied + " hour. (+" + add + ")");
        }
        setRank();
        updateUIvalues();
    });
    document.body.appendChild(addHoursStudying); 
        
    // GENERATE TEST - Button
    genTestButton = document.createElement("button");
    genTestButton.innerHTML = "Generate Test";
    genTestButton.style.width = "70px";
    genTestButton.style.height = "70px";
    genTestButton.style.position = "fixed";
    genTestButton.style.left = "50%";
    genTestButton.style.top = "50%";
    genTestButton.style.transform = "translateX(150%) translateY(210%)";
    // addHoursStudying.style.left = "869px";
    // addHoursStudying.style.top = "120px";
    genTestButton.addEventListener("click", function(){
        testDifficulty = readLine("Enter difficulty (easy, medium, hard): ");
        testCount = readInt("Enter # of students: "); 
        console.log("================== [" + testDifficulty.toUpperCase() + " TEST] =================="); 
        
        var testIndex = 0; 
        testScores = []; 
        
        if (testDifficulty.toLowerCase() == "easy")
        {
            // Generate a high median
            testIndex = (Randomizer.nextFloat(87.5, 100)*3 + Randomizer.nextFloat(80, 100))/4; 
            console.log("Test Index: " + testIndex.toFixed(2)); 
            console.log(" "); 
        }
        
        if (testDifficulty.toLowerCase() == "medium")
        {
            // Generate a high median
            testIndex = (Randomizer.nextFloat(45.15, 87.5)*3 + Randomizer.nextFloat(50, 100))/4; 
            console.log("Test Index: " + testIndex.toFixed(2)); 
            console.log(" "); 
        }
        
        if (testDifficulty.toLowerCase() == "hard")
        {
            // Generate a high median
            testIndex = (Randomizer.nextFloat(15.75, 45.15)*3 + Randomizer.nextFloat(0, 100))/4; 
            console.log("Test Index: " + testIndex.toFixed(2)); 
            console.log(" "); 
        }
        
        for (let i = 0; i < testCount; i++)
        {
            // Generate Scores
            testScores.push(
                ((Randomizer.nextFloat(testIndex, 100)*3 + 
                Randomizer.nextFloat(0, testIndex))/4).toFixed(2));
                
            console.log("Score " + (i + 1) +": " + testScores[i]); 
        }
        
        console.log(" "); 
        
        // Calculate and return median
        testScores.sort(); 
        
        if ((testScores.length % 2) == 0)
        {
           median = (Number(testScores[(testScores.length / 2) - 1]) + 
            Number(testScores[(testScores.length / 2)])) / 2; 
        } 
        
        else
        {
            median = Number(testScores[Math.floor(testScores.length / 2)]); 
        }
        
        console.log("Median: " + median); 
        console.log("================================================="); 
    });
    document.body.appendChild(genTestButton); 

    // UPDATE TEST SCORES - Button
    profileIDbutton = document.createElement("button");
    profileIDbutton.innerHTML = "ProfileID";
    profileIDbutton.style.width = "70px";
    profileIDbutton.style.height = "70px";
    profileIDbutton.style.position = "fixed";
    profileIDbutton.style.left = "50%";
    profileIDbutton.style.top = "50%";
    profileIDbutton.style.transform = "translateX(150%) translateY(-300%)";
    profileIDbutton.addEventListener("click", function(){
        getProfileData(); 
    });
    document.body.appendChild(profileIDbutton)

    // Label - Name
    nameLabel = new Text("Welcome Student: " + name, "12pt Courier New");
    nameLabel.setColor("white");
    nameLabel.setPosition(12, 20);
    add(nameLabel);
    
    // Label - School
    schoolLabel = new Text("School: " + school, "12pt Courier New");
    schoolLabel.setColor("white");
    schoolLabel.setPosition(16, 40);
    add(schoolLabel);
    
    // Label - Points/mmr
    pointsLabel = new Text("Points: " + points, "10pt Courier New");
    pointsLabel.setColor("white");
    pointsLabel.setPosition(32, 358);
    add(pointsLabel);
    
    // Label - Rank
    rankLabel = new Text("Rank: " + rank, "12pt Courier New");
    rankLabel.setColor("white");
    rankLabel.setPosition(16, 57);
    add(rankLabel);
    
    setRank();
    updateUIvalues();
}

function updateUIvalues()
{
    // Update Points label
    pointsLabel.setText("Points: " + points); 
    
    // Update Rank label
    rankLabel.setText("Rank: " + rank)
}

function setRank()
{
    if (points < 0) points = 0; 
    if (points < 500) rank = "Bronze 🥉";
    if (points >= 500) rank = "Silver 🥈";
    if (points >= 1000) rank = "Gold 🥇";
    if (points >= 1800) rank = "Scholar 📚";
    if (points >= 2800) rank = "Salutatorian 🏫";
    if (points >= 4000) rank = "Valedictorian 🎓";
}

function improvementBonus()
{
    return Math.max(0, (score-previousScore)*2); 
}

function getProfileData()
{
    var profileID = name + "_" + school + "_" + points; 
    
    println("Profile ID: *" + btoa(profileID) + "*");
}

function addAction(action)
{
    actionLog.push(action);
    if (actionLog.length > 8)
    {
        actionLog = actionLog.slice(-8);
    }
    actionDiv.innerText = "Action Log:\n " + actionLog.join("\n");
            
    
}

// Start
Start();
