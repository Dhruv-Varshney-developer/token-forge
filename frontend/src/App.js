import Header from "./components/header";
import MintingInterface from "./components/minting";
import ForgingInterface from "./components/forging";
import { Web3Provider } from "./utils/web3provider";
import BurningInterface from "./components/burnTokens";
import TradingInterface from "./components/tradeTokens";

export default function App() {
  return (
    <Web3Provider>
      <Header />
      <div className="relative px-4 py-10 bg-black shadow-lg  sm:p-20">
        <MintingInterface />
      </div>
      <div className="relative px-4 py-10 bg-black shadow-lg  sm:p-20">
        <ForgingInterface />
      </div>
      <div className="relative px-4 py-10 bg-black shadow-lg  sm:p-20">
        <TradingInterface />
      </div>
      <div className="relative px-4 py-10 bg-black shadow-lg  sm:p-20">
        <BurningInterface />
      </div>
    </Web3Provider>
  );
}
