import { MessageErrorResponse } from '../../service-worker';

export interface DisplayMessageErrorProps {
  error: MessageErrorResponse['error'];
  onRetry: () => void;
};
