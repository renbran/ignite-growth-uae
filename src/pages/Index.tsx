import Header from "@/components/Header";
import HeroOrchestrator from "@/components/HeroOrchestrator";
import ValueProposition from "@/components/ValueProposition";
import Industries from "@/components/Industries";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroOrchestrator />
        <ValueProposition />
        <Industries />
      </main>
      <Footer />
    </div>
  );
};

export default Index;