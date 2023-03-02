"use strict";
//let a, b;
let playerName = "";
let dispffl = 1;
let butNum = 6;

let mapSize = 200;
let dispMap = ".wTO^~M+?-";
let dispMapC = ["black", "green", "green", "grey", "brown", "blue", "grey", "black", "red", "blue"];
let startPos = 5;
let statusNum = 10;
let skillNum = 10;
let dayNightD = 35;
let dayTime = 50;

let entity_0 = document.getElementById("id_0");
let entity_but = new Array;
let entity_info = document.getElementById("id_info");
for (let i = 1; i <= butNum; i++)entity_but[i] = document.getElementById("id_but" + i);
let entity_bag = document.getElementById("id_bag");
let entity_map = document.getElementById("id_map");

let butFunc = new Array, butStr = new Array;
let nst = "啦啦啦", mst = nst;
let Rand = (l, r) => (Math.ceil(Math.random() * r) % (r - l + 1) + l);
function choice(question, y, n) {
    if (confirm(question)) y();
    else n();
}

let msgbox = new Array, msgst = 1, msgfi = 0;
let hismsg = "", lastmsg = "", tmpmsg = "";
function chkbox() {
    //    fdispMap();
    entity_info.innerHTML = "HP:" + Player.HP + "/" + Player.maxHP + "&nbsp;ATK:" + Player.allatk + "&nbsp;DEF:" + Player.alldef + "<br/>";
    entity_info.innerHTML += "exp:" + Player.nowexp + "/" + Player.maxexp + "&nbsp;coin:" + Player.nowcoin + "&nbsp;step:" + nowStep;
    if (msgst > msgfi) {
        if (dispffl == 1) {
            dispffl = 0;
            for (let i = 1; i <= butNum; i++) {
                entity_but[i].style.backgroundColor = "";
            }
        }
        return;
    }
    if (dispffl == 0) {
        dispffl = 1;
        for (let i = 1; i <= butNum; i++) {
            entity_but[i].style.backgroundColor = "#cfcfcf";
        }
    }
    if (msgbox[msgst].length > 0) {
        if (msgbox[msgst][0] == '{') lastmsg += "<font color=\"purple\"><b>", tmpmsg = "</b></font>";
        else if (msgbox[msgst][0] == '@') lastmsg += "<br/>";
        else if (msgbox[msgst][0] == '}') lastmsg += "</b></font>", tmpmsg = "";
        else lastmsg += msgbox[msgst][0];
        msgbox[msgst] = msgbox[msgst].substring(1);
    } else if (msgbox[msgst].length == 0) {
        hismsg = lastmsg + "<br/>" + hismsg;
        lastmsg = "";
        msgst++;
    }
    if (lastmsg != "") entity_0.innerHTML = lastmsg + tmpmsg + "<br/>" + hismsg;
    else entity_0.innerHTML = hismsg;
}
setInterval("chkbox()", 50);
function dispMessage(st, np) {
    msgbox[++msgfi] = st;
    //    entity_0.innerHTML = st + "<br/>" + entity_0.innerHTML;
    //        if (np == 0) entity_0.innerHTML = "<br/>" + entity_0.innerHTML,tempMessage0 = "",lastMessage0=entity_0.innerHTML,dispffl=0;
    //        if (np >= st.length) {
    //        dispffl = 1;
    //        return;
    //    }
    //    tempMessage0 += st.substring(np,np+1);
    //    entity_0.innerHTML= tempMessage0+lastMessage0;
    //    setTimeout("dispMessage(\"" + st + "\"," + (np + 1) + ")", 50);
}
function waitingFor(sfunc) {
    if (dispffl == 1) {
        setTimeout(sFunc, 100);
        return;
    }
    setTimeout("waitingFor(\"" + sfunc + "\")", 50);
}
function messageAndfunc(st, sfunc) {
    dispMessage(st, 0);
    waitingFor(sfunc);
}
function butClick(butNum) {
    if (dispffl == 1) return;
    butFunc[butNum]();
    //    if(butStr[butNum]!="")dispMessage(butStr[butNum]);
}
function fdispMap() {
    let ns = "";
    for (let i = nowX - 4; i <= nowX + 4; i++) {
        for (let j = nowY - 4; j <= nowY + 4; j++) {
            if (i < 0 || i > mapSize + 1 || j < 0 || j > mapSize + 1) ns += "&nbsp;";
            else if (seemap[i][j] == 0) ns += "&nbsp;";
            else if (i == nowX && j == nowY) ns += "@";
            else ns += "<font color=\"" + dispMapC[allmap[i][j]] + "\">" + dispMap[allmap[i][j]] + "</font>";
        }
        ns += "<br/>";
    }
    entity_map.innerHTML = ns;
}
function getName(ena) {
    let nname = msg[34];
    if (typeof (ena.enemyName) != "undefined") nname = ena.enemyName;
    return nname;
}
function statusChange(ena, nsta, typ) {
    let nname = getName(ena);
    if (nsta == 1) {
        dispMessage(nname + msg[17]);
        ena.sta[1] = 5;
    } else if (nsta == 2) {
        dispMessage(nname + msg[71]);
        ena.sta[2] = 2;
    } else if (nsta == 6) {
        dispMessage(nname + msg[67] + nname);
        ena.enemyName = "毒" + ena.enemyName;
        ena.sta[6] = 1000;
    }
}
let nowX = startPos, nowY = startPos, nowbcg = 0, nowStep = 0, nowDay = 0, inNight = 0;
let allmap = new Array;
let bcgmap = new Array;
let seemap = new Array;
let deathfl = 0, winfl = 0;
let firstChest = 0;
let NJeatCount = 0,NJfl=0;

