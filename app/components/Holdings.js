import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Holdings = ({ tokens }) => {
  const defaultSymbols = ["--", "--", "--", "--", "--",]
  const defaultBalances = [32, 72.1, 55.89, 45.5, 80.9]

  const [symbols, setSymbols] = useState(null)
  const [balances, setBalances] = useState(null)

  const calculateValue = () => {
    let _symbols = []
    let _balances = []
    
    for (var i = 0; i < tokens.length; i++) {
      _symbols.push(tokens[i].market.symbol.toUpperCase())
      _balances.push(tokens[i].value)
    }

    setSymbols(_symbols)
    setBalances(_balances)
  }

  useEffect(() => {
    if (tokens.length === 0) {
      setSymbols(null)
    } else {
      calculateValue()
    }
  }, [tokens])

  return (
    <div className="holdings">
      <h3 className="holdings__title">Asset Holdings</h3>
      <div className="holdings__chart">

        <Chart
          options={{
            labels: symbols ? symbols : defaultSymbols,
            legend: {
              position: 'left',
              horizontalAlign: 'center',
              labels: {
                fontSize: '48px',
                fontWeight: 'bold',
                colors: '#FFFFFF'
              }
            },
            fill: {
              opacity: 0.88
            },
          }}
          series={balances ? balances : defaultBalances}
          type="polarArea"
          height="300"
          width="100%"
        />

      </div>
    </div>

  );
}
	
export default Holdings;
