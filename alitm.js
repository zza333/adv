let itm_name = new Array;
itm_name = ["", "", "",
    "浆果",
    "浆果",
    "凝胶",
    "木材",
    "石头",
    "铁矿石",
    "银矿石",
    "金矿石",
    "苹果",
    "棒棒糖"
]
let itmNum = 100;
let caneat = new Array;
for (let i = 1; i <= itmNum; i++)caneat[i] = { fl: 0 };
caneat[5] = { fl: 1, recHP: 2, ty: 1 };
caneat[11] = { fl: 1, recHP: 10, ty: 1 };
caneat[12] = { fl: 1, recHP: 20, ty: 1 };
let sing_itm = new Array;
sing_itm[1] = {
    itmname: "打火石",
    itmtype: 0,
    itmid: 1,
};
sing_itm[2] = {
    itmname: "新手剑",
    itmtype: 1,
    itmid: 2,
    itmval: 3,
    itmty2:0,
};
sing_itm[3] = {
    itmname: "木斧",
    itmtype: 1,
    itmid: 3,
    itmval: 2,
    itmty2:1,
};
sing_itm[4] = {
    itmname: "石镐",
    itmtype: 1,
    itmid: 4,
    itmval: 1,
    itmty2:2
};
magname = new Array;
magname[0] = "nbsp;";
magname[1] = "生命回复";
magname[2] = "火球";