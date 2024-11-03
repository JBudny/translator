import {
  SettingsErrorResetAction,
  SettingsErrorSetAction,
  SettingsKeyRequiredSetAction,
  SettingsStatusSetAction
} from './SettingsContext.types';
import { AsyncStatus } from '../../types';

export const settingsStatusSet =
  (status: AsyncStatus): SettingsStatusSetAction => ({
    payload: status,
    type: 'settingsStatusSet',
  });

export const settingsErrorSet = (message: string): SettingsErrorSetAction => ({
  payload: message,
  type: 'settingsErrorSet',
});

export const keyRequiredSet =
  (keyRequired: boolean): SettingsKeyRequiredSetAction => ({
    payload: keyRequired,
    type: 'keyRequiredSet'
  });

export const settingsErrorReset: SettingsErrorResetAction = ({
  type: 'settingsErrorReset'
});
