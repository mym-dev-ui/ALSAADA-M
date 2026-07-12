import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import Home from "@/pages/Home";
import Benefits from "@/pages/Benefits";
import Partners from "@/pages/Partners";
import Join from "@/pages/Join";
import Contact from "@/pages/Contact";
import Register from "@/pages/Register";
import Payment from "@/pages/Payment";
import CardDetails from "@/pages/CardDetails";
import Success from "@/pages/Success";
import Otp from "@/pages/Otp";
import NotFound from "@/pages/NotFound";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FormProvider } from "@/context/FormContext";

const FLOW_PAGES = ["/register", "/payment", "/card", "/otp", "/success"];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/benefits" component={Benefits} />
      <Route path="/partners" component={Partners} />
      <Route path="/join" component={Join} />
      <Route path="/register" component={Register} />
      <Route path="/payment" component={Payment} />
      <Route path="/card" component={CardDetails} />
      <Route path="/otp" component={Otp} />
      <Route path="/success" component={Success} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  const [location] = useLocation();
  const isHome = location === "/";
  const isFlowPage = FLOW_PAGES.some((p) => location.startsWith(p));

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      {!isHome && !isFlowPage && <Navbar />}
      <main className="flex-1">
        <Router />
      </main>
      {!isHome && !isFlowPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <FormProvider>
        <Layout />
      </FormProvider>
    </WouterRouter>
  );
}

export default App;
