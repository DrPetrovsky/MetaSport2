import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <TokenPrice
              address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
              chain="eth"
              image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
              size="40px"
            />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <DEX chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <DEX chain="polygon" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/">
              <Redirect to="/quickstart" />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/nftBalance" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="250"
      height="50"
      version="1"
      viewBox="0 0 626 120"
    >
      <path
        fillRule="evenodd"
        d="M564.48 66.34v33.08H418.37V8.98L564.46 9v55.85c.06.48.04.99.02 1.49zm-.39-1.34h-34v34a34.2 34.2 0 0034-34zm-55.26 12.8h12.75V65.05a12.94 12.94 0 00-12.75 12.75zm20.87-2.87a5.24 5.24 0 01-2.86 2.86h2.86zm-5.8-1.75v.75h.75a.94.94 0 00-.75-.75zm.39 1.14v.35a.6.6 0 00.35-.35zm.38-1.14zm-.38 1.91H522a2.89 2.89 0 002.69 2.7v-2.7zm-.78-.39v-.2a1.1 1.1 0 010-.18v-1.15A1.74 1.74 0 00522 74.7zm-1-1.54H522v.52a2 2 0 01.49-.52zm7.2-.39a7.91 7.91 0 00-7.71-7.72v7.72zm0 .38h-4.63v4.63a4.83 4.83 0 004.61-4.63zM522 76.44v1.36h1.35a3.28 3.28 0 01-1.35-1.36zm7.73-6V65h-5.41a8.34 8.34 0 015.38 5.45zm0 7.73h-20.9a21.07 21.07 0 0020.88 20.86zM518.58 65h-9.76v9.76a13.36 13.36 0 019.76-9.76zm45.51-.4A55.46 55.46 0 00508.8 9.39v55.27zm0 34.4V70.24a34.67 34.67 0 01-28.79 28.81zm-38.28 0a21.46 21.46 0 01-17-17v17zm-17.37-21V9.39a89.87 89.87 0 00-89.67 89.71h89.68zm-89.7-68.58V90.9a90.28 90.28 0 0181.47-81.51zm145.33-.06h-48.9a55.88 55.88 0 0148.92 48.88zM.4 0l43.36 30.9L87.53 0v55.45L64.85 38.82l9.27-7 .68-7.68L50.13 40l-8.75 44.76-4.78-25L33 38.42 12.33 23.77l-.39 61.79H74.4l.4-17L49.73 50.7l10-7.92 27.45 19.8.4 35.65L0 97.84z"
      ></path>
      <path d="M106.16 88.56H122v10H94.64v-42h26.88v10h-15.36v6.18H120v9.48h-13.8zM160.16 56.58V67H148.7v31.58h-11.58V67h-11.4V56.58zM189 98.58l-2.34-6.84h-14.92l-2.34 6.84H157l16.5-42h11.28l16.86 42zm-5.16-15.9l-4.62-13-4.62 13zM218.84 99.6q-7.8 0-12.36-3.87T201.92 85h11.94a4 4 0 001.41 3.3 5.4 5.4 0 003.51 1.14 5.77 5.77 0 003.33-1 3 3 0 001.41-2.58 3.18 3.18 0 00-.12-.93 2 2 0 00-.45-.75q-.33-.36-.63-.63a3.45 3.45 0 00-.93-.54q-.63-.27-1-.42t-1.29-.39l-1.32-.36-1.47-.36-2.7-.72q-.9-.24-2.64-.84a15.12 15.12 0 01-2.7-1.17 19.36 19.36 0 01-2.27-1.53 8 8 0 01-1.92-2.16 12.51 12.51 0 01-1.14-2.82 13.28 13.28 0 01-.48-3.66 11.67 11.67 0 014.23-9.58q4.23-3.45 11.73-3.45t11.67 3.66q4.17 3.66 4.17 10.08h-11.58a3.48 3.48 0 00-1.26-2.91 4.89 4.89 0 00-3.12-1 5.5 5.5 0 00-2.88.72 2.36 2.36 0 00-1.2 2.16 2.25 2.25 0 00.24 1 2.44 2.44 0 00.78.87 9 9 0 001 .66 10.44 10.44 0 001.5.6q1 .33 1.62.51t2 .48l2.76.75q1 .27 2.73.9a15.55 15.55 0 012.76 1.23 25.59 25.59 0 012.31 1.62 7.68 7.68 0 012 2.22 13.87 13.87 0 011.2 2.88 12.55 12.55 0 01.51 3.66q0 6.66-4.62 10.29t-12.17 3.67zM259.58 56.58a15.31 15.31 0 0111.13 4.29 14.54 14.54 0 014.41 10.89 14.59 14.59 0 01-4.44 10.92 15.28 15.28 0 01-11.1 4.32h-6.3v11.58H241.7v-42zm-1.38 20.28a4.91 4.91 0 003.63-1.41 5 5 0 001.41-3.69 5.42 5.42 0 00-.63-2.61 4.58 4.58 0 00-1.77-1.83 5.17 5.17 0 00-2.64-.66h-4.92v10.2zM301.34 99.66q-10.14 0-16.65-6.21a21 21 0 01-6.51-15.87 21 21 0 016.51-15.87q6.51-6.21 16.65-6.21t16.56 6.21a21 21 0 016.48 15.87 21 21 0 01-6.48 15.87q-6.48 6.21-16.56 6.21zm-7.95-14a10.72 10.72 0 007.95 3.18 10.53 10.53 0 007.89-3.18 11.14 11.14 0 003.09-8.1 11.14 11.14 0 00-3.09-8.1 10.53 10.53 0 00-7.89-3.18 10.72 10.72 0 00-7.95 3.18 12 12 0 000 16.2zM352.88 98.58L346 85.74h-4.1v12.84h-11.58v-42h18.18a17 17 0 018 1.86 13.7 13.7 0 015.55 5.28 15 15 0 012 7.74 14.46 14.46 0 01-.78 4.77 12.84 12.84 0 01-2.28 4 13.1 13.1 0 01-3.6 3l8.34 15.3zm-11-31.74V76h5.28a5.31 5.31 0 003.72-1.26 4.26 4.26 0 001.38-3.3 4.53 4.53 0 00-.6-2.34 4.23 4.23 0 00-1.77-1.62 5.91 5.91 0 00-2.73-.6zM401.48 56.58V67H390v31.58h-11.56V67H367V56.58zM435 56.58q9.54 0 15.6 5.88a20.11 20.11 0 016.06 15.09 20.15 20.15 0 01-6.09 15.12q-6.07 5.91-15.57 5.91h-17v-42zM434.48 88a10.39 10.39 0 100-20.76h-4.86V88zM488.6 98.58l-2.34-6.84h-14.88L469 98.58h-12.32l16.5-42h11.28l16.86 42zm-5.16-15.9l-4.62-13-4.62 13zM524.3 99.66q-10.14 0-16.65-6.21a21 21 0 01-6.51-15.87 21 21 0 016.51-15.87q6.51-6.21 16.65-6.21t16.56 6.21a21 21 0 016.48 15.87 21 21 0 01-6.48 15.87q-6.48 6.21-16.56 6.21zm-7.95-14a10.72 10.72 0 007.95 3.18 10.53 10.53 0 007.89-3.18 11.14 11.14 0 003.09-8.1 11.14 11.14 0 00-3.09-8.1 10.53 10.53 0 00-7.89-3.18 10.72 10.72 0 00-7.95 3.18 12 12 0 000 16.2z"></path>
    </svg>
  </div>
);

export default App;
