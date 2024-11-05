import { FC, useEffect, useState } from "react"
import {
  APIBaseURLFormSchema,
  apiBaseURLFormSchema
} from "./APIBaseURLForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ExtensionStorage } from "../../extensionStorage.types";
import { FormStep } from "../Form.types";
import {
  DisplayMessageError,
  StyledBox,
  StyledButton,
  StyledDistribute,
  StyledJustify,
  StyledLoadingIndicator,
  StyledText
} from "../../../components";
import { StyledForm } from "../../components";
import {
  getServerSettings,
  settingsErrorReset,
  useSettings,
  useStorage
} from "../../../contexts";

export const APIBaseURLForm: FC<FormStep> = ({ nextRoute }) => {
  const navigate = useNavigate();
  const { state: { apiBaseURL } } = useStorage();
  const { state: { status, error: settingsError }, settingsDispatch } = useSettings();
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit, formState, register, setValue } = useForm<APIBaseURLFormSchema>({
    resolver: yupResolver(apiBaseURLFormSchema),
    defaultValues: { apiBaseURL },
    mode: "all",
  });

  useEffect(() => {
    if (apiBaseURL) setValue("apiBaseURL", apiBaseURL);
  }, [apiBaseURL]);

  const { errors } = formState;

  const onSubmit: SubmitHandler<APIBaseURLFormSchema> = ({ apiBaseURL }) => {
    chrome.storage.local.set<ExtensionStorage>({ apiBaseURL })
      .then(() => {
        if (!settingsError) {
          const onSuccess = () => {
            navigate(nextRoute);
          };
          if (apiBaseURL) {
            getServerSettings(settingsDispatch, apiBaseURL, onSuccess);
          }
        };
      })
      .catch((error) => {
        if (chrome.runtime.lastError) {
          setError(
            chrome.runtime.lastError.message ||
            `Unknown error while setting the API URL to the storage. (APIBaseURLForm)`
          );

          return;
        }

        if (error instanceof Error) {
          setError(error.message);

          return;
        }

        setError(`Unknown error while setting the API URL to the storage. (APIBaseURLForm)`);
      });
  };

  if (status === 'pending') return (
    <StyledBox padding="spacing3" background="gray700">
      <StyledLoadingIndicator title="Fetching server settings" />
    </StyledBox>
  );

  const onRetry = () => {
    const onSuccess = () => {
      navigate(nextRoute);
    };
    if (apiBaseURL) {
      getServerSettings(settingsDispatch, apiBaseURL, onSuccess);
    }
  };

  const onReset = () => {
    settingsDispatch(settingsErrorReset);
  };

  if (settingsError) return <DisplayMessageError error={{ message: settingsError }} onRetry={onRetry} onReset={onReset} />

  return (
    <StyledDistribute gap="spacing3">
      <StyledText $size="large" $weight="normal" as="h2">Set API URL</StyledText>
      <StyledForm id="api-base-url-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledForm.Field error={errors.apiBaseURL} htmlFor="api-base-url" label="API URL">
          <StyledForm.Input autoFocus id="api-base-url" placeholder="e.g. http://127.0.0.1:5000" type="text"
            {...register("apiBaseURL")} />
        </StyledForm.Field>
      </StyledForm>
      <StyledJustify justify="flex-end">
        <StyledButton $appearance="transparent" form="api-base-url-form" type="submit" disabled={!formState.isValid}>
          <StyledText $size="medium" $weight="medium" as="span">Save</StyledText>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};
