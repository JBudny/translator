import { FC, useEffect, useState } from "react";
import {
  APIBaseURLFormSchema,
  apiBaseURLFormSchema,
} from "./APIBaseURLForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { FormStep } from "../Form.types";
import {
  DisplayMessageError,
  StyledBox,
  StyledButton,
  StyledDistribute,
  StyledJustify,
  StyledLoadingIndicator,
  StyledText,
} from "../../../components";
import { StyledForm } from "../../components";
import { useSettings, useStorage } from "../../../contexts";
import { ExtensionStorage } from "../../../api";

export const APIBaseURLForm: FC<FormStep> = ({ nextRoute }) => {
  const navigate = useNavigate();
  const [storage, fetchStorage] = useStorage();
  const [settings, fetchSettings] = useSettings();
  const [error, setError] = useState<string | null>(null);
  const { handleSubmit, formState, register, setValue } =
    useForm<APIBaseURLFormSchema>({
      resolver: yupResolver(apiBaseURLFormSchema),
      defaultValues: { apiBaseURL: "" },
      mode: "all",
    });

  useEffect(() => {
    if (storage.data?.apiBaseURL) setValue("apiBaseURL", storage.data.apiBaseURL);
  }, [storage.data?.apiBaseURL]);

  const { error: settingsError, isLoading: settingsIsLoading } = settings;

  const { errors } = formState;

  const onSubmit: SubmitHandler<APIBaseURLFormSchema> = ({ apiBaseURL }) => {
    chrome.storage.local
      .set<ExtensionStorage>({ apiBaseURL })
      .then(() => {
        if (!settingsError) {
          fetchSettings(apiBaseURL).then(() => {
            navigate(nextRoute);
          });
        }
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

        setError(
          `Unknown error while setting the API URL to the storage. (APIBaseURLForm)`
        );
      });
  };

  const onRetry = () => {
    fetchSettings(storage.data?.apiBaseURL).then(() => {
      navigate(nextRoute);
    });
  };

  if (settingsError)
    return <DisplayMessageError message={settingsError} onRetry={onRetry} />;
  if (error) return <DisplayMessageError message={error} onRetry={onRetry} />;
  if (settingsIsLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Fetching server settings" />
      </StyledBox>
    );

  return (
    <StyledDistribute gap="spacing3">
      <StyledText $size="large" $weight="normal" as="h2">
        Set API URL
      </StyledText>
      <StyledForm id="api-base-url-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledForm.Field
          error={errors.apiBaseURL}
          htmlFor="api-base-url"
          label="API URL"
        >
          <StyledForm.Input
            autoFocus
            id="api-base-url"
            placeholder="e.g. http://127.0.0.1:5000"
            type="text"
            {...register("apiBaseURL")}
          />
        </StyledForm.Field>
      </StyledForm>
      <StyledJustify justify="flex-end">
        <StyledButton
          $appearance="transparent"
          form="api-base-url-form"
          type="submit"
          disabled={!formState.isValid}
        >
          <StyledText $size="medium" $weight="medium" as="span">
            Save
          </StyledText>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};
