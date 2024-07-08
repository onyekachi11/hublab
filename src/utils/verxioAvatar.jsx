import { AvatarGenerator } from 'random-avatar-generator';

const avatar = new AvatarGenerator();

export const generateAvatarUrl = (user) => {
  const avatarUrl = avatar.generateRandomAvatar(user);
  return avatarUrl;
};