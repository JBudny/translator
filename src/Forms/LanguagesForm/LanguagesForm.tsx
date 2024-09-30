import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_ENDPOINTS, NormalizedLanguages } from "../../../api";
import { sendMessage } from "../../../service-worker";
import { LanguagesFormSchema, languagesFormSchema } from "./LanguagesForm.schema";
import { ExtensionStorage } from "../../extensionStorage.types";

export const LanguagesForm: FC = () => {
  const { watch, handleSubmit, formState, register, setValue, getValues, trigger } = useForm<LanguagesFormSchema>({
    resolver: yupResolver(languagesFormSchema),
    defaultValues: { sourceLanguage: "", targetLanguage: "" },
    mode: "all",
  });
  const [languageOptions, setLanguageOptions] = useState<NormalizedLanguages | null>(null);
  const sourceLanguageWatch = watch("sourceLanguage");
  const targetLanguageWatch = watch("targetLanguage");

  useEffect(() => {
    chrome.storage.local.get<ExtensionStorage>()
      .then(({ sourceLanguage, targetLanguage }) => {
        if (sourceLanguage) setValue("sourceLanguage", sourceLanguage);
        if (targetLanguage) setValue("targetLanguage", targetLanguage);
      });
  }, []);

  useEffect(() => {
    sendMessage<{}, NormalizedLanguages>({ type: API_ENDPOINTS.LANGUAGES })
      .then((response) => {
        if (response.success) {
          const { data } = response;
          setLanguageOptions(data);
        } else {
          setLanguageOptions(null)
        };
      })
  }, []);

  useEffect(() => {
    if (languageOptions) {
      const { targets } = languageOptions.entities.languages[sourceLanguageWatch];

      if (targets.includes(targetLanguageWatch)) return;

      setValue("targetLanguage", targets[0]);
    }
  }, [sourceLanguageWatch]);

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
    <form onSubmit={handleSubmit(onSubmit)} >
      <label
        htmlFor="source-language"
      >
        Source
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
          Target
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
      <button type="submit" disabled={!formState.isValid}>save</button>
    </form>
  )
}