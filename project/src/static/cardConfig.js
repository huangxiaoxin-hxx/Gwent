export const camp = {
  north: "North", // 北方帝国
  nilfgaardian: "Nilfgaardian", // 尼弗迦德帝国
  neutral: "Neutral", // 中立
  monster: "Monster", // 怪兽
  squirrel: "Squirrel" // 松鼠党
}

export const campList = [
  {
    camp: camp.north,
    name: "北方帝国",
    abilityDesc: "赢得对局后可多抽一张牌"
  },
  {
    camp: camp.nilfgaardian,
    name: "尼弗迦德帝国",
    abilityDesc: "平局算赢"
  },
  {
    camp: camp.monster,
    name: "怪兽",
    abilityDesc: "每局结束随机留下一张单位牌在场上"
  },
  {
    camp: camp.squirrel,
    name: "松鼠党",
    abilityDesc: "可决定先后手"
  },
]

export const typeList = {
  exchange:     {type: 'Exchange', desc: '可替换己方场上一张普通任务牌' },
  horn:         {type: 'Horn', desc: '可使己方场上任意一排战斗力翻倍' },
  burn:         {type: 'Burn', desc: '可烧毁场上战斗力最高的牌' },
  frost:        {type: 'Frost', desc: '双方近战单位攻击力变为1' },
  fog:          {type: 'Fog', desc: '双方射手单位攻击力变为1' },
  rain:         {type: 'Rain', desc: '双方攻城单位攻击力变为1' },
  sunny:        {type: 'Sunny', desc: '消除所有天气牌' },
  doctor:       {type: 'Doctor', desc: '可从墓地召回一张非英雄单位牌'},
  spy:          {type: 'Spy', desc: '将此牌投放至敌方战场，我方多抽两张牌' },
  hornMan:      {type: 'HornMan', desc: '除自己外，同排非英雄战力翻倍'},
  burnMan:      {type: 'BurnMan', desc: '敌方同排战斗力大于10时，损毁敌方该排最强战力'},
  compatriots:  {type: 'Compatriots', desc: '相同卡战斗力翻倍'},
  siegeHornMan: {type: 'SiegeHornMan', desc: '攻城号角'},
  coldBlooded:  {type: 'ColdBlooded', desc: '从对方废牌堆中抽一张单位牌放手里'},
  whiteFlame:   {type: 'WhiteFlame', desc: '取消对手领导牌的能力'},
  perspective:  {type: 'Perspective', desc: '随机检索对手三张卡牌'}
}

export const neutralCardGroup = [
  {
    id: 1,
    combat: null,
    position: 'exchange',
    type: typeList.exchange.type,
    name: '诱饵',
    fieldSelect: false,
    desc: "可替换己方场上一张普通任务牌"
  },
  {
    id: 2,
    combat: null,
    position: 'exchange',
    type: typeList.exchange.type,
    name: '诱饵',
    fieldSelect: false,
    desc: "可替换己方场上一张普通任务牌"
  },
  {
    id: 3,
    combat: null,
    position: 'exchange',
    type: typeList.exchange.type,
    name: '诱饵',
    fieldSelect: false,
    desc: "可替换己方场上一张普通任务牌"
  },
  {
    id: 4,
    combat: null,
    position: 'myself',
    type: typeList.horn.type,
    name: '号角',
    fieldSelect: false,
    desc: typeList.horn.desc
  },
  {
    id: 5,
    combat: null,
    position: 'myself',
    type: typeList.horn.type,
    name: '号角',
    fieldSelect: false,
    desc: typeList.horn.desc
  },
  {
    id: 6,
    combat: null,
    position: 'myself',
    type: typeList.horn.type,
    name: '号角',
    fieldSelect: false,
    desc: typeList.horn.desc
  },
  {
    id: 7,
    combat: null,
    position: 'all',
    type: typeList.burn.type,
    name: '灼烧',
    fieldSelect: false,
    desc: typeList.burn.desc
  },
  {
    id: 8,
    combat: null,
    position: 'all',
    type: typeList.burn.type,
    name: '灼烧',
    fieldSelect: false,
    desc: typeList.burn.desc
  },
  {
    id: 9,
    combat: null,
    position: 'all',
    type: typeList.burn.type,
    name: '灼烧',
    fieldSelect: false,
    desc: typeList.burn.desc
  },
  {
    id: 10,
    combat: null,
    position: 'weather',
    type: typeList.frost.type,
    name: '霜冻',
    fieldSelect: false,
    desc: typeList.frost.desc
  },
  {
    id: 11,
    combat: null,
    position: 'weather',
    type: typeList.frost.type,
    name: '霜冻',
    fieldSelect: false,
    desc: typeList.frost.desc
  },
  {
    id: 12,
    combat: null,
    position: 'weather',
    type: typeList.frost.type,
    name: '霜冻',
    fieldSelect: false,
    desc: typeList.frost.desc
  },
  {
    id: 13,
    combat: null,
    position: 'weather',
    type: typeList.fog.type,
    name: '浓雾',
    fieldSelect: false,
    desc: typeList.fog.desc
  },
  {
    id: 14,
    combat: null,
    position: 'weather',
    type: typeList.fog.type,
    name: '浓雾',
    fieldSelect: false,
    desc: typeList.fog.desc
  },
  {
    id: 15,
    combat: null,
    position: 'weather',
    type: typeList.fog.type,
    name: '浓雾',
    fieldSelect: false,
    desc: typeList.fog.desc
  },
  {
    id: 16,
    combat: null,
    position: 'weather',
    type: typeList.rain.type,
    name: '酸雨',
    fieldSelect: false,
    desc: typeList.rain.desc,
  },
  {
    id: 17,
    combat: null,
    position: 'weather',
    type: typeList.rain.type,
    name: '酸雨',
    fieldSelect: false,
    desc: typeList.rain.desc,
  },
  {
    id: 18,
    combat: null,
    position: 'weather',
    type: typeList.sunny.type,
    name: '晴天',
    fieldSelect: false,
    desc: typeList.sunny.desc
  },
  {
    id: 19,
    combat: null,
    position: 'weather',
    type: typeList.sunny.type,
    name: '晴天',
    fieldSelect: false,
    desc: typeList.sunny.desc
  },
  {
    id: 20,
    combat: 15,
    position: 'warrior',
    hero: true,
    type: null,
    name: '利维亚的杰洛特',
    fieldSelect: false,
  },
  {
    id: 21,
    combat: 15,
    position: 'warrior',
    hero: true,
    type: null,
    name: '希里雅',
    fieldSelect: false,
  },
  {
    id: 22,
    combat: 7,
    position: 'warrior',
    hero: true,
    type: null,
    name: '特莉丝·梅莉葛德',
    fieldSelect: false,
  },
  {
    id: 23,
    combat: 7,
    position: 'shooter',
    hero: true,
    type: typeList.doctor.type,
    name: '温格堡的叶奈法',
    fieldSelect: false,
    desc: typeList.doctor.desc
  },
  {
    id: 24,
    combat: 0,
    position: 'spy-warrior',
    hero: true,
    type: typeList.spy.type,
    name: '神秘的精灵',
    fieldSelect: false,
    desc: typeList.spy.desc
  },
  {
    id: 25,
    combat: 2,
    position: 'warrior',
    type: typeList.hornMan.type,
    name: '丹德里恩',
    fieldSelect: true,
    desc: typeList.hornMan.desc
  },
  {
    id: 26,
    combat: 7,
    position: 'warrior',
    type: typeList.burnMan.type,
    name: '维兰特雷坦梅斯',
    fieldSelect: true,
    desc: typeList.burnMan.desc
  },
]