let Player = {
    maxHP: 0,
    HP: 0,
    LVL: 1,
    nowexp: 0,
    maxexp: 0,
    nowcoin: 0,
    atk: 3,
    allatk: 3,
    def: 0,
    alldef: 0,
    bag: new Array,
    singbag: new Map,
    singcnt: 0,
    sta: new Array,
    ski: new Array,
    mag:[0,0,0,0,0],
    onhand: 0,
    onhead: 0,
    clothes: 0,
    checkDeath: function () {
        if (this.HP <= 0) {
            this.HP = 0;
            dispMessage(msg[21]);
            deathfl = 1;
            butFunc = [0];
            butStr = ["", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
            for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
            return true;
        } else return false;
    }
}
let nowEnemy = {
    enemyName: "",
    maxHP: 0,
    HP: 0,
    atk: 0,
    def: 0,
    sta: new Array,
    ski: new Array,
    mag:[0,0,0,0,0],
    monsid: 0,
    checkDeath: function () {
        if (this.HP <= 0) {
            this.HP = 0;
            winfl = 1;
            dispMessage(msg[34] + msg[35] + this.enemyName);
            Player.nowexp += this.getExp;
            Player.nowcoin += this.getCoin;
            dispMessage(msg[36] + this.getExp + msg[37] + this.getCoin);
            for (let i = 0; i < this.itemv; i++) {
                if (Rand(1, 100) <= this.dropItem[i].p) {
                    let nc = Rand(this.dropItem[i].minc, this.dropItem[i].maxc)
                    Player.bag[this.dropItem[i].item_id] += nc;
                    dispMessage(msg[41] + itm_name[this.dropItem[i].item_id] + "*" + nc);
                }
            }
            return true;
        }
        return false;
    }
}
//allmap:1-bush;2-tree;3-stone;4-hill;5-water;6-mountain;7-cave;8-chest;9-sea
function InitMap0() {
    for (let i = 1; i <= 50000; i++) {//add bush
        let nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 1;
    }
    for (let i = 1; i <= 50000; i++) {//add trees
        let nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 2;
    }
    for (let i = 1; i <= 50000; i++) {//add stones
        let nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 3;
    }
    for (let i = 1; i <= 50000; i++) {//add hills
        let nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 4;
    }
    for (let i = 1; i <= 50000; i++) {//add waters
        let nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 5;
    }
    for (let i = 1; i <= 50000; i++) {//add chests
        let nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 8;
    }
}
function InitMap() {
    for (let i = 1; i <= 5000; i++) {
        let nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 1;
        nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 2;
        nx = Rand(1, mapSize), ny = Rand(1, mapSize);
        allmap[nx][ny] = 3;
        if (i % 2 == 0) {
            nx = Rand(1, mapSize), ny = Rand(1, mapSize);
            allmap[nx][ny] = 4;
            nx = Rand(1, mapSize), ny = Rand(1, mapSize);
            allmap[nx][ny] = 5;
            if (i % 4 == 0) {
                nx = Rand(1, mapSize), ny = Rand(1, mapSize);
                allmap[nx][ny] = 8;
            }
        }
    }
    allmap[startPos - 1][startPos] = allmap[startPos + 1][startPos] = 1;
    allmap[startPos][startPos - 1] = allmap[startPos][startPos + 1] = 1;
    let nx = Rand(startPos - 2, startPos + 2), ny = Rand(startPos - 2, startPos + 2);
    while (nx == ny || allmap[nx][ny] == 1) nx = Rand(startPos - 2, startPos + 2), ny = Rand(startPos - 2, startPos + 2);
    allmap[nx][ny] = 8;
}
function Init() {
    nowStep = 0, nowDay = 1, inNight = 0;
    for (let i = 0; i <= mapSize + 1; i++) allmap[i] = new Array, bcgmap[i] = new Array, seemap[i] = new Array;
    for (let i = 0; i <= mapSize + 1; i++) {
        for (let j = 0; j <= mapSize + 1; j++) {
            allmap[i][j] = 0;
            bcgmap[i][j] = 0;
            seemap[i][j] = 0;
        }
    }
    for (let i = 1; i <= mapSize; i++) {
        bcgmap[i][1] = bcgmap[i][mapSize] = bcgmap[1][i] = bcgmap[mapSize][i] = 1;
    }
    for (let i = 0; i <= mapSize + 1; i++) {
        allmap[i][0] = allmap[i][mapSize + 1] = allmap[0][i] = allmap[mapSize + 1][i] = 9;
    }

    InitMap();

    for (let i = 1; i <= itmNum; i++)Player.bag[i] = 0;
    Player.maxHP = Player.HP = 100;
    Player.LVL = 1;
    Player.allatk = Player.atk = 3, Player.alldef = Player.def = 0;
    for (let i = 1; i <= statusNum; i++) Player.sta[i] = 0;
    for (let i = 1; i <= skillNum; i++)Player.ski[i] = 0;
    Player.nowexp = Player.nowcoin = 0, Player.maxexp = 5;
    entity_bag.setAttribute("hidden", true);
    entity_map.setAttribute("hidden", true);
    //add
    Player.bag[12] = 5;
    Player.bag[5] = 10;
    GetItem(2, -1), GetItem(3, -1), GetItem(4, -1);
    Player.mag[1] = 1, Player.mag[2] = 2;
}
Init();

function GetWeaponName(item_id) {
    if (item_id == 0) return "手";
    else return Player.singbag.get(item_id).itmname;
}
function GetItem(item_id, nownum) {
    if (nownum >= 0) {
        Player.bag[item_id] += nownum;
        dispMessage(msg[41] + itm_name[item_id] + "*" + nownum, 0);
    } else {
        Player.singcnt++;
        Player.singbag.set(Player.singcnt, sing_itm[item_id]);
        dispMessage(msg[41] + sing_itm[item_id].itmname);
    }
}
function useItem(item_id, item_ty) {
    useIteming.starting(item_id, item_ty);
}
function damage_hand() {
    dispMessage(msg[25]);
    let now_damage = Math.ceil(Player.maxHP * 0.1);
    Player.HP -= now_damage;
    dispMessage(msg[34] + msg[26] + now_damage + msg[19]);
}
function calcMons() {
//    return true;
    if (nowStep <= 1) return false;
    if (inNight == 1) {
        if (Rand(1, 5) == 2) return true;
        else return false;
    }
    if (Rand(1, 5) == 1) return true;
    else return false;
}
function chooseMons() {
//    if (Rand(1, 2) == 1) return 3;
//    else return 6;

    if (inNight == 1) {
        if (Rand(1, 2) == 1) {
            return 4;
        }
    }
    let np = Rand(1, 100);
    if (nowDay <= 1) {
        if (np <= 80) return 1;
        else return 2;
    } else if (nowDay <= 3) {
        if (np <= 60) return 1;
        else if (np <= 90) return 2;
        else return 3;
    } else if (nowDay <= 6) {
        if (np <= 30) return 1;
        else if (np <= 70) return 2;
        else return 3;
    } else if (nowDay <= 10) {
        if (np <= 20) return 1;
        else if (np <= 40) return 2;
        else return 3;
    }
}
function prepBattle(mid) {
    winfl = 0;
    for (let key in almon[mid]) nowEnemy[key] = almon[mid][key];
    nowEnemy.HP = nowEnemy.maxHP;
    dispMessage(msg[32] + nowEnemy.enemyName);
}
function calcatkdef() {
    if (Player.onhand == 0) Player.allatk = Player.atk;
    else Player.allatk = Player.atk + Player.singbag.get(Player.onhand).itmval;
    Player.alldef = Player.def;
}
function calcAtkDamage(ena, enb) {
    let natk = ena.atk, ndef = enb.def;
    if (typeof (ena.allatk) != "undefined") natk = ena.allatk;
    if (typeof (enb.alldef) != "undefined") ndef = enb.alldef;
    return Math.max(natk - ndef, 0);
}
function runSuccess() {
    if (nowDay == 1) return (Rand(1, 10) <= 7);
    else return (Rand(1, 2) == 1);
}
function checksta(ena) {
    if (ena.sta[1] > 0) {
        let nt = Math.max(3,Math.ceil(0.1 * ena.maxHP));//poison
        dispMessage(getName(ena)+msg[18] + nt + msg[19]);
        ena.HP -= nt;
        if (ena.checkDeath()) return;
        ena.sta[1]--;
        if (ena.sta[1] == 0) {
            dispMessage(getName(ena)+msg[20]);
        }
    }
    if (ena.sta[2] > 0) {
        let nt = Math.max(5, Math.ceil(0.2 * ena.maxHP));
        dispMessage(getName(ena)+msg[72] + nt + msg[19]);
        ena.HP -= nt;
        if(ena.checkDeath())return;
        ena.sta[2]--;
        if (ena.sta[2] == 0) {
            dispMessage(getName(ena)+msg[73]);
        }
    }
}
let Walking = {
    WalkW: function () {
        nowX--;
        dispMessage(msg[4], 0);
        Eventing.starting();
        //        setTimeout("Eventing.starting()", 1000);
    },
    WalkA: function () {
        nowY--;
        dispMessage(msg[7], 0);
        Eventing.starting();
    },
    WalkS: function () {
        nowX++;
        dispMessage(msg[5], 0);
        Eventing.starting();
    },
    WalkD: function () {
        nowY++;
        dispMessage(msg[6], 0);
        Eventing.starting();
    },
    WalkSea: function () {
        Player.HP = 0;
        Player.checkDeath();
    },
    checkBag: function () {
        dispMessage(msg[12], 0);
        Baging.starting();
    },
    setBut: function () {
        butFunc = [0, this.WalkW, this.WalkA, this.WalkS, this.WalkD, this.checkBag];
        butStr = ["", str[3], str[6], str[4], str[5], str[9], "&nbsp;"];
        if (nowX == 1) butFunc[1] = this.WalkSea, butStr[1] = str[14];
        if (nowY == 1) butFunc[2] = this.WalkSea, butStr[2] = str[14];
        if (nowY == mapSize) butFunc[3] = this.WalkSea, butStr[3] = str[14];
        if (nowX == mapSize) butFunc[4] = this.WalkSea, butStr[4] = str[14];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[3] + bcgname[nowbcg] + msg[30], 0);
        this.setBut();
        //        setTimeout("Walking.setBut()", 1000);
    }
}
let Eventing = {
    setBut: function () {
        butFunc = [0, this.sayYes, this.sayNo];
        butStr = ["", "yes", "no", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        nowStep++;
        if (nowStep % dayTime == 0) {
            inNight = 0;
            if (dayNightD > 25) dayNightD--;
            dispMessage(msg[49]);
        } else if (nowStep % dayTime == dayNightD) {
            inNight = 1;
            dispMessage(msg[48]);
        } else if (nowStep % dayTime == dayNightD - 10) {
            dispMessage(msg[50]);
        }
        if (nowbcg != bcgmap[nowX][nowY]) {
            nowbcg = bcgmap[nowX][nowY];
            dispMessage(msg[29] + bcgname[nowbcg]);
        }
        checksta(Player);
        if (deathfl == 1) return;
        if (nowStep == 10) {
            E_camo1.starting();
            return;
        }
        if (calcMons()) {
            prepBattle(chooseMons());
            Battleing.starting();
            return;
        }
        if (NJeatCount >= 20 && NJfl == 0) {
            dispMessage(msg[76]);
            NJfl = 1;
            LearnMaging.starting(1);
            return;
        }
        if (allmap[nowX][nowY] == 0) {
            dispMessage(msg[8], 0);
            Walking.starting();
        } else if (allmap[nowX][nowY] == 1) {
            meetBush.starting();
        } else if (allmap[nowX][nowY] == 2) {
            meetTree.starting();
        } else if (allmap[nowX][nowY] == 3) {
            meetStone.starting();
        } else if (allmap[nowX][nowY] == 4) {
            meetHill.starting();
        } else if (allmap[nowX][nowY] == 5) {
            meetWater.starting();
        } else if (allmap[nowX][nowY] == 8) {
            meetChest.starting();
        }
        //        this.setBut();
    }
}
let meetBush = {
    sayYes: function () {
        dispMessage(msg[10], 0);
        if (Rand(1, 5) <= 4) GetItem(3, 1);
        else GetItem(4, 1);
        Walking.starting();
    },
    sayNo: function () {
        dispMessage(msg[11], 0);
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, this.sayYes, this.sayNo];
        butStr = ["", str[7], str[8], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[9], 0);
        this.setBut();
    }
}
let meetTree = {
    sayYes: function () {
        dispMessage(msg[23] + GetWeaponName(Player.onhand) + msg[24], 0);
        if (Player.onhand == 0) {
            damage_hand();
            if(Player.checkDeath())return;
        } else if (Player.singbag.get(Player.onhand).itmty2 != 1) {
            dispMessage(msg[57]);
        } else {
            dispMessage(msg[58]);
            GetItem(6, Rand(10, 15));
            allmap[nowX][nowY] = 0;
        }
        Walking.starting();
    },
    sayNo: function () {
        dispMessage(msg[11], 0);
        Walking.starting();
    },
    climbTree: function () {
        let np = 0;
        if (Player.ski[1] == 0) np = 5;
        else np = 10;
        if (Rand(1, 10) <= np) {
            dispMessage(msg[27]);
            seeMaping.starting();
            return;
        } else {
            dispMessage(msg[28]);
            damage_hand();
            if(Player.checkDeath())return;
        }
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, this.sayYes, this.sayNo, this.climbTree];
        butStr = ["", str[12], str[8], str[13], "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[22], 0);
        this.setBut();
    }
}
let meetStone = {
    sayYes: function () {
        dispMessage(msg[23] + GetWeaponName(Player.onhand) + msg[43], 0);
        if (Player.onhand == 0) {
            damage_hand();
            if(Player.checkDeath())return;
        } else if (Player.singbag.get(Player.onhand).itmty2 != 2) {
            dispMessage(msg[59]);
        } else {
            dispMessage(msg[60]);
            GetItem(7, Rand(10, 15));
            if (Rand(1, 3) == 1) GetItem(8, Rand(1, 3));
            allmap[nowX][nowY] = 0;
        }
        Walking.starting();
    },
    sayNo: function () {
        dispMessage(msg[11], 0);
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, this.sayYes, this.sayNo];
        butStr = ["", str[20], str[8], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[42], 0);
        this.setBut();
    }
}
let meetWater = {
    sayYes: function () {
        dispMessage(msg[45], 0);
        Walking.starting();
    },
    sayNo: function () {
        dispMessage(msg[11], 0);
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, this.sayYes, this.sayNo];
        butStr = ["", str[19], str[8], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[44], 0);
        this.setBut();
    }
}
let meetHill = {
    sayYes: function () {
        dispMessage(msg[47], 0);
        Walking.starting();
    },
    sayNo: function () {
        dispMessage(msg[11], 0);
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, this.sayYes, this.sayNo];
        butStr = ["", str[21], str[8], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[46], 0);
        this.setBut();
    }
}
let meetChest = {
    sayYes: function () {
        if (Rand(1, 10) <= 9) {
            if (firstChest == 0) {
                firstChest = 1;
                GetItem(2, -1);
            } else {
                let ni = Rand(1, 100);
                if (ni <= 30) {
                    GetItem(Rand(1, 4), -1);
                } else if (ni <= 95) {
                    let nj = Rand(1, 3);
                    if (nj == 1) GetItem(8, Rand(1, 2));
                    else if (nj == 2) GetItem(11, Rand(1, 2));
                    else if (nj == 3) GetItem(12, Rand(1, 2));
                } else {
                    GetItem(9, Rand(1, 2));
                }
            }
        }
        allmap[nowX][nowY] = 0;
        Walking.starting();
    },
    sayNo: function () {
        dispMessage(msg[11], 0);
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, this.sayYes, this.sayNo];
        butStr = ["", str[22], str[8], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[51], 0);
        this.setBut();
    }
}
let Baging = {
    returnBag: function () {
        entity_bag.setAttribute("hidden", true);
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, 0, 0, 0, 0, 0, 0];
        butStr = ["", "", "", "", "", "", ""];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        this.setBut();
        let nst = "";
        for (let i = 1; i <= itmNum; i++) {
            if (Player.bag[i] > 0) {
                nst += "<button class=\"bagbutt\" onclick=\"useItem(" + i + ",0)\" id=\"id_bag_" + i + "\">" + itm_name[i];
                if (Player.bag[i] > 1) nst += " *" + Player.bag[i];
                nst += "</button><br/>";
            }
        }
        for (let i = 1; i <= Player.singcnt; i++) {
            if (typeof (Player.singbag.get(i)) != "undefined") {
                let nname = Player.singbag.get(i).itmname;
                if (Player.onhand == i || Player.onhead == i || Player.clothes == i) nname = "[E]" + nname;
                nst += "<button class=\"bagbutt\" onclick=\"useItem(" + i + ",-1)\" id=\"id_singbag_" + i + "\">" + nname;
                nst += "</button><br/>";
            }
        }
        nst += "<button class=\"bagbutt\" onclick=\"Baging.returnBag()\" id=\"id_bag_return\">返回</button><br/>";
        entity_bag.innerHTML = nst;
        entity_bag.removeAttribute("hidden");
    }
}
let useIteming = {
    nowitem_id: 0,
    nowitem_ty: 0,
    poisoned_bush: 0,
    returnBag: function () {
        entity_bag.setAttribute("hidden", true);
        Walking.starting();
    },
    eatBush: function () {
        entity_bag.setAttribute("hidden", true);
        Player.bag[useIteming.nowitem_id]--;
        if (useIteming.poisoned_bush == 1) {
            dispMessage(msg[15]);
            statusChange(Player,1, 1);
            butFunc = [0, useIteming.returnBag];
            butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
            for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
        } else {
            dispMessage(msg[16]);
            let nt = Math.min(Player.maxHP - Player.HP, 10);
            Player.HP += nt;
            dispMessage(msg[54] + nt);
            useIteming.returnBag();
        }
    },
    eatItem: function () {
        entity_bag.setAttribute("hidden", true);
        Player.bag[useIteming.nowitem_id]--;
        if (useIteming.nowitem_id == 5) NJeatCount++;
        dispMessage(msg[53] + itm_name[useIteming.nowitem_id]);
        let nt = Math.min(Player.maxHP - Player.HP, caneat[useIteming.nowitem_id].recHP);
        Player.HP += nt;
        dispMessage(msg[54] + nt);
        useIteming.returnBag();
    },
    setBut: function (item_id, item_ty) {
        if (item_id == -1) {
            butFunc = [0, this.returnBag];
            butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        } else {
            if (item_ty == 0) {
                if (item_id == 3 || item_id == 4) {
                    this.poisoned_bush = 4 - item_id;
                    butFunc = [0, this.eatBush, this.returnBag];
                    butStr = ["", str[10], str[11], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
                } else if (caneat[item_id].fl == 1) {
                    butFunc = [0, this.eatItem, this.returnBag];
                    butStr = ["", str[10], str[11], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
                }
            }
        }
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function (item_id, item_ty) {
        this.nowitem_id = item_id;
        this.nowitem_ty = item_ty;
        if (item_ty == 0) {
            if (item_id == 3 || item_id == 4) {
                dispMessage(msg[14], 0);
                this.setBut(item_id, 0);
            } else if (caneat[item_id].fl == 1) {
                dispMessage(msg[52], 0);
                this.setBut(item_id, 0);
            } else {
                dispMessage(msg[13]);
                this.setBut(-1, 0);
            }
        } else {
            if (Player.singbag.get(item_id).itmtype == 1) {
                if (Player.onhand != item_id) {
                    dispMessage(msg[55] + Player.singbag.get(item_id).itmname);
                    Player.onhand = item_id;
                    calcatkdef();
                } else {
                    dispMessage(msg[56] + Player.singbag.get(item_id).itmname);
                    Player.onhand = 0;
                    calcatkdef();
                }
                this.setBut(-1, 0);
            }
        }
    }
}
let Upgrading = {
    return: function () {
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, Upgrading.return, , ,];
        butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[40]);
        Player.LVL++;
        Player.nowexp = 0, Player.maxexp = Math.ceil(Player.maxexp * 1.2);
        Player.maxHP += Rand(1, 5) + Math.floor(Player.LVL / 5);
        Player.atk += Rand(1, 3) + Math.floor(Player.LVL / 5);
        Player.def += Rand(1, 2) + Math.floor(Player.LVL / 10);
        calcatkdef();
        this.setBut();
    }
}
let LearnMaging = {
    return: function () {
        Walking.starting();
    },
    setMag: function (mag_id,mag_pos) {
        dispMessage(msg[74] + magname[mag_id]);
        Player.mag[mag_pos] = mag_id;
        LearnMaging.return();
    },
    setBut: function (mag_id) {
        butFunc = [0, , , , ,this.return,];
        butStr = ["", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", str[11], "&nbsp;"];
        for (let i = 1; i <= 4; i++) {
            butFunc[i] = function () { LearnMaging.setMag(mag_id, i) };
            if (Player.mag[i] != 0) butStr[i] = str[26] + magname[Player.mag[i]];
            else butStr[i] = str[27];
        }
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function (mag_id) {
        dispMessage(msg[75]);
        this.setBut(mag_id);
    }
}
let BattleBaging = {
    nowitem_id: 0,
    nowitem_ty: 0,
    poisoned_bush: 0,
    returnBag: function () {
        entity_bag.setAttribute("hidden", true);
        Battleing.enemyPerf();
    },
    returnBag0: function () {
        entity_bag.setAttribute("hidden", true);
        Battleing.starting();
    },
    eatBush: function () {
        entity_bag.setAttribute("hidden", true);
        Player.bag[BattleBaging.nowitem_id]--;
        if (BattleBaging.poisoned_bush == 1) {
            dispMessage(msg[15]);
            statusChange(Player,1, 1);
            butFunc = [0, BattleBaging.returnBag];
            butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
            for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
        } else {
            dispMessage(msg[16]);
            let nt = Math.min(Player.maxHP - Player.HP, 10);
            Player.HP += nt;
            dispMessage(msg[54] + nt);
            BattleBaging.returnBag();
        }
    },
    throwBush: function () {
        entity_bag.setAttribute("hidden", true);
        Player.bag[BattleBaging.nowitem_id]--;
        if (BattleBaging.poisoned_bush == 1) {
            dispMessage(msg[15]);
            statusChange(nowEnemy,6, 1);
            butFunc = [0, BattleBaging.returnBag];
            butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
            for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
        } else {
            dispMessage(msg[16]);
            let nt = Math.min(nowEnemy.maxHP - nowEnemy.HP, 10);
            nowEnemy.HP += nt;
            dispMessage(msg[54] + nt);
            BattleBaging.returnBag();
        }
    },
    eatItem: function () {
        entity_bag.setAttribute("hidden", true);
        Player.bag[BattleBaging.nowitem_id]--;
        if (BattleBaging.nowitem_id == 5) NJeatCount++;
        dispMessage(msg[53] + itm_name[BattleBaging.nowitem_id]);
        let nt = Math.min(Player.maxHP - Player.HP, caneat[BattleBaging.nowitem_id].recHP);
        Player.HP += nt;
        dispMessage(msg[54] + nt);
        BattleBaging.returnBag();
    },
    setBut2: function (item_id) {
        if (item_id == -1) {
            butFunc = [0, this.returnBag];
            butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        } else {
            if (item_id == 3 || item_id == 4) {
                this.poisoned_bush = 4 - item_id;
                butFunc = [0, this.eatBush, this.throwBush, this.returnBag0];
                butStr = ["", str[24], str[25], str[11], "&nbsp;", "&nbsp;", "&nbsp;"];
            } else if (caneat[item_id].fl == 1) {
                butFunc = [0, this.eatItem, this.returnBag];
                butStr = ["", str[24], str[11], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
            }
        }
        for (let i = 1; i <= butNum; i++) entity_but[i].innerHTML = butStr[i];
    },
    uIing: function (item_id) {
        this.nowitem_id = item_id;
        if (true) {
            if (item_id == 3 || item_id == 4) {
                dispMessage(msg[14], 0);
                this.setBut2(item_id, 0);
            } else if (caneat[item_id].fl == 1) {
                dispMessage(msg[52], 0);
                this.setBut2(item_id, 0);
            } else {
                dispMessage(msg[13]);
                this.setBut2(-1, 0);
            }
        } else {
            if (Player.singbag.get(item_id).itmtype == 1) {
                if (Player.onhand != item_id) {
                    dispMessage(msg[55] + Player.singbag.get(item_id).itmname);
                    Player.onhand = item_id;
                    calcatkdef();
                } else {
                    dispMessage(msg[56] + Player.singbag.get(item_id).itmname);
                    Player.onhand = 0;
                    calcatkdef();
                }
                this.setBut(-1, 0);
            }
        }
    },
    setBut: function () {
        butFunc = [0, 0, 0, 0, 0, 0, 0];
        butStr = ["", "", "", "", "", "", ""];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        this.setBut();
        let nst = "";
        for (let i = 1; i <= itmNum; i++) {
            if (Player.bag[i] > 0) {
                nst += "<button class=\"bagbutt\" onclick=\"BattleBaging.uIing(" + i + ",0)\" id=\"id_bag_" + i + "\">" + itm_name[i];
                if (Player.bag[i] > 1) nst += " *" + Player.bag[i];
                nst += "</button><br/>";
            }
        }
        nst += "<button class=\"bagbutt\" onclick=\"BattleBaging.returnBag0()\" id=\"id_bag_return\">返回</button><br/>";
        entity_bag.innerHTML = nst;
        entity_bag.removeAttribute("hidden");
    }
}
let BattleMaging = {
    nMag:0,
    return: function () {
        entity_map.setAttribute("hidden", true);
        Battleing.enemyPerf();
    },
    return0: function () {
        entity_map.setAttribute("hidden", true);
        Battleing.starting();
    },
    useMag: function (mag_id) {
        
        dispMessage(msg[34] + msg[69] + magname[mag_id]);
        allmag[mag_id].mag_func(Player, nowEnemy);
        nowEnemy.checkDeath();
        if (winfl == 1) {
            butFunc = [0, Battleing.return, , ,];
            butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
            for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
        } else {
            Battleing.enemyPerf();
        }
    },
    setBut: function () {
        BattleMaging.nMag = 0;
        butFunc = [0, , , , ,this.return0];
        butStr = ["", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", str[11], "&nbsp;"];
        for (let i = 1; i <= 4; i++) {
            if (Player.mag[i] == 0) continue;
            butFunc[i] = function () { BattleMaging.useMag(Player.mag[i]); };
            butStr[i] = magname[Player.mag[i]];
        }
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[68]);
        this.setBut();
    }
}
let Battleing = {
    return: function () {
        if (Player.nowexp >= Player.maxexp) {
            Upgrading.starting();
            return;
        }
        Walking.starting();
    },
    enemyPerf: function () {
        checksta(Player);
        if (deathfl == 1) return;
        let ni = Rand(1, 4);
        if (nowEnemy.mag[ni] == 0) {
            dispMessage(nowEnemy.enemyName + msg[33] + msg[34]);
            let nd = calcAtkDamage(nowEnemy, Player);
            Player.HP -= nd;
            dispMessage(msg[34] + msg[26] + nd + msg[19]);
            if (nowEnemy.sta[6] > 0) {
                statusChange(Player, 1, 1);
            }
        } else {
            dispMessage(nowEnemy.enemyName + msg[69] + magname[nowEnemy.mag[ni]]);
            allmag[nowEnemy.mag[ni]].mag_func(nowEnemy, Player);
        }
        Player.checkDeath();
        if (deathfl == 1) {
            return;
        } else {
            Battleing.starting();
        }
    },
    perfAtk: function () {
        dispMessage(msg[34] + msg[33] + nowEnemy.enemyName);
        let nd = calcAtkDamage(Player, nowEnemy);
        nowEnemy.HP -= nd;
        dispMessage(nowEnemy.enemyName + msg[26] + nd + msg[19]);
        checksta(nowEnemy);
        nowEnemy.checkDeath();
        if (winfl == 1) {
            butFunc = [0, Battleing.return, , ,];
            butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
            for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
        } else {
            Battleing.enemyPerf();
        }
    },
    perfMag: function () {
        BattleMaging.starting();
    },
    perfBag: function () {
        BattleBaging.starting();
    },
    perfRun: function () {
        if (runSuccess()) {
            dispMessage(msg[38]);
            butFunc = [0, Battleing.return, , ,];
            butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
            for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
        } else {
            dispMessage(msg[39]);
            Battleing.enemyPerf();
        }
    },
    setBut: function () {
        butFunc = [0, this.perfAtk, this.perfMag, this.perfBag, this.perfRun];
        butStr = ["", str[15], str[16], str[17], str[18], "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];

    },
    starting: function () {
        this.setBut();

    }
}
let seeMaping = {
    return: function () {
        entity_map.setAttribute("hidden", true);
        Walking.starting();
    },
    setBut: function () {
        butFunc = [0, seeMaping.return, , ,];
        butStr = ["", str[10], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    starting: function () {
        dispMessage(msg[61]);
        for (let i = nowX - 4; i <= nowX + 4; i++) {
            for (let j = nowY - 4; j <= nowY + 4; j++) {
                if (i >= 0 && i <= mapSize && j >= 0 && j <= mapSize) seemap[i][j] = 1;
            }
        }
        fdispMap();
        entity_map.removeAttribute("hidden");
        this.setBut();
    }
}
let E_camo1 = {
    return: function () {
        dispMessage(msg[66]);
        setTimeout("Walking.starting()", 3000);
    },
    c1_1: function () {
        dispMessage(msg[63]);
        butFunc = [0, E_camo1.c1_2, , ,];
        butStr = ["", str[23], "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
    },
    c1_2: function () {
        dispMessage(msg[64]);
        butFunc = [0, , , ,];
        butStr = ["", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
        setTimeout("E_camo1.c1_3()", 500);
    },
    c1_3: function () {
        playerName = prompt(msg[64], "……");
        dispMessage(playerName + msg[65]);
        butFunc = [0, , , ,];
        butStr = ["", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
        for (let i = 1; i <= butNum; i++)entity_but[i].innerHTML = butStr[i];
        setTimeout("E_camo1.return()", 3000);
    },
    starting: function () {
        dispMessage(msg[62]);
        E_camo1.c1_1();
    }
}
Walking.starting();
//for (let i = 1; i <= 20;i++)entity_0.innerHTML= (i+"<br/>")+entity_0.innerHTML;

let allmag = new Array;
allmag[1] = {
    mag_id: 1,
    mag_func: function (ena, enb) {
        let nt = Math.min(ena.maxHP - ena.HP, Math.max(5, Math.ceil(0.3 * ena.maxHP)));
        ena.HP += nt;
        dispMessage(msg[70] + nt);
    }
}
allmag[2] = {
    mag_id: 2,
    mag_func: function (ena, enb) {
        let nt = ena.atk;
        enb.HP -= nt;
        let nname = getName(enb);
        dispMessage(nname + "-" + nt);
        if (Rand(1, 3) == 1) {
            statusChange(enb, 2, 1);
        }
    }
}