import { camp } from '@/static/cardConfig'
export const judgeCardGroup = (comp) => {
  switch (comp) {
    case camp.north:
      return 'northCardGroup'
    case camp.nilfgaardian:
      return 'nilfgaardianCardGroup'
    case camp.monster:
      return 'monsterCardGroup'
    case camp.squirrel:
      return 'squirrelCardGroup'
  }
}