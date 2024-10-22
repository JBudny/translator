import { FC, useEffect } from "react"
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
import { useUserSettings } from "../../contexts";

export const APIKeyForm: FC<FormStep> = ({ nextRoute }) => {
  const auth = useUserSettings();
  const navigate = useNavigate();
  const { handleSubmit, formState, register, setValue } = useForm<ApiKeyFormSchema>({
    resolver: yupResolver(apiKeyFormSchema),
    defaultValues: { apiKey: auth?.state.apiKey },
    mode: "all",
  });

  useEffect(() => {
    chrome.storage.local.get<ExtensionStorage>()
      .then(({ apiKey }) => {
        if (apiKey) setValue("apiKey", apiKey);
      });
  }, []);

  const { errors } = formState;

  const onSubmit: SubmitHandler<ApiKeyFormSchema> = ({ apiKey }) => {
    chrome.storage.local.set<ExtensionStorage>({ apiKey })
      .then(() => navigate(nextRoute))
      .catch(() => setValue("apiKey", ""));
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
