import { FC, useEffect } from "react";
import { ApiKeyFormSchema, apiKeyFormSchema } from "./ApiKeyForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { FormStep } from "../Form.types";
import {
  StyledBox,
  StyledButton,
  StyledDistribute,
  StyledJustify,
  StyledLoadingIndicator,
  StyledText,
} from "../../../components";
import { StyledForm } from "../../components";
import { useStorage } from "../../../contexts";

export const APIKeyForm: FC<FormStep> = ({ nextRoute }) => {
  const navigate = useNavigate();
  const [storage, , setStorage] = useStorage();
  const { handleSubmit, formState, register, setValue } =
    useForm<ApiKeyFormSchema>({
      resolver: yupResolver(apiKeyFormSchema),
      defaultValues: { apiKey: "" },
      mode: "all",
    });

  const {
    data: storageData,
    error: storageError,
    isLoading: storageIsLoading,
  } = storage;

  useEffect(() => {
    if (storageData?.apiKey) setValue("apiKey", storageData.apiKey);
  }, [storageData?.apiKey]);

  const { errors } = formState;

  if (storageError) throw new Error(storageError);

  const onSubmit: SubmitHandler<ApiKeyFormSchema> = async ({ apiKey }) => {
    await setStorage({
      currentStorage: { ...storage.data },
      items: { apiKey },
      onSuccess: () => navigate(nextRoute),
    });
  };

  return (
    <StyledDistribute gap="spacing3">
      <StyledText $size="large" $weight="normal" as="h2">
        Set API key
      </StyledText>
      <StyledForm id="api-key-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledForm.Field
          error={errors.apiKey}
          htmlFor="api-key"
          label="API key"
        >
          <StyledForm.Input
            autoFocus
            id="api-key"
            placeholder=""
            type="text"
            {...register("apiKey")}
          />
        </StyledForm.Field>
      </StyledForm>
      <StyledJustify justify="flex-end">
        {storageIsLoading ? (
          <StyledBox padding="spacing2">
            <StyledLoadingIndicator title="Waiting for the storage" />
          </StyledBox>
        ) : (
          <StyledButton
            $appearance="transparent"
            form="api-key-form"
            type="submit"
            disabled={!formState.isValid}
          >
            <StyledText $size="medium" $weight="medium" as="span">
              Save
            </StyledText>
          </StyledButton>
        )}
      </StyledJustify>
    </StyledDistribute>
  );
};
