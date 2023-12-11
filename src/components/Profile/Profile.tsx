import dayjs from 'dayjs';
import { Date, ProfileBox, UserImg, Username } from './Profile.styles';
import { ProfileProps } from './Profile.types';
import { EmptyUserIcon } from '@/assets/icons/EmptyUserIcon';

const Profile = (props: ProfileProps) => {
  const { url, name, date, onlyImg, onClick } = props;

  return (
    <ProfileBox>
      {url ? (
        <UserImg src={url} onClick={onClick} />
      ) : (
        <div onClick={onClick}>
          <EmptyUserIcon
            style={{
              cursor: 'pointer',
            }}
          />
        </div>
      )}

      {!onlyImg && (
        <div>
          <Username>{name}</Username>
          <Date>{dayjs(date).format('YYYY.MM.DD (dd) HH:mm')}</Date>
        </div>
      )}
    </ProfileBox>
  );
};

export default Profile;