export const NorthCardGroup = [
  {
    id: 27,
    combat: 10,
    position: 'warrior',
    hero: true,
    type: null,
    name: '帝森',
    fieldSelect: false,
  },
  {
    id: 28,
    combat: 10,
    position: 'shooter',
    hero: true,
    type: null,
    name: '费力芭',
    fieldSelect: false,
  },
  {
    id: 29,
    combat: 10,
    position: 'warrior',
    hero: true,
    type: null,
    name: '罗契',
    fieldSelect: false,
  },
  {
    id: 30,
    combat: 10,
    position: 'warrior',
    hero: true,
    type: null,
    name: '纳塔利斯',
    fieldSelect: false,
  },
  {
    id: 31,
    combat: 1,
    position: 'spy-siege',
    type: typeList.spy.type,
    name: '塔勒',
    fieldSelect: true,
    desc: typeList.spy.desc
  },
  {
    id: 32,
    combat: 4,
    position: 'spy-warrior',
    type: typeList.spy.type,
    name: '迪科斯特',
    fieldSelect: true,
    desc: typeList.spy.desc
  },
  {
    id: 33,
    combat: 5,
    position: 'spy-warrior',
    type: typeList.spy.type,
    name: '史登尼斯王子',
    fieldSelect: true,
    desc: typeList.spy.desc
  },
  {
    id: 34,
    combat: 5,
    position: 'shooter',
    type: typeList.compatriots.type,
    name: '巨龙猎人',
    fieldSelect: true,
    desc: typeList.compatriots.desc
  },
  {
    id: 35,
    combat: 5,
    position: 'shooter',
    type: typeList.compatriots.type,
    name: '巨龙猎人',
    fieldSelect: true,
    desc: typeList.compatriots.desc
  },
  {
    id: 36,
    combat: 5,
    position: 'shooter',
    type: typeList.compatriots.type,
    name: '巨龙猎人',
    fieldSelect: true,
    desc: typeList.compatriots.desc
  },
  {
    id: 37,
    combat: 8,
    position: 'siege',
    type: typeList.compatriots.type,
    name: '投石机',
    fieldSelect: true,
    desc: typeList.compatriots.desc
  },
  {
    id: 38,
    combat: 8,
    position: 'siege',
    type: typeList.compatriots.type,
    name: '投石机',
    fieldSelect: true,
    desc: typeList.compatriots.desc
  },
  {
    id: 39,
    combat: 4,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '蓝衣铁卫',
    fieldSelect: true,
    desc: typeList.compatriots.desc
  },
  {
    id: 40,
    combat: 4,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '蓝衣铁卫',
    fieldSelect: true,
    desc: typeList.compatriots.desc
  },
  {
    id: 41,
    combat: 4,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '蓝衣铁卫',
    fieldSelect: true,
    desc: typeList.compatriots.desc
  },
  {
    id: 42,
    combat: 5,
    position: 'siege',
    type: typeList.doctor.type,
    name: '医生',
    fieldSelect: true,
    desc: typeList.doctor.desc
  },
]

