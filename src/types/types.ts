export interface SLIDE_DATA {
  cover?: string;
  title: string;
  description?: string;
  cta?: string;
  className?: string;
}

export interface USER_PROFILE_PROPS {
  email: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  publicKey: string;
  walletSource: string;
  privyId: string;
  authMethod: string;
  fullName?: string;
  profilePicture?: string;
}
