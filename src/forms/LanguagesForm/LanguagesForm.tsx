import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LanguagesFormSchema,
  languagesFormSchema,
} from "./LanguagesForm.schema";
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
import { useFetchLanguages } from "../../../api";

export const LanguagesForm: FC = () => {
  const [languages, fetchLanguages] = useFetchLanguages();
  const [storage, , setStorage] = useStorage();
  const { watch, handleSubmit, formState, register, setValue } =
    useForm<LanguagesFormSchema>({
      resolver: yupResolver(languagesFormSchema),
      values: { sourceLanguage: "", targetLanguage: "" },
      mode: "all",
    });
  const sourceLanguageWatch = watch("sourceLanguage");

  const {
    data: languagesData,
    error: languagesError,
    isLoading: languagesIsLoading,
  } = languages;
  const {
    data: storageData,
    error: storageError,
    isLoading: storageIsLoading,
  } = storage;
  const { apiBaseURL, sourceLanguage, targetLanguage } = storageData || {};

  useEffect(() => {
    if (apiBaseURL) fetchLanguages({ apiBaseURL });
  }, [apiBaseURL, fetchLanguages]);

  useEffect(() => {
    const prefillForm = () => {
      if (languagesData?.result.length) {
        setValue("sourceLanguage", sourceLanguage || "");
        setValue("targetLanguage", targetLanguage || "");
      }
    };

    prefillForm();
  }, [languagesData?.result.length, sourceLanguage, targetLanguage]);

  const { errors } = formState;

  const onSubmit: SubmitHandler<LanguagesFormSchema> = async ({
    sourceLanguage,
    targetLanguage,
  }) => {
    await setStorage({
      currentStorage: { ...storage.data },
      items: { sourceLanguage, targetLanguage },
    });
  };

  if (storageError) throw new Error(storageError);
  if (languagesError) throw new Error(languagesError);

  const renderOptions = (options?: string[]) => {
    if (!options) return null;

    return (
      <>
        {options.map((id) => (
          <StyledForm.Option key={id} value={id}>
            {languagesData?.entities.languages[id].name}
          </StyledForm.Option>
        ))}
      </>
    );
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
            {renderOptions(languagesData?.result)}
          </StyledForm.Select>
        </StyledForm.Field>
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
            {sourceLanguageWatch
              ? renderOptions(
                languagesData?.entities.languages[sourceLanguageWatch].targets
              )
              : sourceLanguage
                ? renderOptions(
                  languagesData?.entities.languages[sourceLanguage].targets
                )
                : null}
          </StyledForm.Select>
        </StyledForm.Field>
      </StyledForm>
      <StyledJustify justify="flex-end">
        {storageIsLoading || languagesIsLoading ? (
          <StyledBox padding="spacing2">
            <StyledLoadingIndicator
              title={
                storageIsLoading
                  ? "Waiting for the storage"
                  : "Fetching available languages"
              }
            />
          </StyledBox>
        ) : (
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
        )}
      </StyledJustify>
    </StyledDistribute>
  );
};
