import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { LanguagesFormSchema, languagesFormSchema } from "./LanguagesForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { NormalizedLanguages } from "../../api";

interface LanguagesFormProps {
  languageOptions?: NormalizedLanguages
};

export const LanguagesForm: FC<LanguagesFormProps> = ({ languageOptions }) => {
  const { watch, handleSubmit, formState, register, setValue, getValues, trigger } = useForm<LanguagesFormSchema>({
    resolver: yupResolver(languagesFormSchema),
    defaultValues: { SOURCE_LANGUAGE: "", TARGET_LANGUAGE: "" },
    mode: "all",
  });

  const sourceLanguageWatch = watch("SOURCE_LANGUAGE");
  const targetLanguageWatch = watch("TARGET_LANGUAGE");

  useEffect(() => {
    if (languageOptions) {
      const { targets } = languageOptions.entities.languages[sourceLanguageWatch];

      if (targets.includes(targetLanguageWatch)) return;

      setValue("TARGET_LANGUAGE", targets[0]);
    }
  }, [sourceLanguageWatch]);

  const onSubmit: SubmitHandler<LanguagesFormSchema> = ({ SOURCE_LANGUAGE, TARGET_LANGUAGE }) => {

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <label
        htmlFor="SOURCE_LANGUAGE"
      >
        Source
      </label>
      <select id="source-language" {...register("SOURCE_LANGUAGE")}>
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
          htmlFor="TARGET_LANGUAGE"
        >
          Target
        </label>
        <select id="target-language" {...register("TARGET_LANGUAGE")}>
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