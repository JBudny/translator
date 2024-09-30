import { FC, useEffect } from "react"
import { ApiKeyFormSchema, apiKeyFormSchema } from "./ApiKeyForm.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../AuthProvider";
import { Navigate } from "react-router-dom";
import { ExtensionStorage } from "../../extensionStorage.types";
import { FormStep } from "../Form.types";

export const APIKeyForm: FC<FormStep> = ({ nextRoute }) => {
  const auth = useAuth();
  const { handleSubmit, formState, register, setValue } = useForm<ApiKeyFormSchema>({
    resolver: yupResolver(apiKeyFormSchema),
    defaultValues: { apiKey: auth?.state.apiKey },
    mode: "all",
  });

  useEffect(() => {
    chrome.storage.local.get<ExtensionStorage>()
      .then(({ apiKey }) => {
        if (apiKey) setValue("apiKey", apiKey);
      });
  }, []);

  if (auth && auth.state.apiKey)
    return <Navigate to={nextRoute} replace />;

  const { errors } = formState;

  const onSubmit: SubmitHandler<ApiKeyFormSchema> = ({ apiKey }) => {
    chrome.storage.local.set<ExtensionStorage>({ apiKey })
      .then(() => setValue("apiKey", apiKey))
      .catch(() => setValue("apiKey", ""));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="api-key">API key</label>
      <input type="text" id="api-key" placeholder=""
        {...register("apiKey")}>
      </input >
      {errors.apiKey && (
        <p style={{ color: 'red' }}>
          {errors.apiKey.message}
        </p>
      )}
      <button type="submit" disabled={!formState.isValid}>save</button>
    </form>
  );
};
