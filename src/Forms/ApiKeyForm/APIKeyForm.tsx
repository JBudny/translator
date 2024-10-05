import { FC, useEffect } from "react"
import { ApiKeyFormSchema, apiKeyFormSchema } from "./ApiKeyForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { ExtensionStorage } from "../../extensionStorage.types";
import { FormStep } from "../Form.types";
import { StyledButton, StyledTypography } from "../../../components";
import { StyledForm } from "../../components";

export const APIKeyForm: FC<FormStep> = ({ nextRoute }) => {
  const auth = useAuth();
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
      .then(() => navigate('/languages'))
      .catch(() => setValue("apiKey", ""));
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledForm.Header $size="large" $weight="normal" as="h2">Set API key</StyledForm.Header>
      <StyledForm.Content>
        <StyledForm.Field error={errors.apiKey} htmlFor="api-key" label="API key">
          <StyledForm.Input type="text" id="api-key" placeholder=""
            {...register("apiKey")} />
        </StyledForm.Field>
      </StyledForm.Content>
      <StyledForm.Footer>
        <StyledButton type="submit" disabled={!formState.isValid}>
          <StyledTypography $size="medium" $weight="medium" as="span">Save</StyledTypography>
        </StyledButton>
      </StyledForm.Footer>
    </StyledForm >
  );
};
