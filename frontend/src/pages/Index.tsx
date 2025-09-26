import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Lessons from "@/components/Lessons";
import Exercises from "@/components/Exercises";
import Progress from "@/components/Progress";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "lessons":
        return <Lessons />;
      case "exercises":
        return <Exercises />;
      case "progress":
        return <Progress />;
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main>
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
