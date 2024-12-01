import { FC, useEffect } from "react";
import {
  APIBaseURLFormSchema,
  apiBaseURLFormSchema,
} from "./APIBaseURLForm.schema";
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
import { useSettings, useStorage } from "../../../contexts";

export const APIBaseURLForm: FC<FormStep> = ({ nextRoute }) => {
  const navigate = useNavigate();
  const [storage, fetchStorage, setStorage] = useStorage();
  const [settings, fetchSettings] = useSettings();
  const { handleSubmit, formState, register, setValue } =
    useForm<APIBaseURLFormSchema>({
      resolver: yupResolver(apiBaseURLFormSchema),
      defaultValues: { apiBaseURL: "" },
      mode: "all",
    });

  const {
    data: storageData,
    error: storageError,
    isLoading: storageIsLoading,
  } = storage;
  const { error: settingsError, isLoading: settingsIsLoading } = settings;

  useEffect(() => {
    fetchStorage();
  }, []);

  useEffect(() => {
    if (storageData?.apiBaseURL) setValue("apiBaseURL", storageData.apiBaseURL);
  }, [storageData?.apiBaseURL]);

  if (storageError) throw new Error(storageError);
  if (settingsError) throw new Error(settingsError);

  if (storageIsLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Waiting for the storage" />
      </StyledBox>
    );
  if (settingsIsLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Waiting for the settings" />
      </StyledBox>
    );

  const { errors } = formState;

  const onSubmit: SubmitHandler<APIBaseURLFormSchema> = async ({
    apiBaseURL,
  }) => {
    await fetchSettings({
      apiBaseURL,
      onSuccess: async () => {
        await setStorage({
          currentStorage: { ...storage.data },
          items: { apiBaseURL },
          onSuccess: () => navigate(nextRoute),
        });
      },
    });
  };

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
