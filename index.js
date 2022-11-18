var xLimit = 696;
var yLimit = 564;

var isComputerOn = false;
var isChocEaten = "0";
var isBedRipped = "0";
var isWaterDrunk = "0";
var hasPhoneBeenTouched = false;
var count = 1; // using count to iterate through in game audio - yes I know ugly way to do it, but hey it works
var count2 = 1; // count 2 for iterating for button audio
var mobileActive = false;
var isBootyTouchable = true;
var clickingEnabled = true;
var songPlayed = false;
var buttonAudioPlaying = false;
var introPlayedAlready = false;

var audio1 = new Audio();
audio1.src = 'audio/runs-thru-me.mp3';
var audio2 = new Audio();
audio2.src = 'audio/wii.mp3';
var audio3 = new Audio();
audio3.src = 'audio/mine.mp3';
var audio4 = new Audio();
audio4.src = 'audio/lucky.mp3';
var audio5 = new Audio();
audio5.src = 'audio/duck.mp3';
var audio6 = new Audio();
audio6.src = 'audio/georges-fav-song-lol.mp3';
var audio7 = new Audio();
audio7.src = 'audio/doorbell-and-dog.mp3';
var audio8 = new Audio();
audio8.src = 'audio/cat.mp3';

var audio_me_talking_intro = new Audio();
audio_me_talking_intro.src = 'audio/intro.m4a'; 
// To my George! Welcome to this point and click game I made for you for our 5 year anniversary. I hope you're having a nice day so far, and prepare
// to be immersed into this highly detailed and atmospheric scenario, which is set of your bedroom. We spend infinite time napping and cuddling in your room, 
// so I thought it would be cute
// to tell a story around that. I bet you're thinking, wtf Sophie, a story based game, I know I know, you hate story games, you're more a man of logic and strategy.
// But this is your story, you are the main character, so maybe you will relate to it, or you will you feel something different here... 
// I hope this will bring a smile to your face anyway. So, there is a twist, you will not be playing as you or me,
// but as the 3rd smart being that's usually in your room with us. Of course, I mean Cinders. 
// As Cinders, you suddenly realise you want attention, but Sophie and George (i.e. real me and you) are currently fast asleep having a nap.
// Your goal is, wake us up by any means necessary to get attention. It should take you like 5 - 6 minutes to go through all interactions and reach the ending...Goodluck!
var audio_me_talking1 = new Audio();
audio_me_talking1.src = 'audio/1.m4a'; // Hey I love you, like I said your acting as cinders, try to wake us up
var audio_me_talking2 = new Audio();
audio_me_talking2.src = 'audio/2.m4a'; // Meow meow, you cat.
var audio_me_talking3 = new Audio();
audio_me_talking3.src = 'audio/3.m4a'; // I dunno how I can be any more clear
var audio_me_talking4 = new Audio();
audio_me_talking4.src = 'audio/4.m4a'; // Could it be you just want to here my voice? Ooo
var audio_me_talking5 = new Audio();
audio_me_talking5.src = 'audio/5.m4a'; // Hello darling
var audio_me_talking6 = new Audio();
audio_me_talking6.src = 'audio/6.m4a'; // You know you can speak to present Sophie if you want more dialog. Like infinite dialog. 
var audio_me_talking7 = new Audio();
audio_me_talking7.src = 'audio/7.m4a'; // Yeah this is getting awkward, this is preset audio for one button, so im gonna do the thing like how npc's in WOW loop round to the beginning now! 
var audio_me_talking_ending = new Audio();
audio_me_talking_ending.src = 'audio/ending.m4a';
// Um So I hope you had a fun time going through that, I had so much fun making this for you and I love you so much, and I just wanted to make you as feel as loved, happy and special
// as you have made me feel for the past 5 years... Here's to many more naps, cuddles, kisses and memories together... From your Sophie :)



function playButtonAudio() {
    document.getElementById('butt').disabled = true;
    buttonAudioPlaying = false;
    if (count2 == 9) {
        count2 = 2;
    }
    switch (count2) {   
        case 1:
            audio_me_talking_intro.play();
            count2++;
            if (!introPlayedAlready) {
                audio_me_talking_intro.addEventListener('ended', function() {
                    document.getElementById('butt').disabled = false;
                    document.body.style.backgroundImage = "url('frames/start.png')";
                    buttonAudioPlaying = true;
                    introPlayedAlready = true;
                });
            }
            break;
        case 2:
            audio_me_talking1.play();
            count2++;
            enableButtonOnAudioEnd(audio_me_talking1);
            break;
        case 3:
            audio_me_talking2.play();
            count2++;
            enableButtonOnAudioEnd(audio_me_talking2);
            break;
        case 4:
            audio_me_talking3.play();
            count2++;
            enableButtonOnAudioEnd(audio_me_talking3);
            break;
        case 5:
            audio_me_talking4.play();
            count2++;
            enableButtonOnAudioEnd(audio_me_talking4);
            break;
        case 6:
            audio_me_talking5.play();
            count2++;
            enableButtonOnAudioEnd(audio_me_talking5);
            break;
        case 7:
            audio_me_talking6.play();
            count2++;
            enableButtonOnAudioEnd(audio_me_talking6);
            break;
        case 8:
            audio_me_talking7.play();
            count2++;
            enableButtonOnAudioEnd(audio_me_talking7);
            break;
    }
}

