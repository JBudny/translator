import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NormalizedLanguagesResponse } from "../../../api";
import {
  MessageErrorResponse,
  sendMessage,
  LanguagesActionPayload,
  languagesAction
} from "../../../service-worker";
import { LanguagesFormSchema, languagesFormSchema } from "./LanguagesForm.schema";
import { ExtensionStorage } from "../../extensionStorage.types";
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
import { AsyncStatus } from "../../../types";
import { useStorage } from "../../../contexts";

export const LanguagesForm: FC = () => {
  const { watch, handleSubmit, formState, register, setValue } = useForm<LanguagesFormSchema>({
    resolver: yupResolver(languagesFormSchema),
    defaultValues: { sourceLanguage: "", targetLanguage: "" },
    mode: "all",
  });
  const [languageOptions, setLanguageOptions] = useState<NormalizedLanguagesResponse | null>(null);
  const [error, setError] = useState<MessageErrorResponse['error'] | null>(null);
  const sourceLanguageWatch = watch("sourceLanguage");
  const targetLanguageWatch = watch("targetLanguage");
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const { state: { apiBaseURL } } = useStorage();

  const getLanguages = async () => {
    setStatus('pending');
    const languageOptions = await sendMessage<LanguagesActionPayload, NormalizedLanguagesResponse>(
      languagesAction(apiBaseURL)
    );
    if (!languageOptions.success) {
      setLanguageOptions(null);
      const { error } = languageOptions;
      setError(error);

      return;
    };
    setStatus('idle');
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

  if (status === 'pending') return (
    <StyledBox padding="spacing3" background="gray700">
      <StyledLoadingIndicator title="Fetching available languages" />
    </StyledBox>
  );

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
      <StyledJustify justify="flex-end">
        <StyledButton $appearance="transparent" form="languages-form" type="submit" disabled={!formState.isValid}>
          <StyledText $size="medium" $weight="medium" as="span">Save</StyledText>
        </StyledButton>
      </StyledJustify>
    </StyledDistribute>
  );
};
