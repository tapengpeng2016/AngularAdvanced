import { createReducer, on } from '@ngrx/store';
import { User } from './../../core/models/user.model';
import { addUserSuccess, deleteSuccess, getUsersSuccess } from './user.action';



export interface State {
  users: User[];
  loading: boolean;
}

export const initialState: State = {
  users: [],
  loading: false
};

// export const userReducer = (state: State, action: {type: string}): State => {
//   switch (action.type) {
//     case UserActions.GetAll:
//       return {
//         users: [
//           {
//             id: 1,
//             name: 'test',
//             email: 'test@gmail.fr'
//           }
//       ],
//         loading: true
//       };
//   }
// }

export const userReducer = createReducer(
  initialState,
  on(getUsersSuccess, (state: State, action: {type: string, users: User[]}): State => {
      return {
        ...state,
        users: action.users,
        loading: true
      };
  }),
  on(addUserSuccess, (state: State, action: {type: string, user: User}): State => {
    return {
      ...state,
      users: [...state.users, action.user],
      loading: true
    };
}),
on(deleteSuccess, (state: State, action: {type: string, id: number}): State => {
  console.log('reducer', action);
  console.log('state', state);
  return {
    ...state,
    users: state.users.filter(u => u.id !== action.id),
    loading: true
  };
}),
);

