import { getChiefs, getUsersWithoutChief } from '@/features/user/actions';
import UserInfoModal from '@/features/user/components/user-info-modal';
import { currentUser } from '@/services/user';

const ProfilePage = async () => {
  const user = await currentUser();
  const chiefsData = await getChiefs(user?.id as string);
  const usersData = await getUsersWithoutChief(user?.id as string);
  const chiefs =
    chiefsData.data?.map((chief) => {
      const isSecondName = chief.lastName !== null && chief.patronymic !== null;
      const fullName = isSecondName ? `${chief.lastName} ${chief.patronymic}` : '';

      return {
        id: chief.id,
        label: `${chief.name} ${fullName}`,
      };
    }) || [];
  const users =
    usersData.data?.map((user) => {
      const isSecondName = user.lastName !== null && user.patronymic !== null;
      const fullName = isSecondName ? `${user.lastName} ${user.patronymic}` : '';

      return {
        id: user.id,
        label: `${user.name} ${fullName}`,
      };
    }) || [];

  const isEnoughUserInfo = user.roles.includes('CHIEF' || 'EMPLOYEE');

  return (
    <>
      {!isEnoughUserInfo && <UserInfoModal chiefs={chiefs} users={users} />}

      <section className="">
        <h2>Hello, {user.name}</h2>
      </section>
    </>
  );
};

export default ProfilePage;
