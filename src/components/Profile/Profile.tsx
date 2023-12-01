import dayjs from 'dayjs';
import { Date, ProfileBox, UserImg, Username } from './Profile.styles';
import { ProfileProps } from './Profile.types';

const Profile = (props: ProfileProps) => {
  const { url, name, date, onlyImg, onClick } = props;

  return (
    <ProfileBox>
      <UserImg src={url} onClick={onClick}></UserImg>

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