export const NilfgaardianCardGroup = [
  {
    id: 43,
    combat: 10,
    position: 'siege',
    hero: true,
    type: null,
    name: '符里斯',
    fieldSelect: false,
  },
  {
    id: 44,
    combat: 10,
    position: 'shooter',
    hero: true,
    type: null,
    name: '艾格布拉杰',
    fieldSelect: false,
  },
  {
    id: 45,
    combat: 10,
    position: 'warrior',
    hero: true,
    type: null,
    name: '古雷特的雷索',
    fieldSelect: false,
  },
  {
    id: 46,
    combat: 10,
    position: 'warrior',
    hero: true,
    type: typeList.doctor.type,
    name: '寇赫伦',
    fieldSelect: false,
    desc: typeList.doctor.desc,
  },
  {
    id: 47,
    combat: 9,
    position: 'spy-warrior',
    type: typeList.spy.type,
    name: '史凯伦',
    fieldSelect: true,
    desc: typeList.spy.desc
  },
  {
    id: 48,
    combat: 7,
    position: 'spy-warrior',
    type: typeList.spy.type,
    name: '希拉德',
    fieldSelect: true,
    desc: typeList.spy.desc
  },
  {
    id: 49,
    combat: 4,
    position: 'spy-warrior',
    type: typeList.spy.type,
    name: '瓦提尔',
    fieldSelect: true,
    desc: typeList.spy.desc
  },
  {
    id: 50,
    combat: 1,
    position: 'shooter',
    type: typeList.doctor.type,
    name: '远程医生',
    fieldSelect: true,
    desc: typeList.doctor.desc,
  },
  {
    id: 51,
    combat: 1,
    position: 'shooter',
    type: typeList.doctor.type,
    name: '远程医生',
    fieldSelect: true,
    desc: typeList.doctor.desc,
  },
  {
    id: 52,
    combat: 0,
    position: 'siege',
    type: typeList.doctor.type,
    name: '攻城医生',
    fieldSelect: true,
    desc: typeList.doctor.desc,
  },
  {
    id: 53,
    combat: 5,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '年轻的特使',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
  {
    id: 54,
    combat: 5,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '年轻的特使',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
  {
    id: 55,
    combat: 3,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '帝国班',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
  {
    id: 56,
    combat: 3,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '帝国班',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
  {
    id: 57,
    combat: 3,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '帝国班',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
  {
    id: 58,
    combat: 3,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '帝国班',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
  {
    id: 59,
    combat: 2,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '那乌西卡骑兵班',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
  {
    id: 60,
    combat: 2,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '那乌西卡骑兵班',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
  {
    id: 61,
    combat: 2,
    position: 'warrior',
    type: typeList.compatriots.type,
    name: '那乌西卡骑兵班',
    fieldSelect: true,
    desc: typeList.compatriots.desc,
  },
]

export const positionType = {
  weather:  "天气牌",
  warrior:  "战士",
  shooter:  "射手",
  siege:    "攻城",
  king:     "国王",
  'spy-warrior':  "战士",
  'spy-shooter':  "射手",
  'spy-siege':    "攻城",
}

export const abilityType = {
  Doctor:       '医生',
  Spy:          '间谍',
  HornMan:      '气势',
  BurnMan:      '灼烧',
  Compatriots:  '同胞之情'
}

export const kingGroup = {
  North: [
    {
      id: 'north1',
      position: 'king',
      type: typeList.sunny.type,
      name: '北方的指挥领主',
      fieldSelect: true,
      desc: typeList.sunny.desc
    },
    {
      id: 'north2',
      position: 'king',
      type: typeList.fog.type,
      name: '泰莫利亚之王',
      fieldSelect: true,
      desc: typeList.fog.desc
    },
    {
      id: 'north3',
      position: 'king',
      type: typeList.siegeHornMan.type,
      name: '攻城之王弗尔泰斯特',
      fieldSelect: true,
      desc: typeList.siegeHornMan.desc
    }
  ],
  Nilfgaardian: [
    {
      id: 'nilfgaardian1',
      position: 'king',
      type: typeList.coldBlooded.type,
      name: '恩希尔*冷血无情',
      fieldSelect: true,
      desc: typeList.coldBlooded.desc
    },
    {
      id: 'nilfgaardian2',
      position: 'king',
      type: typeList.whiteFlame.type,
      name: '恩希尔*白色火焰',
      fieldSelect: true,
      desc: typeList.whiteFlame.desc
    },
    {
      id: 'nilfgaardian3',
      position: 'king',
      type: typeList.perspective.type,
      name: '恩希尔*尼弗伽德大帝',
      fieldSelect: true,
      desc: typeList.perspective.desc
    },
  ]
}