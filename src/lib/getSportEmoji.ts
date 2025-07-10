export enum MatchCategories {
  ESPORT = 'ESPORT',
  FOOTBALL = 'FOOTBALL',
  BASEBALL = 'BASEBALL',
  SOCCER = 'SOCCER',
  FANTASY = 'FANTASY',
}

export function getSportEmoji(category: MatchCategories | string): string {
  switch (category) {
    case MatchCategories.ESPORT:
      return '🎮';
    case MatchCategories.FOOTBALL:
      return '🏈';
    case MatchCategories.BASEBALL:
      return '⚾';
    case MatchCategories.SOCCER:
      return '⚽';
    case MatchCategories.FANTASY:
      return '🧙‍♂️';
    default:
      return '🎯'; // fallback for unknown or new categories
  }
}
