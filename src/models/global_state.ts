import Session from './session.ts'

export type GlobalState = {
  session: Session,
  showMenu: false,
  login: () => void,
  changeVisibilityMenu: () => void,
}