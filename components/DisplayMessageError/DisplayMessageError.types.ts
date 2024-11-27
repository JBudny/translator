import { MessageErrorResponse } from '../../service-worker';

export interface DisplayMessageErrorProps {
  message: MessageErrorResponse['message'];
  onRetry: () => void;
  onReset?: () => void;
};
