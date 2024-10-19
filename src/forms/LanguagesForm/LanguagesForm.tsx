import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_ENDPOINTS, NormalizedLanguages } from "../../../api";
import { MessageErrorResponse, sendMessage } from "../../../service-worker";
import { LanguagesFormSchema, languagesFormSchema } from "./LanguagesForm.schema";
import { ExtensionStorage } from "../../extensionStorage.types";
import {
  DisplayMessageError,
  StyledButton,
  StyledDistribute,
  StyledJustify,
  StyledText
} from "../../../components";
import { StyledForm } from "../../components";

export const LanguagesForm: FC = () => {
  const { watch, handleSubmit, formState, register, setValue } = useForm<LanguagesFormSchema>({
    resolver: yupResolver(languagesFormSchema),
    defaultValues: { sourceLanguage: "", targetLanguage: "" },
    mode: "all",
  });
  const [languageOptions, setLanguageOptions] = useState<NormalizedLanguages | null>(null);
  const [error, setError] = useState<MessageErrorResponse['error'] | null>(null);
  const sourceLanguageWatch = watch("sourceLanguage");
  const targetLanguageWatch = watch("targetLanguage");

  const getLanguages = async () => {
    const languageOptions = await sendMessage<{}, NormalizedLanguages>({ type: API_ENDPOINTS.LANGUAGES })
    if (!languageOptions.success) {
      setLanguageOptions(null);
      const { error } = languageOptions;
      setError(error);

      return;
    };
    const { data } = languageOptions;
    setLanguageOptions(data);
    const { sourceLanguage, targetLanguage } = await chrome.storage.local.get<ExtensionStorage>();
    if (sourceLanguage) setValue("sourceLanguage", sourceLanguage);
    if (targetLanguage) setValue("targetLanguage", targetLanguage);
  };

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    if (languageOptions && sourceLanguageWatch) {
      const { targets } = languageOptions.entities.languages[sourceLanguageWatch];

      if (targets.includes(targetLanguageWatch)) return;

      setValue("targetLanguage", targets[0]);
    };
  }, [languageOptions, sourceLanguageWatch]);

  const handleRetry = () => {
    setError(null);
    getLanguages();
  };

  if (error) {
    return <DisplayMessageError error={error} onRetry={handleRetry} />;
  }

  const { errors } = formState;

  const onSubmit: SubmitHandler<LanguagesFormSchema> = ({ sourceLanguage, targetLanguage }) => {
    chrome.storage.local.set<ExtensionStorage>({ sourceLanguage, targetLanguage })
      .then(() => {
        setValue("sourceLanguage", sourceLanguage);
        setValue("targetLanguage", targetLanguage);
      })
      .catch(() => {
        setValue("sourceLanguage", "");
        setValue("targetLanguage", "");
      });
  };

  return (
    <StyledDistribute gap="spacing3">
      <StyledText $size="large" $weight="normal" as="h2">Choose languages</StyledText>
      <StyledForm id="languages-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledForm.Field
          error={errors.sourceLanguage}
          htmlFor="source-language"
          label="Source">
          <StyledForm.Select
            autoFocus
            id="source-language"
            {...register("sourceLanguage")}>
            <StyledForm.Option value="">Select option</StyledForm.Option>
            {
              languageOptions?.result.map((id) => {
                const { name } = languageOptions.entities.languages[id];
                return <StyledForm.Option value={id}>{name}</StyledForm.Option>
              })
            }
          </StyledForm.Select>
        </StyledForm.Field>
        {sourceLanguageWatch !== "" ?
          <StyledForm.Field
            error={errors.targetLanguage}
            htmlFor="target-language"
            label="Target">
            <StyledForm.Select
              id="target-language"
              {...register("targetLanguage")}>
              <StyledForm.Option value="">Select option</StyledForm.Option>
              {
                languageOptions?.entities.languages[sourceLanguageWatch].targets.map(target => {
                  const { name } = languageOptions.entities.languages[target];
                  return <StyledForm.Option value={target}>{name}</StyledForm.Option>
                })
              }
            </StyledForm.Select>
          </StyledForm.Field> : null}
      </StyledForm>
      <StyledJustify justify="end">
        <StyledButton $appearance="transparent" form="languages-form" type="submit" disabled={!formState.isValid}>
          <StyledText $size="medium" $weight="medium" as="span">Save</StyledText>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};
