import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { DEMO_USER, SERVER_URL } from '@/lib/constants';
import { UserResponse, UserStore } from '@/types/user';

const fetchUser = async (privyId: string): Promise<UserResponse> => {
  const { data } = await axios.get<UserResponse>(
    `${SERVER_URL}users/user/basic?userId=${privyId}`,
  );
  return data;
};

export const useUser = () => {
  const { ready, user: privyUser } = usePrivy();
  console.log('privy user is', privyUser);
  return useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: () => fetchUser(DEMO_USER), //privyUser!.id
    enabled: ready && !!privyUser?.id,
  });
};