function enableButtonOnAudioEnd(audio) {
    audio.addEventListener('ended', function() {
        document.getElementById('butt').disabled = false;
        buttonAudioPlaying = true;
    });
}

(function() {
    document.onclick = handleMouseClick;
    function handleMouseClick(e) {
        if (!buttonAudioPlaying || !clickingEnabled) {} else {

            if (!songPlayed) {
                audio1.volume = 0.05;
                audio1.play();
                songPlayed = true;
            }

            let x = e.clientX;
            let y = e.clientY;

            if (!isComputerOn) {
                if (insideComputer(x, y)) {
                    document.body.style.backgroundImage = "url('frames/light.png')";
                    isComputerOn = true;
                    alert("Cinders 🐾: I can see better now... but it wasn't enough to wake them up.")
                } else if (insideLightSwitch(x, y)) {
                    alert("Cinders 🐾: That light switch is too high up for me to reach...");
                } else {
                    alert("Cinders 🐾: It's too dark I need to find a light source first.");
                }
                return;
            }

            if (insideGlass(x, y)) {
                // if already drunk don't change img. Say different dialog. e.g. I already drunk this water.
                if (isWaterDrunk != "1") {
                    isWaterDrunk = "1";
                    updateBackgroundImg();
                    alert("Cinders 🐾: I feel a bit thirsty. I'm sure they won't notice if I only have a sip");
                } else {
                    alert("Cinders 🐾: I don't feel like having any more water.");
                }
                
            } else if (insideChoc(x, y)) {
                if (isChocEaten != "1") {
                    alert("Cinders 🐾: chocolate pretzels - nom nom nom");
                    isChocEaten = "1";
                    updateBackgroundImg();
                } else {
                    alert("Cinders 🐾: all the pretzels are gone.. uh oh.");
                }
                //
            } else if (insideBed(x, y)) {
                if (isBedRipped != "1") {
                    alert("Cinders 🐾: The bed - Quite convenient, my claws need a trim!");
                    isBedRipped = "1";
                    updateBackgroundImg();
                } else {
                    alert("Cinders 🐾: I wonder if George will notice my personal touch to the mattress.");
                }
                //
            } else if (insideFloorPlates(x, y)) {
                alert("Cinders 🐾: Floor plates *sniff sniff*");
            } else if (insideHair(x, y)) {
                alert("Cinders 🐾: I try to tickle George's face, but he is already immune since he gets Sophie's hair in his face all the time.");
            } else if (insideLaptop(x, y)) {
                if (isWaterDrunk == "0" || isChocEaten == "0" || isBedRipped == "0") {
                    alert("Cinders 🐾: Hmm, the laptop is awfully close to George, even if it does wake him up, I think he'd be mad at me for messing around on his laptop for the 10th time today. I need to try all other options first...");
                } else {
                    switch(count) {
                        case 1:
                            audio1.pause();
                            audio2.play();
                            break;
                        case 2:
                            audio2.pause();
                            audio3.play();
                            break;
                        case 3:
                            audio3.pause();
                            audio4.play();
                            break;
                        case 4:
                            audio4.pause();
                            audio5.play();
                            break;
                        case 5:
                            audio5.pause();
                            audio6.play();
                            break;  
                    }

                    count ++;
                    alert("Cinders 🐾: I switch the song!");

                    if (count == 6) {
                        clickingEnabled = false;
                        setTimeout(function() { 
                            document.body.style.backgroundImage = "url('frames/reach.png')";
                            setTimeout(function() { 
                                document.body.style.backgroundImage = "url('frames/1_1_1.png')";
                                setTimeout(function() { 
                                    document.body.style.backgroundImage = "url('frames/pixil-frame-18.png')";
                                    mobileActive = true;
                                    isBootyTouchable = false;
                                    clickingEnabled = true;
                                    audio6.pause();
                                }, 1000);
                            }, 2000);
                        }, 6000);
                    }
                }
            } else if (insideDoor(x, y)) {
                alert("Cinders 🐾: Big heavy fat door... I never could push it open :(");
            } else if (insideWarhammer(x, y)) {
                alert("Cinders 🐾: Grey knights - I wonder when was the last time my human played with those?");
            } else if (insideLightSwitch(x, y)) {
                alert("Cinders 🐾: 'you turn me on like a light switch hmm hmm hmm' ♪♪♪... wait I shouldn't know that.");
            } else if (insideSophieHair(x, y)) {
                alert("Cinders 🐾: Sophie's hair strand. They are all over the place. She must shed more than me!");
            } else if (insideChest(x, y)) {
                alert("Cinders 🐾: A Chest - a decent place to have a nap");
            } else if (insideBox(x, y)) {
                alert("Cinders 🐾: A Cardboard box - stores more unused warhammer?");
            } else if (insideCeilingLamp(x, y)) {
                alert("Cinders 🐾: A Ceiling light - pretty bare");
            } else if (insideDreamCatcher(x, y)) {
                alert("Cinders 🐾: A Dream catcher - I can never catch it, what even are dreams?");
            } else if (insideChestOfDrawers(x, y)) {
                alert("Cinders 🐾: A Chest of drawers - containing a mixture of my human's different fur choices for the day.");
            } else if (insideSinglePlate(x, y)) {
                alert("Cinders 🐾: Another plate that's missing from the kitchen");
            } else if (insideBooks(x, y)) {
                alert("Cinders 🐾: A collection of my human's old and nostalgic books");
            } else if (insideDinoToy(x, y)) {
                alert("Cinders 🐾: A cute spinosaurus toy from a trip to the museum");
            } else if (insideFrogToy(x, y)) {
                alert("Cinders 🐾: A fluffy froggo gift from many valenties ago");
            } else if (insideMeepToy(x, y)) {
                alert("Cinders 🐾: A squeeky, comical doggo toy");
            } else if (insideDeskLamp(x, y)) {
                alert("Cinders 🐾: A desk light - the remote went missing ages ago");
            } else if (insideMechanicalKeyboard(x, y)) {
                alert("Cinders 🐾: A mechanical keyboard, when I walk over it the noise it makes is nice - tap🐾 tap🐾 tap🐾 tap🐾");
            } else if (insideMouse(x, y)) {
                alert("Cinders 🐾: A mouse - not usually the kind I like though");
            } else if (insideMic(x, y)) {
                alert("Cinders 🐾: A suspicious looking audio device.");
            } else if (insideMonitors(x, y)) {
                alert("Cinders 🐾: George's very nice dual monitor setup");
            } else if (insideComputer(x, y)) {
                alert("Cinders 🐾: OOOoOO make bright magic lights! My human has the best things.");
            } else if (insideChair(x, y)) {
                alert("Cinders 🐾: The chair - my next favourite place to sleep");
            } else if (isBootyTouchable && insideBooty(x, y)) {
                alert("Cinders 🐾: I try to tap Sophies booty, she doesn't react, maybe because she's used to harder slaps");
            } else if (insideMobilePhone(x, y)) {
                if (confirm("Cinders 🐾: This bright device lit up - it has a big red button saying 'OR-DE-R', should I press it?")) {
                    clickingEnabled = false;
                    alert("30 minutes later......");
                        setTimeout(function() { 
                            document.body.style.backgroundImage = "url('frames/pixil-frame-19.png')";
                            setTimeout(function() { 
                                audio7.play();
                                document.body.style.backgroundImage = "url('frames/pixil-frame-20.png')";
                                setTimeout(function() { 
                                    audio7.pause();
                                    alert("Sophie 💜: George I think somebodies at the door");
                                    alert("George 💙: FFS, I don't think anyone's meant to be home yet, let me go check..");
                                    document.body.style.backgroundImage = "url('frames/pixil-frame-21.png')";
                                    setTimeout(function() { 
                                        alert("George 💙: Sophie? We have bubble tea did you order this?");
                                        alert("Sophie 💜: What noooo, I didn't I promise, but it says I have an order on my phone so weird...");
                                        alert("George 💙: So you did then silly");
                                        audio8.play();
                                        document.body.style.backgroundImage = "url('frames/pixil-frame-22.png')";
                                        setTimeout(function() { 
                                            alert("Sophie 💜: Well it's here now I guess, shh or you don't get the other miracle bubble tea :p");
                                            alert("George 💙: Nonono (my lychee mango)! Thank you baby");
                                            alert("Sophie 💜: I think Cinders is trying to get your attention by the way");
                                            alert("George 💙: Nahhh she's chilling");
                                            alert("Sophie 💜: Just like us then.. I love you");
                                            alert("George 💙: I love you too");
                                            alert("Sophie 💜: I love you... more");
                                            alert("George 💙: ...");
                                            alert("George 💙: ....");
                                            alert("George 💙: ..........");
                                            alert("The end!");
                                            //switch to ending photo :)
                                            document.body.style.backgroundSize = "300px 600px";
                                            document.body.style.backgroundImage = "url('frames/us.jpg')";
                                            audio8.pause();
                                            audio_me_talking_ending.play();
                                        }, 6000);
                                    }, 6000);
                                }, 5000);
                            }, 4000);
                        }, 1000);
                } else {
                    alert("Hint - You might want to click OK to get the ending -.-")
                }

            } else if (outOfBounds(x, y)) {
                console.log("out of bounds");
            } else {
                console.log(x, y);
            }
        } 
    }
})();

