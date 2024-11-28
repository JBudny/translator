import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ExtensionStorage, useFetchLanguages } from "../../../api";
import {
  LanguagesFormSchema,
  languagesFormSchema,
} from "./LanguagesForm.schema";
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
import { useStorage } from "../../../contexts";

export const LanguagesForm: FC = () => {
  const { watch, handleSubmit, formState, register, setValue } =
    useForm<LanguagesFormSchema>({
      resolver: yupResolver(languagesFormSchema),
      defaultValues: { sourceLanguage: "", targetLanguage: "" },
      mode: "all",
    });
  const [languages, fetchLanguages] = useFetchLanguages();
  const sourceLanguageWatch = watch("sourceLanguage");
  const targetLanguageWatch = watch("targetLanguage");
  const [storage] = useStorage();

  const {
    data: languagesData,
    error: languagesError,
    isLoading: languagesIsLoading,
  } = languages;

  useEffect(() => {
    if (storage.data?.sourceLanguage)
      setValue("sourceLanguage", storage.data?.sourceLanguage);
    if (storage.data?.targetLanguage)
      setValue("targetLanguage", storage.data?.targetLanguage);
  }, [storage.data?.sourceLanguage, storage.data?.targetLanguage]);

  useEffect(() => {
    fetchLanguages(storage.data?.apiBaseURL);
  }, [storage.data?.apiBaseURL, fetchLanguages]);

  useEffect(() => {
    if (languagesData && sourceLanguageWatch) {
      const { targets } = languagesData.entities.languages[sourceLanguageWatch];

      if (targets.includes(targetLanguageWatch)) return;

      setValue("targetLanguage", targets[0]);
    }
  }, [
    languagesData?.entities.languages[sourceLanguageWatch],
    sourceLanguageWatch,
  ]);

  const handleRetry = () => {
    fetchLanguages(storage.data?.apiBaseURL);
  };

  if (languagesError)
    return (
      <DisplayMessageError message={languagesError} onRetry={handleRetry} />
    );

  if (languagesIsLoading)
    return (
      <StyledBox padding="spacing3" background="gray700">
        <StyledLoadingIndicator title="Fetching available languages" />
      </StyledBox>
    );

  const { errors } = formState;

  const onSubmit: SubmitHandler<LanguagesFormSchema> = ({
    sourceLanguage,
    targetLanguage,
  }) => {
    chrome.storage.local
      .set<ExtensionStorage>({ sourceLanguage, targetLanguage })
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
      <StyledText $size="large" $weight="normal" as="h2">
        Choose languages
      </StyledText>
      <StyledForm id="languages-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledForm.Field
          error={errors.sourceLanguage}
          htmlFor="source-language"
          label="Source"
        >
          <StyledForm.Select
            autoFocus
            id="source-language"
            {...register("sourceLanguage")}
          >
            <StyledForm.Option value="">Select option</StyledForm.Option>
            {languagesData?.result.map((id) => {
              const { name } = languagesData.entities.languages[id];
              return <StyledForm.Option value={id}>{name}</StyledForm.Option>;
            })}
          </StyledForm.Select>
        </StyledForm.Field>
        {sourceLanguageWatch !== "" ? (
          <StyledForm.Field
            error={errors.targetLanguage}
            htmlFor="target-language"
            label="Target"
          >
            <StyledForm.Select
              id="target-language"
              {...register("targetLanguage")}
            >
              <StyledForm.Option value="">Select option</StyledForm.Option>
              {languagesData?.entities.languages[
                sourceLanguageWatch
              ].targets.map((target) => {
                const { name } = languagesData.entities.languages[target];
                return (
                  <StyledForm.Option value={target}>{name}</StyledForm.Option>
                );
              })}
            </StyledForm.Select>
          </StyledForm.Field>
        ) : null}
      </StyledForm>
      <StyledJustify justify="flex-end">
        <StyledButton
          $appearance="transparent"
          form="languages-form"
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
