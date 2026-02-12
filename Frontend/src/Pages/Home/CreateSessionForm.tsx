import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (key: any, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please Fill All The Required Fields.");
      return;
    }

    setError("");
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start A New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill Out A Few Quick Details And Unlock Your Personalized Set Of
        Interview Questions!
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="(e.g., Backend Developer, UI/UX Designer, etc.)"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years Of Experience"
          placeholder="(e.g., 1 Year, 3 Years, 5+ Years, etc.)"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics To Focus On"
          placeholder="(Coma-Separated, e.g., JavaScript, React, Node.js, etc.)"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="(Any Specific Goals or Notes For This Session)"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