function updateBackgroundImg() {
    let name = "frames/" + isChocEaten + "_" + isWaterDrunk + "_" + isBedRipped + ".png";
    document.body.style.backgroundImage = "url(" + name + ")";
}

function outOfBounds(x, y) {
    return x >= xLimit || y >= yLimit;
}

function insideMobilePhone(x, y) {
    return x >= 649 && y >= 475
    && x <= 674 && y <= 501;
}

// inside the coordinate bounds not literally
function insideBooty(x, y) {
    return x >= 493 && y >= 420
    && x <= 577 && y <= 484;
}

function insideChair(x, y) {
    return x >= 185 && y >= 165
    && x <= 257 && y <= 291;
}

function insideComputer(x, y) {
    return x >= 112 && y >= 189
    && x <= 172 && y <= 266;
}

function insideMonitors(x, y) {
    return x >= 0 && y >= 90
    && x <= 64 && y <= 171;
}

function insideMic(x, y) {
    return x >= 83 && y >= 142
    && x <= 98 && y <= 164;
}

function insideMouse(x, y) {
    return x >= 92 && y >= 170
    && x <= 108 && y <= 179;
}

function insideMechanicalKeyboard(x, y) {
    return x >= 38 && y >= 189
    && x <= 92 && y <= 204;
}

