import { FC, useEffect } from "react"
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
  StyledButton,
  StyledDistribute,
  StyledJustify,
  StyledText
} from "../../../components";
import { StyledForm } from "../../components";
import { useUserSettings } from "../../contexts";

export const APIBaseURLForm: FC<FormStep> = ({ nextRoute }) => {
  const auth = useUserSettings();
  const navigate = useNavigate();
  const { handleSubmit, formState, register, setValue } = useForm<APIBaseURLFormSchema>({
    resolver: yupResolver(apiBaseURLFormSchema),
    defaultValues: { apiBaseURL: auth?.state.apiBaseURL },
    mode: "all",
  });

  useEffect(() => {
    chrome.storage.local.get<ExtensionStorage>()
      .then(({ apiBaseURL }) => {
        if (apiBaseURL) setValue("apiBaseURL", apiBaseURL);
      });
  }, []);

  const { errors } = formState;

  const onSubmit: SubmitHandler<APIBaseURLFormSchema> = ({ apiBaseURL }) => {
    chrome.storage.local.set<ExtensionStorage>({ apiBaseURL })
      .then(() => navigate(nextRoute))
      .catch(() => setValue("apiBaseURL", ""));
  };

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
