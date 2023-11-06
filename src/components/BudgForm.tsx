import { FormEvent, useState } from "react";

const BudgForm = () => {
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/calculate", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        body: JSON.stringify({
          plan: plan,
          amount: amount,
        }),
      });
      const responseText = await response.text();
      if (response.status === 200) {
        return responseText;
      } else {
        console.log(responseText);
        return "Some error occured";
      }
    } catch (err) {
      console.log(err);
      return "Some error occured";
    }
  };

  if (result) return <p>{result}</p>;

  return (
    <form onSubmit={(e) => handleSubmit(e).then((data) => setResult(data))}>
      <div className="mb-3">
        <label htmlFor="planField" className="form-label">
          Plan
        </label>
        <textarea
          className="form-control"
          id="planField"
          aria-describedby="planHelp"
          rows={7}
          onChange={(e) => {
            setPlan(e.target.value);
          }}
        />
        <div id="planHelp" className="form-text">
          Refer to budg documentation for help on toml formatting.
        </div>
      </div>
      <label htmlFor="amountField" className="form-label">
        Amount
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text">$</span>
        <input
          type="text"
          id="amountField"
          className="form-control"
          aria-label="Amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Calculate
      </button>
    </form>
  );
};
export default BudgForm;
