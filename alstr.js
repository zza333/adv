let str = new Array;
str = ["", "", "",
    "向北走",
    "向南走",
    "向东走",
    "向西走",
    "采摘浆果",
    "离开",
    "背包",
    "确定",
    "取消",
    "砍树！",
    "爬树",
    "跳海",
    "攻击",
    "技能",
    "道具",
    "逃跑",
    "喝泉水",
    "开凿",
    "爬山",
    "打开箱子",
    "……"
]
let bcgname = new Array;
bcgname[0] = "草地";
bcgname[1] = "海滩";
let almon = new Array;
almon[1] = {
    enemyName: "史莱姆",
    maxHP: 10,
    atk: 3,
    def: 1,
    ski: [0, 0, 0, 0, 0],
    getExp: 3,
    getCoin: 5,
    monsid: 1,
    itemv: 1,
    dropItem: [{ item_id: 5, p: 100, minc: 1, maxc: 2 }],
};
almon[2] = {
    enemyName: "蓝史莱姆",
    maxHP: 25,
    atk: 6,
    def: 2,
    ski: [0, 0, 0, 0, 0],
    getExp: 8,
    getCoin: 10,
    monsid: 2,
    itemv: 1,
    dropItem: [{ item_id: 5, p: 100, minc: 1, maxc: 3 }],
};
almon[3] = {
    enemyName: "红史莱姆",
    maxHP: 60,
    atk: 12,
    def: 4,
    ski: [0, 0, 0, 0, 0],
    getExp: 20,
    getCoin: 20,
    monsid: 3,
    itemv: 1,
    dropItem: [{ item_id: 5, p: 100, minc: 3, maxc: 5 }],
};
almon[4] = {
    enemyName: "幽灵",
    maxHP: 50,
    atk: 5,
    def: 4,
    ski: [0, 0, 0, 0, 0],
    getExp: 1,
    getCoin: 1,
    monsid: 4,
    itemv: 0,
    dropItem: [],
};