function insideDeskLamp(x, y) {
    return x >= 0 && y >= 211 
    && x <= 35 && y <= 240;
}

function insideMeepToy(x, y) {
    return x >= 319 && y >= 97 
    && x <= 339 && y <= 109;
}

function insideFrogToy(x, y) {
    return x >= 309 && y >= 56 
    && x <= 330 && y <= 81;
}

function insideDinoToy(x, y) {
    return x >= 339 && y >= 68 
    && x <= 353 && y <= 89;
}

function insideBooks(x, y) {
    return x >= 300 && y >= 0 
    && x <= 352 && y <= 46;
}

function insideSinglePlate(x, y) {
    return x >= 295 && y >= 87 
    && x <= 316 && y <= 98;
}

function insideChestOfDrawers(x, y) {
    return x >= 280 && y >= 122 
    && x <= 365 && y <= 290;
}

function insideDreamCatcher(x, y) {
    return x >= 93 && y >= 0 
    && x <= 132 && y <= 65;
}

function insideDreamCatcher(x, y) {
    return x >= 93 && y >= 0 
    && x <= 132 && y <= 65;
}

function insideCeilingLamp(x, y) {
    return x >= 175 && y >= 0 
    && x <= 195 && y <= 40;
}

function insideBox(x, y) {
    return x >= 0 && y >= 260 
    && x <= 38 && y <= 299;
}

function insideChest(x, y) {
    return x >= 0 && y >= 300 
    && x <= 50 && y <= 380;
}

function insideGlass(x, y) {
    return x >= 85 && y >= 455 
    && x <= 140 && y <= 550;
}

function insideChoc(x, y) {
    return x >= 20 && y >= 390 
    && x <= 84 && y <= 445;
}

function insideBed(x, y) {
    return x >= 150 && y >= 360 
    && x <= 490 && y <= 515;
}

function insideFloorPlates(x, y) {
    return x >= 110 && y >= 315 
    && x <= 165 && y <= 343;
}

function insideHair(x, y) {
    return x >= 600 && y >= 360 
    && x <= 650 && y <= 405;
}

function insideLaptop(x, y) {
    return x >= 510 && y >= 288 
    && x <= 590 && y <= 347;
}

function insideDoor(x, y) {
    return x >= 400 && y >= 69 
    && x <= 560 && y <= 282;
}

function insideWarhammer(x, y) {
    return x >= 633 && y >= 65 
    && x <= 693 && y <= 130;
}

function insideLightSwitch(x, y) {
    return x >= 685 && y >= 163 
    && x <= xLimit && y <= 184;
}

function insideSophieHair(x, y) {
    return x >= 275 && y >= 315 
    && x <= 315 && y <= 325;
}