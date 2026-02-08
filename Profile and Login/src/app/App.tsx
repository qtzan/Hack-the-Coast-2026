import { useState } from "react";
import { CreateAccountForm } from "./components/CreateAccountForm";
import { CreateAccountStep2, PersonalDetailsData } from "./components/CreateAccountStep2";
import { ProfilePage } from "./components/ProfilePage";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [accountData, setAccountData] = useState<{ email: string; password: string } | null>(null);
  const [personalData, setPersonalData] = useState<PersonalDetailsData | null>(null);

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else {
      console.log("Back button clicked");
    }
  };

  const handleStep1Submit = (data: { email: string; password: string }) => {
    console.log("Step 1 submitted:", data);
    setAccountData(data);
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: PersonalDetailsData) => {
    console.log("Step 2 submitted:", data);
    setPersonalData(data);
    console.log("Complete account data:", { ...accountData, ...data });
    setCurrentStep(3);
  };

  const handleLoginClick = () => {
    console.log("Login clicked");
    alert("Redirecting to login page...");
  };

  const combinedUserData = personalData
    ? {
        email: accountData?.email,
        ...personalData,
      }
    : undefined;

  return (
    <div className="size-full">
      {currentStep === 1 && (
        <CreateAccountForm
          onBack={handleBack}
          onSubmit={handleStep1Submit}
          onLoginClick={handleLoginClick}
        />
      )}
      {currentStep === 2 && (
        <CreateAccountStep2
          onBack={handleBack}
          onSubmit={handleStep2Submit}
          onLoginClick={handleLoginClick}
        />
      )}
      {currentStep === 3 && <ProfilePage userData={combinedUserData} onBack={handleBack} />}
    </div>
  );
}