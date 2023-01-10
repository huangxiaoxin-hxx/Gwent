const camp = {
  north: "North", // 北方帝国
  nilfgaardian: "Nilfgaardian", // 尼弗迦德帝国
  neutral: "Neutral", // 中立
  monster: "Monster", // 怪兽
  squirrel: "Squirrel" // 松鼠党
}

const campList = [
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

const neutralCardGroup = [
  {
    combat: 0,
    position: 'center',
    type: 'exchange',
    name: '诱饵'
  }
]