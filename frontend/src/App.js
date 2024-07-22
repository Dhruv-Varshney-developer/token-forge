

import Header from './components/header';
import MintingInterface from './components/minting';
import ForgingInterface from './components/forging';
import { Web3Provider } from './utils/web3provider';









export default function App() {
 /* const [setProvider] = useState(null);
  const [setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [erc1155Contract, setERC1155Contract] = useState(null);
  const [forgingContract, setForgingContract] = useState(null);
  const [balances, setBalances] = useState(Array(7).fill(0));

  useEffect(() => {
    const init = async () => {
      const web3Modal = new createWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      const erc1155 = new ethers.Contract(ERC1155_ADDRESS, ERC1155_ABI, signer);
      const forging = new ethers.Contract(FORGING_ADDRESS, FORGING_ABI, signer);

      setProvider(provider);
      setSigner(signer);
      setAccount(account);
      setERC1155Contract(erc1155);
      setForgingContract(forging);

      // Fetch initial balances
      await updateBalances(erc1155, account);
    };

    init();
  }, [setProvider, setSigner]);

  const updateBalances = async (contract, account) => {
    const newBalances = await Promise.all(
      Array(7).fill().map((_, i) => contract.balanceOf(account, i))
    );
    setBalances(newBalances.map(b => b.toString()));
  };

  const mint = async (tokenId) => {
    try {
      const tx = await forgingContract.mint(tokenId);
      await tx.wait();
      await updateBalances(erc1155Contract, account);
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  const forge = async (requiredTokens, resultToken) => {
    try {
      const tx = await forgingContract.forge(requiredTokens, resultToken);
      await tx.wait();
      await updateBalances(erc1155Contract, account);
    } catch (error) {
      console.error("Error forging:", error);
    }
  };
*/
  return (

    <Web3Provider>

        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          

          <Header />

          {/*<NetworkChecker />
          
          <TokenDisplay balances={balances} />
          <div className="mt-10">
          </div>
          <div className="mt-10">
            <ForgingInterface forge={forge} />
          </div> */}

        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

        <MintingInterface  />
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

<ForgingInterface  />
</div>
        </Web3Provider>

    );
}