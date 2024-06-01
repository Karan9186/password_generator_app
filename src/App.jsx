import "./App.css";
import "react-toastify/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  uppercase_letters,
  lowercase_letters,
  symbols,
  numbers,
} from "./Datas";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function App() {
  let [uc, setUc] = useState(false);
  let [lc, setLc] = useState(false);
  let [sy, setSy] = useState(false);
  let [nu, setNu] = useState(false);
  let [checkTrue, setCheckTrue] = useState(false);
  let [pass, setPass] = useState("");
  let [pasLen, setPassLen] = useState(8);
  function setPassword() {
    let pass = "";
    let char1 = "";
    if (uc || lc || sy || nu == true) {
      if (uc == true) char1 += uppercase_letters;
      if (lc == true) char1 += lowercase_letters;
      if (sy == true) char1 += symbols;
      if (nu == true) char1 += numbers;

      if (pasLen > 20) {
        toast.error("your password length limit reached");
      } else if (pasLen < 8) {
        toast.error("password length is minimum 8");
      } else {
        for (let i = 0; i < pasLen; i++) {
          pass += char1.charAt(Math.floor(Math.random() * char1.length));
        }
        setPass(pass);

        toast.success("Password generated");
      }
    } else {
      toast.error("select any selection");
    }
  }

  function copyPass() {
    if (pass.length == 0) {
      toast.error("no password to copy");
    } else {
      navigator.clipboard.writeText(pass);
      toast.success("copied");
      setCheckTrue(!checkTrue);
    }
  }

  function remove() {
    if (pass.length == 0) {
      toast.error("no password to remove");
    } else {
      setPass("");
      toast.success("textbox cleared");
    }
  }
  return (
    <>
      <div className="main_contaienr container">
        <ToastContainer />
        <div className="child_cont pt-5 pb-4">
          <input
            type="text"
            readOnly
            className="p-2 input_text"
            value={pass}
            placeholder="Your Password"
          />
          <div className="w-100 d-flex align-items-center justify-content-center gap-1">
            <button className={`mt-2 w-100 `} onClick={() => copyPass()}>
              copy
            </button>
            <input
              type="number"
              value={pasLen}
              className="mt-2 bg-secondary input_lenghth text-white"
              onChange={(e) => setPassLen(e.target.value)}
            />
          </div>
          <div className="option_class mt-4">
            <p>Uppercase</p>
            <input type="checkbox" checked={uc} onChange={() => setUc(!uc)} />
          </div>

          <div className="option_class">
            <p>Number</p>
            <input type="checkbox" checked={nu} onChange={() => setNu(!nu)} />
          </div>

          <div className="option_class">
            <p>Lowercase</p>
            <input type="checkbox" checked={lc} onChange={() => setLc(!lc)} />
          </div>

          <div className="option_class">
            <p>Symbol</p>
            <input type="checkbox" checked={sy} onChange={() => setSy(!sy)} />
          </div>
          <button className="mt-4" type="submit" onClick={() => setPassword()}>
            Generate
          </button>
          <button className="mt-4 mb-4" type="submit" onClick={() => remove()}>
            clear
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
