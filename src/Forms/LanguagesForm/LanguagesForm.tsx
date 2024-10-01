import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_ENDPOINTS, NormalizedLanguages } from "../../../api";
import { sendMessage } from "../../../service-worker";
import { LanguagesFormSchema, languagesFormSchema } from "./LanguagesForm.schema";
import { ExtensionStorage } from "../../extensionStorage.types";
import { StyledTypography } from "../../../components";

export const LanguagesForm: FC = () => {
  const { watch, handleSubmit, formState, register, setValue } = useForm<LanguagesFormSchema>({
    resolver: yupResolver(languagesFormSchema),
    defaultValues: { sourceLanguage: "", targetLanguage: "" },
    mode: "all",
  });
  const [languageOptions, setLanguageOptions] = useState<NormalizedLanguages | null>(null);
  const [languageChangeStatus, setLanguageChangeStatus] = useState<'saved' | 'failed to save' | null>(null);
  const sourceLanguageWatch = watch("sourceLanguage");
  const targetLanguageWatch = watch("targetLanguage");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLanguageChangeStatus(null)
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [languageChangeStatus]);

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

  const onSubmit: SubmitHandler<LanguagesFormSchema> = ({ sourceLanguage, targetLanguage }) => {
    chrome.storage.local.set<ExtensionStorage>({ sourceLanguage, targetLanguage })
      .then(() => {
        setValue("sourceLanguage", sourceLanguage);
        setValue("targetLanguage", targetLanguage);
        setLanguageChangeStatus('saved');
      })
      .catch(() => {
        setValue("sourceLanguage", "");
        setValue("targetLanguage", "");
        setLanguageChangeStatus('failed to save');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <label
        htmlFor="source-language"
      >
        <StyledTypography $size="medium" $weight="medium" as="span">Source</StyledTypography>
      </label>
      <select id="source-language" {...register("sourceLanguage")}>
        <option value="">Select option</option>
        {
          languageOptions?.result.map((id) => {
            const { name } = languageOptions.entities.languages[id];
            return <option value={id}>{name}</option>
          })
        }
      </select>
      {sourceLanguageWatch !== "" ? <>
        <label
          htmlFor="target-language"
        >
          <StyledTypography $size="medium" $weight="medium" as="span">Target</StyledTypography>
        </label>
        <select id="target-language" {...register("targetLanguage")}>
          <option value="">Select option</option>
          {
            languageOptions?.entities.languages[sourceLanguageWatch].targets.map(target => {
              const { name } = languageOptions.entities.languages[target];
              return <option value={target}>{name}</option>
            })
          }
        </select>
      </> : null}
      {languageChangeStatus ? 
      <StyledTypography $size="small" $weight="normal" as="span">{languageChangeStatus}</StyledTypography> : null}
      <button type="submit" disabled={!formState.isValid}>
        <StyledTypography $size="medium" $weight="medium" as="span">Save</StyledTypography>
      </button>
    </form>
  )
}