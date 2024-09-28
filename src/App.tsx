import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SettingsFormSchema, settingsFormSchema } from "./settingsFormSchema";
import { ChangesStatusMessage } from "./App.types";
import { sendMessage } from "../service-worker";
import { API_ENDPOINTS, NormalizedLanguages } from "../api";
import { LanguagesForm } from "./LanguagesForm";

const App = () => {
  const { handleSubmit, formState, register, setValue } = useForm<SettingsFormSchema>({
    resolver: yupResolver(settingsFormSchema),
    defaultValues: { API_KEY: "", API_BASE_URL: "" },
    mode: "all",
  });

  const [changesStatusMessage, setChangesStatusMessage] = useState<ChangesStatusMessage | null>();
  const [languageOptions, setLanguageOptions] = useState<NormalizedLanguages>();

  useEffect(() => {
    sendMessage<{}, NormalizedLanguages>({ type: API_ENDPOINTS.LANGUAGES })
      .then((response) => {
        if (response.success) {
          const { data } = response;

          setLanguageOptions(data);
        } else {
          // handle error
        };
      })
    chrome.storage.local.get<SettingsFormSchema>()
      .then(({ API_KEY, API_BASE_URL }) => {
        setValue("API_KEY", API_KEY);
        setValue("API_BASE_URL", API_BASE_URL);
      });
  }, []);

  useEffect(() => {
    if (!changesStatusMessage) return;
    const timerId = setTimeout(() => setChangesStatusMessage(null), 1000);

    return () => {
      clearTimeout(timerId)
    }
  }, [changesStatusMessage]);

  const { errors } = formState;

  const onSubmit: SubmitHandler<SettingsFormSchema> = ({ API_KEY, API_BASE_URL }) => {
    chrome.storage.local.set<SettingsFormSchema>({ API_KEY, API_BASE_URL })
      .then(() => {
        setValue("API_KEY", API_KEY);
        setValue("API_BASE_URL", API_BASE_URL);
        setChangesStatusMessage("Saved");
      })
      .catch(() => {
        setValue("API_KEY", "");
        setValue("API_BASE_URL", "");
        setChangesStatusMessage("Failed to save");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="API_KEY"
        >
          API key
        </label>
        <input type="text" id="api-key" placeholder=""
          {...register("API_KEY")}
        >
        </input >
        {errors.API_KEY && (
          <p style={{ color: 'red' }}>
            {errors.API_KEY.message}
          </p>
        )}
        <label
          htmlFor="API_BASE_URL"
        >
          API Base URL
        </label>
        <input type="text" id="api-base-url" placeholder=""
          {...register("API_BASE_URL")}
        >
        </input >
        {errors.API_BASE_URL && (
          <p style={{ color: 'red' }}>
            {errors.API_BASE_URL.message}
          </p>
        )}
        <button type="submit" disabled={!formState.isValid}>save</button>
      </form>
      <LanguagesForm languageOptions={languageOptions} />
      {changesStatusMessage ? <p>{changesStatusMessage}</p> : null}
    </div >
  );
}

export default App;
