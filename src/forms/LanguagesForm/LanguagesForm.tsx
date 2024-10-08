import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_ENDPOINTS, NormalizedLanguages } from "../../../api";
import { sendMessage } from "../../../service-worker";
import { LanguagesFormSchema, languagesFormSchema } from "./LanguagesForm.schema";
import { ExtensionStorage } from "../../extensionStorage.types";
import { StyledButton, StyledTypography } from "../../../components";
import { StyledForm } from "../../components";

export const LanguagesForm: FC = () => {
  const { watch, handleSubmit, formState, register, setValue } = useForm<LanguagesFormSchema>({
    resolver: yupResolver(languagesFormSchema),
    defaultValues: { sourceLanguage: "", targetLanguage: "" },
    mode: "all",
  });
  const [languageOptions, setLanguageOptions] = useState<NormalizedLanguages | null>(null);
  const sourceLanguageWatch = watch("sourceLanguage");
  const targetLanguageWatch = watch("targetLanguage");

  useEffect(() => {
    const getLanguages = async () => {
      const languageOptions = await sendMessage<{}, NormalizedLanguages>({ type: API_ENDPOINTS.LANGUAGES })
      if (!languageOptions.success) {
        setLanguageOptions(null);

        return;
      }
      const { data } = languageOptions;
      setLanguageOptions(data);
      const { sourceLanguage, targetLanguage } = await chrome.storage.local.get<ExtensionStorage>();
      if (sourceLanguage) setValue("sourceLanguage", sourceLanguage);
      if (targetLanguage) setValue("targetLanguage", targetLanguage);
    };
    getLanguages();
  }, []);

  useEffect(() => {
    if (languageOptions && sourceLanguageWatch) {
      const { targets } = languageOptions.entities.languages[sourceLanguageWatch];

      if (targets.includes(targetLanguageWatch)) return;

      setValue("targetLanguage", targets[0]);
    };
  }, [languageOptions, sourceLanguageWatch]);

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
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledForm.Header $size="large" $weight="normal" as="h2">Choose languages</StyledForm.Header>
      <StyledForm.Content>
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
      </StyledForm.Content>
      <StyledForm.Footer>
        <StyledButton $appearance="transparent" type="submit" disabled={!formState.isValid}>
          <StyledTypography $size="medium" $weight="medium" as="span">Save</StyledTypography>
        </StyledButton>
      </StyledForm.Footer>
    </StyledForm>
  );
};
