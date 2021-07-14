import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CategoriesSection from "./components/CategoriesSection";
import ExpensesSection from "./components/ExpensesSection";
import InsightsSection from "./components/InsightsSection";

function App() {
  const [key, setKey] = useState("expenses");

  return (
    <div className="App">
      <div className="Header">
        <div className="title">EXPENSE MANAGER</div>
      </div>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="expenses" title="Expenses">
          <ExpensesSection />
        </Tab>
        <Tab eventKey="report" title="Insights">
          <InsightsSection />
        </Tab>
        <Tab eventKey="categories" title="Categories">
          <CategoriesSection />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
