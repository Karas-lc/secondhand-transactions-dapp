import NavigationBar from "../components/NavivationBar";
import Transactions from "../components/Transactions";
import {useEffect, useState} from "react";
import Web3 from "web3";

function HomePage() {
    const [account, setAccount] = useState();
    useEffect(() => {
        async function load() {
            const web3 = new Web3(
                Web3.givenProvider || "http://localhost:8545"
            );
            const accounts = await web3.eth.requestAccounts();

            setAccount(accounts[0]);
        }

        load();
    }, []);
    return <div id="App" >
        <div className="container">
            <NavigationBar />
            <div className="welcome">
                <h1>Welcome to the Second-Hand Transaction! account: {account}</h1>
            </div>
            <br/>
            <Transactions/>
        </div>
    </div>
}

export default HomePage;