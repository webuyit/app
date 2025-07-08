import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { SERVER_URL } from '@/lib/constants';
import { UserResponse, UserStore } from '@/types/user';

const fetchUser = async (privyId: string): Promise<UserResponse> => {
  const { data } = await axios.get<UserResponse>(
    `${SERVER_URL}users/user/basic?privyId=${privyId}`,
  );
  return data;
};

export const useUser = () => {
  const { ready, user: privyUser } = usePrivy();

  return useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: () => fetchUser(privyUser!.id),
    enabled: ready && !!privyUser?.id,
  });
};
