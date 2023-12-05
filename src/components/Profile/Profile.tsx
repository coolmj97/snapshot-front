import dayjs from 'dayjs';
import { Date, ProfileBox, UserImg, Username } from './Profile.styles';
import { ProfileProps } from './Profile.types';
import { EmptyUser } from '@/assets/icons/EmptyUser';

const Profile = (props: ProfileProps) => {
  const { url, name, date, onlyImg, onClick } = props;

  return (
    <ProfileBox>
      {url ? (
        <UserImg src={url} onClick={onClick} />
      ) : (
        <div onClick={onClick}>
          <EmptyUser
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
