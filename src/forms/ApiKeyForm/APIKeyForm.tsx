import { FC, useEffect, useState } from "react"
import { ApiKeyFormSchema, apiKeyFormSchema } from "./ApiKeyForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ExtensionStorage } from "../../extensionStorage.types";
import { FormStep } from "../Form.types";
import {
  StyledButton,
  StyledDistribute,
  StyledJustify,
  StyledText
} from "../../../components";
import { StyledForm } from "../../components";
import { useStorage } from "../../../contexts";

export const APIKeyForm: FC<FormStep> = ({ nextRoute }) => {
  const storage = useStorage();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { state: { apiKey } } = storage;
  const { handleSubmit, formState, register, setValue } = useForm<ApiKeyFormSchema>({
    resolver: yupResolver(apiKeyFormSchema),
    defaultValues: { apiKey },
    mode: "all",
  });

  useEffect(() => {
    if (apiKey) setValue("apiKey", apiKey);
  }, [apiKey]);

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
