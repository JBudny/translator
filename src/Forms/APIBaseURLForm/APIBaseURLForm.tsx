import { FC, useEffect } from "react"
import { APIBaseURLFormSchema, apiBaseURLFormSchema } from "./APIBaseURLForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../AuthProvider";
import { Navigate } from "react-router-dom";
import { ExtensionStorage } from "../../extensionStorage.types";
import { FormStep } from "../Form.types";
import { StyledTypography } from "../../../components";

export const APIBaseURLForm: FC<FormStep> = ({ nextRoute }) => {
  const auth = useAuth();
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

  if (auth && auth.state.apiBaseURL)
    return <Navigate to={nextRoute} replace />;

  const { errors } = formState;

  const onSubmit: SubmitHandler<APIBaseURLFormSchema> = ({ apiBaseURL }) => {
    chrome.storage.local.set<ExtensionStorage>({ apiBaseURL })
      .then(() => setValue("apiBaseURL", apiBaseURL))
      .catch(() => setValue("apiBaseURL", ""));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="api-base-url">
        <StyledTypography $size="medium" $weight="medium" as="span">API URL</StyledTypography>
      </label>
      <input type="text" id="api-base-url" placeholder=""
        {...register("apiBaseURL")}>
      </input >
      {errors.apiBaseURL && (
        <p style={{ color: 'red' }}>
          {errors.apiBaseURL.message}
        </p>
      )}
      <button type="submit" disabled={!formState.isValid}>
        <StyledTypography $size="medium" $weight="medium" as="span">Save</StyledTypography>
      </button>
    </form>
  );
};
