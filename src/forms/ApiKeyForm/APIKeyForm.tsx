import { FC, useEffect, useState } from "react"
import { ApiKeyFormSchema, apiKeyFormSchema } from "./ApiKeyForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { FormStep } from "../Form.types";
import {
  DisplayMessageError,
  StyledButton,
  StyledDistribute,
  StyledJustify,
  StyledText
} from "../../../components";
import { StyledForm } from "../../components";
import { useStorage } from "../../../contexts";
import { ExtensionStorage } from "../../../api";

export const APIKeyForm: FC<FormStep> = ({ nextRoute }) => {
  const [storage] = useStorage();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { handleSubmit, formState, register, setValue } = useForm<ApiKeyFormSchema>({
    resolver: yupResolver(apiKeyFormSchema),
    defaultValues: { apiKey: "" },
    mode: "all",
  });

  useEffect(() => {
    if (storage.data?.apiKey) setValue("apiKey", storage.data?.apiKey);
  }, [storage.data?.apiKey]);

  const { errors } = formState;

  const onSubmit: SubmitHandler<ApiKeyFormSchema> = ({ apiKey }) => {
    chrome.storage.local.set<ExtensionStorage>({ apiKey })
      .then(() => navigate(nextRoute))
      .catch((error) => {
        if (chrome.runtime.lastError) {
          setError(
            chrome.runtime.lastError.message ||
            `Unknown error while setting the API key to the storage. (APIKeyForm)`
          );

          return;
        }

        if (error instanceof Error) {
          setError(error.message);

          return;
        }

        setError(`Unknown error while setting the API key to the storage. (APIKeyForm)`);
      });
  };

  const onRetry = () => {
    setError(null)
  }

  if (error) return <DisplayMessageError message={error} onRetry={onRetry} />;

  return (
    <StyledDistribute gap="spacing3">
      <StyledText $size="large" $weight="normal" as="h2">Set API key</StyledText>
      <StyledForm id="api-key-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledForm.Field error={errors.apiKey} htmlFor="api-key" label="API key">
          <StyledForm.Input autoFocus id="api-key" placeholder="" type="text"
            {...register("apiKey")} />
        </StyledForm.Field>
      </StyledForm >
      <StyledJustify justify="flex-end">
        <StyledButton $appearance="transparent" form="api-key-form" type="submit" disabled={!formState.isValid}>
          <StyledText $size="medium" $weight="medium" as="span">Save</StyledText>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};
