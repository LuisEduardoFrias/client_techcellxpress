//
import { create } from 'zustand';
import { GlobalState } from 'md/global_state';
import UserDto from 'dto/user_dto';
import GetSession from 'hp/get_session';

const useStore = create<GlobalState>((set) =>
({
  showMenu: false,
  session: null,
  login: (session: UserDto) => set((state) => ({ session: session })),
  changeVisibilityMenu: () => set((state) => ({ showMenu: true })),
}));

GetSession().then((session: UserDto) => {
  useStore.setState({ ...useStore.getState(), session: session });
});

export default useStore;