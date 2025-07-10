import { formatDistanceToNowStrict } from 'date-fns';

export const getTransactionTitle = (type: string, token = 'CHZ') => {
  switch (type) {
    case 'DEPOSIT':
      return `${token} Deposit`;
    case 'WITHDRAW':
      return `${token} Withdraw`;
    case 'BET_PLACED':
      return `Bet Placed`;
    case 'BET_WON':
      return `Bet Won`;
    case 'BET_LOST':
      return `Bet Lost`;
    case 'BONUS':
      return `Bonus Received`;
    case 'REFERRAL_REWARD':
      return `Referral Reward`;
    case 'REWARD':
      return `Reward`;
    default:
      return `Transaction`;
  }
};

export const formatRelativeTime = (date: string | Date) => {
  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
  }); // returns '2 hours ago', '5 minutes ago'
};
