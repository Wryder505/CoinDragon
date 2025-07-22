"use client"

import { useState, useEffect } from 'react'

// Components
import Overview from './components/Overview'
import Holdings from './components/Holdings'
import Values from './components/Values'
import Assets from './components/Assets'


// Snapshot Data
import marketSnapshot from './snapshots/markets.json'
import tokensSnapshot from './snapshots/tokens.json'
import pricesSnapshot from './snapshots/prices.json'

export default function Home() {
  const [account, setAccount] = useState(null)
  const [trackedTokens, setTrackedTokens] = useState([])

  const [markets, setMarkets] = useState(null)
  const [tokens, setTokens] = useState([])

  const getMarkets = async () => {
    // TODO: Make API call to fetch market data
    // Use snapshot for now
    setMarkets(marketSnapshot)
  }

  const getToken = async () => {
    // Fetch token info and sew it together
    const id = trackedTokens[trackedTokens.length - 1]

    // Market Data
    const market = markets.find((market) => market.id === id)

    // Token Details
    const tokenSnapshot = tokensSnapshot.find((token) => token.id === id)
    const details = tokenSnapshot.detail_platforms.ethereum

    // Prices
    const prices = pricesSnapshot[id]

    // Balances
    const balanceSnapshot = {
      'ethereum': 2.0114677685473358,
      'usd-coin': 1.32,
    }
    const balance = balanceSnapshot[id]

    // Token Object
    const token = {
      id: id,
      market: market,
      address: details ? details.contract_address : null,
      prices: prices,
      balance: balance,
      value: market.current_price * balance,
    }

    setTokens([...tokens, token])
  }

  useEffect(() => {
    if(!markets) {
      getMarkets()
    }

    if(trackedTokens.length !== 0) {
      getToken()
    }
  }, [trackedTokens])

  return (
    <main>
      <h2>Portfolio Overview</h2>

      <Overview
        account={account}
        setAccount={setAccount}
        markets={markets}
        trackedTokens={trackedTokens}
        setTrackedTokens={setTrackedTokens}
        tokens={tokens}
      />

      <div className="details">
        <div className="divider"></div>

        <Holdings tokens={tokens} />

        <Values tokens={tokens} />

        <Assets />

      </div>
    </main>
  )
}
