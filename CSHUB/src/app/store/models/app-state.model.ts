import { UserState } from '../reducers/user.reducer';
import { WidgetState } from '../reducers/widget.reducer';

export interface AppState{
    readonly user: UserState,
    readonly widgets: WidgetState;
};