import { yupResolver } from "@hookform/resolvers/yup";
import { FC, Fragment, useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  isDetectForm,
  isManualForm,
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

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<LanguagesFormSchema>({
    resolver: yupResolver(languagesFormSchema),
    values: {
      detect: false,
      detectForm: [{ target: "" }],
      manualForm: [{ source: "", target: "" }],
    },
    mode: "all",
  });
  const manualFields = useFieldArray({ name: "manualForm", control });
  const detectFields = useFieldArray({ name: "detectForm", control });
  const detectWatch = watch("detect");

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
  const { apiBaseURL, source, target, detect } = storageData || {};

  useEffect(() => {
    if (apiBaseURL) fetchLanguages({ apiBaseURL });
  }, [apiBaseURL, fetchLanguages]);

  useEffect(() => {
    const prefillForm = () => {
      if (languagesData?.result.length) {
        setValue("detectForm", [{ target: String(target) }]);
        setValue("manualForm", [
          { source: String(source), target: String(target) },
        ]);
        setValue("detect", Boolean(detect));
      }
    };

    prefillForm();
  }, [languagesData?.result.length, source, target, detect]);

  const onSubmit: SubmitHandler<LanguagesFormSchema> = async (data) => {
    if (isDetectForm(data)) {
      const { detect, detectForm } = data;

      if (detectForm) {
        await setStorage({
          currentStorage: { ...storage.data },
          items: { detect, target: detectForm[0].target },
        });
      }
    }

    if (isManualForm(data)) {
      const { detect, manualForm } = data;

      if (manualForm) {
        await setStorage({
          currentStorage: { ...storage.data },
          items: {
            detect,
            source: manualForm[0].source,
            target: manualForm[0].target,
          },
        });
      }
    }
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
        <StyledForm.Field error={errors.detect} htmlFor="detect" label="Detect source">
          <StyledForm.Input
            type="checkbox"
            autoFocus
            id="detect"
            {...register("detect")}
          />
        </StyledForm.Field>
        {detectWatch
          ? detectFields.fields.map((field, index) => (
            <Fragment key={field.id}>
              <Controller
                name={`detectForm.${index}.target`}
                render={(field) => (
                  <StyledForm.Field
                    error={field.fieldState.error}
                    htmlFor="target"
                    label="Target"
                  >
                    <StyledForm.Select {...field.field} autoFocus id="target">
                      <StyledForm.Option value="">
                        Select option
                      </StyledForm.Option>
                      {renderOptions(languagesData?.result)}
                    </StyledForm.Select>
                  </StyledForm.Field>
                )}
                control={control}
              />
            </Fragment>
          ))
          : manualFields.fields.map((field, index) => (
            <Fragment key={field.id}>
              <Controller
                name={`manualForm.${index}.source`}
                render={(field) => (
                  <StyledForm.Field
                    error={field.fieldState.error}
                    htmlFor="source"
                    label="Source"
                  >
                    <StyledForm.Select {...field.field} autoFocus id="source">
                      <StyledForm.Option value="">
                        Select option
                      </StyledForm.Option>
                      {renderOptions(languagesData?.result)}
                    </StyledForm.Select>
                  </StyledForm.Field>
                )}
                control={control}
              />
              <Controller
                name={`manualForm.${index}.target`}
                render={(field) => (
                  <StyledForm.Field
                    error={field.fieldState.error}
                    htmlFor="target"
                    label="Target"
                  >
                    <StyledForm.Select {...field.field} autoFocus id="target">
                      <StyledForm.Option value="">
                        Select option
                      </StyledForm.Option>
                      {renderOptions(languagesData?.result)}
                    </StyledForm.Select>
                  </StyledForm.Field>
                )}
                control={control}
              />
            </Fragment>
          ))}
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
            disabled={!isValid}
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
